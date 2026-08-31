import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import { structuredData } from "@/structured-data";
import "@/landing.css";
import "@/app.css";

const title =
  "HackFW MADE Challenge - Rebuilding System Density | Fort Worth";
const description =
  "HackFW is Fort Worth DAO's flagship hackathon and grassroots cyber workforce development program, growing a deep-tech builder economy and talent network for AI-first operations.";
const socialImage = "https://hack.fwtx.city/og-image";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title },
      { name: "title", content: title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "HackFW, MADE Challenge, Fort Worth hackathon, Fort Worth DAO, cyber workforce development, deep tech, builder economy, talent network, AI-first operations, industrial AI, advanced manufacturing, computer vision, generative CAD, CAD to production, work instructions, supplier relationship management, railroad maintenance, virtual incubation",
      },
      { name: "author", content: "Fort Worth DAO LCA" },
      { name: "geo.region", content: "US-TX" },
      { name: "geo.placename", content: "Fort Worth, Texas" },
      {
        name: "robots",
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "theme-color", content: "#E2673D" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://hack.fwtx.city" },
      {
        property: "og:title",
        content: "HackFW MADE Challenge - Rebuilding System Density",
      },
      { property: "og:description", content: description },
      { property: "og:image", content: socialImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "HackFW MADE Challenge in Fort Worth" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "HackFW" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "HackFW MADE Challenge - Rebuilding System Density",
      },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: socialImage },
      { name: "twitter:image:alt", content: "HackFW MADE Challenge in Fort Worth" },
      { name: "twitter:site", content: "@fwtxdao" },
      { name: "twitter:creator", content: "@fwtxdao" },
    ],
    links: [
      { rel: "canonical", href: "https://hack.fwtx.city" },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "https://cdn.fwtx.city/logo.svg",
      },
      {
        rel: "apple-touch-icon",
        href: "https://cdn.fwtx.city/logo.svg",
      },
      {
        rel: "preload",
        as: "image",
        href: "/sponsors/made-logo.png",
        type: "image/png",
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&display=swap",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function NotFoundComponent() {
  return (
    <main className="not-found" aria-labelledby="not-found-title">
      <div className="not-found__panel">
        <p className="not-found__status">404 // Route not found</p>
        <h1 id="not-found-title">This page is outside the build zone.</h1>
        <p>
          The requested HackFW page is not available. Return to the program
          overview to continue exploring the MADE Challenge.
        </p>
        <a className="btn btn-primary" href="/">
          Return to HackFW
        </a>
      </div>
    </main>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" prefix="og: https://ogp.me/ns#">
      <head>
        <HeadContent />
        {structuredData.map((entry, index) => (
          <script
            // The order matches the reviewed legacy page's schema blocks.
            key={`${entry["@type"]}-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(entry).replace(/</g, "\\u003c"),
            }}
          />
        ))}
        <noscript>
          <style>{`[data-aos] { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
