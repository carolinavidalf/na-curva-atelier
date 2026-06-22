import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { WHATSAPP_GENERAL } from "@/lib/whatsapp";

const navItems = [
  { to: "/collection", label: "Collection" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10">
        <Link
          to="/"
          className="font-serif text-xl tracking-tight md:text-2xl"
          onClick={() => setOpen(false)}
        >
          na<span className="text-muted-foreground">__</span>curva
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="eyebrow link-underline text-foreground"
              activeProps={{ className: "eyebrow link-underline text-foreground" }}
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
            className="eyebrow link-underline"
          >
            Reserve via WhatsApp
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
          <nav className="flex flex-col gap-6 border-t border-border px-5 py-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="font-serif text-3xl"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_GENERAL}
              target="_blank"
              rel="noreferrer"
              className="eyebrow mt-4"
            >
              Reserve via WhatsApp →
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
