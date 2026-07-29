import { useMemo } from "react"
import { useTheme } from "../../contexts/ThemeContext"


interface Note {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  symbol: string
  opacity: number
  depth: number
}


// 🔥 Configuração por dispositivo
function getDeviceConfig() {

  const isMobile = window.innerWidth < 768

  return {
    noteCount: isMobile ? 18 : 36,
    speedMultiplier: isMobile ? 0.7 : 0.9,
    blurMultiplier: isMobile ? 0.3 : 0.6,
    driftMultiplier: isMobile ? 0.5 : 0.8,

  }
}

// 🎵 Gerador de notas
function generateNotes(count: number): Note[] {

  const symbols = [
    "♩",
    "♪",
    "♫",
    "♬",
  ]

  return Array.from({ length: count }).map((_, i) => {
    const depth = Math.random()
    return {
      id: i,
      // posição inicial fixa
      x: Math.random() * 100,
      y: 10 + Math.random() * 90,
      // tamanho baseado na profundidade
      size:
        12 + Math.random() * 14,
      // movimento lento
      duration:
        25 + Math.random() * 20,
      delay:
        Math.random() * 20,
      symbol:
        symbols[
        Math.floor(
          Math.random() * symbols.length
        )
        ],
      opacity:
        0.12 + depth * 0.32,
      depth,
    }})
}

export function AnimatedBackground() {

  const { isDark } = useTheme()
  const color = isDark
    ? "#E6C79C"
    : "#A45A3F"

  const config = useMemo(
    () => getDeviceConfig(),
    []
  )

  const notes = useMemo(
    () =>
      generateNotes(
        config.noteCount
      ),
    [
      config.noteCount
    ]

  )

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <style>{`

        @keyframes floatAmbient {


          0% {

            transform:

              translate(

                var(--driftX),

                40px

              )

              rotate(0deg);


            opacity: 0;

          }



          15% {

            opacity: var(--opacity);

          }



          35% {


            transform:

              translate(

                calc(var(--driftX) + 10px),

                -40px

              )

              rotate(5deg);


          }



          60% {


            transform:

              translate(

                calc(var(--driftX) - 8px),

                -100px

              )

              rotate(-5deg);


          }



          85% {


            opacity:

              calc(var(--opacity) * 0.5);



            transform:

              translate(

                calc(var(--driftX) + 6px),

                -160px

              )

              rotate(3deg);


          }



          100% {


            transform:

              translate(

                var(--driftX),

                -220px

              )

              rotate(0deg);



            opacity: 0;


          }


        }

      `}</style>

      {
        notes.map((note) => {
          const speed =
            (1.1 + note.depth * 0.9)
            *
            config.speedMultiplier

          const scale =
            0.6 +
            note.depth * 0.9

          const blur =
            (1 - note.depth)
            *
            0.8
            *
            config.blurMultiplier

          const driftX =
            Math.sin(note.id * 7)
            *
            (6 + note.depth * 8)
            *
            config.driftMultiplier

          return (
            <span
              key={note.id}
              style={{
                position: "absolute",
                left:
                  `${note.x}%`,
                top:
                  `${note.y}%`,
                fontSize:
                  `${note.size}px`,
                color,
                ["--driftX" as any]:
                  `${driftX}px`,
                ["--opacity" as any]:
                  note.opacity,
                opacity:
                  note.opacity,
                animation:
                  `floatAmbient ${note.duration / speed
                  }s ease-in-out ${note.delay
                  }s infinite`,
                transform:
                  `scale(${scale})`,
                filter:
                  `blur(${blur}px)`,
                userSelect:
                  "none",
                willChange:
                  "transform, opacity",
              }}
            >
              {note.symbol}
            </span>
          )})
      }
    </div>
  )
}