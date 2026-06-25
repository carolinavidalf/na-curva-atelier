import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ctaClass } from "../components/cta-button";
import { LocaleProvider, useT } from "../i18n/locale-context";
import { translations, DEFAULT_LOCALE } from "../i18n/translations";

const defaultMeta = translations[DEFAULT_LOCALE].meta;

function NotFoundComponent() {
  const t = useT();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">{t.errors.notFoundTitle}</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          {t.errors.notFoundHeading}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{t.errors.notFoundBody}</p>
        <div className="mt-6">
          <Link
            to="/"
            className={ctaClass({ variant: "coral", size: "compact" })}
          >
            {t.errors.goHome}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const t = useT();
  const router = useRouter();

  console.error(error);
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t.errors.errorTitle}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.errors.errorBody}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className={ctaClass({ variant: "coral", size: "compact" })}
          >
            {t.errors.tryAgain}
          </button>
          <a
            href="/"
            className={ctaClass({ variant: "outline", size: "compact" })}
          >
            {t.errors.goHome}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: defaultMeta.siteTitle },
      { name: "description", content: defaultMeta.siteDescription },
      { name: "author", content: "Na Curva" },
      { property: "og:title", content: defaultMeta.siteTitle },
      { property: "og:description", content: defaultMeta.siteDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: defaultMeta.siteTitle },
      { name: "twitter:description", content: defaultMeta.siteDescription },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8e3f2837-2d4c-4917-93ad-65484f6d45c1/id-preview-f21a1e15--e48d679b-e8d1-40be-a83e-bd1f58799dee.lovable.app-1782144948525.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8e3f2837-2d4c-4917-93ad-65484f6d45c1/id-preview-f21a1e15--e48d679b-e8d1-40be-a83e-bd1f58799dee.lovable.app-1782144948525.png",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,400;0,500;0,600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-PT">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <Outlet />
      </LocaleProvider>
    </QueryClientProvider>
  );
}
