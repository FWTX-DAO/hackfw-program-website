"use client";

import {
  Component,
  type ErrorInfo,
  type ReactNode,
  useEffect,
  useState,
} from "react";

import { Card } from "@/components/ui/card";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

const SCENE_URL =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

type SplineBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type SplineBoundaryState = {
  failed: boolean;
};

class SplineBoundary extends Component<
  SplineBoundaryProps,
  SplineBoundaryState
> {
  state: SplineBoundaryState = { failed: false };

  static getDerivedStateFromError(): SplineBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("HackFW Spline scene failed to render", error, info);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function StaticSystemFallback() {
  return (
    <div className="spline-static" aria-hidden="true">
      <span className="spline-static__core" />
      <span className="spline-static__orbit spline-static__orbit--one" />
      <span className="spline-static__orbit spline-static__orbit--two" />
      <span className="spline-static__node spline-static__node--amber" />
      <span className="spline-static__node spline-static__node--cyber" />
    </div>
  );
}

export function HeroSpline() {
  const [sceneEnabled, setSceneEnabled] = useState(false);
  const [sceneLoaded, setSceneLoaded] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean };
      }
    ).connection;

    setSceneEnabled(!reduceMotion && !connection?.saveData);
  }, []);

  const fallback = <StaticSystemFallback />;

  return (
    <Card
      className="hero-spline-card relative h-full w-full overflow-hidden border-0 bg-transparent text-white shadow-none"
      role="img"
      aria-label="Interactive three-dimensional industrial compute system"
    >
      <Spotlight
        className="z-20"
        size={360}
        springOptions={{ bounce: 0, duration: 0.3 }}
      />

      <div className="hero-spline-card__grid" aria-hidden="true" />
      <div className="hero-spline-card__glow" aria-hidden="true" />

      <div className="hero-spline-card__viewport">
        {!sceneLoaded && fallback}
        {sceneEnabled ? (
          <SplineBoundary fallback={null}>
            <SplineScene
              scene={SCENE_URL}
              className="h-full w-full"
              onLoad={() => setSceneLoaded(true)}
            />
          </SplineBoundary>
        ) : null}
      </div>

      <div className="hero-spline-card__status" aria-hidden="true">
        <span />
        Forged in Fort Worth
      </div>
      <div className="hero-spline-card__telemetry" aria-hidden="true">
        <span>EDGE</span>
        <span>AI</span>
        <span>HARDWARE</span>
      </div>
    </Card>
  );
}
