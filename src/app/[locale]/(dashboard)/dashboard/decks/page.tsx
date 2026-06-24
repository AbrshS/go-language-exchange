import { setRequestLocale } from "next-intl/server";
import { DecksPage } from "@/domains/decks/components/decks-page";

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <DecksPage />;
}
