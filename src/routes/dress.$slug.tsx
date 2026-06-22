import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { DRESSES, getDress } from "@/lib/dresses";
import { whatsappForDress } from "@/lib/whatsapp";

export const Route = createFileRoute("/dress/$slug")({
  loader: ({ params }) => {
    const dress = getDress(params.slug);
    if (!dress) throw notFound();
    return { dress };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.dress.name} — Na Curva` },
          { name: "description", content: loaderData.dress.description },
          { property: "og:title", content: `${loaderData.dress.name} — Na Curva` },
          { property: "og:description", content: loaderData.dress.description },
          { property: "og:image", content: loaderData.dress.image },
        ]
      : [],
  }),
  component: DressPage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="px-5 py-32 text-center md:py-48">
        <p className="eyebrow mb-4">Not found</p>
        <h1 className="font-serif text-4xl md:text-6xl">This dress is no longer here.</h1>
        <Link to="/collection" className="eyebrow link-underline mt-8 inline-block">
          Back to the collection
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: () => (
    <SiteLayout>
      <div className="px-5 py-32 text-center">
        <p className="font-serif text-3xl">Something went wrong.</p>
        <Link to="/collection" className="eyebrow link-underline mt-6 inline-block">
          Back to the collection
        </Link>
      </div>
    </SiteLayout>
  ),
});

function DressPage() {
  const { dress } = Route.useLoaderData();
  const related = DRESSES.filter((d) => d.slug !== dress.slug).slice(0, 3);

  return (
    <SiteLayout>
      <section className="grid grid-cols-1 md:grid-cols-12">
        {/* Image gallery */}
        <div className="md:col-span-7">
          <div className="bg-bone">
            <img
              src={dress.image}
              alt={dress.name}
              width={1024}
              height={1280}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>

        {/* Details */}
        <div className="md:col-span-5">
          <div className="sticky top-20 flex flex-col gap-10 px-5 py-12 md:px-12 md:py-20">
            <div>
              <p className="eyebrow mb-4">{dress.designer}</p>
              <h1 className="font-serif text-4xl leading-[1.05] md:text-5xl">
                {dress.name}
              </h1>
              <div className="mt-6 flex items-baseline gap-6">
                <p className="font-serif text-2xl">€{dress.price}</p>
                <p className="text-xs text-muted-foreground">
                  per rental · retail €{dress.retail}
                </p>
              </div>
            </div>

            <p className="text-[15px] leading-relaxed text-foreground">
              {dress.description}
            </p>

            <div className="space-y-5">
              <div className="border-t border-border pt-5">
                <p className="eyebrow mb-3">Sizes</p>
                <div className="flex flex-wrap gap-3">
                  {dress.sizes.map((s) => (
                    <span
                      key={s}
                      className="border border-border px-4 py-2 text-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-5">
                <p className="eyebrow mb-3">Occasions</p>
                <p className="text-sm text-muted-foreground">
                  {dress.occasions.join(" · ")}
                </p>
              </div>

              <div className="border-t border-border pt-5">
                <p className="eyebrow mb-3">Availability</p>
                <p className="text-sm">
                  {dress.available ? (
                    <span className="text-foreground">Available</span>
                  ) : (
                    <span className="text-muted-foreground">Currently reserved</span>
                  )}
                </p>
              </div>

              <div className="border-t border-border pt-5">
                <p className="eyebrow mb-3">Details</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {dress.details.map((d) => (
                    <li key={d}>— {d}</li>
                  ))}
                </ul>
              </div>
            </div>

            <a
              href={whatsappForDress(dress.name)}
              target="_blank"
              rel="noreferrer"
              className="mt-2 block border border-foreground bg-foreground py-5 text-center text-sm tracking-[0.18em] text-background transition-colors hover:bg-background hover:text-foreground"
            >
              RESERVE VIA WHATSAPP
            </a>
            <p className="-mt-4 text-center text-xs text-muted-foreground">
              No checkout. A real person will reply to confirm.
            </p>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-border px-5 py-20 md:px-10 md:py-28">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-serif text-3xl md:text-5xl">Also in the edit</h2>
          <Link to="/collection" className="eyebrow link-underline">View all</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-3 md:gap-x-6">
          {related.map((d) => (
            <Link key={d.slug} to="/dress/$slug" params={{ slug: d.slug }} className="group block">
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
                  <p className="font-serif text-base md:text-lg">{d.name}</p>
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
