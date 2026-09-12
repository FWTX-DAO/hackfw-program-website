"use client";

import { useEffect, useState } from "react";

type ProgramCountdownProps = {
  targetDate: string;
  endDate: string;
};

export default function FlipClock({ targetDate, endDate }: Readonly<ProgramCountdownProps>) {
  const [now, setNow] = useState<number | null>(null);
  const startsAt = new Date(targetDate).getTime();
  const endsAt = new Date(endDate).getTime();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const update = () => {
      const currentTime = Date.now();
      setNow(currentTime);
      const nextBoundary = currentTime < startsAt ? startsAt : endsAt;
      if (currentTime < endsAt) {
        timeout = setTimeout(update, Math.min(60_000, nextBoundary - currentTime));
      }
    };
    update();
    return () => clearTimeout(timeout);
  }, [startsAt, endsAt]);

  const inProgress = now !== null && now >= startsAt && now < endsAt;
  const complete = now !== null && now >= endsAt;
  const remaining = Math.max(0, startsAt - (now ?? startsAt));
  const units = [
    ["Days", Math.floor(remaining / 86_400_000)],
    ["Hours", Math.floor((remaining / 3_600_000) % 24)],
    ["Minutes", Math.floor((remaining / 60_000) % 60)],
  ] as const;

  return (
    <section className="kickoff-countdown" aria-label="HackFW program status">
      <p className="kickoff-countdown__status" role="status">
        {inProgress ? (
          <span className="kickoff-countdown__in-progress">IN PROGRESS</span>
        ) : complete ? "Program complete" : null}
      </p>
      {inProgress || complete ? (
        <p>October 1–30, 2026</p>
      ) : (
        <>
          <p className="kickoff-countdown__title">Time until HackFW</p>
          {now === null ? <p>October 1–30, 2026</p> : (
            <dl className="kickoff-countdown__units">
              {units.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{String(value).padStart(2, "0")}</dd>
                </div>
              ))}
            </dl>
          )}
        </>
      )}
    </section>
  );
}
