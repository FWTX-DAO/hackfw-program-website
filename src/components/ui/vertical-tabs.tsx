"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import { cn } from "@/lib/utils";

const DEVPOST_URL = "https://hackfw.devpost.com";
const AUTO_PLAY_DURATION = 5_000;

const PROBLEM_TRACKS = [
  {
    id: "01",
    title: "AI for Manufacturing",
    description:
      "Instrument a real process. Agents, edge telemetry, maintenance, automation, and ERP/MES links are all fair game — as long as the gain is measurable.",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1400&auto=format&fit=crop",
    alt: "Welder fabricating metal in an industrial shop",
  },
  {
    id: "02",
    title: "Supply Chain Provenance / SRM",
    description:
      "Keep supplier relationships visible, verifiable, and current. Graphs, systems of record, and graph-RAG can turn CMMC 2.0 evidence into something a team can maintain.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1400&auto=format&fit=crop",
    alt: "Warehouse shelves and logistics inventory",
  },
  {
    id: "03",
    title: "Stablecoin Payments & Vendor Ops",
    description:
      "Shorten the time between approved work and a paid supplier. Settlement, approvals, and vendor workflows that improve time to payment keep working capital moving.",
    image:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1400&auto=format&fit=crop",
    alt: "Person reviewing payment and financial data",
  },
  {
    id: "04",
    title: "AI for Transportation",
    description:
      "Move freight with fewer surprises. BNSF's public problem set is inspection at network scale, predictive maintenance, yard and switch planning, load optimization, and dwell — with people still in the loop.",
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1400&auto=format&fit=crop",
    alt: "Freight train moving through an industrial landscape",
  },
] as const;

const slideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
  center: { zIndex: 1, y: 0, opacity: 1 },
  exit: (direction: number) => ({
    zIndex: 0,
    y: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

function ChevronLeftIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <path
        d="M15 18l-6-6 6-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <path
        d="M9 18l6-6-6-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function VerticalTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();
  const panelId = `${baseId}-panel`;

  const activate = useCallback(
    (index: number, nextDirection: number, { focus = false } = {}) => {
      if (index === activeIndex) return;
      setDirection(nextDirection);
      setActiveIndex(index);
      if (focus) {
        tabRefs.current[index]?.focus();
      }
    },
    [activeIndex],
  );

  const handleNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % PROBLEM_TRACKS.length;
    activate(nextIndex, 1);
  }, [activate, activeIndex]);

  const handlePrevious = useCallback(() => {
    const nextIndex =
      (activeIndex - 1 + PROBLEM_TRACKS.length) % PROBLEM_TRACKS.length;
    activate(nextIndex, -1);
  }, [activate, activeIndex]);

  const handleTabClick = (index: number) => {
    activate(index, index > activeIndex ? 1 : -1);
  };

  const handleTabsKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const lastIndex = PROBLEM_TRACKS.length - 1;
    let nextIndex: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (activeIndex + 1) % PROBLEM_TRACKS.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = (activeIndex - 1 + PROBLEM_TRACKS.length) % PROBLEM_TRACKS.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    activate(nextIndex, nextIndex > activeIndex ? 1 : -1, { focus: true });
  };

  useEffect(() => {
    if (isPaused || reduceMotion) return;

    const interval = window.setInterval(handleNext, AUTO_PLAY_DURATION);
    return () => window.clearInterval(interval);
  }, [handleNext, isPaused, reduceMotion]);

  const activeTrack = PROBLEM_TRACKS[activeIndex] ?? PROBLEM_TRACKS[0];
  const imageTransition = {
    y: { type: "spring" as const, stiffness: 260, damping: 32 },
    opacity: { duration: reduceMotion ? 0 : 0.4 },
  };

  return (
    <section
      className="problem-tracks"
      aria-labelledby="problem-tracks-title"
      data-aos="fade-up"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="problem-tracks__layout">
        <div className="problem-tracks__content">
          <div className="problem-tracks__header">
            <h2 id="problem-tracks-title">Pick a system to move</h2>
            <span className="problem-tracks__kicker">(PROBLEM TRACKS)</span>
          </div>

          <div
            className="problem-tracks__tabs"
            role="tablist"
            aria-label="HackFW problem tracks"
            aria-orientation="vertical"
            onKeyDown={handleTabsKeyDown}
          >
            {PROBLEM_TRACKS.map((track, index) => {
              const isActive = index === activeIndex;
              const tabId = `${baseId}-tab-${track.id}`;

              return (
                <div
                  key={track.id}
                  className={cn(
                    "problem-tracks__item",
                    isActive && "is-active",
                  )}
                >
                  <span className="problem-tracks__progress" aria-hidden="true">
                    {isActive && (
                      <motion.span
                        key={`progress-${track.id}-${isPaused}-${reduceMotion}`}
                        className="problem-tracks__progress-fill"
                        initial={{ height: "0%" }}
                        animate={{
                          height:
                            isPaused || reduceMotion ? "0%" : "100%",
                        }}
                        transition={{
                          duration: AUTO_PLAY_DURATION / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                  </span>
                  <button
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    id={tabId}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={panelId}
                    tabIndex={isActive ? 0 : -1}
                    className="problem-tracks__tab"
                    onClick={() => handleTabClick(index)}
                  >
                    <span className="problem-tracks__number">/{track.id}</span>
                    <span className="problem-tracks__tab-title">
                      {track.title}
                    </span>
                  </button>
                  <AnimatePresence initial={false} mode="wait">
                    {isActive && (
                      <motion.div
                        key={`copy-${track.id}`}
                        className="problem-tracks__copy"
                        initial={
                          reduceMotion
                            ? false
                            : { opacity: 0, height: 0, y: 8 }
                        }
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={
                          reduceMotion
                            ? undefined
                            : { opacity: 0, height: 0, y: -12 }
                        }
                        transition={{
                          duration: 0.3,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                      >
                        <p>{track.description}</p>
                        <a
                          href={DEVPOST_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Build this track
                          <span aria-hidden="true">↗</span>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <div
          id={panelId}
          className="problem-tracks__gallery"
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${activeTrack.id}`}
        >
          <div className="problem-tracks__image-wrap">
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={activeTrack.id}
                custom={direction}
                variants={slideVariants}
                initial={reduceMotion ? false : "enter"}
                animate="center"
                exit={reduceMotion ? undefined : "exit"}
                transition={imageTransition}
                className="problem-tracks__image-slide"
                onClick={handleNext}
              >
                <img
                  src={activeTrack.image}
                  alt={activeTrack.alt}
                  className="problem-tracks__image"
                  width="1400"
                  height="962"
                  loading="lazy"
                  decoding="async"
                />
                <div className="problem-tracks__image-shade" />
              </motion.div>
            </AnimatePresence>

            <div className="problem-tracks__controls">
              <motion.button
                type="button"
                aria-label="Previous problem track"
                onClick={(event) => {
                  event.stopPropagation();
                  handlePrevious();
                }}
                whileTap={{ scale: 0.96 }}
              >
                <ChevronLeftIcon />
              </motion.button>
              <motion.button
                type="button"
                aria-label="Next problem track"
                onClick={(event) => {
                  event.stopPropagation();
                  handleNext();
                }}
                whileTap={{ scale: 0.96 }}
              >
                <ChevronRightIcon />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
