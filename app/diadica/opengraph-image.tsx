import { ImageResponse } from "next/og"

export const alt = "Diadica — La App de Terapia para Parejas"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          backgroundColor: "#FA523C",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background geometric accent */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "-80px",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.07)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "260px",
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.05)",
          }}
        />

        {/* Left — text content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "80px",
            paddingRight: "48px",
          }}
        >
          {/* Tag */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "2px",
                backgroundColor: "rgba(255,255,255,0.6)",
              }}
            />
            <div
              style={{
                fontSize: "13px",
                fontFamily: "Arial, sans-serif",
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              Psicología + Tecnología
            </div>
          </div>

          {/* Brand name */}
          <div
            style={{
              fontSize: "96px",
              fontFamily: "Georgia, serif",
              fontWeight: "700",
              color: "#ffffff",
              letterSpacing: "-2px",
              lineHeight: "1",
              marginBottom: "20px",
            }}
          >
            Diadica
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "26px",
              fontFamily: "Georgia, serif",
              color: "rgba(255,255,255,0.85)",
              lineHeight: "1.4",
              maxWidth: "480px",
            }}
          >
            La app de terapia para parejas
          </div>

          {/* URL */}
          <div
            style={{
              fontSize: "14px",
              fontFamily: "Arial, sans-serif",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "1.5px",
              marginTop: "48px",
            }}
          >
            diadica.com
          </div>
        </div>

        {/* Right — icon lockup */}
        <div
          style={{
            width: "340px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: "88px",
                fontFamily: "Georgia, serif",
                fontWeight: "700",
                color: "rgba(255,255,255,0.9)",
                letterSpacing: "-3px",
                lineHeight: "1",
              }}
            >
              D
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
