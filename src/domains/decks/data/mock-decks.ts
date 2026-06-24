export type DeckType = "KEY_PHRASES" | "TOPICAL" | "EVERYDAY" | "CASUAL" | "TONE" | "BRAIN_GAME" | "USER";

export interface StackWord {
  token: string;
  pos: string; // Part of speech, e.g., 'noun', 'verb'
}

export interface Stack {
  id: string;
  sentence: string;
  translation: string;
  words: StackWord[];
}

export interface Deck {
  id: string;
  ownerId: string | null; // null => GLE-built
  title: string;
  description: string;
  type: DeckType;
  language: string; // e.g., 'es', 'ja'
  stacks: Stack[];
  cardCount: number;
}

export const MOCK_DECKS: Deck[] = [
  {
    id: "d_gle_001",
    ownerId: null,
    title: "Essential Greetings",
    description: "The foundations of any conversation.",
    type: "EVERYDAY",
    language: "es",
    cardCount: 24,
    stacks: [
      {
        id: "s_001",
        sentence: "¡Hola! ¿Cómo estás?",
        translation: "Hello! How are you?",
        words: [
          { token: "Hola", pos: "interjection" },
          { token: "Cómo", pos: "adverb" },
          { token: "estás", pos: "verb" },
        ],
      },
      {
        id: "s_002",
        sentence: "Mucho gusto.",
        translation: "Nice to meet you.",
        words: [
          { token: "Mucho", pos: "adjective" },
          { token: "gusto", pos: "noun" },
        ],
      },
    ],
  },
  {
    id: "d_gle_002",
    ownerId: null,
    title: "Business Casual",
    description: "Navigate professional settings with ease.",
    type: "CASUAL",
    language: "ja",
    cardCount: 45,
    stacks: [
      {
        id: "s_003",
        sentence: "よろしくお願いします。",
        translation: "I look forward to working with you.",
        words: [
          { token: "よろしく", pos: "adverb" },
          { token: "お願い", pos: "noun" },
          { token: "します", pos: "verb" },
        ],
      },
    ],
  },
  {
    id: "d_gle_003",
    ownerId: null,
    title: "Tone & Pronunciation",
    description: "Master tricky accents and inflections.",
    type: "TONE",
    language: "fr",
    cardCount: 15,
    stacks: [],
  },
  {
    id: "d_user_101",
    ownerId: "usr_9c8d",
    title: "Travel Phrases - Tokyo Trip",
    description: "Words I learned for my upcoming trip.",
    type: "USER",
    language: "ja",
    cardCount: 12,
    stacks: [
      {
        id: "s_101",
        sentence: "駅はどこですか？",
        translation: "Where is the station?",
        words: [
          { token: "駅", pos: "noun" },
          { token: "は", pos: "particle" },
          { token: "どこ", pos: "pronoun" },
          { token: "ですか", pos: "copula" },
        ],
      },
    ],
  },
  {
    id: "d_user_102",
    ownerId: "usr_9c8d",
    title: "Mistakes from Sessions",
    description: "Sentences I stumbled on recently.",
    type: "USER",
    language: "es",
    cardCount: 8,
    stacks: [],
  },
];
