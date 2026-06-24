export interface Session {
  id: string;
  date: string; // ISO or formatted date
  time: string;
  duration: string;
  languagePair: {
    from: string;
    to: string;
  };
  city: string;
  countryCode: string; // For the flag
  partnerName: string;
  partnerAvatar: string;
  stats: {
    fluencyScore: number;
    fluencyDelta: number; // positive or negative
    wordsSpoken: number;
    uniqueVerbs: number;
  };
  keyPhrasesTeaser: string;
  isNew?: boolean;
}

export const MOCK_SESSIONS: Session[] = [
  {
    id: "sess_001",
    date: "Today",
    time: "2:30 PM",
    duration: "15m",
    languagePair: { from: "English", to: "Japanese" },
    city: "Tokyo",
    countryCode: "JP",
    partnerName: "Yuki H.",
    partnerAvatar: "/avatars/yuki.png",
    stats: {
      fluencyScore: 82,
      fluencyDelta: +4,
      wordsSpoken: 450,
      uniqueVerbs: 12,
    },
    keyPhrasesTeaser: "Discussed local food and the weather in Tokyo.",
    isNew: true,
  },
  {
    id: "sess_002",
    date: "Yesterday",
    time: "10:15 AM",
    duration: "20m",
    languagePair: { from: "English", to: "Spanish" },
    city: "Madrid",
    countryCode: "ES",
    partnerName: "Carlos R.",
    partnerAvatar: "/avatars/takashi.png", // Using existing avatars
    stats: {
      fluencyScore: 75,
      fluencyDelta: -1,
      wordsSpoken: 600,
      uniqueVerbs: 15,
    },
    keyPhrasesTeaser: "Talked about travel plans for the upcoming summer.",
  },
  {
    id: "sess_003",
    date: "June 20, 2026",
    time: "6:45 PM",
    duration: "10m",
    languagePair: { from: "English", to: "Japanese" },
    city: "Osaka",
    countryCode: "JP",
    partnerName: "Kenji S.",
    partnerAvatar: "/avatars/kenji.png",
    stats: {
      fluencyScore: 78,
      fluencyDelta: +2,
      wordsSpoken: 320,
      uniqueVerbs: 8,
    },
    keyPhrasesTeaser: "Brief conversation about favorite movies.",
  },
  {
    id: "sess_004",
    date: "June 18, 2026",
    time: "9:00 AM",
    duration: "25m",
    languagePair: { from: "English", to: "Korean" },
    city: "Seoul",
    countryCode: "KR",
    partnerName: "Ji-min P.",
    partnerAvatar: "/avatars/aoi.png",
    stats: {
      fluencyScore: 68,
      fluencyDelta: +5,
      wordsSpoken: 750,
      uniqueVerbs: 20,
    },
    keyPhrasesTeaser: "In-depth discussion on Korean grammar and pop culture.",
  },
];
