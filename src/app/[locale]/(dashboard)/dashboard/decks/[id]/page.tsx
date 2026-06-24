import { setRequestLocale } from "next-intl/server";
import { StudyPathScreen } from "@/domains/decks/components/study-path-screen";
import { MOCK_DECKS } from "@/domains/decks/data/mock-decks";
import { notFound } from "next/navigation";

export default async function DeckStudyPathPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const id = resolvedParams.id;
  
  setRequestLocale(locale);

  const deck = MOCK_DECKS.find(d => d.id === id);
  if (!deck) {
    notFound();
  }

  return <StudyPathScreen deck={deck} />;
}
