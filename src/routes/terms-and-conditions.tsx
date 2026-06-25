import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { LegalDocumentPage } from "@/components/legal-document-page";
import { useT } from "@/i18n/locale-context";
import { usePageMeta } from "@/i18n/use-page-meta";
import { translations, DEFAULT_LOCALE } from "@/i18n/translations";

const defaultContent = translations[DEFAULT_LOCALE].termsAndConditions;

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: defaultContent.metaTitle },
      { name: "description", content: defaultContent.metaDescription },
      { property: "og:title", content: defaultContent.metaTitle },
      { property: "og:description", content: defaultContent.metaDescription },
    ],
  }),
  component: TermsAndConditionsPage,
});

function TermsAndConditionsPage() {
  const t = useT();
  usePageMeta(t.termsAndConditions.metaTitle, t.termsAndConditions.metaDescription);

  return (
    <SiteLayout>
      <LegalDocumentPage content={t.termsAndConditions} />
    </SiteLayout>
  );
}
