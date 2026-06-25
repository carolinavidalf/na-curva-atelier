import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { ctaClass } from "@/components/cta-button";
import { BrandShape } from "@/components/brand-shape";
import { useT } from "@/i18n/locale-context";
import { usePageMeta } from "@/i18n/use-page-meta";
import { translations, DEFAULT_LOCALE } from "@/i18n/translations";
import { whatsappUrl } from "@/lib/whatsapp";

const defaultFaq = translations[DEFAULT_LOCALE].faq;

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: defaultFaq.metaTitle },
      { name: "description", content: defaultFaq.metaDescription },
      { property: "og:title", content: defaultFaq.metaTitle },
      { property: "og:description", content: defaultFaq.metaDescription },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const t = useT();
  usePageMeta(t.faq.metaTitle, t.faq.metaDescription);
  const [open, setOpen] = useState<number | null>(0);
  const whatsappHref = whatsappUrl(t.whatsapp.general);

  return (
    <SiteLayout>
      <section className="bg-lavender px-5 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-6 inline-flex items-center gap-2 text-coral">
            {t.faq.eyebrow} <BrandShape variant="coral" className="h-3.5 w-3.5" />
          </p>
          <h1 className="font-display text-6xl leading-[0.9] md:text-[7rem]">
            {t.faq.title1}
            <span className="text-coral">{t.faq.title2}</span>
          </h1>
        </div>
      </section>

      <section className="border-t border-border px-5 md:px-10">
        <div className="mx-auto max-w-5xl">
          <dl>
            {t.faq.items.map((item, i) => {
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
        <p className="eyebrow mb-6 inline-flex items-center justify-center gap-2 text-peach">
          {t.faq.ctaEyebrow} <BrandShape variant="light" className="h-3.5 w-3.5" />
        </p>
        <h2 className="mx-auto max-w-3xl font-display text-5xl leading-[0.92] md:text-7xl">
          {t.faq.ctaTitle}
        </h2>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className={ctaClass({ variant: "on-coral", size: "wide", className: "mt-12" })}
        >
          {t.nav.reserveWhatsApp}
        </a>
      </section>
    </SiteLayout>
  );
}
