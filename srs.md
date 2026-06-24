GOLanguageExchange
Developer Engineering Guide
Architecture · Modules · Data Structures · Integration · AWS Deployment
Real-time, human-to-human conversational language platform
Prepared for the Engineering Team
Fanaye Technologies
Version 1.0 · June 2026 · Internal / Confidential

Contents



1. Introduction & Purpose
GOLanguageExchange (GLE) is a real-time, human-to-human conversational language platform. Users connect by audio with native speakers worldwide and practice applying language they have already learned. The platform is explicitly not a teaching app: both participants act as teacher and student simultaneously, and the product’s job is to build conversational confidence through repeated, structured exchanges.
This guide is the single source of truth for the engineering team. It describes what we are building, how the system is decomposed into modules, the data structures and API contracts that connect them, the real-time calling and ambient “Solar Session” layers, the post-conversation AI pipeline, and the AWS deployment topology that keeps audio latency low and call quality high. Where a design decision is non-obvious, the rationale is stated so the team can extend the platform without breaking it.
Scope note: this document is purely technical. Commercial terms, timelines, and budgets are intentionally excluded — they live in the separate proposal documents.
1.1 Product Principles (engineering implications)
Three product principles drive nearly every architectural decision. Treat them as constraints, not slogans.
Human-only conversations. AI never joins a live call. All AI work (transcription, linguistic analysis, summary generation) happens after the call ends, on recorded/streamed audio. This cleanly separates the real-time path (must be low-latency, stateful, fault-tolerant) from the analysis path (asynchronous, batch-friendly, retry-safe).
Modular, swappable architecture. The audio-analysis pipeline must be a standalone service with clear API boundaries so third-party speech tools (Azure Pronunciation Assessment, Speechace) can be plugged in later without touching the core app. Every cross-service call goes through a versioned, documented contract — never a direct import.
Confidence-building progression. The post-call summary card and the ambient Solar Session arc are first-class product surfaces, not decoration. They have their own modules, data, and acceptance criteria.
1.2 How to read this guide
Sections 2–3 give the big picture (architecture and module map). Sections 4–5 cover functionality and user flows. Sections 6–7 are the contract layer (data structures and APIs). Sections 8–9 are the two hardest real-time subsystems (Solar Session System and the calling engine). Section 10 is AWS deployment for low latency. Sections 11–15 cover integration, security, testing, and repo conventions.

2. System Architecture Overview
GLE is a modular monorepo deploying as a small set of independently scalable services. The guiding rule: the real-time calling path and the asynchronous analysis path never share a process, a thread, or a deployment unit. They communicate only through a database, an object store, and a message queue.
2.1 Logical layers
Layer
Responsibility
Primary technology
Client (Web/PWA)
World map, call UI, decks, summary cards, Solar visuals & ambient audio
Next.js + React + Tailwind CSS
API / Core service
Auth, profiles, matching, sessions, decks, subscriptions, orchestration
NestJS (Node.js)
Real-time audio
Peer-to-peer / SFU voice transport between two humans
Agora.io SDK
Solar Session System
Client-side ambient UX arc (gradients + Web Audio tones)
Web Audio API (browser)
Analysis pipeline
Transcription → NLP → AI summary, as a standalone service
Python (FastAPI) microservice
Data
Relational store, object store, cache/queue
PostgreSQL (RDS), S3, Redis/SQS
AI summary
Human-friendly summary card text generation
Claude API (Sonnet 4.6)

2.2 The two paths
Real-time path (synchronous, latency-critical)
Client A
→
Agora SFU
→
Client B


Two users join an Agora RTC channel. Audio flows directly through Agora’s global low-latency network. The GLE core service only brokers the connection (issues tokens, records who is in which channel) — it is never in the audio data path. The Solar Session System runs entirely in each client’s browser and is isolated from the Agora sender track.
Analysis path (asynchronous, after call ends)
Audio capture
→
Whisper
→
spaCy
→
Claude
→
Summary card


When a call ends, captured audio is uploaded to S3 and a job is enqueued. The Analysis service transcribes (Whisper), runs linguistic breakdown (spaCy), generates a summary (Claude API), persists a summary card, and triggers email delivery. Each arrow is a clean, versioned API boundary — this is what lets us swap Whisper or insert Azure/Speechace later (see Section 11).
2.3 Why this separation matters
A spike in post-call analysis load (CPU-heavy Whisper jobs) can never degrade live call quality, because they run on different infrastructure that scales independently.
The analysis pipeline can fail and retry without the user noticing during the call — the summary simply arrives a little later.
Third-party speech vendors are added by registering a new “stage” in the pipeline config, not by editing the Next.js app or the calling engine.

