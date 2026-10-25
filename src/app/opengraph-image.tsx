import { ImageResponse } from "next/og";

import { siteConfig } from "@/data/site";

export const alt = "Islam El Himes — Full Stack Developer & Computer Engineering student";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card, generated at build time.
 *
 * Uses the runtime's default font rather than fetching a webfont, so the
 * build never depends on an external request succeeding.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#04050c",
          padding: "72px",
          position: "relative",
        }}
      >
        {/* Ambient accents */}
        <div
          style={{
            position: "absolute",
            top: -180,
            left: 320,
            width: 760,
            height: 560,
            background: "radial-gradient(circle, rgba(34,211,238,0.18), rgba(4,5,12,0) 65%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -80,
            width: 620,
            height: 560,
            background: "radial-gradient(circle, rgba(139,92,246,0.18), rgba(4,5,12,0) 65%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#22d3ee",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: "#6f7898",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            {siteConfig.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: -3,
              color: "#f2f4fd",
              lineHeight: 1.02,
              display: "flex",
            }}
          >
            Islam El Himes
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 38,
              color: "#8f98ba",
              letterSpacing: -0.5,
              display: "flex",
            }}
          >
            Full stack engineering, aimed at intelligence.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 28,
          }}
        >
          {["Full Stack Developer", "Computer Engineering Student", "AI & Data Science"].map((item) => (
            <div
              key={item}
              style={{
                fontSize: 24,
                color: "#b3bad6",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 999,
                padding: "10px 24px",
                display: "flex",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
