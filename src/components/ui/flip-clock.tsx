"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type FlipClockProps = {
  targetDate: string;
};

const EMPTY_TIME: TimeRemaining = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function getTimeRemaining(targetDate: string): TimeRemaining {
  const remaining = Math.max(0, new Date(targetDate).getTime() - Date.now());

  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
    seconds: Math.floor((remaining / 1_000) % 60),
  };
}

function Digit({ value }: Readonly<{ value: string }>) {
  const reduceMotion = useReducedMotion();

  return (
    <span className="relative flex h-11 w-7 items-center justify-center overflow-hidden border border-[var(--border)] bg-[rgb(13_14_13_/_0.82)] font-mono text-lg font-bold tabular-nums text-[var(--text)] sm:h-14 sm:w-9 sm:text-2xl">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          initial={reduceMotion ? { opacity: 0 } : { y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { y: 28, opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.3, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function TimeUnit({
  label,
  value,
}: Readonly<{
  label: string;
  value: number;
}>) {
  const digits = String(value).padStart(label === "Days" ? 3 : 2, "0");

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1" aria-hidden="true">
        {digits.split("").map((digit, index) => (
          <Digit key={`${label}-${index}`} value={digit} />
        ))}
      </div>
      <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
        {label}
      </span>
    </div>
  );
}

export default function FlipClock({ targetDate }: Readonly<FlipClockProps>) {
  const [remaining, setRemaining] = useState<TimeRemaining>(EMPTY_TIME);
  const kickoffLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "America/Chicago",
      }).format(new Date(targetDate)),
    [targetDate],
  );

  useEffect(() => {
    setRemaining(getTimeRemaining(targetDate));
    const interval = window.setInterval(
      () => setRemaining(getTimeRemaining(targetDate)),
      1_000,
    );

    return () => window.clearInterval(interval);
  }, [targetDate]);

  return (
    <section
      className="my-8 border-y border-[var(--border)] py-5"
      aria-label={`Countdown to HackFW kickoff on ${kickoffLabel}`}
    >
      <p className="mb-4 text-center font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--amber-bright)]">
        Time until HackFW kickoff
      </p>
      <div className="flex items-start justify-center gap-2 sm:gap-3">
        <TimeUnit label="Days" value={remaining.days} />
        <TimeUnit label="Hours" value={remaining.hours} />
        <TimeUnit label="Minutes" value={remaining.minutes} />
        <TimeUnit label="Seconds" value={remaining.seconds} />
      </div>
    </section>
  );
}