3. Module Map
The system is decomposed into the modules below. Each owns its data, exposes a contract, and can be developed and tested in isolation. Ownership boundaries are deliberate: cross-module access always goes through the owning module’s API.
Module
Owns
Depends on
Identity & Profile
Accounts, auth, profile fields, proficiency level
—
Subscription & Access
Tiers, entitlements, access gating
Identity
World Map & Discovery
City/country graph, illuminated nodes, presence
Identity, Subscription
Matching Engine
Pairing by language pair + city, queue
Identity, World Map
Call Engine
Agora orchestration, in-call controls, tandem timer
Matching, Identity
Solar Session System
Stage timing, gradients, ambient audio, Night Switch
Call Engine (timing only)
Session Records
Call logs, durations, languages, Solar telemetry
Call Engine
Analysis Pipeline
Transcription, NLP, AI summary orchestration
Session Records, S3
Summary Cards
Card data model, in-app render, email payload
Analysis Pipeline
Decks & Stacks
GLE decks, user stacks/decks, study content
Identity
Notifications
Transactional email (cards, alerts)
Summary Cards, Identity
Admin
User management, monitoring, call-log review
All (read)


4. Module Functionality (Detailed)
4.1 Identity & Profile
Handles registration, email verification, login, password reset, and OAuth. The profile is the user’s identity on the network and feeds the matching engine.
Profile fields: name, email, native language, language of study, city of residence, conversational level (5-level TOEFL-aligned scale), subscription tier. Privacy rule from the product spec: only native language and city are publicly visible to other users; everything else is private.
Visibility flag. Store a per-field visibility map. Default-public: nativeLanguage, city. Default-private: everything else. The API must never leak private fields in discovery responses.
Proficiency levels. Below Basic, Basic, Low Intermediate, High Intermediate, Advanced. Shown on profile and to matched users.
4.2 Subscription & Access
Defines what a signed-in user can reach. Three tiers exist; the engineering concern is entitlement gating, not billing mechanics.
Tier
Entitlement (engineering view)
Monthly / Yearly
Unlimited conversations with users speaking ONE chosen study language
SuperGO!!!
Unlimited conversations across ANY language; membership card surface unlocked

Entitlements are evaluated server-side on every match request and every call-join request — never trusted from the client.
Model entitlements as data (a tier → capability map), so new tiers are config, not code.
4.3 World Map & Discovery
The emotional core of the product UI. A world map with illuminated cities where conversation partners are available. It must render cleanly on web and mobile and grow gracefully as new cities join the network.
Data layer. Cities are nodes with coordinates, country, and a live “active users” count. The map is a presentation over a city/presence dataset, not hardcoded geometry.
Illumination = presence. A city lights up when one or more eligible partners are online there. Drive this from a presence service (Redis) updated on connect/disconnect.
Hidden-but-reachable decks. Per the product brief, decks must be accessible from any screen without competing with the map. Implement as a persistent, low-emphasis entry point (e.g., a drawer) — reachable in ≤2 taps, never obscuring the map.
4.4 Matching Engine
Pairs two users for an exchange based on complementary language pair and (optionally) city. A matches B when A’s study language is B’s native language and vice-versa, subject to subscription entitlements.
User opens a city / enters the matching queue with a topic note.
Engine finds an eligible, online, complementary partner (respecting tier gating).
On match, both clients receive a channel handle and an Agora token; the Call Engine takes over.
Keep matching stateless and queue-backed (Redis sorted sets) so it scales horizontally.
Record match metadata (language pair, city, topic) to seed the Session Record.
4.5 Call Engine
Owns the live audio call lifecycle: token issuance, channel join/leave, in-call controls (mute, end call, language toggle), and the tandem timer that prompts the language switch at the midpoint. Detailed real-time design and Agora configuration are in Section 9.
Tandem timer. An evenly-timed exchange: each speaker gets the agreed per-speaker duration; at the midpoint the UI prompts the language switch. This timer is the input to the Solar Session System.
In-call UI. Mute, end call, language toggle — all functional on mobile and desktop.
4.6 Solar Session System
A standalone, client-side ambient layer that wraps every exchange in a 4-stage solar arc (Dawn → Noon → Dusk → Sunset) governing screen gradient and ambient audio, ending in a Night Switch. It is fully specified in Section 8. Key engineering fact: its audio uses frequency ranges outside the human voice band and connects only to the local audio output — never to the Agora sender track.
4.7 Analysis Pipeline (post-conversation)
A standalone microservice that turns recorded audio into a summary card. Three swappable stages plus orchestration:
Transcription (Whisper, self-hosted, multilingual) — audio → text.
Linguistic breakdown (spaCy) — text → nouns, verbs, key phrases, counts.
Summary generation (Claude API) — structured analysis → human-friendly card with an AI learning insight.
Acceptance targets: transcription completes within 60 seconds of call end; the summary card appears in-app and is emailed to the user. Multilingual support confirmed for English, Spanish, Japanese, Arabic, Hindi, Korean.
Haitian Creole caveat: Whisper supports it but as a low-resource language accuracy is lower; spaCy has no native model, so route its linguistic breakdown through the Claude API instead. Flag results as best-effort. Full parity requires a fine-tuned Whisper model (future phase).
4.8 Summary Cards
The feedback loop that brings users back. A card shows words spoken, unique verbs, a fluency score (with trend vs. last session), key phrases used, the words used (verbs + nouns with frequency), and an AI learning insight generated only from what the user actually said. Rendered in-app and delivered by email; the design matches the pitch-deck card.
4.9 Decks & Stacks
The daily ritual between conversations. Two kinds of content:
GLE-built decks. Starter training decks per major language: brain games, word associations, key phrases, conversation openers, tone/pronunciation decks. They train “thought → action” without scripting what to say.
User stacks & decks. Users build “stacks” (words combined into real sentences) and organize them into personal “decks.” This trains sentence structure and word usage and creates buy-in.
Summary cards are also accessible from the deck area. Access is always available but visually subordinate to the world map.
4.10 Notifications & Admin
Notifications. Transactional email via Resend or SendGrid: summary cards (within 5 minutes of call end) and account alerts. Templated, idempotent, retry-safe.
Admin. User list, account management/deactivation, subscription view, and call-log review for monitoring and support.

