import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(135deg, #0f1419 0%, #1a222d 50%, #121820 100%)",
          color: "#e8e4dc",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.02em" }}>LexBridge</div>
        <div style={{ marginTop: 16, fontSize: 28, color: "#c4b89a", maxWidth: 900 }}>
          Verified advocates — confidential consults across India
        </div>
      </div>
    ),
    { ...size },
  );
}
