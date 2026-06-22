import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Wordmark } from "@/components/wordmark";
import { DRESSES } from "@/lib/dresses";
import { WHATSAPP_GENERAL } from "@/lib/whatsapp";
import heroImg from "@/assets/hero.jpg";
import editorial1 from "@/assets/editorial-1.jpg";
import editorial2 from "@/assets/editorial-2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Na Curva — Designer Dress Rental for Every Celebration" },
      {
        name: "description",
        content:
          "Designer dresses rented by the night. For summer weddings, birthday dinners, fashion events and the moments you want to remember.",
      },
      { property: "og:title", content: "Na Curva — Designer Dress Rental" },
      {
        property: "og:description",
        content:
          "Designer dresses rented by the night — for weddings, birthdays, dinners and the moments that matter.",
      },
    ],
  }),
  component: HomePage,
});

const OCCASIONS_STRIP = [
  "Summer weddings",
  "Birthday dinners",
  "Fashion events",
  "Weekends away",
  "Saturday nights",
  "Garden parties",
];

function HomePage() {
  const featured = DRESSES.slice(0, 4);
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative bg-lavender">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="order-2 flex flex-col justify-between gap-12 px-5 py-14 md:order-1 md:col-span-5 md:px-10 md:py-16 lg:px-14 lg:py-20">
            <div className="flex items-center justify-between">
              <p className="eyebrow text-foreground/70">Edição 01 — Verão 26</p>
              <span className="asterisk text-2xl">✸</span>
            </div>

            <div>
              <h1 className="font-display text-[3.4rem] leading-[0.88] tracking-[-0.045em] text-foreground md:text-[5.2rem] lg:text-[6.4rem]">
                wear the<br />
                dress.<br />
                <span className="text-coral">own the</span><br />
                <span className="text-coral">moment.</span>
              </h1>
              <p className="mt-10 max-w-md text-base leading-relaxed text-foreground/75">
                Designer dresses, rented by the night. For the weddings,
                birthdays, dinners and weekends away that ask for something
                a little louder than your wardrobe.
              </p>

              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
                <Link
                  to="/collection"
                  className="inline-flex items-center gap-3 bg-foreground px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-background transition-colors hover:bg-coral"
                >
                  Browse the collection <span>→</span>
                </Link>
                <a
                  href={WHATSAPP_GENERAL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 border border-foreground/80 px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  Reserve on WhatsApp
                </a>
              </div>
            </div>

            <div className="flex items-end justify-between text-[0.7rem] uppercase tracking-[0.22em] text-foreground/60">
              <span>Lisbon — PT</span>
              <span>For her, for the night ✸</span>
            </div>
          </div>

          <div className="order-1 md:order-2 md:col-span-7">
            <img
              src={heroImg}
              alt="Woman in a flowing dress in a sunlit Portuguese villa"
              width={1280}
              height={1600}
              className="h-[68vh] w-full object-cover md:h-[88vh] lg:h-[92vh]"
            />
          </div>
        </div>
      </section>

      {/* OCCASIONS MARQUEE */}
      <section className="overflow-hidden border-y border-foreground bg-coral text-background">
        <div className="marquee-track py-5 font-display text-4xl uppercase tracking-[-0.03em] md:text-6xl">
          {Array.from({ length: 2 }).map((_, group) => (
            <span key={group} className="flex shrink-0 items-center gap-10">
              {OCCASIONS_STRIP.map((label) => (
                <span key={`${group}-${label}`} className="flex shrink-0 items-center gap-10">
                  <span>{label}</span>
                  <span className="text-peach">✸</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mb-12 flex items-end justify-between md:mb-16">
          <div>
            <p className="eyebrow mb-4 text-coral">The Edit ✸</p>
            <h2 className="font-display text-5xl md:text-7xl">Selected pieces.</h2>
          </div>
          <Link to="/collection" className="eyebrow link-underline hidden md:block">
            View all →
          </Link>
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
                  <p className="mt-1 text-xs text-muted-foreground">
                    {dress.designer}
                  </p>
                </div>
                <p className="text-xs font-medium text-coral">€{dress.price}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link to="/collection" className="eyebrow link-underline text-coral">
            View the full collection →
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-border bg-lavender px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow mb-4 text-foreground/60">How it works</p>
              <h2 className="max-w-3xl font-display text-5xl leading-[0.92] md:text-7xl">
                Four steps,<br />
                <span className="text-coral">zero friction.</span>
              </h2>
            </div>
            <span className="hidden text-5xl text-coral md:block">✸</span>
          </div>

          <ol className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
            {[
              { n: "01", t: "Choose", d: "Browse the edit. Save what speaks to you." },
              { n: "02", t: "Reserve", d: "Message us. We confirm in minutes." },
              { n: "03", t: "Wear", d: "It arrives pressed and ready. Yours for four nights." },
              { n: "04", t: "Return", d: "Slip it back in the bag. We do the rest." },
            ].map((s) => (
              <li key={s.n} className="border-t-2 border-foreground pt-5">
                <p className="font-display text-4xl text-coral">{s.n}</p>
                <p className="mt-6 font-display text-2xl">{s.t}</p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
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
            alt="Woman in flowing dress on a sunlit Portuguese coastal path"
            width={1600}
            height={1024}
            loading="lazy"
            className="h-[70vh] w-full object-cover md:h-[90vh]"
          />
        </div>
        <div className="flex flex-col justify-center bg-bone px-5 py-16 md:col-span-5 md:px-12 md:py-20">
          <p className="eyebrow mb-5 text-coral">Why Rent ✸</p>
          <h2 className="font-display text-4xl leading-[0.95] md:text-6xl">
            A wardrobe that lives with more than one woman.
          </h2>
          <ul className="mt-10 space-y-5 text-[15px] leading-relaxed text-foreground">
            <li className="flex gap-4 border-t border-foreground/30 pt-5">
              <span className="font-display text-coral">01</span>
              <p>Wear pieces that would otherwise hang unworn in someone's wardrobe.</p>
            </li>
            <li className="flex gap-4 border-t border-foreground/30 pt-5">
              <span className="font-display text-coral">02</span>
              <p>A small, hand-picked edit — never a marketplace, never a sea.</p>
            </li>
            <li className="flex gap-4 border-t border-foreground/30 pt-5">
              <span className="font-display text-coral">03</span>
              <p>A more conscious — and a lot more fun — way to dress for the moments that count.</p>
            </li>
          </ul>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="grid grid-cols-1 bg-lavender md:grid-cols-12">
        <div className="flex flex-col justify-center px-5 py-16 md:col-span-5 md:px-12 md:py-24">
          <p className="eyebrow mb-5 text-foreground/60">About Na Curva</p>
          <h2 className="font-display text-4xl leading-[0.95] md:text-6xl">
            Curated in Lisbon. <span className="text-coral">Worn everywhere.</span>
          </h2>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-foreground/75">
            Na Curva was born from one idea: exceptional clothes should be
            lived in, not stored. We pick each dress for its silhouette, its
            craft and the kind of night it deserves.
          </p>
          <Link
            to="/about"
            className="mt-10 inline-flex w-fit items-center gap-3 bg-foreground px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-background transition-colors hover:bg-coral"
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
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="eyebrow mb-4 text-coral">Questions ✸</p>
              <h2 className="font-display text-5xl md:text-7xl">Good to know.</h2>
            </div>
            <Link to="/faq" className="eyebrow link-underline hidden md:block">
              All answers →
            </Link>
          </div>

          <dl className="divide-y divide-foreground/20 border-y border-foreground/20">
            {[
              { q: "How long is the rental?", a: "Four days, door to door. Longer stays available on request." },
              { q: "What if the dress is damaged?", a: "Minor wear is on us. Anything beyond that we discuss case by case — no panic." },
              { q: "How do reservations work?", a: "All via WhatsApp. We reply personally — usually within the hour." },
            ].map((item) => (
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
            <Link to="/faq" className="eyebrow link-underline text-coral">
              See all questions →
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-coral px-5 py-24 text-background md:px-10 md:py-36">
        <div className="mx-auto max-w-5xl text-center">
          <Wordmark className="text-peach text-[clamp(2.5rem,7vw,5rem)]" />
          <h2 className="mt-10 font-display text-5xl leading-[0.9] md:text-8xl">
            the dress is ready
            <span className="block text-peach">when you are.</span>
          </h2>
          <p className="mx-auto mt-10 max-w-lg text-[15px] leading-relaxed text-background/85">
            Tell us the occasion — wedding, birthday, gallery opening, weekend
            in Comporta. We'll help you find the dress.
          </p>
          <a
            href={WHATSAPP_GENERAL}
            target="_blank"
            rel="noreferrer"
            className="mt-12 inline-block bg-background px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-coral transition-colors hover:bg-lavender hover:text-foreground"
          >
            Reserve via WhatsApp →
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
