import { ImageResponse } from "next/og"

export const alt = "María Alejandra Ovalle - Terapeuta en Sexología y Terapia de Pareja"
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

        {/* Left — logo mark */}
        <div
          style={{
            width: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "340px",
              height: "340px",
              borderRadius: "50%",
              border: "1.5px solid #2d2926",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                fontSize: "148px",
                fontFamily: "Georgia, serif",
                fontWeight: "700",
                color: "#2d2926",
                letterSpacing: "-6px",
                lineHeight: "1",
              }}
            >
              MT
            </div>
            <div
              style={{
                fontSize: "14px",
                fontFamily: "Georgia, serif",
                color: "#2d2926",
                letterSpacing: "3px",
                opacity: 0.7,
              }}
            >
              Terapeuta y sexóloga
            </div>
          </div>
        </div>

        {/* Vertical divider */}
        <div
          style={{
            width: "1px",
            backgroundColor: "#2d2926",
            opacity: 0.15,
            margin: "90px 0",
          }}
        />

        {/* Right — text */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "64px",
            paddingRight: "64px",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              fontFamily: "Georgia, serif",
              fontWeight: "600",
              color: "#2d2926",
              letterSpacing: "1px",
            }}
          >
            María Alejandra Ovalle
          </div>

          {/* Coral accent line */}
          <div
            style={{
              width: "360px",
              height: "2px",
              backgroundColor: "#FA523C",
              marginTop: "22px",
              marginBottom: "26px",
            }}
          />

          <div
            style={{
              fontSize: "22px",
              fontFamily: "Georgia, serif",
              color: "#2d2926",
              opacity: 0.75,
            }}
          >
            Terapia individual y de pareja
          </div>
          <div
            style={{
              fontSize: "15px",
              fontFamily: "Arial, sans-serif",
              color: "#2d2926",
              opacity: 0.45,
              letterSpacing: "1.5px",
              marginTop: "10px",
            }}
          >
            Enfoque cognitivo-conductual
          </div>

          <div
            style={{
              fontSize: "14px",
              fontFamily: "Arial, sans-serif",
              color: "#FA523C",
              letterSpacing: "2px",
              marginTop: "52px",
              opacity: 0.85,
            }}
          >
            mariaterapeuta.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