5. Core Use Cases & User Flows
5.1 Primary flow: complete a language exchange
Open app → create account / sign in.
World map revealed; illuminated cities show where partners are available.
Choose a city, add a topic note for the engagement.
Enter matching queue → paired with a complementary partner.
Audio call starts; Solar Session begins at Dawn; tandem timer runs.
At midpoint, language switch is prompted (and the Solar Dusk midpoint trigger fires).
Sunset → Night Switch announces the switch; per-speaker arc may restart for the second speaker.
Call ends → audio enqueued for analysis.
Summary card generated, shown in-app, and emailed.
5.2 Secondary flows
Use case
Actor
Outcome
Register & build profile
New user
Verified account; languages, city, level saved
Browse & study decks
Member
Opens GLE decks from any screen in ≤2 taps
Build a stack/deck
Member
Creates, saves, edits personal sentence decks
Review past summary cards
Member
Accesses cards in-app and via email history
Upgrade to SuperGO!!!
Subscriber
Unlocks any-language matching + membership card
Moderate a user
Admin
Views, manages, or deactivates an account

5.3 Non-functional requirements
Audio latency target under 200 ms between two users in different locations.
No audio dropout on tested connections (broadband + 4G).
Responsive UI across iOS, Android, and desktop browsers (Chrome, Safari, Firefox).
Page load under 3 seconds on standard broadband.
Withstands 50 concurrent simulated call sessions (initial load target).

6. Data Structures & Database Schema
PostgreSQL is the system of record (via Prisma ORM). Below is the core relational model. Types are illustrative; tune precision and indexes during implementation. All timestamps are UTC.
6.1 Entity overview
Entity
Purpose
Key relations
User
Account + profile
1–many Sessions, Decks, SummaryCards
Subscription
Tier & entitlement
1–1 User
City
World-map node
1–many Users (residence), Sessions
MatchRequest
Queue entry
many–1 User, City
Session
A completed/active call
many–many Users (participants)
SolarTelemetry
Per-session Solar data
1–1 Session
SummaryCard
Post-call analysis output
1–1 Session, many–1 User
Deck
GLE or user deck
many–1 User (null = GLE), 1–many Stacks
Stack
Sentence set within a deck
many–1 Deck

6.2 Prisma schema (core excerpt)
model User {
  id              String   @id @default(cuid())
  email           String   @unique
  passwordHash    String?
  name            String
  nativeLanguage  String          // public
  studyLanguage   String          // private
  cityId          String?
  city            City?    @relation(fields: [cityId], references: [id])
  level           ProficiencyLevel @default(BASIC)
  fieldVisibility Json     // { nativeLanguage:true, city:true, ... }
  subscription    Subscription?
  sessions        SessionParticipant[]
  decks           Deck[]
  summaryCards    SummaryCard[]
  createdAt       DateTime @default(now())
}
 
