import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { WHATSAPP_GENERAL } from "@/lib/whatsapp";
import { Wordmark } from "./wordmark";

const navItems = [
  { to: "/collection", label: "Collection" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
      {/* Brand strip */}
      <div className="overflow-hidden border-b border-border bg-coral text-peach">
        <div className="marquee-track py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.32em]">
          {Array.from({ length: 2 }).map((_, group) => (
            <span key={group} className="flex shrink-0 items-center gap-10">
              <span>Summer Weddings 26</span>
              <span aria-hidden>✸</span>
              <span>Designer Dresses · Rented by the Night</span>
              <span aria-hidden>✸</span>
              <span>Lisbon → Comporta → Anywhere</span>
              <span aria-hidden>✸</span>
              <span>New Arrivals Weekly</span>
              <span aria-hidden>✸</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10">
        <Link to="/" onClick={() => setOpen(false)} aria-label="Na Curva — home">
          <Wordmark className="text-xl text-foreground md:text-[1.6rem]" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="eyebrow link-underline text-foreground"
              activeProps={{ className: "eyebrow link-underline text-coral" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={WHATSAPP_GENERAL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-coral px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-foreground"
          >
            Reserve <span aria-hidden>→</span>
          </a>
        </div>

        <button
          aria-label="Menu"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex flex-col gap-[5px]">
            <span
              className={`h-px w-6 bg-foreground transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-6 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-px w-6 bg-foreground transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden">
          <nav className="flex flex-col gap-6 border-t border-border bg-lavender px-5 py-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="font-display text-4xl text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_GENERAL}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block self-start bg-coral px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary-foreground"
            >
              Reserve via WhatsApp →
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
