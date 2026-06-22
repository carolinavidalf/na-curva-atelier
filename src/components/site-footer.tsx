import { Link } from "@tanstack/react-router";
import { WHATSAPP_GENERAL } from "@/lib/whatsapp";
import { Wordmark } from "./wordmark";

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-coral text-peach">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-14 px-5 py-20 md:grid-cols-12 md:gap-10 md:px-10 md:py-28">
        <div className="md:col-span-7">
          <Link to="/">
            <Wordmark className="text-[clamp(3rem,9vw,7rem)] text-peach" />
          </Link>
          <p className="mt-10 max-w-xl font-display text-3xl leading-[0.95] tracking-tight text-background md:text-5xl">
            Wear the dress.<br />Own the moment.
          </p>
          <a
            href={WHATSAPP_GENERAL}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block bg-background px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-coral transition-colors hover:bg-lavender hover:text-foreground"
          >
            Reserve via WhatsApp →
          </a>
        </div>

        <div className="md:col-span-2">
          <p className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-peach/70">
            Explore
          </p>
          <ul className="space-y-3 text-sm text-background">
            <li><Link to="/collection" className="link-underline">Collection</Link></li>
            <li><Link to="/how-it-works" className="link-underline">How It Works</Link></li>
            <li><Link to="/about" className="link-underline">About</Link></li>
            <li><Link to="/faq" className="link-underline">FAQ</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-peach/70">
            Contact
          </p>
          <ul className="space-y-3 text-sm text-background">
            <li>Lisbon · Portugal</li>
            <li><a href="mailto:hello@nacurva.pt" className="link-underline">hello@nacurva.pt</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="link-underline">@nacurva</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-peach/30">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-3 px-5 py-6 text-xs text-peach/80 md:flex-row md:items-center md:px-10">
          <p>© {new Date().getFullYear()} Na Curva — Curated in Portugal</p>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em]">
            For the moments that matter <span className="asterisk">✸</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
