export interface City {
  id: string;
  name: string;
  country: string;
  /** native language available at this city node */
  language: string;
  langCode: string;
  /** x% from left of the SVG viewBox (0–100) */
  x: number;
  /** y% from top of the SVG viewBox (0–100) */
  y: number;
  /** partners currently online — 0 means dim */
  partners: number;
}

/** Dummy data — replace with live API response */
export const CITIES: City[] = [
  // English
  { id: "nyc",    name: "New York",     country: "US", language: "English",  langCode: "en", x: 26,   y: 36,   partners: 4 },
  { id: "lon",    name: "London",       country: "GB", language: "English",  langCode: "en", x: 47.5, y: 25,   partners: 7 },
  { id: "syd",    name: "Sydney",       country: "AU", language: "English",  langCode: "en", x: 85,   y: 74,   partners: 2 },
  { id: "tor",    name: "Toronto",      country: "CA", language: "English",  langCode: "en", x: 24,   y: 30,   partners: 3 },
  { id: "lag",    name: "Lagos",        country: "NG", language: "English",  langCode: "en", x: 49,   y: 53,   partners: 0 },
  // Spanish
  { id: "mad",    name: "Madrid",       country: "ES", language: "Spanish",  langCode: "es", x: 46,   y: 31,   partners: 5 },
  { id: "mex",    name: "Mexico City",  country: "MX", language: "Spanish",  langCode: "es", x: 20,   y: 44,   partners: 3 },
  { id: "bog",    name: "Bogotá",       country: "CO", language: "Spanish",  langCode: "es", x: 24,   y: 54,   partners: 1 },
  { id: "bue",    name: "Buenos Aires", country: "AR", language: "Spanish",  langCode: "es", x: 28,   y: 76,   partners: 0 },
  // Japanese
  { id: "tok",    name: "Tokyo",        country: "JP", language: "Japanese", langCode: "ja", x: 83,   y: 34,   partners: 6 },
  { id: "osa",    name: "Osaka",        country: "JP", language: "Japanese", langCode: "ja", x: 82,   y: 36,   partners: 2 },
  // Arabic
  { id: "dub",    name: "Dubai",        country: "AE", language: "Arabic",   langCode: "ar", x: 63,   y: 42,   partners: 4 },
  { id: "cai",    name: "Cairo",        country: "EG", language: "Arabic",   langCode: "ar", x: 56,   y: 40,   partners: 2 },
  { id: "riy",    name: "Riyadh",       country: "SA", language: "Arabic",   langCode: "ar", x: 61,   y: 43,   partners: 0 },
  // Hindi
  { id: "mum",    name: "Mumbai",       country: "IN", language: "Hindi",    langCode: "hi", x: 67,   y: 45,   partners: 5 },
  { id: "del",    name: "Delhi",        country: "IN", language: "Hindi",    langCode: "hi", x: 68,   y: 38,   partners: 3 },
  // Korean
  { id: "seo",    name: "Seoul",        country: "KR", language: "Korean",   langCode: "ko", x: 81,   y: 33,   partners: 4 },
  { id: "bus",    name: "Busan",        country: "KR", language: "Korean",   langCode: "ko", x: 82,   y: 35,   partners: 0 },
  // French
  { id: "par",    name: "Paris",        country: "FR", language: "French",   langCode: "fr", x: 48,   y: 27,   partners: 3 },
  { id: "dak",    name: "Dakar",        country: "SN", language: "French",   langCode: "fr", x: 40,   y: 50,   partners: 0 },
  // Portuguese
  { id: "lis",    name: "Lisbon",       country: "PT", language: "Portuguese", langCode: "pt", x: 44, y: 32,   partners: 1 },
  { id: "sao",    name: "São Paulo",    country: "BR", language: "Portuguese", langCode: "pt", x: 30, y: 67,   partners: 2 },
  // Mandarin
  { id: "sha",    name: "Shanghai",     country: "CN", language: "Mandarin", langCode: "zh", x: 80,   y: 36,   partners: 8 },
  { id: "bei",    name: "Beijing",      country: "CN", language: "Mandarin", langCode: "zh", x: 79,   y: 31,   partners: 5 },
  // More cities — dim placeholders
  { id: "nai",    name: "Nairobi",      country: "KE", language: "English",  langCode: "en", x: 58,   y: 57,   partners: 0 },
  { id: "ban",    name: "Bangkok",      country: "TH", language: "Thai",     langCode: "th", x: 76,   y: 48,   partners: 0 },
  { id: "ist",    name: "Istanbul",     country: "TR", language: "Turkish",  langCode: "tr", x: 56,   y: 30,   partners: 0 },
  { id: "sin",    name: "Singapore",    country: "SG", language: "English",  langCode: "en", x: 77,   y: 56,   partners: 2 },
  { id: "joh",    name: "Johannesburg", country: "ZA", language: "English",  langCode: "en", x: 56,   y: 70,   partners: 0 },
  { id: "chi",    name: "Chicago",      country: "US", language: "English",  langCode: "en", x: 23,   y: 33,   partners: 1 },
  { id: "lax",    name: "Los Angeles",  country: "US", language: "English",  langCode: "en", x: 16,   y: 37,   partners: 2 },
];
