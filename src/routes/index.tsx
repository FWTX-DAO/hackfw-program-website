import { createFileRoute } from "@tanstack/react-router";
import parse, {
  Element as DomElement,
  type HTMLReactParserOptions,
} from "html-react-parser";
import { useEffect } from "react";

import { HackFwBuilderPipeline } from "@/components/hackfw-builder-pipeline";
import { HeroSpline } from "@/components/hero-spline";
import { WinningSystemFeatures } from "@/components/winning-system-features";
import landingMarkup from "@/landing.html?raw";

const parserOptions: HTMLReactParserOptions = {
  replace(domNode) {
    if (
      domNode instanceof DomElement &&
      domNode.attribs.id === "hero-spline-root"
    ) {
      return <HeroSpline />;
    }

    if (
      domNode instanceof DomElement &&
      domNode.attribs.id === "winning-system-root"
    ) {
      return <WinningSystemFeatures />;
    }

    if (
      domNode instanceof DomElement &&
      domNode.attribs.id === "hackfw-builder-pipeline-root"
    ) {
      return <HackFwBuilderPipeline />;
    }
  },
};

export const Route = createFileRoute("/")({
  component: HackFwLandingPage,
});

function HackFwLandingPage() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-aos]"),
    );
    const revealAll = () => {
      for (const element of elements) {
        element.classList.add("is-visible");
      }
    };

    document.documentElement.classList.add("motion-ready");

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealAll();
      return () => document.documentElement.classList.remove("motion-ready");
    }

    const revealTimeout = window.setTimeout(revealAll, 1_600);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    for (const element of elements) {
      const delay = Number(element.dataset.aosDelay ?? 0);
      const duration = Number(element.dataset.aosDuration ?? 700);
      element.style.transitionDelay = `${delay}ms`;
      element.style.transitionDuration = `${duration}ms`;
      observer.observe(element);
    }

    return () => {
      window.clearTimeout(revealTimeout);
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return parse(landingMarkup, parserOptions);
}
