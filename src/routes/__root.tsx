import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { ctaClass } from "../components/cta-button";
import { openGraphMeta } from "../lib/open-graph";
import { LocaleProvider } from "../i18n/locale-context";
import { translations, DEFAULT_LOCALE } from "../i18n/translations";

const defaultMeta = translations[DEFAULT_LOCALE].meta;

function NotFoundComponent() {
  const t = translations[DEFAULT_LOCALE];

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
  const t = translations[DEFAULT_LOCALE];
  const router = useRouter();

  console.error(error);

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
  head: ({ match }) => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Na Curva" },
      ...openGraphMeta({
        title: defaultMeta.siteTitle,
        description: defaultMeta.siteDescription,
        pathname: match.pathname,
      }),
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
  const { queryClient } = Route.useRouteContext();

  return (
    <html lang="pt-PT">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <LocaleProvider>{children}</LocaleProvider>
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
