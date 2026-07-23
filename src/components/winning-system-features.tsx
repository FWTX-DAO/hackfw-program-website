const winningSystemSignals = [
  {
    title: "Industrial Usefulness",
    description: "A costly, credible bottleneck with a clear user and pilot path",
  },
  {
    title: "Physical Robustness",
    description:
      "A safe, repeatable prototype designed for failure and recovery",
  },
  {
    title: "Edge-to-AI Pipeline",
    description:
      "Traceable telemetry that becomes a useful model or decision",
  },
  {
    title: "Data Sovereignty",
    description:
      "Explicit provenance, ownership, access control, and auditability",
  },
  {
    title: "Measured Performance",
    description:
      "Evidence against a baseline for accuracy, latency, and efficiency",
  },
  {
    title: "Enterprise Readiness",
    description:
      "Monitoring, economics, compliance path, and a deployment ask",
  },
] as const;

export function WinningSystemFeatures() {
  return (
    <section
      className="section winning-system"
      aria-labelledby="winning-system-title"
    >
      <div className="container">
        <p className="winning-system__kicker">HackFW Evaluation</p>

        <div className="winning-system__header" data-aos="fade-up">
          <div className="winning-system__hatch" aria-hidden="true" />
          <div className="winning-system__header-content">
            <h2 className="section-title" id="winning-system-title">
              What Makes a Winning System
            </h2>
            <p>
              Six signals that turn an ambitious prototype into a durable,
              deployable system.
            </p>
          </div>
        </div>

        <div className="winning-system__grid">
          {winningSystemSignals.map((signal, index) => (
            <article
              className="winning-system__card"
              data-aos="fade-up"
              data-aos-delay={String(100 + index * 75)}
              key={signal.title}
            >
              <div className="winning-system__hatch" aria-hidden="true" />
              <div className="winning-system__card-content">
                <span className="winning-system__accent" aria-hidden="true" />
                <div>
                  <div className="winning-system__signal-heading">
                    <span aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{signal.title}</h3>
                  </div>
                  <p>{signal.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
