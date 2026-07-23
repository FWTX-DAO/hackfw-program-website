import { useId, type ReactNode } from "react";

const bubblePath =
  "M88,168c-44.18,0-80-35.82-80-80S43.82,8,88,8c17.57,0,33.78,5.66,46.97,15.26C147.19,32.16,160.91,40,176,40s28.81-7.84,41.03-16.74C230.22,13.66,246.43,8,264,8c44.18,0,80,35.82,80,80s-35.82,80-80,80c-17.57,0-33.78-5.66-46.97-15.26C204.81,143.84,191.09,136,176,136s-28.81,7.84-41.03,16.74C121.78,162.34,105.57,168,88,168Z";

interface MergingBubblesProps {
  className?: string;
  startIcon: ReactNode;
  endIcon: ReactNode;
  label: string;
}

function MergingBubbles({
  className = "",
  startIcon,
  endIcon,
  label,
}: MergingBubblesProps) {
  const gradientId = useId();

  return (
    <div
      className={`merging-bubbles ${className}`.trim()}
      role="group"
      aria-label={label}
    >
      <svg
        aria-hidden="true"
        className="merging-bubbles__frame"
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
            <stop stopColor="var(--amber)" stopOpacity="0.62" />
            <stop offset="0.48" stopColor="white" stopOpacity="0.12" />
            <stop offset="1" stopColor="var(--cyber)" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d={bubblePath}
          stroke="rgba(0, 0, 0, 0.38)"
          strokeWidth="16"
        />
        <path
          d={bubblePath}
          fill="rgba(19, 19, 30, 0.94)"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
        />
        <path
          d={bubblePath}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeDasharray="2 7"
        />
      </svg>

      <div className="merging-bubbles__icon merging-bubbles__icon--start">
        {startIcon}
      </div>
      <span className="merging-bubbles__plus" aria-hidden="true">
        +
      </span>
      <div className="merging-bubbles__icon merging-bubbles__icon--end">
        {endIcon}
      </div>
    </div>
  );
}

function FortWorthDaoLogo() {
  return (
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
  );
}

function MadeLogo() {
  return (
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
  );
}

function BeginnerMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="10" r="5" />
      <path d="M7.5 26c.8-5.3 3.6-8 8.5-8s7.7 2.7 8.5 8" />
    </svg>
  );
}

function BuilderMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 3.5 19.2 9l6.3 1.3-4.3 4.8.7 6.4-5.9-2.6-5.9 2.6.7-6.4-4.3-4.8L12.8 9 16 3.5Z" />
      <path d="M9.5 24.5h13" />
      <path d="m13 28 3-3.5 3 3.5" />
    </svg>
  );
}

interface FlywheelStageProps {
  className: string;
  type: string;
  title: string;
  description: string;
  icon: ReactNode;
}

function FlywheelStage({
  className,
  type,
  title,
  description,
  icon,
}: FlywheelStageProps) {
  return (
    <li className={`builder-flywheel__stage ${className}`}>
      <span className="builder-flywheel__stage-type">{type}</span>
      <span className="builder-flywheel__stage-mark">{icon}</span>
      <strong>{title}</strong>
      <small>{description}</small>
    </li>
  );
}

