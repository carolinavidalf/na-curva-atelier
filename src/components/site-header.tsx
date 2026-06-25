import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useT } from "@/i18n/locale-context";
import { whatsappUrl } from "@/lib/whatsapp";
import { Wordmark } from "./wordmark";
import { BrandShape } from "./brand-shape";
import { ctaClass } from "./cta-button";
import { Marquee } from "./marquee";
import { LanguageSwitcher } from "./language-switcher";

const navRoutes = [
  { to: "/collection", key: "browse" as const },
  { to: "/how-it-works", key: "howItWorks" as const },
  { to: "/about", key: "about" as const },
  { to: "/faq", key: "faq" as const },
];

export function SiteHeader() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const whatsappHref = whatsappUrl(t.whatsapp.navReserve);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
      <Marquee className="border-b border-border bg-coral py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-peach">
        {t.ticker.map((item) => (
          <span key={item} className="flex shrink-0 items-center gap-10">
            <span>{item}</span>
            <BrandShape variant="peach" className="h-4 w-4" />
          </span>
        ))}
      </Marquee>

      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10">
        <Link to="/" onClick={() => setOpen(false)} aria-label={t.nav.homeAria}>
          <Wordmark className="h-12 w-auto md:h-14" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navRoutes.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="eyebrow nav-link"
              activeProps={{ className: "eyebrow nav-link is-active" }}
            >
              {t.nav[item.key]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <LanguageSwitcher />
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className={ctaClass({ variant: "coral", size: "sm" })}
          >
            {t.nav.reserve} <span aria-hidden>→</span>
          </a>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />
          <button
            aria-label={t.nav.menu}
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
      </div>

      {open && (
        <div className="md:hidden">
          <nav className="flex flex-col gap-6 border-t border-border bg-lavender px-5 py-8">
            {navRoutes.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="nav-link headline-editorial w-fit font-display text-4xl"
                activeProps={{
                  className:
                    "nav-link is-active headline-editorial w-fit font-display text-4xl",
                }}
              >
                {t.nav[item.key]}
              </Link>
            ))}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className={ctaClass({
                variant: "coral",
                size: "sm",
                className: "mt-2 self-start",
              })}
            >
              {t.nav.reserveWhatsApp}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
