import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { WHATSAPP_GENERAL } from "@/lib/whatsapp";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Na Curva" },
      {
        name: "description",
        content:
          "Answers to common questions about renting a dress with Na Curva — rentals, returns, sizing, damages and care.",
      },
      { property: "og:title", content: "FAQ — Na Curva" },
      {
        property: "og:description",
        content: "Everything you need to know about renting with Na Curva.",
      },
    ],
  }),
  component: FaqPage,
});

const FAQS = [
  {
    q: "How does the rental work?",
    a: "You choose a dress from our edit and reserve it via WhatsApp. We confirm availability, arrange delivery and pick-up around your event, and take care of cleaning when the dress returns.",
  },
  {
    q: "How long is the rental?",
    a: "Standard rentals are four days, door to door — typically the day before, the day of, and two days after your event. Longer rentals are available on request.",
  },
  {
    q: "What happens if the dress is damaged?",
    a: "Minor wear is expected and fully included — a spilled glass of wine, a loose hem. For anything more significant, we discuss case by case and only charge if a repair is needed.",
  },
  {
    q: "How do reservations work?",
    a: "All reservations are made via WhatsApp. We respond personally — usually within the hour — to confirm the dress, the size and the dates. There is no checkout, no shopping cart.",
  },
  {
    q: "How do returns work?",
    a: "We include a pre-paid return label and a reusable garment bag. Drop the dress at the nearest collection point the day after your event. That's it.",
  },
  {
    q: "What sizes do you carry?",
    a: "Our current edit runs from XS to L. We're growing the size range with every season — if you don't see your size, message us and we'll help.",
  },
  {
    q: "Where do you deliver?",
    a: "Anywhere in mainland Portugal. We're working on expanding to the islands and the rest of Europe soon.",
  },
  {
    q: "Can I try the dress before my event?",
    a: "Yes — the dress arrives the day before your event so you have time to try it. If something is wrong, we'll do everything we can to swap it.",
  },
];

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SiteLayout>
      <section className="bg-lavender px-5 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-6 text-coral">Questions ✸</p>
          <h1 className="font-display text-6xl leading-[0.9] tracking-[-0.045em] md:text-[7rem]">
            good to <span className="text-coral">know.</span>
          </h1>
        </div>
      </section>

      <section className="border-t border-border px-5 md:px-10">
        <div className="mx-auto max-w-5xl">
          <dl>
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q} className="border-b border-border">
                  <dt>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-baseline justify-between gap-6 py-8 text-left md:py-10"
                    >
                      <span className="font-display text-2xl leading-snug tracking-tight md:text-3xl">
                        {item.q}
                      </span>
                      <span className="font-display text-3xl text-coral">
                        {isOpen ? "—" : "+"}
                      </span>
                    </button>
                  </dt>
                  {isOpen && (
                    <dd className="max-w-2xl pb-10 text-[15px] leading-relaxed text-muted-foreground">
                      {item.a}
                    </dd>
                  )}
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <section className="border-t border-border bg-coral px-5 py-24 text-center text-background md:py-32">
        <p className="eyebrow mb-6 text-peach">Still wondering? ✸</p>
        <h2 className="mx-auto max-w-3xl font-display text-5xl leading-[0.92] md:text-7xl">
          send us <span className="text-peach">a message.</span>
        </h2>
        <a
          href={WHATSAPP_GENERAL}
          target="_blank"
          rel="noreferrer"
          className="mt-12 inline-block bg-background px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-coral transition-colors hover:bg-lavender hover:text-foreground"
        >
          Reserve via WhatsApp →
        </a>
      </section>
    </SiteLayout>
  );
}

