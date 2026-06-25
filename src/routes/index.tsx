import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Wordmark } from "@/components/wordmark";
import { BrandShape } from "@/components/brand-shape";
import { ctaClass } from "@/components/cta-button";
import { UnderlineLink } from "@/components/underline-link";
import { DRESSES } from "@/lib/dresses";
import { localizedDress } from "@/i18n/dress";
import { useT } from "@/i18n/locale-context";
import { usePageMeta } from "@/i18n/use-page-meta";
import { translations, DEFAULT_LOCALE } from "@/i18n/translations";
import { whatsappUrl } from "@/lib/whatsapp";
import heroImg from "@/assets/hero.jpg";
import editorial1 from "@/assets/editorial-1.jpg";
import editorial2 from "@/assets/editorial-2.jpg";

const defaultHome = translations[DEFAULT_LOCALE].home;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: defaultHome.metaTitle },
      { name: "description", content: defaultHome.metaDescription },
      { property: "og:title", content: defaultHome.metaTitle },
      { property: "og:description", content: defaultHome.metaDescription },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const t = useT();
  usePageMeta(t.home.metaTitle, t.home.metaDescription);

  const featured = DRESSES.slice(0, 4).map((dress) => localizedDress(dress, t));
  const whatsappHref = whatsappUrl(t.whatsapp.general);

  return (
    <SiteLayout>
      <section className="bg-background">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="order-2 flex min-w-0 flex-col justify-center bg-lavender px-5 py-14 md:order-1 md:px-8 md:py-16 lg:px-10 lg:py-20 xl:px-14">
            <h1 className="max-w-full font-display text-[3.4rem] leading-[0.9] text-foreground md:text-[3.25rem] lg:text-[4.5rem] xl:text-[6.4rem]">
              {t.home.heroLine1}
              <br />
              {t.home.heroLine2}
              <br />
              <span className="text-coral">{t.home.heroLine3}</span>
              <br />
              <span className="text-coral">{t.home.heroLine4}</span>
            </h1>
            <p className="mt-10 max-w-md text-base leading-relaxed text-foreground/75">
              {t.home.heroBody}
            </p>

            <div className="mt-10 flex w-full max-w-md flex-col gap-3 md:gap-4 xl:flex-row xl:gap-5">
              <Link
                to="/collection"
                className={ctaClass({
                  variant: "primary",
                  className: "w-full xl:flex-1",
                })}
              >
                {t.cta.browseCollectionArrow}
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className={ctaClass({
                  variant: "outline",
                  className: "w-full bg-lavender xl:flex-1",
                })}
              >
                {t.cta.reserveOnWhatsApp}
              </a>
            </div>
          </div>

          <div className="relative order-1 h-[68vh] md:order-2 md:h-auto md:min-h-0">
            <img
              src={heroImg}
              alt={t.home.heroImageAlt}
              width={1280}
              height={1600}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mb-12 flex items-end justify-between md:mb-16">
          <div>
            <p className="eyebrow mb-4 inline-flex items-center gap-2 text-coral">
              {t.home.favouritesEyebrow}{" "}
              <BrandShape variant="coral" className="h-3.5 w-3.5" />
            </p>
            <h2 className="font-display text-5xl md:text-7xl">{t.home.favouritesTitle}</h2>
          </div>
          <UnderlineLink to="/collection" className="hidden md:block">
            {t.cta.viewAll}
          </UnderlineLink>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-4 md:gap-x-6 md:gap-y-16">
          {featured.map((dress, i) => (
            <Link
              key={dress.slug}
              to="/dress/$slug"
              params={{ slug: dress.slug }}
              className="group block"
            >
              <div
                className={`overflow-hidden ${i % 2 === 0 ? "bg-lavender" : "bg-bone"}`}
              >
                <img
                  src={dress.image}
                  alt={dress.name}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-2">
                <div>
                  <p className="font-display text-base tracking-tight md:text-lg">
                    {dress.name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{dress.designer}</p>
                </div>
                <p className="text-xs font-medium text-coral">€{dress.price}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <UnderlineLink to="/collection" className="text-coral">
            {t.cta.viewFullCollection}
          </UnderlineLink>
        </div>
      </section>

      <section className="border-t border-border bg-lavender px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow mb-4 text-foreground/60">{t.home.howEyebrow}</p>
              <h2 className="max-w-3xl font-display text-5xl leading-[0.92] md:text-7xl">
                {t.home.howTitle1}
                <br />
                <span className="text-coral">{t.home.howTitle2}</span>
              </h2>
            </div>
            <BrandShape variant="coral" className="hidden h-14 w-14 md:block" />
          </div>

          <ol className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
            {t.home.steps.map((s) => (
              <li key={s.n} className="border-t-2 border-foreground pt-5">
                <p className="font-display text-4xl text-coral">{s.n}</p>
                <p className="mt-6 font-display text-2xl">{s.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  {s.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-5">
        <div className="relative order-1 h-[70vh] md:order-1 md:col-span-2 md:h-auto md:min-h-0">
          <img
            src={editorial1}
            alt={t.home.editorialImageAlt}
            width={1600}
            height={1024}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="order-2 flex flex-col justify-center bg-bone px-5 py-16 md:col-span-3 md:px-12 md:py-20">
          <p className="eyebrow mb-5 inline-flex items-center gap-2 text-coral">
            {t.home.whyRentEyebrow} <BrandShape variant="coral" className="h-3.5 w-3.5" />
          </p>
          <h2 className="font-display text-4xl leading-[0.95] md:text-6xl">
            {t.home.whyRentTitle}
          </h2>
          <ul className="mt-10 space-y-5 text-[15px] leading-relaxed text-foreground">
            {t.home.whyRentItems.map((item, i) => (
              <li key={item} className="flex gap-4 border-t border-foreground/30 pt-5">
                <span className="font-display text-coral">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="order-2 flex flex-col justify-center bg-lavender px-5 py-16 md:order-1 md:px-12 md:py-20">
          <p className="eyebrow mb-5 text-foreground/60">{t.home.aboutEyebrow}</p>
          <h2 className="font-display text-4xl leading-[0.95] md:text-6xl">
            {t.home.aboutTitle1}{" "}
            <span className="text-coral">{t.home.aboutTitle2}</span>
          </h2>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-foreground/75">
            {t.home.aboutBody}
          </p>
          <Link
            to="/about"
            className={ctaClass({ variant: "primary", size: "compact", className: "mt-10 w-fit" })}
          >
            {t.cta.readStory}
          </Link>
        </div>
        <div className="relative order-1 h-[70vh] md:order-2 md:h-auto md:min-h-0">
          <img
            src={editorial2}
            alt={t.home.aboutTeaserImageAlt}
            width={1024}
            height={1280}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="eyebrow mb-4 inline-flex items-center gap-2 text-coral">
                {t.home.faqEyebrow}{" "}
                <BrandShape variant="coral" className="h-3.5 w-3.5" />
              </p>
              <h2 className="font-display text-5xl md:text-7xl">{t.home.faqTitle}</h2>
            </div>
            <UnderlineLink to="/faq" className="hidden md:block">
              {t.cta.allAnswers}
            </UnderlineLink>
          </div>

          <dl className="divide-y divide-foreground/20 border-y border-foreground/20">
            {t.home.faqPreview.map((item) => (
              <div key={item.q} className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12">
                <dt className="font-display text-2xl tracking-tight md:col-span-5 md:text-3xl">
                  {item.q}
                </dt>
                <dd className="text-[15px] leading-relaxed text-muted-foreground md:col-span-7">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 md:hidden">
            <UnderlineLink to="/faq" className="text-coral">
              {t.cta.seeAllQuestions}
            </UnderlineLink>
          </div>
        </div>
      </section>

      <section className="bg-coral px-5 py-24 text-background md:px-10 md:py-36">
        <div className="mx-auto max-w-5xl text-center">
          <Wordmark variant="light" className="mx-auto h-[clamp(3.5rem,12vw,7.5rem)] w-auto" />
          <h2 className="mt-10 font-display text-5xl leading-[0.9] md:text-8xl">
            {t.home.finalTitle1}
            <span className="block text-peach">{t.home.finalTitle2}</span>
          </h2>
          <p className="mx-auto mt-10 max-w-lg text-[15px] leading-relaxed text-background/85">
            {t.home.finalBody}
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className={ctaClass({ variant: "on-coral", size: "wide", className: "mt-12" })}
          >
            {t.nav.reserveWhatsApp}
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
