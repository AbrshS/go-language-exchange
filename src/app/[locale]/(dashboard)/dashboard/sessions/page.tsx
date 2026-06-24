import { setRequestLocale } from "next-intl/server";
import { SessionsPage } from "@/domains/session/components/sessions-page";

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <SessionsPage />;
}
