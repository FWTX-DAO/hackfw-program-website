"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  useCallback,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import { cn } from "@/lib/utils";

const DEVPOST_URL = "https://hackfw.devpost.com";
const TALENT_URL = "https://talent.fwtx.city";
const DEMO_DAY_URL = "https://luma.com/ygyxb4yy";

const PROBLEM_TRACKS = [
  {
    id: "01",
    title: "AI for Manufacturing",
    summary:
      "Computer vision and robotics on the plant floor. Treat the line the way a grocery store treats self-checkout: overhead cameras watching every station, catching missing parts, defects, unsafe motion, and stalled work before they become scrap.",
    useCases: [
      "Overhead and station cameras for tracking, spotting, and monitoring parts, tools, and people on the line",
      "In-process quality: wrong assembly, missing fasteners, surface defects, cycle-time stalls",
      "Safe robot and drone VSLAM through a live factory — localize, map occupancy, move without colliding, keep a human in the loop",
    ],
    stack:
      "OpenCV or YOLO · ROS 2 · NVIDIA Isaac Visual SLAM / Nvblox · Jetson at the cell · MQTT or OPC-UA into MES/ERP",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1400&auto=format&fit=crop",
    alt: "Welder fabricating metal in an industrial shop",
  },
  {
    id: "02",
    title: "Supplier Relationship Management",
    summary:
      "Make the supplier graph, the order line, and the payment the same living system. Knowledge graphs keep relationships current. An API-first MES/ERP — or a clean adapter — publishes production and order status upstream and downstream. Modern payment rails, including stablecoins where they shorten time-to-pay, close vendor ops.",
    useCases: [
      "A knowledge graph of suppliers, parts, certifications, and live order state",
      "API-first MES/ERP, or an adapter, sharing production and order-line expectations with customers and suppliers",
      "Vendor ops and settlement: approvals, reconciliation, and working-capital velocity — including stablecoin rails where they beat correspondent-bank delay",
    ],
    stack:
      "Neo4j, RDF, or typed Postgres · REST/OpenAPI into the MES/ERP you have · Circle, Stripe, or USDC with an audit trail · a buyer workflow that replaces the spreadsheet",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1400&auto=format&fit=crop",
    alt: "Warehouse shelves and logistics inventory",
  },
  {
    id: "03",
    title: "AI for Transportation",
    summary:
      "Computer vision for track and railroad maintenance. Inspect at network scale, rank the work, and keep people in the loop.",
    useCases: [
      "Track geometry, fastener, and surface inspection from locomotive, wayside, or drone cameras",
      "Defect detection that flags, localizes, and ranks work before it becomes a slow-order or a failure",
      "Predictive maintenance that turns vision plus sensor history into a crew-ready work order",
    ],
    stack:
      "YOLO or a vision transformer on an edge GPU · GPS + IMU onto the milepost · a defect map the maintenance desk already uses · human review before any railroad action",
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1400&auto=format&fit=crop",
    alt: "Freight train moving through an industrial landscape",
  },
] as const;

const SUBMISSION_RULES = [
  {
    title: "Problem track",
    body: "Name which of the three tracks you submitted toward: AI for Manufacturing, Supplier Relationship Management, or AI for Transportation.",
  },
  {
    title: "GitHub link",
    body: "Include a public repository for the working solution.",
  },
  {
    title: "Video demo",
    body: "Include a brief recording of the system running end to end.",
  },
  {
    title: "Talent registration",
    body: "Confirm every participant is registered in the Fort Worth DAO Talent Database at",
    href: TALENT_URL,
    hrefLabel: "talent.fwtx.city",
  },
  {
    title: "In-person Demo Day",
    body: "Every team must attend Demo Day in person for judging:",
    href: DEMO_DAY_URL,
    hrefLabel: "luma.com/ygyxb4yy",
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

  const activeTrack = PROBLEM_TRACKS[activeIndex] ?? PROBLEM_TRACKS[0];
  const imageTransition = {
    y: { type: "spring" as const, stiffness: 260, damping: 32 },
    opacity: { duration: reduceMotion ? 0 : 0.4 },
  };

  return (
    <section
      className="problem-tracks"
      id="problem-tracks"
      aria-labelledby="problem-tracks-title"
      data-aos="fade-up"
    >
      <div className="problem-tracks__layout">
        <div className="problem-tracks__content">
          <div className="problem-tracks__header">
            <h2 id="problem-tracks-title">Pick a system to move</h2>
            <span className="problem-tracks__kicker">(PROBLEM TRACKS)</span>
            <p className="problem-tracks__lede">
              Three industrial surfaces. Pick one. Ship a system a plant, a
              supplier desk, or a railroad could actually run. Stacks below are
              starting points, not a mandate.
            </p>
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
                      <span className="problem-tracks__progress-fill" />
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
                        <p className="problem-tracks__summary">
                          {track.summary}
                        </p>
                        <p className="problem-tracks__label">Where to aim</p>
                        <ul className="problem-tracks__list">
                          {track.useCases.map((useCase) => (
                            <li key={useCase}>{useCase}</li>
                          ))}
                        </ul>
                        <p className="problem-tracks__label">
                          Recommended stack
                        </p>
                        <p className="problem-tracks__stack">{track.stack}</p>
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

      <div
        className="problem-tracks__submit"
        id="how-to-submit"
        aria-labelledby="how-to-submit-title"
      >
        <div className="problem-tracks__submit-main">
          <p className="problem-tracks__submit-kicker">
            Devpost requirements
          </p>
          <h3 id="how-to-submit-title">How to submit</h3>
          <p>
            Submit on{" "}
            <a
              href={DEVPOST_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              hackfw.devpost.com
            </a>
            . Copy these five items into your submission — they are judged as a
            set.
          </p>
          <ol className="problem-tracks__rules">
            {SUBMISSION_RULES.map((rule) => (
              <li key={rule.title}>
                <span>
                  <strong>{rule.title}.</strong> {rule.body}
                  {"href" in rule && rule.href ? (
                    <>
                      {" "}
                      <a
                        href={rule.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {rule.hrefLabel}
                      </a>
                      .
                    </>
                  ) : null}
                </span>
              </li>
            ))}
          </ol>
          <a
            className="btn btn-primary problem-tracks__submit-cta"
            href={DEVPOST_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Submit on Devpost
          </a>
        </div>
        <div className="problem-tracks__submit-note">
          <p className="problem-tracks__submit-kicker">Build standard</p>
          <h3>Ship it like a product</h3>
          <p>
            Mind the ergonomics of your code. Teammates, judges, and a plant
            engineer should be able to clone, run, and maintain it. Prefer a
            thin end-to-end path — capture, decide, act — over a pile of
            notebooks. README, environment, and a demo that boots. Think like a
            bootstrapped startup taking a pilot to a floor, not a weekend
            prototype that dies on a laptop.
          </p>
        </div>
      </div>
    </section>
  );
}
