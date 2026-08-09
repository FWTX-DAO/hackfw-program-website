import { useEffect, useRef } from "react";

type MatrixRainProps = {
  className?: string;
  color?: string;
  characters?: string;
  fadeOpacity?: number;
  fontSize?: number;
  speed?: number;
};

export default function MatrixRain({
  className,
  color = "#e2673d",
  characters = "01",
  fadeOpacity = 0.08,
  fontSize = 16,
  speed = 0.45,
}: Readonly<MatrixRainProps>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || speed <= 0 || characters.length === 0) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const chars = characters.split("");
    let drops: number[] = [];
    let animationFrame = 0;
    let previousTime = 0;
    let elapsed = 0;
    const frameDuration = 33 / speed;

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const columnCount = Math.ceil(width / fontSize);
      drops = Array.from(
        { length: columnCount },
        () => Math.random() * -Math.max(12, height / fontSize),
      );
    };

    const draw = (time: number) => {
      if (previousTime === 0) previousTime = time;
      elapsed += time - previousTime;
      previousTime = time;

      if (elapsed >= frameDuration) {
        elapsed %= frameDuration;
        const { width, height } = canvas.getBoundingClientRect();

        // Fade only the existing glyphs so the canvas remains transparent and
        // the card's native grid and color treatment stay visible underneath.
        context.save();
        context.globalCompositeOperation = "destination-out";
        context.fillStyle = `rgb(0 0 0 / ${fadeOpacity})`;
        context.fillRect(0, 0, width, height);
        context.restore();

        context.fillStyle = color;
        context.font = `${fontSize}px "IBM Plex Mono", monospace`;

        for (let index = 0; index < drops.length; index += 1) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          context.fillText(char, index * fontSize, drops[index] * fontSize);

          if (drops[index] * fontSize > height && Math.random() > 0.975) {
            drops[index] = 0;
          }
          drops[index] += 1;
        }
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);
    resizeCanvas();
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, [characters, color, fadeOpacity, fontSize, speed]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
