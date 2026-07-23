import { useId, type ReactNode } from "react";

const bubblePath =
  "M88,168c-44.18,0-80-35.82-80-80S43.82,8,88,8c17.57,0,33.78,5.66,46.97,15.26C147.19,32.16,160.91,40,176,40s28.81-7.84,41.03-16.74C230.22,13.66,246.43,8,264,8c44.18,0,80,35.82,80,80s-35.82,80-80,80c-17.57,0-33.78-5.66-46.97-15.26C204.81,143.84,191.09,136,176,136s-28.81,7.84-41.03,16.74C121.78,162.34,105.57,168,88,168Z";

interface MergingBubblesProps {
  startIcon: ReactNode;
  endIcon: ReactNode;
  label: string;
}

function MergingBubbles({
  startIcon,
  endIcon,
  label,
}: MergingBubblesProps) {
  const gradientId = useId();

  return (
    <div
      className="builder-pipeline__organizer-bubbles"
      role="group"
      aria-label={label}
    >
      <svg
        aria-hidden="true"
        className="builder-pipeline__bubble-frame"
        viewBox="-24 0 400 176"
        fill="none"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="18"
            y1="18"
            x2="330"
            y2="158"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--amber)" stopOpacity="0.55" />
            <stop offset="0.48" stopColor="white" stopOpacity="0.11" />
            <stop offset="1" stopColor="var(--cyber)" stopOpacity="0.42" />
          </linearGradient>
        </defs>
        <path
          d={bubblePath}
          stroke="rgba(0, 0, 0, 0.34)"
          strokeWidth="16"
        />
        <path
          d={bubblePath}
          fill="rgba(19, 19, 30, 0.9)"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
        />
        <path
          d={bubblePath}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeDasharray="2 7"
        />
      </svg>

      <div className="builder-pipeline__bubble-icon builder-pipeline__bubble-icon--start">
        {startIcon}
      </div>
      <span className="builder-pipeline__bubble-plus" aria-hidden="true">
        +
      </span>
      <div className="builder-pipeline__bubble-icon builder-pipeline__bubble-icon--end">
        {endIcon}
      </div>
    </div>
  );
}

function BeginnerMark() {
  return (
    <svg viewBox="0 0 32 32" role="img" aria-label="Beginner">
      <circle cx="16" cy="10" r="5" />
      <path d="M7.5 26c.8-5.3 3.6-8 8.5-8s7.7 2.7 8.5 8" />
    </svg>
  );
}

function BuilderMark() {
  return (
    <svg viewBox="0 0 32 32" role="img" aria-label="Value-Add Builder">
      <path d="M16 3.5 19.2 9l6.3 1.3-4.3 4.8.7 6.4-5.9-2.6-5.9 2.6.7-6.4-4.3-4.8L12.8 9 16 3.5Z" />
      <path d="M9.5 24.5h13" />
      <path d="m13 28 3-3.5 3 3.5" />
    </svg>
  );
}

export function HackFwBuilderPipeline() {
  return (
    <div className="builder-pipeline" data-aos="fade-up">
      <div className="builder-pipeline__intro">
        <p>HackFW Builder Program</p>
        <h3>From first build to industrial value</h3>
      </div>

      <ol
        className="builder-pipeline__stages"
        aria-label="HackFW builder transformation"
      >
        <li className="builder-pipeline__stage builder-pipeline__stage--input">
          <span className="builder-pipeline__stage-type">Input</span>
          <span className="builder-pipeline__stage-mark">
            <BeginnerMark />
          </span>
          <strong>Beginner</strong>
          <small>Curious and ready to build</small>
        </li>

        <li className="builder-pipeline__connector" aria-hidden="true">
          <span />
        </li>

        <li className="builder-pipeline__stage builder-pipeline__stage--program">
          <span className="builder-pipeline__stage-type">Program</span>
          <span className="builder-pipeline__program-mark">
            <img
              src="https://cdn.fwtx.city/logo.svg"
              alt=""
              width="54"
              height="54"
              loading="lazy"
              decoding="async"
            />
          </span>
          <strong>HackFW</strong>
          <small>Build, test, and compound</small>
        </li>

        <li className="builder-pipeline__connector" aria-hidden="true">
          <span />
        </li>

        <li className="builder-pipeline__stage builder-pipeline__stage--output">
          <span className="builder-pipeline__stage-type">Output</span>
          <span className="builder-pipeline__stage-mark">
            <BuilderMark />
          </span>
          <strong>Value-Add Builder</strong>
          <small>Ready to create durable systems</small>
        </li>
      </ol>

      <div className="builder-pipeline__organizers">
        <div>
          <p className="builder-pipeline__organizer-kicker">
            Program Organizers
          </p>
          <p className="builder-pipeline__organizer-copy">
            Fort Worth DAO brings the builder network. MADE brings the
            manufacturing challenge and industry pathway.
          </p>
        </div>

        <MergingBubbles
          label="Fort Worth DAO and MADE Challenge"
          startIcon={
            <a
              href="https://fwtx.city"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Fort Worth DAO"
            >
              <img
                src="/fwtx-dao.avif"
                alt="Fort Worth DAO"
                width="200"
                height="68"
                loading="lazy"
                decoding="async"
              />
            </a>
          }
          endIcon={
            <a
              href="https://www.techfortworth.org/made-manufacturing-accelerator"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the MADE Manufacturing Accelerator"
            >
              <img
                src="/sponsors/made-logo.png"
                alt="MADE Manufacturing Accelerator and Development Engine"
                width="1600"
                height="600"
                loading="lazy"
                decoding="async"
              />
            </a>
          }
        />
      </div>

      <p className="builder-pipeline__caption">
        Organized by Fort Worth DAO in partnership with the MADE Challenge
      </p>
    </div>
  );
}
