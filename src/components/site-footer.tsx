import { Link } from "@tanstack/react-router";
import { useT } from "@/i18n/locale-context";
import { whatsappUrl } from "@/lib/whatsapp";
import { Wordmark } from "./wordmark";
import { BrandShape } from "./brand-shape";
import { ctaClass } from "./cta-button";

export function SiteFooter() {
  const t = useT();
  const whatsappHref = whatsappUrl(t.whatsapp.general);

  return (
    <footer className="bg-coral text-peach">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-14 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Link to="/">
            <Wordmark variant="light" className="h-[clamp(4rem,14vw,9rem)] w-auto" />
          </Link>
          <p className="mt-10 max-w-xl font-display headline-editorial text-3xl leading-[0.95] tracking-tight text-background md:text-5xl">
            {t.footer.tagline1}
            <br />
            {t.footer.tagline2}
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className={ctaClass({ variant: "on-coral", size: "compact", className: "mt-10" })}
          >
            {t.nav.reserveWhatsApp}
          </a>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:col-span-7 lg:gap-10">
          <div className="min-w-0">
            <p className="eyebrow mb-5 text-peach/70">{t.footer.explore}</p>
            <ul className="space-y-3 text-sm text-background">
              <li>
                <Link to="/collection" className="link-hover-underline">
                  {t.nav.browse}
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="link-hover-underline">
                  {t.nav.howItWorks}
                </Link>
              </li>
              <li>
                <Link to="/about" className="link-hover-underline">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="link-hover-underline">
                  {t.nav.faq}
                </Link>
              </li>
            </ul>
          </div>

          <div className="min-w-0">
            <p className="eyebrow mb-5 text-peach/70">{t.footer.contact}</p>
            <ul className="space-y-3 text-sm text-background">
              <li>{t.footer.location}</li>
              <li>
                <a
                  href="mailto:hello@nacurva.pt"
                  className="link-hover-underline break-words"
                >
                  hello@nacurva.pt
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="link-hover-underline"
                >
                  @nacurva
                </a>
              </li>
            </ul>
          </div>

          <div className="min-w-0">
            <p className="eyebrow mb-5 text-peach/70">{t.footer.legal}</p>
            <ul className="space-y-3 text-sm text-background">
              <li>
                <Link to="/privacy-policy" className="link-hover-underline">
                  {t.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="link-hover-underline">
                  {t.footer.termsAndConditions}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-peach/30">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-3 px-5 py-6 text-xs text-peach/80 md:flex-row md:items-center md:px-10">
          <p>
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <p className="eyebrow inline-flex items-center gap-2 text-peach/80">
            {t.footer.moments}{" "}
            <BrandShape variant="light" className="h-3.5 w-3.5" />
          </p>
        </div>
      </div>
    </footer>
  );
}