function FlywheelPaths() {
  const amberMarkerId = useId();
  const cyberMarkerId = useId();

  return (
    <>
      <svg
        aria-hidden="true"
        className="builder-flywheel__loop builder-flywheel__loop--desktop"
        viewBox="0 0 720 440"
        fill="none"
      >
        <defs>
          <marker
            id={amberMarkerId}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M1 1 9 5 1 9" stroke="var(--amber-bright)" />
          </marker>
          <marker
            id={cyberMarkerId}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M1 1 9 5 1 9" stroke="var(--cyber)" />
          </marker>
        </defs>
        <path
          className="builder-flywheel__loop-track"
          d="M220 260C240 185 285 122 324 106"
        />
        <path
          className="builder-flywheel__loop-track"
          d="M396 106C445 133 484 190 500 260"
        />
        <path
          className="builder-flywheel__loop-track"
          d="M480 350C410 418 310 418 240 350"
        />
        <path
          className="builder-flywheel__loop-flow builder-flywheel__loop-flow--amber"
          d="M220 260C240 185 285 122 324 106"
          markerEnd={`url(#${amberMarkerId})`}
        />
        <path
          className="builder-flywheel__loop-flow builder-flywheel__loop-flow--cyber"
          d="M396 106C445 133 484 190 500 260"
          markerEnd={`url(#${cyberMarkerId})`}
        />
        <path
          className="builder-flywheel__loop-flow builder-flywheel__loop-flow--return"
          d="M480 350C410 418 310 418 240 350"
          markerEnd={`url(#${cyberMarkerId})`}
        />
      </svg>

      <svg
        aria-hidden="true"
        className="builder-flywheel__loop builder-flywheel__loop--mobile"
        viewBox="0 0 340 660"
        fill="none"
      >
        <defs>
          <marker
            id={`${amberMarkerId}-mobile`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M1 1 9 5 1 9" stroke="var(--amber-bright)" />
          </marker>
          <marker
            id={`${cyberMarkerId}-mobile`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M1 1 9 5 1 9" stroke="var(--cyber)" />
          </marker>
        </defs>
        <path className="builder-flywheel__loop-track" d="M145 205V245" />
        <path className="builder-flywheel__loop-track" d="M145 400V440" />
        <path
          className="builder-flywheel__loop-track"
          d="M230 520C300 520 312 478 312 420V140C312 102 280 85 230 85"
        />
        <path
          className="builder-flywheel__loop-flow builder-flywheel__loop-flow--amber"
          d="M145 205V245"
          markerEnd={`url(#${amberMarkerId}-mobile)`}
        />
        <path
          className="builder-flywheel__loop-flow builder-flywheel__loop-flow--cyber"
          d="M145 400V440"
          markerEnd={`url(#${cyberMarkerId}-mobile)`}
        />
        <path
          className="builder-flywheel__loop-flow builder-flywheel__loop-flow--return"
          d="M230 520C300 520 312 478 312 420V140C312 102 280 85 230 85"
          markerEnd={`url(#${cyberMarkerId}-mobile)`}
        />
      </svg>
    </>
  );
}

export function HackFwInnovationFlywheel() {
  return (
    <div className="builder-flywheel" data-aos="fade-up">
      <ol
        className="builder-flywheel__cycle"
        aria-label="Beginner joins HackFW, becomes a Value-Add Builder, and shares knowledge with the next beginner"
      >
        <FlywheelPaths />
        <FlywheelStage
          className="builder-flywheel__stage--beginner"
          type="Start"
          title="Beginner"
          description="Curious and ready to build"
          icon={<BeginnerMark />}
        />
        <FlywheelStage
          className="builder-flywheel__stage--program"
          type="Program"
          title="HackFW"
          description="Build, test, and compound"
          icon={
            <img
              src="https://cdn.fwtx.city/logo.svg"
              alt=""
              width="54"
              height="54"
              loading="lazy"
              decoding="async"
            />
          }
        />
        <FlywheelStage
          className="builder-flywheel__stage--builder"
          type="Outcome"
          title="Value-Add Builder"
          description="Ready to create durable systems"
          icon={<BuilderMark />}
        />
        <li className="builder-flywheel__return-label">
          <span>Share Knowledge</span>
          <small>Build the next builder</small>
        </li>
      </ol>
    </div>
  );
}

export function HackFwOrganizerFusion() {
  return (
    <div className="organizer-fusion" data-aos="fade-up">
      <MergingBubbles
        className="organizer-fusion__bubbles"
        label="Fort Worth DAO and MADE Challenge"
        startIcon={<FortWorthDaoLogo />}
        endIcon={<MadeLogo />}
      />
    </div>
  );
}
