import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { WHATSAPP_GENERAL } from "@/lib/whatsapp";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Na Curva" },
      {
        name: "description",
        content:
          "Na Curva is a curated dress rental brand based in Portugal — built on style, craft and a more conscious way of dressing.",
      },
      { property: "og:title", content: "About — Na Curva" },
      {
        property: "og:description",
        content: "A curated dress rental brand based in Portugal.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-lavender px-5 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-6 text-coral">Our story ✸</p>
          <h1 className="font-display text-6xl leading-[0.9] tracking-[-0.045em] md:text-[7rem]">
            a wardrobe of
            <span className="block text-coral">borrowed beauty.</span>
          </h1>
        </div>
      </section>


      <section className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-7">
          <img
            src={aboutImg}
            alt="Founder in a Lisbon apartment"
            width={1024}
            height={1280}
            className="h-[80vh] w-full object-cover md:h-screen"
          />
        </div>
        <div className="flex flex-col justify-center gap-8 px-5 py-16 md:col-span-5 md:px-12 md:py-24">
          <p className="font-display text-2xl leading-snug md:text-3xl">
            Na Curva began with a closet full of dresses worn once, and the
            quiet realisation that beauty is meant to be lived in.
          </p>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            We started Na Curva in Lisbon to make exceptional dresses
            accessible — without the weight of ownership. Every piece is
            selected by hand for its silhouette, its craft, and the kind of
            evening it deserves.
          </p>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            We believe in fewer, better things. In dressing for the moment
            instead of the wardrobe. In a more honest relationship with
            fashion — one where a single dress can carry many stories.
          </p>
        </div>
      </section>

      <section className="border-t border-border px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
            {[
              {
                t: "Curation",
                d: "A small, intentional edit. We say no to far more than we say yes to.",
              },
              {
                t: "Access",
                d: "Designer dresses, by the night. The way exceptional clothes should feel.",
              },
              {
                t: "Consciousness",
                d: "A more thoughtful way to dress — one dress, many women, many stories.",
              },
            ].map((v) => (
              <div key={v.t} className="border-t-2 border-coral pt-6">
                <h3 className="font-display text-3xl md:text-4xl">{v.t}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  {v.d}
                </p>

              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-coral px-5 py-24 text-center text-background md:py-32">
        <p className="eyebrow mb-6 text-peach">Begin ✸</p>
        <h2 className="mx-auto max-w-3xl font-display text-5xl leading-[0.92] md:text-7xl">
          tell us about <span className="block text-peach">the occasion.</span>
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
