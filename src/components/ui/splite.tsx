"use client";

import { lazy, Suspense, type ComponentProps } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

type SplineSceneProps = Pick<
  ComponentProps<typeof Spline>,
  "scene" | "className" | "onLoad"
>;

export function SplineScene({
  scene,
  className,
  onLoad,
}: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div
          className="flex h-full w-full items-center justify-center"
          role="status"
          aria-label="Loading interactive industrial system"
        >
          <span className="spline-loader" />
        </div>
      }
    >
      <Spline scene={scene} className={className} onLoad={onLoad} />
    </Suspense>
  );
}
