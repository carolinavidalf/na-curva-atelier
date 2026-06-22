import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { DRESSES } from "@/lib/dresses";
import { WHATSAPP_GENERAL } from "@/lib/whatsapp";
import heroImg from "@/assets/hero.jpg";
import editorial1 from "@/assets/editorial-1.jpg";
import editorial2 from "@/assets/editorial-2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Na Curva — Curated Dress Rental in Portugal" },
      {
        name: "description",
        content:
          "Wear the dress, own the moment. A curated rental wardrobe of designer dresses for weddings, celebrations and evenings out.",
      },
      { property: "og:title", content: "Na Curva — Curated Dress Rental" },
      {
        property: "og:description",
        content:
          "A curated rental wardrobe of designer dresses for weddings, celebrations and evenings out.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = DRESSES.slice(0, 4);
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="order-2 flex flex-col justify-between px-5 py-12 md:order-1 md:col-span-5 md:px-10 md:py-20 lg:px-16 lg:py-28">
            <p className="eyebrow">Na Curva — Edição 01</p>

            <div className="mt-12 md:mt-0">
              <h1 className="font-serif text-[2.6rem] leading-[1] tracking-tight md:text-[4.5rem] lg:text-[5.5rem]">
                Wear the dress.
                <span className="block italic text-muted-foreground">
                  Own the moment.
                </span>
              </h1>
              <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-[15px]">
                A small, considered wardrobe of exceptional dresses — rented
                by the night for the celebrations that ask for something
                beautiful.
              </p>

              <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
                <Link
                  to="/collection"
                  className="group inline-flex items-center gap-3 border-b border-foreground pb-2 text-sm tracking-wide"
                >
                  Browse the Collection
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <a
                  href={WHATSAPP_GENERAL}
                  target="_blank"
                  rel="noreferrer"
                  className="eyebrow link-underline"
                >
                  Reserve via WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 md:col-span-7">
            <img
              src={heroImg}
              alt="Woman in flowing ivory dress in a sunlit Portuguese villa"
              width={1280}
              height={1600}
              className="h-[70vh] w-full object-cover md:h-[88vh] lg:h-[92vh]"
            />
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="border-t border-border px-5 py-20 md:px-10 md:py-28">
        <div className="mb-12 flex items-end justify-between md:mb-16">
          <div>
            <p className="eyebrow mb-4">The Edit</p>
            <h2 className="font-serif text-4xl md:text-6xl">Selected pieces</h2>
          </div>
          <Link to="/collection" className="eyebrow link-underline hidden md:block">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-4 md:gap-x-6 md:gap-y-16">
          {featured.map((dress) => (
            <Link
              key={dress.slug}
              to="/dress/$slug"
              params={{ slug: dress.slug }}
              className="group block"
            >
              <div className="overflow-hidden bg-bone">
                <img
                  src={dress.image}
                  alt={dress.name}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-2">
                <div>
                  <p className="font-serif text-base md:text-lg">{dress.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {dress.designer}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">€{dress.price}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link to="/collection" className="eyebrow link-underline">
            View the full collection
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-border bg-bone px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow mb-4">How it works</p>
          <h2 className="mb-16 max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            Four steps, no friction.
          </h2>

          <ol className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
            {[
              { n: "01", t: "Choose", d: "Browse the edit. Save what speaks to you." },
              { n: "02", t: "Reserve", d: "Send us a message. We confirm in minutes." },
              { n: "03", t: "Wear", d: "Your dress arrives ready. Yours for four days." },
              { n: "04", t: "Return", d: "Slip it back in the bag. We take care of the rest." },
            ].map((s) => (
              <li key={s.n} className="border-t border-foreground/20 pt-5">
                <p className="font-serif text-3xl">{s.n}</p>
                <p className="mt-6 font-serif text-xl">{s.t}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* EDITORIAL SPLIT */}
      <section className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-7">
          <img
            src={editorial1}
            alt="Woman in flowing dress walking along whitewashed Portuguese coastal path at golden hour"
            width={1600}
            height={1024}
            loading="lazy"
            className="h-[70vh] w-full object-cover md:h-[90vh]"
          />
        </div>
        <div className="flex flex-col justify-center bg-bone px-5 py-16 md:col-span-5 md:px-12 md:py-20">
          <p className="eyebrow mb-5">Why Rent</p>
          <h2 className="font-serif text-3xl leading-tight md:text-5xl">
            A wardrobe that lives with more than one woman.
          </h2>
          <ul className="mt-10 space-y-5 text-[15px] leading-relaxed text-foreground">
            <li className="flex gap-4 border-t border-border pt-5">
              <span className="eyebrow shrink-0">01</span>
              <p>Access pieces that would otherwise hang unworn.</p>
            </li>
            <li className="flex gap-4 border-t border-border pt-5">
              <span className="eyebrow shrink-0">02</span>
              <p>A small, intentionally curated edit — never a marketplace.</p>
            </li>
            <li className="flex gap-4 border-t border-border pt-5">
              <span className="eyebrow shrink-0">03</span>
              <p>A more conscious way of dressing for the moments that count.</p>
            </li>
          </ul>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="grid grid-cols-1 border-t border-border md:grid-cols-12">
        <div className="flex flex-col justify-center px-5 py-16 md:col-span-5 md:px-12 md:py-24">
          <p className="eyebrow mb-5">About Na Curva</p>
          <h2 className="font-serif text-3xl leading-tight md:text-5xl">
            Curated in Lisbon, worn everywhere.
          </h2>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Na Curva was born from the idea that exceptional clothes should be
            lived in — not stored. We select each dress for its silhouette, its
            craft, and the kind of evening it deserves.
          </p>
          <Link
            to="/about"
            className="mt-10 self-start border-b border-foreground pb-1 text-sm"
          >
            Read our story →
          </Link>
        </div>
        <div className="md:col-span-7">
          <img
            src={editorial2}
            alt="Folded silk dress on linen with dried wildflowers"
            width={1024}
            height={1280}
            loading="lazy"
            className="h-[70vh] w-full object-cover md:h-[90vh]"
          />
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <section className="border-t border-border px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="eyebrow mb-4">Questions</p>
              <h2 className="font-serif text-4xl md:text-6xl">Good to know</h2>
            </div>
            <Link to="/faq" className="eyebrow link-underline hidden md:block">
              All answers
            </Link>
          </div>

          <dl className="divide-y divide-border border-y border-border">
            {[
              { q: "How long is the rental?", a: "Four days, door to door. Longer rentals available on request." },
              { q: "What if the dress is damaged?", a: "Minor wear is expected and included. We'll discuss anything beyond that case by case." },
              { q: "How do reservations work?", a: "Reservations are made via WhatsApp. We respond personally — usually within the hour." },
            ].map((item) => (
              <div key={item.q} className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12">
                <dt className="font-serif text-xl md:col-span-5 md:text-2xl">{item.q}</dt>
                <dd className="text-[15px] leading-relaxed text-muted-foreground md:col-span-7">{item.a}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 md:hidden">
            <Link to="/faq" className="eyebrow link-underline">
              See all questions
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-border bg-foreground px-5 py-24 text-background md:px-10 md:py-36">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow mb-6 text-background/60">Reserve a dress</p>
          <h2 className="font-serif text-4xl leading-[1.05] md:text-7xl">
            The dress is ready
            <span className="block italic">when you are.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-[15px] leading-relaxed text-background/70">
            Tell us the occasion. We'll help you find the dress.
          </p>
          <a
            href={WHATSAPP_GENERAL}
            target="_blank"
            rel="noreferrer"
            className="mt-12 inline-block border-b border-background pb-2 text-sm tracking-wide"
          >
            Reserve via WhatsApp →
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
