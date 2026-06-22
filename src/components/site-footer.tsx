import { Link } from "@tanstack/react-router";
import { WHATSAPP_GENERAL } from "@/lib/whatsapp";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border bg-bone">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-5 py-16 md:grid-cols-4 md:px-10 md:py-24">
        <div className="md:col-span-2">
          <Link to="/" className="font-serif text-3xl">
            na<span className="text-muted-foreground">__</span>curva
          </Link>
          <p className="mt-6 max-w-sm font-serif text-2xl leading-snug text-foreground md:text-3xl">
            Wear the dress.<br />Own the moment.
          </p>
          <a
            href={WHATSAPP_GENERAL}
            target="_blank"
            rel="noreferrer"
            className="eyebrow link-underline mt-8 inline-block"
          >
            Reserve via WhatsApp
          </a>
        </div>

        <div>
          <p className="eyebrow mb-5">Explore</p>
          <ul className="space-y-3 text-sm">
            <li><Link to="/collection" className="link-underline">Collection</Link></li>
            <li><Link to="/how-it-works" className="link-underline">How It Works</Link></li>
            <li><Link to="/about" className="link-underline">About</Link></li>
            <li><Link to="/faq" className="link-underline">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-5">Contact</p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>Lisbon, Portugal</li>
            <li><a href="mailto:hello@nacurva.pt" className="link-underline">hello@nacurva.pt</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="link-underline">Instagram</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-3 px-5 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:px-10">
          <p>© {new Date().getFullYear()} Na Curva. All rights reserved.</p>
          <p className="eyebrow">Curated in Portugal</p>
        </div>
      </div>
    </footer>
  );
}
