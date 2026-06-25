import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { BrandShape } from "@/components/brand-shape";
import { DRESSES, SIZES, type Size } from "@/lib/dresses";
import { localizedDress } from "@/i18n/dress";
import { useT } from "@/i18n/locale-context";
import { usePageMeta } from "@/i18n/use-page-meta";
import { translations, DEFAULT_LOCALE } from "@/i18n/translations";

const defaultCollection = translations[DEFAULT_LOCALE].collection;

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: defaultCollection.metaTitle },
      { name: "description", content: defaultCollection.metaDescription },
      { property: "og:title", content: defaultCollection.metaTitle },
      { property: "og:description", content: defaultCollection.metaDescription },
    ],
  }),
  component: CollectionPage,
});

function CollectionPage() {
  const t = useT();
  usePageMeta(t.collection.metaTitle, t.collection.metaDescription);

  const [size, setSize] = useState<Size | null>(null);
  const [cols] = useState<2 | 3 | 4>(3);

  const dresses = useMemo(() => {
    return DRESSES.filter((d) => {
      if (size && !d.sizes.includes(size)) return false;
      return true;
    }).map((d) => localizedDress(d, t));
  }, [size, t]);

  const gridClass =
    cols === 2
      ? "grid-cols-1 md:grid-cols-2"
      : cols === 3
        ? "grid-cols-2 md:grid-cols-3"
        : "grid-cols-2 md:grid-cols-4";

  return (
    <SiteLayout>
      <section className="border-b border-border bg-lavender px-5 pb-12 pt-12 md:px-10 md:pb-16 md:pt-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="eyebrow mb-4 inline-flex items-center gap-2 text-coral">
              {t.collection.eyebrow}{" "}
              <BrandShape variant="coral" className="h-3.5 w-3.5" />
            </p>
            <h1 className="font-display text-6xl leading-[0.9] md:text-[6.5rem]">
              {t.collection.title1}
              <span className="block text-coral">{t.collection.title2}</span>
            </h1>
          </div>
          <div className="md:col-span-4">
            <p className="max-w-md text-[15px] leading-relaxed text-foreground/75">
              {t.collection.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-30 border-b border-border bg-background/90 backdrop-blur-sm md:top-20">
        <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="eyebrow">{t.collection.curatedCollection}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="eyebrow mr-2">{t.collection.size}</span>
            <button
              onClick={() => setSize(null)}
              className={`text-sm ${size === null ? "underline underline-offset-4" : "text-muted-foreground hover:text-foreground"}`}
            >
              {t.collection.all}
            </button>
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`text-sm ${size === s ? "underline underline-offset-4" : "text-muted-foreground hover:text-foreground"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-10 md:py-16">
        {dresses.length === 0 ? (
          <div className="py-32 text-center">
            <p className="font-display text-2xl">{t.collection.emptyTitle}</p>
            <p className="mt-3 text-sm text-muted-foreground">{t.collection.emptyBody}</p>
          </div>
        ) : (
          <div className={`grid gap-x-3 gap-y-14 md:gap-x-6 md:gap-y-20 ${gridClass}`}>
            {dresses.map((dress) => (
              <Link
                key={dress.slug}
                to="/dress/$slug"
                params={{ slug: dress.slug }}
                className="group block"
              >
                <div className="relative overflow-hidden bg-bone">
                  <img
                    src={dress.image}
                    alt={dress.name}
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  />
                  {!dress.available && (
                    <span className="eyebrow absolute left-3 top-3 bg-background px-2 py-1">
                      {t.collection.reserved}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <div>
                    <p className="font-display text-lg">{dress.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{dress.designer}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">€{dress.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
