import { createFileRoute } from "@tanstack/react-router";
import ImageResponse from "takumi-js/response";

const DEFAULT_TITLE = "HackFW MADE Challenge";
const DEFAULT_DESCRIPTION = "Rebuilding System Density // Fort Worth, Texas";

function getImageText(
  value: string | null,
  fallback: string,
  maximumLength: number,
) {
  const normalized = value?.trim().replace(/\s+/g, " ");

  if (!normalized) {
    return fallback;
  }

  return normalized.length > maximumLength
    ? `${normalized.slice(0, maximumLength - 1).trimEnd()}…`
    : normalized;
}

export const Route = createFileRoute("/og-image")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const title = getImageText(
          url.searchParams.get("title"),
          DEFAULT_TITLE,
          36,
        );
        const description = getImageText(
          url.searchParams.get("description"),
          DEFAULT_DESCRIPTION,
          82,
        );
        const titleFontSize = title.length > 28 ? 38 : 68;
        const descriptionFontSize = description.length > 60 ? 18 : 28;

        const response = new ImageResponse(
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              padding: 48,
              position: "relative",
              color: "#f5f1e8",
              backgroundColor: "#131514",
              backgroundImage:
                "linear-gradient(rgba(245, 241, 232, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 241, 232, 0.08) 1px, transparent 1px), radial-gradient(circle at 88% 18%, rgba(226, 103, 61, 0.38), transparent 32%)",
              backgroundSize: "60px 60px, 60px 60px, 100% 100%",
              fontFamily: "sans-serif",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                left: 48,
                position: "absolute",
                right: 48,
                top: 48,
                color: "#e2673d",
                fontFamily: "monospace",
                fontSize: 19,
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              <span>FORT WORTH // TEXAS</span>
              <span>BUILD THE NEXT SYSTEM</span>
            </div>

            <div
              style={{
                display: "flex",
                boxSizing: "border-box",
                flexShrink: 0,
                flexDirection: "column",
                height: 400,
                justifyContent: "center",
                left: 48,
                padding: "42px 46px",
                border: "2px solid #f5f1e8",
                backgroundColor: "rgba(19, 21, 20, 0.78)",
                position: "absolute",
                right: 48,
                top: 99,
              }}
            >
              <div
                style={{
                  color: "#e2673d",
                  fontSize: 26,
                  fontWeight: 800,
                  letterSpacing: 7,
                  lineHeight: 1,
                }}
              >
                HACKFW
              </div>
              <div
                style={{
                  maxWidth: 980,
                  marginTop: 20,
                  color: "#f5f1e8",
                  fontSize: titleFontSize,
                  fontWeight: 800,
                  letterSpacing: -3,
                  lineHeight: 0.96,
                }}
              >
                {title}
              </div>
              <div
                style={{
                  maxWidth: 900,
                  marginTop: 22,
                  color: "#c7cec6",
                  fontSize: descriptionFontSize,
                  fontWeight: 500,
                  lineHeight: 1.25,
                }}
              >
                {description}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bottom: 48,
                fontFamily: "monospace",
                fontSize: 18,
                fontWeight: 700,
                left: 48,
                letterSpacing: 1.5,
                position: "absolute",
                right: 48,
              }}
            >
              <span>MADE CHALLENGE</span>
              <span>HACK.FWTX.CITY</span>
            </div>
          </div>,
          {
            width: 1200,
            height: 630,
            format: "png",
            headers: {
              "Cache-Control": "public, max-age=3600, s-maxage=86400",
            },
          },
        );

        await response.ready;

        return response;
      },
    },
  },
});
