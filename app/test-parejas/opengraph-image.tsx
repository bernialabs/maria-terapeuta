import { ImageResponse } from "next/og"

export const alt = "Test Gratuitos para Parejas — Terapia y Sexología"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          backgroundColor: "#FAF2E8",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top coral accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "5px",
            backgroundColor: "#FA523C",
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
          {/* Label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#FA523C",
              color: "#ffffff",
              fontSize: "13px",
              fontFamily: "Arial, sans-serif",
              letterSpacing: "2px",
              textTransform: "uppercase",
              padding: "6px 16px",
              borderRadius: "4px",
              marginBottom: "28px",
              width: "120px",
            }}
          >
            GRATUITO
          </div>

          {/* Heading */}
          <div
            style={{
              fontSize: "60px",
              fontFamily: "Georgia, serif",
              fontWeight: "600",
              color: "#2d2926",
              lineHeight: "1.1",
              marginBottom: "24px",
            }}
          >
            Test para parejas
          </div>

          {/* Divider */}
          <div
            style={{
              width: "80px",
              height: "2px",
              backgroundColor: "#FA523C",
              marginBottom: "24px",
            }}
          />

          {/* Description */}
          <div
            style={{
              fontSize: "22px",
              fontFamily: "Georgia, serif",
              color: "#2d2926",
              opacity: 0.65,
              lineHeight: "1.5",
              maxWidth: "480px",
            }}
          >
            Descubre herramientas para entender mejor tu relación
          </div>

          {/* URL */}
          <div
            style={{
              fontSize: "14px",
              fontFamily: "Arial, sans-serif",
              color: "#FA523C",
              letterSpacing: "1.5px",
              marginTop: "52px",
              opacity: 0.85,
            }}
          >
            mariaterapeuta.com
          </div>
        </div>

        {/* Right — decorative quiz cards */}
        <div
          style={{
            width: "380px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            paddingRight: "48px",
          }}
        >
          {[
            { label: "¿Hay monotonía en tu relación?" },
            { label: "¿Cuál es tu lenguaje del amor?" },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                width: "300px",
                padding: "20px 24px",
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                border: "1px solid rgba(45,41,38,0.1)",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#FA523C",
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  fontSize: "15px",
                  fontFamily: "Georgia, serif",
                  color: "#2d2926",
                  lineHeight: "1.3",
                }}
              >
                {card.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
