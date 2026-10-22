import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportAppError } from "../lib/error-reporting";
import { InitialLoader } from "@/components/InitialLoader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground uppercase tracking-wide">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg transition-transform hover:scale-105"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportAppError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center p-8 rounded-3xl bg-card border border-border/30">
        <h1 className="text-2xl font-display uppercase tracking-wide text-foreground">
          Chenkai Foods
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something unexpected occurred while rendering. Please try refreshing.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md transition-transform hover:scale-105"
          >
            Try Again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground transition-all hover:bg-secondary"
          >
            Go Home
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
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Chenkai Foods — The Science of Tradition | Artisanal Seafood & Sun-Cured Dry Fish" },
      {
        name: "description",
        content: "Artisanal South Indian seafood fish pickles & sun-cured dry fish created with food science precision by Dr. R. Navaneethan, Ph.D., 0% taste enhancers, MSG & sodium benzoate.",
      },
      { name: "keywords", content: "fish pickle, prawn pickle, nethili dry fish, vanjaram dry fish, chenakunni prawns, seafood pickles, south indian pickles, dr r navaneethan, chenkai foods" },
      { name: "author", content: "Chenkai Foods" },
      { name: "robots", content: "index, follow" },
      
      // Open Graph Social Share Tags
      { property: "og:title", content: "Chenkai Foods — The Science of Tradition" },
      {
        property: "og:description",
        content: "Artisanal Fish Pickle, Prawn Pickle & Sun-Cured Dry Fish (Nethili, Vanjaram, Chenakunni).",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Chenkai Foods Artisanal Seafood Showcase" },

      // Twitter Card Tags
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Chenkai Foods — Artisanal Seafood & Sun-Cured Dry Fish" },
      {
        name: "twitter:description",
        content: "Ancient coastal heritage meets food science precision. 0% taste enhancers, MSG & sodium benzoate.",
      },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Instrument+Sans:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "shortcut icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      // Performance Preload Hints
      { rel: "preload", href: "/LOADINGANIMATION.mp4", as: "video", type: "video/mp4" },
      { rel: "preload", href: "/models/chenkai-jar.glb", as: "fetch", crossOrigin: "anonymous" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Chenkai Foods",
    "alternateName": "The Science of Tradition",
    "url": "https://chenkaifoods.com",
    "logo": "https://chenkaifoods.com/logo.jpg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+916374392488",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Tamil"]
    },
    "description": "Artisanal seafood pickles and sun-cured dry fish created with food science precision and coastal heritage."
  };

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <InitialLoader />
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
      <Outlet />
    </QueryClientProvider>
  );
}
