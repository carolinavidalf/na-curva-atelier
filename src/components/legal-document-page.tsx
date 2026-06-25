import { BrandShape } from "@/components/brand-shape";
import type { Translation } from "@/i18n/translations";

type LegalContent = Translation["privacyPolicy"];

export function LegalDocumentPage({ content }: { content: LegalContent }) {
  return (
    <>
      <section className="bg-lavender px-5 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-6 inline-flex items-center gap-2 text-coral">
            {content.eyebrow} <BrandShape variant="coral" className="h-3.5 w-3.5" />
          </p>
          <h1 className="font-display text-6xl leading-[0.9] md:text-[7rem]">
            {content.title1}
            <span className="block text-coral">{content.title2}</span>
          </h1>
          <p className="mt-8 text-sm text-muted-foreground">{content.updated}</p>
        </div>
      </section>

      <section className="border-t border-border px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-3xl space-y-12">
          {content.sections.map((section) => (
            <article key={section.title} className="border-t border-border pt-8 first:border-t-0 first:pt-0">
              <h2 className="font-display text-2xl tracking-tight md:text-3xl">
                {section.title}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
