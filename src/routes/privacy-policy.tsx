import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { LegalDocumentPage } from "@/components/legal-document-page";
import { useT } from "@/i18n/locale-context";
import { usePageMeta } from "@/i18n/use-page-meta";
import { openGraphMeta } from "@/lib/open-graph";
import { translations, DEFAULT_LOCALE } from "@/i18n/translations";

const defaultContent = translations[DEFAULT_LOCALE].privacyPolicy;

export const Route = createFileRoute("/privacy-policy")({
  head: ({ match }) => ({
    meta: openGraphMeta({
      title: defaultContent.metaTitle,
      description: defaultContent.metaDescription,
      pathname: match.pathname,
    }),
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  const t = useT();
  usePageMeta(t.privacyPolicy.metaTitle, t.privacyPolicy.metaDescription);

  return (
    <SiteLayout>
      <LegalDocumentPage content={t.privacyPolicy} />
    </SiteLayout>
  );
}
