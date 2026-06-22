import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { DRESSES, OCCASIONS, SIZES, type Occasion, type Size } from "@/lib/dresses";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Collection — Na Curva" },
      {
        name: "description",
        content:
          "A curated edit of designer dresses available for rental in Portugal. Filter by occasion and size.",
      },
      { property: "og:title", content: "Collection — Na Curva" },
      {
        property: "og:description",
        content: "A curated edit of designer dresses available for rental in Portugal.",
      },
    ],
  }),
  component: CollectionPage,
});

function CollectionPage() {
  const [occasion, setOccasion] = useState<Occasion | null>(null);
  const [size, setSize] = useState<Size | null>(null);
  const [cols, setCols] = useState<2 | 3 | 4>(3);

  const dresses = useMemo(() => {
    return DRESSES.filter((d) => {
      if (occasion && !d.occasions.includes(occasion)) return false;
      if (size && !d.sizes.includes(size)) return false;
      return true;
    });
  }, [occasion, size]);

  const gridClass =
    cols === 2
      ? "grid-cols-1 md:grid-cols-2"
      : cols === 3
        ? "grid-cols-2 md:grid-cols-3"
        : "grid-cols-2 md:grid-cols-4";

  return (
    <SiteLayout>
      {/* Page header */}
      <section className="border-b border-border px-5 pb-10 pt-12 md:px-10 md:pb-14 md:pt-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow mb-4">The Collection</p>
            <h1 className="font-serif text-5xl leading-[1] tracking-tight md:text-7xl">
              Dresses
              <span className="ml-3 align-top text-base text-muted-foreground md:text-lg">
                {dresses.length}
              </span>
            </h1>
          </div>
          <div className="md:col-span-4">
            <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
              A small, intentional edit of pieces selected for the celebrations
              that ask for something beautiful — weddings, dinners, evenings
              that matter.
            </p>
          </div>
          <div className="md:col-span-3 md:text-right">
            <p className="eyebrow mb-2">View</p>
            <div className="flex gap-3 md:justify-end">
              {[2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setCols(n as 2 | 3 | 4)}
                  className={`text-sm ${cols === n ? "underline underline-offset-4" : "text-muted-foreground"}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 border-b border-border bg-background/90 backdrop-blur-sm md:top-20">
        <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-10">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="eyebrow mr-2">Occasion</span>
            <button
              onClick={() => setOccasion(null)}
              className={`text-sm ${occasion === null ? "underline underline-offset-4" : "text-muted-foreground hover:text-foreground"}`}
            >
              All
            </button>
            {OCCASIONS.map((o) => (
              <button
                key={o}
                onClick={() => setOccasion(o)}
                className={`text-sm ${occasion === o ? "underline underline-offset-4" : "text-muted-foreground hover:text-foreground"}`}
              >
                {o}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="eyebrow mr-2">Size</span>
            <button
              onClick={() => setSize(null)}
              className={`text-sm ${size === null ? "underline underline-offset-4" : "text-muted-foreground hover:text-foreground"}`}
            >
              All
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

      {/* Grid */}
      <section className="px-5 py-12 md:px-10 md:py-16">
        {dresses.length === 0 ? (
          <div className="py-32 text-center">
            <p className="font-serif text-2xl">Nothing matches yet.</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Try a different occasion or size.
            </p>
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
                      Reserved
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <div>
                    <p className="font-serif text-lg">{dress.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {dress.designer}
                    </p>
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
