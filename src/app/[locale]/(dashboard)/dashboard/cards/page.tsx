import { setRequestLocale } from "next-intl/server";
import { SummaryCardsPage } from "@/domains/session/components/summary-cards-page";

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <SummaryCardsPage />;
}
