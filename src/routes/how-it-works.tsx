import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { WHATSAPP_GENERAL } from "@/lib/whatsapp";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Na Curva" },
      {
        name: "description",
        content:
          "Choose, reserve, wear, return. Renting a dress with Na Curva is simple and personal.",
      },
      { property: "og:title", content: "How It Works — Na Curva" },
      {
        property: "og:description",
        content: "Choose, reserve, wear, return. A simple and personal rental experience.",
      },
    ],
  }),
  component: HowItWorks,
});

const STEPS = [
  {
    n: "01",
    t: "Choose your dress",
    d: "Browse our edit and save the pieces that speak to you. Each dress is hand-selected — there are no thousands of options here, only the ones we love.",
  },
  {
    n: "02",
    t: "Reserve via WhatsApp",
    d: "Send us a message with the dress and the date. We respond personally — usually within the hour — to confirm availability and size.",
  },
  {
    n: "03",
    t: "Wear it",
    d: "Your dress arrives the day before your event, pressed and ready in a reusable garment bag. Wear it. Be in it. Take photos worth keeping.",
  },
  {
    n: "04",
    t: "Return it",
    d: "Slip the dress back into its bag and drop it off the day after your event. We take care of cleaning. You take care of the memory.",
  },
];

function HowItWorks() {
  return (
    <SiteLayout>
      <section className="bg-lavender px-5 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-6 text-coral">How it works ✸</p>
          <h1 className="font-display text-6xl leading-[0.9] tracking-[-0.045em] md:text-[7rem]">
            four steps,
            <span className="block text-coral">no friction.</span>
          </h1>
        </div>
      </section>


      <section className="border-t border-border">
        {STEPS.map((s, i) => (
          <div
            key={s.n}
            className={`grid grid-cols-1 gap-6 px-5 py-16 md:grid-cols-12 md:gap-10 md:px-10 md:py-24 ${
              i < STEPS.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <p className="font-display text-5xl text-coral md:col-span-2 md:text-6xl">
              {s.n}
            </p>
            <h2 className="font-display text-3xl leading-tight md:col-span-5 md:text-5xl">
              {s.t}
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground md:col-span-5">
              {s.d}
            </p>
          </div>
        ))}
      </section>

      <section className="border-t border-border bg-coral px-5 py-24 text-center text-background md:py-32">
        <h2 className="mx-auto max-w-3xl font-display text-5xl leading-[0.92] md:text-7xl">
          ready to find <span className="block text-peach">your dress?</span>
        </h2>
        <div className="mt-12 flex flex-col items-center justify-center gap-5 md:flex-row md:gap-6">
          <Link
            to="/collection"
            className="inline-flex items-center gap-3 bg-background px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-coral transition-colors hover:bg-lavender hover:text-foreground"
          >
            Browse the collection →
          </Link>
          <a
            href={WHATSAPP_GENERAL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 border border-background/80 px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-background transition-colors hover:bg-background hover:text-coral"
          >
            Reserve via WhatsApp
          </a>
        </div>
      </section>

    </SiteLayout>
  );
}
