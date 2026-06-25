import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { ctaClass } from "@/components/cta-button";
import { BrandShape } from "@/components/brand-shape";
import { useT } from "@/i18n/locale-context";
import { usePageMeta } from "@/i18n/use-page-meta";
import { openGraphMeta } from "@/lib/open-graph";
import { translations, DEFAULT_LOCALE } from "@/i18n/translations";
import { whatsappUrl } from "@/lib/whatsapp";

const defaultHow = translations[DEFAULT_LOCALE].howItWorks;

export const Route = createFileRoute("/how-it-works")({
  head: ({ match }) => ({
    meta: openGraphMeta({
      title: defaultHow.metaTitle,
      description: defaultHow.metaDescription,
      pathname: match.pathname,
    }),
  }),
  component: HowItWorks,
});

function HowItWorks() {
  const t = useT();
  usePageMeta(t.howItWorks.metaTitle, t.howItWorks.metaDescription);
  const whatsappHref = whatsappUrl(t.whatsapp.general);

  return (
    <SiteLayout>
      <section className="bg-lavender px-5 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-6 inline-flex items-center gap-2 text-coral">
            {t.howItWorks.eyebrow}{" "}
            <BrandShape variant="coral" className="h-3.5 w-3.5" />
          </p>
          <h1 className="font-display text-6xl leading-[0.9] md:text-[7rem]">
            {t.howItWorks.title1}
            <span className="block text-coral">{t.howItWorks.title2}</span>
          </h1>
        </div>
      </section>

      <section className="border-t border-border">
        {t.howItWorks.steps.map((s, i) => (
          <div
            key={s.n}
            className={`grid grid-cols-1 gap-6 px-5 py-16 md:grid-cols-12 md:gap-10 md:px-10 md:py-24 ${
              i < t.howItWorks.steps.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <p className="font-display text-5xl text-coral md:col-span-2 md:text-6xl">
              {s.n}
            </p>
            <h2 className="font-display text-3xl leading-tight md:col-span-5 md:text-5xl">
              {s.title}
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground md:col-span-5">
              {s.description}
            </p>
          </div>
        ))}
      </section>

      <section className="border-t border-border bg-coral px-5 py-24 text-center text-background md:py-32">
        <h2 className="mx-auto max-w-3xl font-display text-5xl leading-[0.92] md:text-7xl">
          {t.howItWorks.ctaTitle1}{" "}
          <span className="block text-peach">{t.howItWorks.ctaTitle2}</span>
        </h2>
        <div className="mt-12 flex flex-col items-center justify-center gap-5 md:flex-row md:gap-6">
          <Link to="/collection" className={ctaClass({ variant: "on-coral" })}>
            {t.cta.browseCollectionArrow}
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className={ctaClass({ variant: "on-coral-outline" })}
          >
            {t.cta.reserveWhatsApp}
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