enum ProficiencyLevel { BELOW_BASIC BASIC LOW_INTER HIGH_INTER ADVANCED }
 
model Subscription {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id])
  tier      Tier     @default(MONTHLY)
  active    Boolean  @default(true)
  renewsAt  DateTime?
}
enum Tier { MONTHLY YEARLY SUPERGO }
 
model City {
  id          String  @id @default(cuid())
  name        String
  country     String
  lat         Float
  lng         Float
  activeCount Int     @default(0)  // denormalized presence
}
model Session {
  id             String   @id @default(cuid())
  channelName    String   @unique   // Agora channel
  cityId         String?
  languagePair   String              // e.g. "en<>ja"
  topicNote      String?
  format         SessionFormat       // EX_30 | EX_40 | EX_60
  startedAt      DateTime @default(now())
  endedAt        DateTime?
  durationSec    Int?
  participants   SessionParticipant[]
  telemetry      SolarTelemetry?
  summaryCards   SummaryCard[]
}
enum SessionFormat { EX_30 EX_40 EX_60 }   // 15/15, 20/20, 30/30 per-speaker
 
model SessionParticipant {
  sessionId String
  userId    String
  role      String   // speakerA | speakerB
  session   Session  @relation(fields: [sessionId], references: [id])
  user      User     @relation(fields: [userId], references: [id])
  @@id([sessionId, userId])
}
 
model SolarTelemetry {
  id              String  @id @default(cuid())
  sessionId       String  @unique
  perSpeakerSec   Int     // 900 | 1200 | 1800
  midpointFiredAt DateTime?
  nightSwitchAt   DateTime?
  stageLog        Json    // [{stage, startMs, endMs}]
  session         Session @relation(fields: [sessionId], references: [id])
}
model SummaryCard {
  id            String  @id @default(cuid())
  sessionId     String
  userId        String
  language      String
  wordsSpoken   Int
  uniqueVerbs   Int
  fluencyScore  Int      // 0-100
  fluencyDelta  Int      // vs previous session
  verbs         Json     // [{lemma, gloss, count}]
  nouns         Json     // [{lemma, gloss, count}]
  keyPhrases    Json     // [{phrase, translation}]
  aiInsight     String   // generated from user's words only
  transcriptUrl String?  // S3 key (access-controlled)
  deliveredAt   DateTime?
  createdAt     DateTime @default(now())
  session       Session  @relation(fields: [sessionId], references: [id])
  user          User     @relation(fields: [userId], references: [id])
}
 
model Deck {
  id        String   @id @default(cuid())
  ownerId   String?            // null => GLE-built deck
  title     String
  type      DeckType           // KEY_PHRASES | TOPICAL | EVERYDAY | CASUAL | TONE | BRAIN_GAME | USER
  language  String
  stacks    Stack[]
}
enum DeckType { KEY_PHRASES TOPICAL EVERYDAY CASUAL TONE BRAIN_GAME USER }
 
model Stack {
  id        String  @id @default(cuid())
  deckId    String
  sentence  String  // assembled from words
  words     Json    // [{token, pos}]
  deck      Deck    @relation(fields: [deckId], references: [id])
}
6.3 Analysis job payload (queue message)
The contract between the core service and the Analysis pipeline. Posted to the queue when a call ends.
{
  "jobId": "job_8f3a...",
  "sessionId": "ses_1a2b...",
  "userId": "usr_9c8d...",      // card is per-user
  "language": "es",
  "audioKey": "s3://gle-audio/ses_1a2b/usr_9c8d.webm",
  "priorFluency": 68,            // for delta calc
  "requestedStages": ["transcribe","nlp","summary"],
  "createdAt": "2026-06-23T10:04:00Z"
}

7. API Contracts & Integration Guide
All inter-service communication uses versioned REST/JSON over HTTPS (internal calls may use the same contracts over a private network). Every endpoint is versioned under /v1. Breaking changes ship under /v2 — never mutate an existing contract in place.
7.1 Core service endpoints (selected)
Method & path
Purpose
Returns
POST /v1/auth/register
Create account, send verification
user, token
POST /v1/auth/login
Authenticate
token
GET /v1/me
Current profile
user
PATCH /v1/me
Update profile fields
user
GET /v1/map/cities
Cities + live presence
[city]
POST /v1/match
Enter queue (city, topic)
matchRequest
GET /v1/match/:id
Poll/stream match status
match | pending
POST /v1/calls/:id/token
Issue Agora token for channel
rtcToken, channel
POST /v1/calls/:id/end
End call, enqueue analysis
session
GET /v1/sessions/:id/card
Fetch summary card
summaryCard
GET /v1/decks
List GLE + user decks
[deck]
POST /v1/decks
Create user deck
deck
POST /v1/decks/:id/stacks
Add a stack to a deck
stack

