import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { ctaClass } from "@/components/cta-button";
import { BrandShape } from "@/components/brand-shape";
import { useT } from "@/i18n/locale-context";
import { usePageMeta } from "@/i18n/use-page-meta";
import { openGraphMeta } from "@/lib/open-graph";
import { translations, DEFAULT_LOCALE } from "@/i18n/translations";
import { whatsappUrl } from "@/lib/whatsapp";
import aboutImg from "@/assets/about.jpg";

const defaultAbout = translations[DEFAULT_LOCALE].about;

export const Route = createFileRoute("/about")({
  head: ({ match }) => ({
    meta: openGraphMeta({
      title: defaultAbout.metaTitle,
      description: defaultAbout.metaDescription,
      pathname: match.pathname,
    }),
  }),
  component: AboutPage,
});

function AboutPage() {
  const t = useT();
  usePageMeta(t.about.metaTitle, t.about.metaDescription);
  const whatsappHref = whatsappUrl(t.whatsapp.general);

  return (
    <SiteLayout>
      <section className="bg-lavender px-5 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-6 inline-flex items-center gap-2 text-coral">
            {t.about.eyebrow} <BrandShape variant="coral" className="h-3.5 w-3.5" />
          </p>
          <h1 className="font-display text-6xl leading-[0.9] md:text-[7rem]">
            {t.about.title1}
            <span className="block text-coral">{t.about.title2}</span>
          </h1>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-7">
          <img
            src={aboutImg}
            alt={t.about.imageAlt}
            width={1024}
            height={1280}
            className="h-[80vh] w-full object-cover md:h-screen"
          />
        </div>
        <div className="flex flex-col justify-center gap-8 px-5 py-16 md:col-span-5 md:px-12 md:py-24">
          <p className="font-display text-2xl leading-snug md:text-3xl">{t.about.lead}</p>
          <p className="text-[15px] leading-relaxed text-muted-foreground">{t.about.body1}</p>
          <p className="text-[15px] leading-relaxed text-muted-foreground">{t.about.body2}</p>
        </div>
      </section>

      <section className="border-t border-border px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
            {t.about.values.map((v) => (
              <div key={v.title} className="border-t-2 border-coral pt-6">
                <h3 className="font-display text-3xl md:text-4xl">{v.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-coral px-5 py-24 text-center text-background md:py-32">
        <p className="eyebrow mb-6 inline-flex items-center justify-center gap-2 text-peach">
          {t.about.ctaEyebrow} <BrandShape variant="light" className="h-3.5 w-3.5" />
        </p>
        <h2 className="mx-auto max-w-3xl font-display text-5xl leading-[0.92] md:text-7xl">
          {t.about.ctaTitle1}{" "}
          <span className="block text-peach">{t.about.ctaTitle2}</span>
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
