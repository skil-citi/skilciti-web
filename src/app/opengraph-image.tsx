import { ImageResponse } from "next/og";
import {
  FULL_VIEWBOX,
  LOGO_TEAL,
  MARK_CIRCLE,
  MARK_S_PATH,
  WORDMARK_PATH,
} from "@/components/brand/logo-paths";

export const alt = "Skilciti — Software & Systems, Engineered to Scale";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: 80,
          background:
            "radial-gradient(circle at 18% 12%, rgba(18,160,165,0.42), transparent 55%), radial-gradient(circle at 92% 95%, rgba(45,212,218,0.22), transparent 50%), #040b0c",
          color: "#e9f5f5",
        }}
      >
        <svg viewBox={FULL_VIEWBOX} width={420} height={115}>
          <circle cx={MARK_CIRCLE.cx} cy={MARK_CIRCLE.cy} r={MARK_CIRCLE.r} fill={LOGO_TEAL} />
          <path d={MARK_S_PATH} fill="#ffffff" />
          <path d={WORDMARK_PATH} fill="#e9f5f5" />
        </svg>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, display: "flex", flexWrap: "wrap" }}>
            <span>Software &amp; systems,&nbsp;</span>
            <span style={{ color: "#2dd4da" }}>engineered to scale.</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#a5bec0", display: "flex" }}>
            Mobile apps · Web apps · Custom software · UI/UX · Systems consulting
          </div>
        </div>
      </div>
    ),
    size,
  );
}