7.2 Analysis pipeline contract
The pipeline is a standalone service. The core app talks to it only through these endpoints; internally it chains the three stages, each itself a swappable sub-service.
POST /v1/analysis/jobs        // body = analysis job payload (§6.3)
  -> 202 { jobId, status: "queued" }
 
GET  /v1/analysis/jobs/:id
  -> 200 { jobId, status: "queued|running|done|failed", cardId? }
 
// Stage sub-contracts (internal, individually swappable):
POST /v1/transcribe   { audioKey, language } -> { transcript, segments[] }
POST /v1/nlp          { transcript, language } -> { nouns[], verbs[], phrases[] }
POST /v1/summary      { nlp, priorFluency }    -> { card fields, aiInsight }
Design rule: each stage takes the previous stage’s typed output and produces the next stage’s typed input. Because the boundaries are explicit, a vendor swap (Section 11) is a configuration change, not a refactor.
7.3 Standard conventions
Auth: short-lived JWT access tokens; refresh tokens rotated. Agora RTC tokens are minted per-call, scoped to one channel, and short-lived.
Errors: RFC-style problem JSON { code, message, details }. Never leak internals or PII in error bodies.
Idempotency: POST /analysis/jobs and email sends accept an idempotency key to make retries safe.
Pagination: cursor-based for lists (decks, sessions, cities).

8. Solar Session System (Implementation)
The Solar Session System wraps every exchange in a 4-stage ambient arc governing screen gradient and ambient audio, ending in a Night Switch. It runs entirely client-side on the Web Audio API and is architecturally isolated from Agora’s RTC layer. Solar oscillators connect only to AudioContext.destination — never to the RTCPeerConnection sender track.
8.1 Session model
Each exchange has two speakers. Each speaker runs an independent, identical solar session; the arc resets fully between speakers. Always code against the per-speaker duration — total exchange time is irrelevant to timer logic.
Exchange format
Per-speaker session
30 min (15/15)
15 minutes (900 s)
40 min (20/20)
20 minutes (1200 s)
60 min (30/30)
30 minutes (1800 s)

8.2 Stage timing
Every per-speaker session has exactly 4 stages. Stages 1–3 are percentage-based; Stage 4 is always a hardcoded 120 seconds at the end.
Stage
% of session
15 min
20 min
30 min
1 · Dawn
0–25%
0:00–3:45
0:00–5:00
0:00–7:30
2 · Noon
25–50%
3:45–7:30
5:00–10:00
7:30–15:00
3 · Dusk
50% → T−2:00
7:30–13:00
10:00–18:00
15:00–28:00
4 · Sunset
final 120 s
13:00–15:00
18:00–20:00
28:00–30:00

8.3 Stage specifications
Stage
Gradient
Audio
UX intent
1 · Dawn
Deep slate / midnight blue → soft violet / pale blue, expanding from center
Sub-bass sine 80–120 Hz at −40 dB (below 100 Hz)
Calm entry; lowers anxiety, grounds the user
2 · Noon
Cool blues → warm amber / cream; steady center pulse
ABSOLUTE SILENCE — zero output, no threads, no buffers
Peak cognitive energy; maximum clarity
3 · Dusk
Amber → ochre → burnt orange → terracotta
Silence except one midpoint trigger (~150 Hz, 3 s)
Signals peak passed; steer toward resolution
4 · Sunset
Rich violet / crimson → dims to near-black over 120 s
High-pass filter at 5 kHz+; modulate brightness only, gain constant
Peripheral hourglass; time running out

8.4 Critical implementation rules
Master clock: use AudioContext.currentTime, not Date.now() or setTimeout alone, for millisecond-accurate T=0 firing.
Stage 2 is the most error-prone: call oscillator.stop() and disconnect() all nodes — any sound during Noon is a bug.
Midpoint trigger is one-shot: fires once at stage3Start + stage3Duration/2; never loop. Return to silence afterward.
All audio stays out of the voice band: sub-100 Hz (Dawn) or above 5 kHz (Sunset).
Stage 4 modulates HPF brightness only (sweep 5000→12000 Hz); gain stays constant throughout.
Isolation: oscillators connect to AudioContext.destination ONLY. Set Agora audio scenario to GAME_STREAMING before joining (Section 9) to disable aggressive AEC that could interact with the tones.
8.5 Reference: timer skeleton (TypeScript)
export class SolarSessionTimer {
  private ctx = new AudioContext();
  private t0 = 0;             // ctx.currentTime at start
  constructor(private perSpeakerSec: number,
              private onStage: (s: 1|2|3|4) => void,
              private onMidpoint: () => void,
              private onNightSwitch: () => void) {}
 
