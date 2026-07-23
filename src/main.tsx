import { createRoot } from "react-dom/client";

import { HeroSpline } from "@/components/hero-spline";
import "@/styles.css";

const heroSplineRoot = document.getElementById("hero-spline-root");

if (heroSplineRoot) {
  createRoot(heroSplineRoot).render(<HeroSpline />);
}
