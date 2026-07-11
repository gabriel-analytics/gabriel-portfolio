import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Gabriel Pacheco — Analytics Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#111",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top — brand dot */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#8b5cf6",
            }}
          />
          <span style={{ color: "#8b5cf6", fontSize: 18, letterSpacing: 4, textTransform: "uppercase" }}>
            gabrielpacheco.dev
          </span>
        </div>

        {/* Center — headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 16,
              color: "#8b5cf6",
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Analytics Engineer
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#f9f9f9",
              lineHeight: 1.1,
            }}
          >
            Gabriel Pacheco
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#a1a1aa",
              lineHeight: 1.5,
              maxWidth: 720,
            }}
          >
            Dado que vira decisão — SQL · dbt · Python · IA Aplicada
          </div>
        </div>

        {/* Bottom — impact stats */}
        <div style={{ display: "flex", gap: 48 }}>
          {[
            { value: "$300k", label: "impacto identificado" },
            { value: "43%", label: "redução em pipeline crítico" },
            { value: "$30k+/ano", label: "economia gerada" },
          ].map((stat) => (
            <div key={stat.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: "#8b5cf6" }}>
                {stat.value}
              </span>
              <span style={{ fontSize: 14, color: "#71717a" }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
