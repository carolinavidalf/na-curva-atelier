import { Link, useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useT } from "@/i18n/locale-context";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
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
] as const;

const mobileNavLinkClass =
  "nav-link headline-editorial block w-full py-3 font-display text-4xl";

const mobileNavLinkActiveClass = "nav-link is-active headline-editorial block w-full py-3 font-display text-4xl";

export function SiteHeader() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const mobileNavId = useId();
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const wasOpenRef = useRef(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const whatsappHref = whatsappUrl(t.whatsapp.navReserve);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setOpen((current) => !current);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!open) return;

    const header = headerRef.current;
    if (!header) return;

    const updateHeight = () => setHeaderHeight(header.offsetHeight);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const inertTargets = [document.querySelector("main"), document.querySelector("footer")];
    inertTargets.forEach((node) => node?.setAttribute("inert", ""));

    const focusFirstLink = () => {
      const firstLink = mobileNavRef.current?.querySelector<HTMLElement>("a[href]");
      firstLink?.focus();
    };
    const focusFrame = requestAnimationFrame(focusFirstLink);

    const getFocusables = () => {
      if (!mobileNavRef.current) return [];
      return Array.from(
        mobileNavRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusables();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      inertTargets.forEach((node) => node?.removeAttribute("inert"));
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeMenu]);

  useEffect(() => {
    if (wasOpenRef.current && !open) {
      menuToggleRef.current?.focus();
    }
    wasOpenRef.current = open;
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm"
    >
      <Marquee className="border-b border-border bg-coral py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-peach">
        {t.ticker.map((item) => (
          <span key={item} className="flex shrink-0 items-center gap-10">
            <span>{item}</span>
            <BrandShape variant="peach" className="h-4 w-4" />
          </span>
        ))}
      </Marquee>

      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10">
        <Link to="/" onClick={closeMenu} aria-label={t.nav.homeAria}>
          <Wordmark className="h-12 w-auto md:h-14" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label={t.nav.mobileNavLabel}>
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
            ref={menuToggleRef}
            type="button"
            aria-expanded={open}
            aria-controls={mobileNavId}
            aria-label={open ? t.nav.closeMenu : t.nav.menu}
            onClick={toggleMenu}
            className={cn(
              "-m-2 flex size-11 items-center justify-center rounded-md",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            <div className="flex flex-col gap-[5px]" aria-hidden>
              <span
                className={cn(
                  "h-px w-6 bg-foreground transition-transform duration-200",
                  open && "translate-y-[6px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-6 bg-foreground transition-opacity duration-200",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-px w-6 bg-foreground transition-transform duration-200",
                  open && "-translate-y-[6px] -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <nav
          ref={mobileNavRef}
          id={mobileNavId}
          aria-label={t.nav.mobileNavLabel}
          className="mobile-nav-panel fixed inset-x-0 bottom-0 z-50 flex flex-col overflow-hidden border-t border-border bg-lavender px-5 py-8 md:hidden"
          style={{
            top: headerHeight,
            height: headerHeight ? `calc(100dvh - ${headerHeight}px)` : "100dvh",
          }}
        >
          <div className="flex min-h-0 flex-1 flex-col">
            <p className="eyebrow mb-4">{t.footer.explore}</p>
            <ul className="flex flex-col">
              {navRoutes.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={closeMenu}
                    className={mobileNavLinkClass}
                    activeProps={{ className: mobileNavLinkActiveClass }}
                  >
                    {t.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="shrink-0 border-t border-border/60 pt-6">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className={ctaClass({ variant: "coral", size: "full" })}
            >
              {t.nav.reserveWhatsApp}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