  start() {
    this.t0 = this.ctx.currentTime;
    const D = this.perSpeakerSec;
    const s2 = D * 0.25, s3 = D * 0.50, s4 = D - 120;
    const mid = s3 + (s4 - s3) / 2;   // dynamic midpoint
    this.at(0,   () => this.onStage(1)); // Dawn  (sub-bass)
    this.at(s2,  () => this.onStage(2)); // Noon  (kill all audio)
    this.at(s3,  () => this.onStage(3)); // Dusk  (silence)
    this.at(mid, () => this.onMidpoint());
    this.at(s4,  () => this.onStage(4)); // Sunset (HPF sweep)
    this.at(D,   () => this.onNightSwitch()); // T=0 -> restart
  }
  // schedule against the audio clock for sample-accurate firing
  private at(sec: number, fn: () => void) {
    const target = this.t0 + sec;
    const tick = () => (this.ctx.currentTime >= target)
      ? fn() : requestAnimationFrame(tick);
    tick();
  }
}
8.6 Agora + Solar compatibility
The Solar layer is confirmed non-conflicting with Agora because every Solar frequency sits outside Agora’s voice-processing band and the oscillators never touch the RTC sender.
Solar requirement
Agora impact
Verdict
Sub-bass 80–120 Hz (Dawn)
Below Agora AEC range (300–3400 Hz)
No conflict
Absolute silence (Noon)
Call continues normally
No conflict
150 Hz midpoint tone (Dusk)
Below AEC range
No conflict
HPF 5 kHz+ (Sunset)
Above voice range
No conflict
T=0 Night Switch precision
Independent AudioContext clock
No conflict
Per-speaker reset
New timer instance; call stays live
No conflict


9. Real-Time Calling & Low-Latency Design
The calling engine is the heart of the product: two humans, anywhere, talking in real time with sub-200 ms latency and no dropouts. We use Agora.io because it provides a purpose-built global low-latency audio network, removing the need to operate our own TURN/SFU fleet.
9.1 Why Agora over raw WebRTC
Global edge network with regional routing — low latency without us building infrastructure in every region.
Built-in adaptive bitrate, forward error correction, and jitter buffering for weak connections (e.g., 4G).
Token-based channel security and a clean SDK for mute / leave / scenario configuration.
Raw WebRTC remains a fallback option, but it would require us to run signaling, STUN/TURN, and an SFU — out of scope for V1.
9.2 Call lifecycle
Core service mints a short-lived RTC token scoped to the session’s channel.
Both clients join the Agora channel with that token.
Audio profile and scenario are configured for fidelity + Solar compatibility (below).
Tandem timer starts; Solar Session begins.
On end (or T=0 completion), clients leave the channel; core service writes the Session record and enqueues analysis.
9.3 Agora configuration (critical)
Set the audio profile for quality and the scenario to GAME_STREAMING. The scenario disables aggressive acoustic-echo-cancellation processing that could otherwise interact with the Solar ambient tones. In the current SDK these are two calls:
// Web SDK (NG) — set BEFORE joining the channel
const client = AgoraRTC.createClient({ mode: "rtc", codec: "opus" });
 
// Audio scenario: game streaming (high fidelity, relaxed AEC)
// (use the platform's scenario enum; profile = music standard)
await client.setAudioProfile?.("music_standard");
client.setAudioScenario?.(AgoraRTC.AudioScenario.GAME_STREAMING);
 
const localTrack = await AgoraRTC.createMicrophoneAudioTrack({
  AEC: false,   // Solar tones are out-of-band; avoid AEC interaction
  ANS: true,
  AGC: true,
});
await client.join(APP_ID, channelName, rtcToken, uid);
await client.publish([localTrack]);
Note: native (mobile) SDKs use setAudioProfile(MUSIC_STANDARD) + setAudioScenario(GAME_STREAMING) as separate calls. Confirm the exact enum names against the SDK version pinned in package.json before shipping.
9.4 Latency budget
Contributor
Target
Lever
Network (client→edge→client)
< 120 ms
Agora edge routing + AWS Global Accelerator for our APIs
Encode/decode (Opus)
< 40 ms
Opus low-delay profile
Jitter buffer
adaptive
Agora adaptive buffering
App/signal overhead
< 40 ms
Pre-mint tokens; no blocking calls on join path

