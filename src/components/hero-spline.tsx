"use client";

import {
  Component,
  type ErrorInfo,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import type { Application } from "@splinetool/runtime";

import { Card } from "@/components/ui/card";
import { SplineScene } from "@/components/ui/splite";

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
  const [sceneRequested, setSceneRequested] = useState(false);
  const applicationRef = useRef<Application | null>(null);
  const enabledRef = useRef(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean };
    }).connection;
    const updatePreference = () => {
      const enabled = !preference.matches && !connection?.saveData;
      setSceneEnabled(enabled);
      if (enabled) setSceneRequested(true);
    };
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    enabledRef.current = sceneEnabled;
    if (sceneEnabled) applicationRef.current?.play();
    else applicationRef.current?.stop();
  }, [sceneEnabled]);

  const fallback = <StaticSystemFallback />;

  return (
    <Card
      className="hero-spline-card relative h-full w-full overflow-hidden border-0 bg-transparent text-white shadow-none"
      role="group"
      aria-label="Three-dimensional industrial compute system"
    >
      <div className="hero-spline-card__grid" aria-hidden="true" />
      <div className="hero-spline-card__glow" aria-hidden="true" />

      <div className="hero-spline-card__viewport">
        {!sceneLoaded && fallback}
        {sceneRequested ? (
          <SplineBoundary fallback={null}>
            <SplineScene
              scene={SCENE_URL}
              className="h-full w-full"
              onLoad={(application) => {
                applicationRef.current = application;
                if (!enabledRef.current) application.stop();
                setSceneLoaded(true);
              }}
            />
          </SplineBoundary>
        ) : null}
      </div>

      <button
        type="button"
        className="hero-spline-card__motion-control"
        onClick={() => {
          setSceneRequested(true);
          setSceneEnabled((enabled) => !enabled);
        }}
      >
        {sceneEnabled ? "Pause animation" : "Play animation"}
      </button>

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
