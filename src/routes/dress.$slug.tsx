import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { getDressesWithTranslations } from "@/lib/dresses";
import { localizeDress } from "@/i18n/dress";
import { useT, useLocale } from "@/i18n/locale-context";
import { usePageMeta } from "@/i18n/use-page-meta";
import { translations, DEFAULT_LOCALE } from "@/i18n/translations";
import { AvailabilitySection } from "@/components/availability-section";
import { ShowroomVisitModal } from "@/components/showroom-visit-modal";
import { UnderlineLink } from "@/components/underline-link";
import { openGraphMeta } from "@/lib/open-graph";
import { getReservationBlocks } from "@/lib/reservations";
import { ctaClass } from "@/components/cta-button";

export const Route = createFileRoute("/dress/$slug")({
  loader: async ({ params }) => {
    const [dresses, reservations] = await Promise.all([
      getDressesWithTranslations(),
      getReservationBlocks(params.slug),
    ]);
    const dress = dresses.find((item) => item.slug === params.slug);
    if (!dress) throw notFound();
    return { dress, dresses, reservations };
  },
  head: ({ loaderData, match }) => {
    if (!loaderData) return { meta: [] };
    const localized = localizeDress(
      loaderData.dress,
      DEFAULT_LOCALE,
      translations[DEFAULT_LOCALE],
    );
    const title = `${localized.name} — Na Curva`;
    return {
      meta: openGraphMeta({
        title,
        description: localized.description,
        pathname: match.pathname,
        image: localized.image,
        imageWidth: 1024,
        imageHeight: 1280,
        type: "article",
      }),
    };
  },
  component: DressPage,
  notFoundComponent: DressNotFound,
  errorComponent: DressError,
});

function DressNotFound() {
  const t = useT();

  return (
    <SiteLayout>
      <div className="px-5 py-32 text-center md:py-48">
        <p className="eyebrow mb-4">{t.dress.notFoundEyebrow}</p>
        <h1 className="font-display text-4xl md:text-6xl">{t.dress.notFoundTitle}</h1>
        <Link to="/collection" className="eyebrow link-underline mt-8 inline-block">
          {t.cta.backToCollection}
        </Link>
      </div>
    </SiteLayout>
  );
}

function DressError() {
  const t = useT();

  return (
    <SiteLayout>
      <div className="px-5 py-32 text-center">
        <p className="font-display text-3xl">{t.dress.errorTitle}</p>
        <Link to="/collection" className="eyebrow link-underline mt-6 inline-block">
          {t.cta.backToCollection}
        </Link>
      </div>
    </SiteLayout>
  );
}

function DressPage() {
  const { dress: rawDress, dresses, reservations } = Route.useLoaderData();
  const t = useT();
  const { locale } = useLocale();
  const dress = localizeDress(rawDress, locale, t);
  const related = useMemo(
    () =>
      dresses
        .filter((item) => item.slug !== dress.slug)
        .slice(0, 3)
        .map((item) => localizeDress(item, locale, t)),
    [dress.slug, dresses, locale, t],
  );
  const [showroomVisitOpen, setShowroomVisitOpen] = useState(false);
  usePageMeta(`${dress.name} — Na Curva`, dress.description);

  return (
    <SiteLayout>
      <section className="grid grid-cols-1 md:grid-cols-12">
        <div className="relative bg-bone md:col-span-7 md:min-h-0">
          <img
            src={dress.image}
            alt={dress.name}
            width={1024}
            height={1280}
            className="block aspect-[4/5] w-full object-cover md:absolute md:inset-0 md:aspect-auto md:h-full"
          />
        </div>

        <div className="md:col-span-5">
          <div className="sticky top-20 flex flex-col gap-10 px-5 py-12 md:px-12 md:py-20">
            <div>
              <p className="eyebrow mb-4">{dress.designer}</p>
              <h1 className="font-display text-4xl leading-[1.05] md:text-5xl">
                {dress.name}
              </h1>
              <div className="mt-6 flex items-baseline gap-6">
                <p className="font-display text-2xl">€{dress.price}</p>
                <p className="text-xs text-muted-foreground">
                  {t.dress.perRental} · {t.dress.retail} €{dress.retail}
                </p>
              </div>
            </div>

            <p className="text-[15px] leading-relaxed text-foreground">
              {dress.description}
            </p>

            <div className="space-y-5">
              <AvailabilitySection reservations={reservations} />

              <div className="border-t border-border pt-5">
                <p className="eyebrow mb-3">{t.dress.details}</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {dress.details.map((d) => (
                    <li key={d}>— {d}</li>
                  ))}
                </ul>
              </div>
            </div>

            <section
              aria-labelledby="dress-showroom-heading"
              className="border-t border-border pt-8"
            >
              <p className="eyebrow mb-2" id="dress-showroom-heading">
                {t.dress.showroomSectionEyebrow}
              </p>
              <p className="mb-5 text-[13px] leading-relaxed text-muted-foreground">
                {t.dress.showroomSectionHelper}
              </p>
              <button
                type="button"
                onClick={() => setShowroomVisitOpen(true)}
                className={ctaClass({ variant: "coral", size: "full" })}
              >
                {t.dress.requestShowroomVisit}
              </button>
            </section>

            <ShowroomVisitModal
              open={showroomVisitOpen}
              onOpenChange={setShowroomVisitOpen}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border px-5 py-20 md:px-10 md:py-28">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-display text-3xl md:text-5xl">{t.dress.relatedTitle}</h2>
          <UnderlineLink to="/collection">{t.cta.viewAll}</UnderlineLink>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-3 md:gap-x-6">
          {related.map((d) => (
            <Link
              key={d.slug}
              to="/dress/$slug"
              params={{ slug: d.slug }}
              className="group block"
            >
              <div className="overflow-hidden bg-bone">
                <img
                  src={d.image}
                  alt={d.name}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <div>
                  <p className="font-display text-base md:text-lg">{d.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{d.designer}</p>
                </div>
                <p className="text-xs text-muted-foreground">€{d.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
