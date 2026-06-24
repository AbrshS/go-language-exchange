export interface CountryData {
  iso: string;       /* ISO 3166-1 alpha-2 */
  country: string;
  language: string;
  langCode: string;
  partners: number;
  city: string;      /* representative city shown in sheet */
  coordinates: [number, number]; /* [longitude, latitude] */
}

export const COUNTRY_DATA: CountryData[] = [
  { iso: "US", country: "United States",  language: "English",    langCode: "en", partners: 7,  city: "New York",      coordinates: [-74.0060, 40.7128] },
  { iso: "GB", country: "United Kingdom", language: "English",    langCode: "en", partners: 5,  city: "London",        coordinates: [-0.1276, 51.5074] },
  { iso: "CA", country: "Canada",         language: "English",    langCode: "en", partners: 3,  city: "Toronto",       coordinates: [-79.3832, 43.6532] },
  { iso: "AU", country: "Australia",      language: "English",    langCode: "en", partners: 2,  city: "Sydney",        coordinates: [151.2093, -33.8688] },
  { iso: "SG", country: "Singapore",      language: "English",    langCode: "en", partners: 2,  city: "Singapore",     coordinates: [103.8198, 1.3521] },
  { iso: "NG", country: "Nigeria",        language: "English",    langCode: "en", partners: 1,  city: "Lagos",         coordinates: [3.3792, 6.5244] },
  { iso: "ZA", country: "South Africa",   language: "English",    langCode: "en", partners: 1,  city: "Johannesburg",  coordinates: [28.0473, -26.2041] },
  { iso: "ES", country: "Spain",          language: "Spanish",    langCode: "es", partners: 5,  city: "Madrid",        coordinates: [-3.7038, 40.4168] },
  { iso: "MX", country: "Mexico",         language: "Spanish",    langCode: "es", partners: 4,  city: "Mexico City",   coordinates: [-99.1332, 19.4326] },
  { iso: "CO", country: "Colombia",       language: "Spanish",    langCode: "es", partners: 2,  city: "Bogotá",        coordinates: [-74.0721, 4.7110] },
  { iso: "AR", country: "Argentina",      language: "Spanish",    langCode: "es", partners: 1,  city: "Buenos Aires",  coordinates: [-58.3816, -34.6037] },
  { iso: "JP", country: "Japan",          language: "Japanese",   langCode: "ja", partners: 8,  city: "Tokyo",         coordinates: [139.6917, 35.6895] },
  { iso: "AE", country: "UAE",            language: "Arabic",     langCode: "ar", partners: 4,  city: "Dubai",         coordinates: [55.2708, 25.2048] },
  { iso: "SA", country: "Saudi Arabia",   language: "Arabic",     langCode: "ar", partners: 2,  city: "Riyadh",        coordinates: [46.7167, 24.7136] },
  { iso: "EG", country: "Egypt",          language: "Arabic",     langCode: "ar", partners: 2,  city: "Cairo",         coordinates: [31.2357, 30.0444] },
  { iso: "IN", country: "India",          language: "Hindi",      langCode: "hi", partners: 6,  city: "Mumbai",        coordinates: [72.8777, 19.0760] },
  { iso: "KR", country: "South Korea",    language: "Korean",     langCode: "ko", partners: 5,  city: "Seoul",         coordinates: [126.9780, 37.5665] },
  { iso: "FR", country: "France",         language: "French",     langCode: "fr", partners: 4,  city: "Paris",         coordinates: [2.3522, 48.8566] },
  { iso: "SN", country: "Senegal",        language: "French",     langCode: "fr", partners: 1,  city: "Dakar",         coordinates: [-17.4399, 14.6928] },
  { iso: "PT", country: "Portugal",       language: "Portuguese", langCode: "pt", partners: 2,  city: "Lisbon",        coordinates: [-9.1393, 38.7223] },
  { iso: "BR", country: "Brazil",         language: "Portuguese", langCode: "pt", partners: 3,  city: "São Paulo",     coordinates: [-46.6333, -23.5505] },
  { iso: "CN", country: "China",          language: "Mandarin",   langCode: "zh", partners: 9,  city: "Shanghai",      coordinates: [121.4737, 31.2304] },
  { iso: "TW", country: "Taiwan",         language: "Mandarin",   langCode: "zh", partners: 3,  city: "Taipei",        coordinates: [121.5654, 25.0330] },
  { iso: "DE", country: "Germany",        language: "German",     langCode: "de", partners: 3,  city: "Berlin",        coordinates: [13.4050, 52.5200] },
  { iso: "TR", country: "Turkey",         language: "Turkish",    langCode: "tr", partners: 2,  city: "Istanbul",      coordinates: [28.9784, 41.0082] },
  { iso: "TH", country: "Thailand",       language: "Thai",       langCode: "th", partners: 2,  city: "Bangkok",       coordinates: [100.5018, 13.7563] },
  { iso: "PH", country: "Philippines",    language: "Filipino",   langCode: "tl", partners: 2,  city: "Manila",        coordinates: [120.9842, 14.5995] },
  { iso: "KE", country: "Kenya",          language: "Swahili",    langCode: "sw", partners: 1,  city: "Nairobi",       coordinates: [36.8219, -1.2921] },
  { iso: "RU", country: "Russia",         language: "Russian",    langCode: "ru", partners: 0,  city: "Moscow",        coordinates: [37.6173, 55.7558] },
  { iso: "NO", country: "Norway",         language: "Norwegian",  langCode: "no", partners: 0,  city: "Oslo",          coordinates: [10.7522, 59.9139] },
  { iso: "SE", country: "Sweden",         language: "Swedish",    langCode: "sv", partners: 0,  city: "Stockholm",     coordinates: [18.0686, 59.3293] },
  { iso: "NL", country: "Netherlands",    language: "Dutch",      langCode: "nl", partners: 0,  city: "Amsterdam",     coordinates: [4.9041, 52.3676] },
  { iso: "PK", country: "Pakistan",       language: "Urdu",       langCode: "ur", partners: 0,  city: "Karachi",       coordinates: [67.0011, 24.8607] },
  { iso: "ID", country: "Indonesia",      language: "Indonesian", langCode: "id", partners: 0,  city: "Jakarta",       coordinates: [106.8456, -6.2088] },
  { iso: "VN", country: "Vietnam",        language: "Vietnamese", langCode: "vi", partners: 0,  city: "Ho Chi Minh",   coordinates: [106.6297, 10.8231] },
  { iso: "IT", country: "Italy",          language: "Italian",    langCode: "it", partners: 2,  city: "Rome",          coordinates: [12.4964, 41.9028] },
  { iso: "MA", country: "Morocco",        language: "Arabic",     langCode: "ar", partners: 1,  city: "Casablanca",    coordinates: [-7.5898, 33.5731] },
  { iso: "GH", country: "Ghana",          language: "English",    langCode: "en", partners: 1,  city: "Accra",         coordinates: [-0.1870, 5.6037] },
  { iso: "PL", country: "Poland",         language: "Polish",     langCode: "pl", partners: 0,  city: "Warsaw",        coordinates: [21.0122, 52.2297] },
  { iso: "UA", country: "Ukraine",        language: "Ukrainian",  langCode: "uk", partners: 0,  city: "Kyiv",          coordinates: [30.5234, 50.4501] },
];

/* Fast ISO2 → CountryData lookup */
export const BY_ISO: Record<string, CountryData> = Object.fromEntries(
  COUNTRY_DATA.map((c) => [c.iso.toUpperCase(), c])
);