Pre-mint and cache the RTC token before the user taps “join” so token issuance is off the critical path.
Keep the join path free of synchronous DB writes; persist the Session record asynchronously.

10. AWS Deployment for Low Latency
AWS is chosen for global coverage and proven real-time reliability. The deployment goal is twofold: keep the user-facing API and matching paths fast worldwide, and keep the CPU-heavy analysis pipeline isolated so it never competes with live traffic. Agora carries the audio media; AWS carries everything else.
10.1 Topology
Concern
AWS service
Why
Global entry / routing
AWS Global Accelerator
Anycast IPs route users to the nearest healthy Region; lower latency & jitter for our APIs
Edge caching / TLS
CloudFront + ACM
Cache static Next.js assets near users; terminate TLS at the edge
Core API compute
ECS Fargate (or EC2) behind ALB
Stateless NestJS scales horizontally; no servers to patch
Relational data
RDS PostgreSQL (Multi-AZ)
Durable system of record; read replicas for scale
Cache / presence / queue
ElastiCache (Redis) + SQS
Presence, matching queue, and analysis job queue
Object storage
S3
Audio blobs + transcripts (lifecycle-expired)
Analysis workers
Separate ECS service / GPU EC2 (ASG)
Whisper/spaCy run isolated; scale on queue depth
AI summary
Claude API (egress)
Managed; called from analysis workers only
Email
Resend / SendGrid (egress)
Transactional delivery
Observability
CloudWatch + X-Ray
Metrics, logs, tracing across services

10.2 Multi-region & latency strategy
Global Accelerator in front of regional ALBs. Users hit anycast IPs and are routed to the closest healthy Region, improving real-time client experience and giving fast failover.
Deploy the core API in 2+ Regions aligned to your largest user geographies; keep each Region’s stack stateless so it can serve any user.
Audio path stays on Agora. AWS Global Accelerator accelerates our control/API traffic; the voice media itself rides Agora’s network, so we don’t need MediaConnect or our own TURN fleet for V1.
Keep S3 + analysis workers in the Region where the data lands to avoid cross-region transfer on heavy audio jobs.
10.3 Deployment topology (text diagram)
                       ┌───────────┐
        users  ────►   |  Global  |  (anycast, nearest Region)
                       | Accelerator|
                       └────┬─────┘
                 ┌─────────┼─────────┐
             ┌──▼──┐  Region A   ┌──▼──┐ Region B
             | ALB |              | ALB |
             └──┬──┘              └──┬──┘
          ECS (NestJS core)    ECS (NestJS core)
             |   │  │             
        RDS◄─┘   |  └► ElastiCache (presence, match queue)
                   └► SQS ─► ECS/GPU Analysis workers
                              │        │        │
                          Whisper    spaCy    Claude API
                              └─────► S3 (audio/transcripts)
 
  Audio media (Client A ◄─► Client B) travels on Agora's network,
  NOT through AWS — control/signaling only on AWS.
10.4 Scaling & resilience
Auto-scale core API on CPU/RPS; auto-scale analysis workers on SQS queue depth (independent signals).
RDS Multi-AZ for failover; read replicas for map/presence-heavy reads.
S3 lifecycle rules expire raw audio after the retention window; keep only the derived summary card.
Health checks at Global Accelerator drain unhealthy Regions automatically.

11. Extensibility: Plugging in Speech Tools
The client’s top requirement: add third-party speech analysis (Azure Pronunciation Assessment, Speechace) later without rebuilding the core app. The architecture supports this because the analysis pipeline is a standalone service with typed stage boundaries (Sections 2.2, 7.2).
11.1 The plug-in model
Each pipeline stage is registered in config with an adapter that satisfies a stage interface. Adding a vendor = writing an adapter + adding a config entry. No change to Next.js, the calling engine, or the database contract.
// Stage adapter interface (transcription example)
interface TranscriptionAdapter {
  name: string;                       // "whisper" | "azure" | "speechace"
  transcribe(input: { audioKey: string; language: string })
    : Promise<{ transcript: string; segments: Segment[] }>;
}
 
