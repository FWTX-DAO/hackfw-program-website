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
  "The HackFW MADE Challenge combines industrial hardware, sovereign edge data, and AI compute for thermal management, power safety, and predictive maintenance. In-person kickoff, month-long virtual incubation, and in-person Enterprise Demo Day.";
const socialImage = "https://cdn.fwtx.city/ogimage.png";

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
          "HackFW, MADE Challenge, TechFW MADE, Fort Worth hackathon, industrial AI, advanced manufacturing, edge computing, Web3 data sovereignty, predictive maintenance",
      },
      { name: "author", content: "Fort Worth DAO LCA" },
      {
        name: "robots",
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "theme-color", content: "#D4931A" },
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
      { property: "og:site_name", content: "HackFW" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "HackFW MADE Challenge - Rebuilding System Density",
      },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: socialImage },
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
        href: "/hackfw-flywheel.png",
        type: "image/png",
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
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
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
