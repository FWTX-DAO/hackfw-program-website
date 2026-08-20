import { createFileRoute } from "@tanstack/react-router";
import parse, {
  Element as DomElement,
  type HTMLReactParserOptions,
} from "html-react-parser";
import { useEffect } from "react";

import {
  HackFwInnovationFlywheel,
  HackFwOrganizerFusion,
} from "@/components/hackfw-builder-pipeline";
import { HeroSpline } from "@/components/hero-spline";
import FlipClock from "@/components/ui/flip-clock";
import MatrixRain from "@/components/ui/matrix-code";
import VerticalTabs from "@/components/ui/vertical-tabs";
import { WinningSystemFeatures } from "@/components/winning-system-features";
import landingMarkup from "@/landing.html?raw";

const LUMA_CHECKOUT_SCRIPT_ID = "luma-checkout";
const LUMA_CHECKOUT_SCRIPT_SRC = "https://embed.lu.ma/checkout-button.js";

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
      domNode.attribs.id === "matrix-rain-root"
    ) {
      return (
        <MatrixRain
          className="site-matrix-background"
          color="rgb(226 103 61 / 0.16)"
          characters="01"
          fadeOpacity={0.06}
          fontSize={18}
          speed={0.2}
        />
      );
    }

    if (
      domNode instanceof DomElement &&
      domNode.attribs.id === "kickoff-countdown-root"
    ) {
      return <FlipClock targetDate="2026-10-01T00:00:00-05:00" />;
    }

    if (
      domNode instanceof DomElement &&
      domNode.attribs.id === "winning-system-root"
    ) {
      return <WinningSystemFeatures />;
    }

    if (
      domNode instanceof DomElement &&
      domNode.attribs.id === "problem-tracks-root"
    ) {
      return <VerticalTabs />;
    }

    if (
      domNode instanceof DomElement &&
      domNode.attribs.id === "hackfw-innovation-flywheel-root"
    ) {
      return <HackFwInnovationFlywheel />;
    }

    if (
      domNode instanceof DomElement &&
      domNode.attribs.id === "hackfw-organizer-fusion-root"
    ) {
      return <HackFwOrganizerFusion />;
    }
  },
};

export const Route = createFileRoute("/")({
  component: HackFwLandingPage,
});

function HackFwLandingPage() {
  useEffect(() => {
    if (document.getElementById(LUMA_CHECKOUT_SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = LUMA_CHECKOUT_SCRIPT_ID;
    script.src = LUMA_CHECKOUT_SCRIPT_SRC;
    script.async = true;
    document.body.append(script);
  }, []);

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
