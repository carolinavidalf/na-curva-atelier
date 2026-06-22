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
      <section className="px-5 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-6">How it works</p>
          <h1 className="font-serif text-5xl leading-[1.02] tracking-tight md:text-8xl">
            Four steps,
            <span className="block italic text-muted-foreground">no friction.</span>
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
            <p className="font-serif text-5xl text-muted-foreground md:col-span-2 md:text-6xl">
              {s.n}
            </p>
            <h2 className="font-serif text-3xl leading-tight md:col-span-5 md:text-5xl">
              {s.t}
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground md:col-span-5">
              {s.d}
            </p>
          </div>
        ))}
      </section>

      <section className="border-t border-border bg-foreground px-5 py-24 text-center text-background md:py-32">
        <h2 className="mx-auto max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
          Ready to find your dress?
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-6 md:flex-row md:gap-10">
          <Link to="/collection" className="border-b border-background pb-1 text-sm">
            Browse the collection →
          </Link>
          <a
            href={WHATSAPP_GENERAL}
            target="_blank"
            rel="noreferrer"
            className="eyebrow link-underline text-background/80"
          >
            Reserve via WhatsApp
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