// Pipeline config — swap or chain by editing this, nothing else
export const pipeline = {
  transcription: "whisper",            // -> swap to "azure" later
  nlp:           "spacy",
  pronunciation: null,                 // -> set "speechace" to insert a stage
  summary:       "claude",
};
11.2 Inserting a new stage (e.g., pronunciation)
Implement a PronunciationAdapter (Speechace/Azure) behind POST /v1/pronunciation.
Register it in pipeline config between nlp and summary.
Extend the SummaryCard model with optional pronunciation fields (additive, non-breaking).
The orchestrator now calls the new stage automatically; core app is untouched.
Acceptance check: Azure Pronunciation Assessment can be swapped in without touching core app code — verified by the fact that only the analysis service and config change.
11.3 Integration hygiene
Keep vendor SDKs and API keys inside the analysis service only; expose nothing vendor-specific to the client.
Version stage contracts; additive fields only on the card model.
Wrap each vendor call with timeout, retry, and a circuit breaker so one slow vendor can’t stall the queue.
Normalize every vendor’s output into the platform’s own types so the summary stage stays vendor-agnostic.

12. Security & Privacy
Transport & at-rest: HTTPS enforced site-wide; all user PII encrypted at rest (RDS + S3 SSE).
AuthN/Z: short-lived JWTs, rotated refresh tokens, server-side entitlement checks on every match and call-join. Agora tokens are per-channel and short-lived.
Privacy by design: only nativeLanguage and city are public; discovery responses must strip all private fields. Honor the field-visibility map everywhere.
Audio data: recordings live in access-controlled S3 with lifecycle expiry; transcript URLs are signed and time-limited. Make retention explicit to users.
Secrets: vendor keys (Agora, Claude, Azure, Speechace, email) in AWS Secrets Manager; never in the repo or client bundle.
Input handling: validate and sanitize all input (incl. deck/stack user content); rate-limit auth and match endpoints.
Pipeline isolation: the analysis service has no inbound public surface beyond its job API; vendor egress is allow-listed.
13. Testing & Quality Gates
Each module ships with tests; the real-time and Solar subsystems need targeted verification because they are timing-sensitive.
Area
What to verify
Auth & profile
Register/verify/login/reset; private fields never leak
Matching
Correct complementary pairing; tier gating enforced server-side
Calling
Two-party call completes; < 200 ms latency; no dropout on 4G
Solar timing
Stage transitions correct for 15/20/30 min; midpoint fires once
Solar audio
Dawn < 100 Hz; Noon truly silent (no threads); Sunset > 5 kHz, gain constant
Night Switch
Fires at exactly T=0; Dawn restarts immediately for next speaker
Pipeline
Transcription < 60 s; card has all fields; 6 languages confirmed
Extensibility
Vendor swap changes only analysis service + config
Load
50 concurrent simulated sessions pass
Cross-browser
Chrome, Safari, Firefox mobile render correctly

Solar audio is best verified with an analyzer/spectrogram assertion in an automated test, not by ear.
Use Agora’s simulation tooling (or synthetic clients) for the 50-session load target.

14. Repository, Environments & CI/CD
14.1 Suggested monorepo layout
gle/
  apps/
    web/            # Next.js client (map, call UI, decks, cards)
    api/            # NestJS core service
    analysis/       # Python FastAPI pipeline (whisper/spacy/claude)
  packages/
    solar/          # SolarSessionTimer + audio engine (TS, framework-free)
    contracts/      # shared types & OpenAPI specs (source of truth)
    db/             # Prisma schema + migrations
  infra/            # IaC (Global Accelerator, ECS, RDS, SQS, S3)
Keep packages/solar framework-agnostic so it can be embedded anywhere and unit-tested headlessly.
packages/contracts is the single source of truth for API types — generate client + server types from it.
14.2 Environments & pipeline
Environments: local → staging (live URL, updated continuously) → production.
CI runs lint, type-check, unit/integration tests, and a build on every push; CD deploys staging on merge to main.
Database changes ship as reviewed Prisma migrations; never edit production schema by hand.
Branch strategy: trunk-based with short-lived feature branches and required PR review.
14.3 Definition of done (per module)
Contract documented in packages/contracts; tests green; deployed to staging; observable (logs + metrics).
15. Glossary
Term
Meaning
Solar Session System
Client-side 4-stage ambient UX arc wrapping each exchange
Per-speaker session
Duration one speaker is active; the unit all Solar timing uses
Night Switch
T=0 event: black screen + language-switch text, then Dawn restart
Tandem timer
Evenly-timed exchange that prompts the language switch at midpoint
Deck / Stack
Study collection / a set of assembled sentences within a deck
Summary card
Post-call analysis: words, verbs, fluency, phrases, AI insight
Analysis pipeline
Standalone service: transcription → NLP → AI summary
Adapter
Vendor-specific implementation of a pipeline stage interface
SuperGO!!!
Top tier: any-language matching + membership card surface

End of document — GOLanguageExchange Developer Engineering Guide v1.0
