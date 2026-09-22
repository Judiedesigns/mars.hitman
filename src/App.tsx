import { useEffect, useRef, useState } from "react";
import svgPaths from "@/imports/Body-1/svg-jsgx85ywa2";
import imgCouple from "@/imports/Body-1/583807724b86d07a16503e7117efd79409667b02.png";

const PINK = "#ff70ff";
const STAR_PINK = "#ffd6f5";
const STAGE_WIDTH = 600;
const STAGE_HEIGHT = 520;
const getStageScale = () => {
  if (typeof window === "undefined") return 1;
  return Math.min(1, (window.innerWidth - 32) / STAGE_WIDTH);
};
const OPENING =
  "Everything fell in place when we met, it felt like coming home after a long time. Sometimes the stars align, and we can only enjoy the results. I hope I am able to show you every day how much I love you.";

const monthMemories: Record<number, string> = {
  1: "I like how you take on tasks and execute them with such precision",
  2: "I love how you are passionate about the things you care about",
  3: "How you are consistent with what you want",
  4: "You do what you say you will do",
  5: "“How can I help?” “What can we do?” My favorite words",
  6: "I love how you care about your body",
  7: "You listen to what I say",
  8: "You are helpful, always, without being asked and when asked",
  9: "You are so incredibly talented and helpful",
  10: "You are good and it is not just to me alone, your friends, mom and the people around you",
  11: "You are very empathetic, my twin for real",
  12: "My favorite human God blessed me with. I love you, you’re amazing and sweet",
  13: "You’re very patient with me and are not frustrated unless I make you maddd",
  14: "You are just happy to be here with me",
  15: "I like your music taste",
  16: "You’re crazy about me",
  17: "You want what’s best for me",
  18: "You only see me",
  19: "You think of me a lot, gave me my first and second jersey",
  20: "You’re very thoughtful",
  21: "You let yourself feel your emotions, and you regulate them sometimes..",
  22: "You pay attention to me",
  23: "Dams sends me money",
  24: "You buy me ice cream every month for our anniversary",
};

// Positions derived from updated Header/index.tsx (user-edited).
// Love: left=33.75, top=24. Frame centered in Love (w=538): left offset = (538-526)/2 = 6px.
// Frame absolute in header: left=39.75, top=24.
// Love numbers: header_x = 33.75 + love_left, header_y = 24 + love_top.
// Frame numbers: header_x = 39.75 + frame_left, header_y = 24 + frame_top.
const numberPositions: { n: number; x: number; y: number }[] = [
  { n: 1,  x: 299.75, y: 107 }, // Frame
  { n: 2,  x: 342.75, y: 63  }, // Love
  { n: 3,  x: 402.75, y: 31  }, // Love
  { n: 4,  x: 476.75, y: 24  }, // Frame
  { n: 5,  x: 544.75, y: 82  }, // Frame
  { n: 6,  x: 563.75, y: 153 }, // Love
  { n: 7,  x: 549.75, y: 229 }, // Frame
  { n: 8,  x: 517.75, y: 287 }, // Frame
  { n: 9,  x: 480.75, y: 345 }, // Frame
  { n: 10, x: 429.75, y: 400 }, // Frame
  { n: 11, x: 365.75, y: 454 }, // Frame
  { n: 12, x: 299.75, y: 491 }, // Love
  { n: 13, x: 232.75, y: 450 }, // Love
  { n: 14, x: 172.75, y: 399 }, // Love
  { n: 15, x: 122.75, y: 348 }, // Love
  { n: 16, x: 69.75,  y: 282 }, // Love
  { n: 17, x: 39.75,  y: 230 }, // Love
  { n: 18, x: 33.75,  y: 157 }, // Love
  { n: 19, x: 46.75,  y: 82  }, // Frame
  { n: 20, x: 95.75,  y: 24  }, // Frame
  { n: 21, x: 173.75, y: 23  }, // Frame
  { n: 22, x: 229.75, y: 31  }, // Frame
  { n: 23, x: 262.75, y: 63  }, // Frame
  { n: 24, x: 299.75, y: 158 }, // Frame
];

function StarSmooth() {
  return (
    <svg fill="none" height="20.0591" viewBox="0 0 20.0591 20.0591" width="20.0591">
      <path clipRule="evenodd" d={svgPaths.p3440cef0} fill={STAR_PINK} fillRule="evenodd" />
    </svg>
  );
}

function StarWide() {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
      <path d={svgPaths.p29acab40} fill={STAR_PINK} />
    </svg>
  );
}

interface MonthTooltipProps {
  month: number | null;
  anchorX: number;
  anchorY: number;
  onClose: () => void;
}

function MonthTooltip({ month, anchorX, anchorY, onClose }: MonthTooltipProps) {
  if (!month) return null;
  const tipWidth = month === 4 ? 288 : 252;
  const viewportWidth = typeof window === "undefined" ? 1200 : window.innerWidth;
  const viewportHeight = typeof window === "undefined" ? 800 : window.innerHeight;
  const opensLeft = (month >= 4 && month <= 10) || (month >= 19 && month <= 23);
  const opensRight = month >= 14 && month <= 18;
  const desiredLeft = opensLeft
    ? anchorX - tipWidth - 18
    : opensRight
      ? anchorX + 18
      : anchorX - tipWidth / 2 + 6;
  const left = Math.min(Math.max(desiredLeft, 18), viewportWidth - tipWidth - 18);
  const shouldLift = (month >= 7 && month <= 11) || anchorY + 154 > viewportHeight;
  const top = Math.max(18, shouldLift ? anchorY - 132 : anchorY + 28);

  return (
    <div
      className="memory-tooltip fixed z-50 border border-[#ff70ff] bg-white p-4"
      style={{
        left,
        top,
        width: tipWidth,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="absolute top-1.5 right-2.5 text-[#ff70ff] text-base leading-none hover:opacity-60 transition-opacity"
        onClick={onClose}
        aria-label="Close memory"
      >
        ×
      </button>
      <p
        className="text-[#ff70ff] text-[13px] leading-[20px] pr-6"
        style={{ fontFamily: '"Anonymous Pro:Regular", monospace' }}
      >
        {String(month).padStart(2, "0")} - {monthMemories[month]}
      </p>
    </div>
  );
}

export default function App() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [tooltipAnchor, setTooltipAnchor] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const [stageScale, setStageScale] = useState(getStageScale);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateStageScale = () => setStageScale(getStageScale());
    updateStageScale();
    window.addEventListener("resize", updateStageScale);
    return () => window.removeEventListener("resize", updateStageScale);
  }, []);

  const togglePlay = () => {
    setIsPlaying((p) => !p);
  };

  const selectMonth = (month: number) => {
    const position = numberPositions.find(({ n }) => n === month);
    const rect = headerRef.current?.getBoundingClientRect();
    const scale = rect ? rect.width / STAGE_WIDTH : 1;

    setSelectedMonth(month);
    setTooltipAnchor({
      x: (rect?.left ?? 0) + (position?.x ?? STAGE_WIDTH / 2) * scale,
      y: (rect?.top ?? 0) + (position?.y ?? STAGE_HEIGHT / 2) * scale,
    });
  };

  const stepMonth = (direction: -1 | 1) => {
    const currentMonth = selectedMonth ?? 1;
    const nextMonth = ((currentMonth - 1 + direction + 24) % 24) + 1;
    selectMonth(nextMonth);
  };

  return (
    <div
      className="anniversary-page bg-white flex flex-col items-center relative min-h-screen overflow-x-hidden"
      style={{ fontFamily: '"Anonymous Pro:Regular", monospace' }}
    >
      <header className="anniversary-hero app-fade-in">
        <h1
          className="anniversary-title text-[#ff70ff] text-[24px] leading-[1.15] select-none"
          style={{ fontFamily: '"Anonymous Pro:Regular", monospace' }}
        >
          Happy 24-month anniversary baby
        </h1>
      </header>

      {/* Opening letter */}
      <div className="anniversary-copy flex flex-col items-center px-4 relative">
        <div className="star-twinkle copy-star absolute" aria-hidden="true">
          <StarSmooth />
        </div>
        <p
          className="text-center text-[#ff70ff] text-[16px] leading-[22.4px] whitespace-pre-wrap"
          style={{
            fontFamily: '"Anonymous Pro:Regular", monospace',
            width: 431,
            maxWidth: "90vw",
          }}
        >
          {OPENING}
        </p>
      </div>

      {/* Header: photo + orbit numbers */}
      <div
        ref={headerRef}
        className="anniversary-stage relative shrink-0"
        style={{ width: STAGE_WIDTH * stageScale, height: STAGE_HEIGHT * stageScale }}
      >
        <div
          className="anniversary-canvas absolute left-0 top-0"
          style={{
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            transform: `scale(${stageScale})`,
          }}
        >
          {/* Photo — positioned per updated Header/index.tsx, no color overlays */}
        <div
          className="anniversary-photo absolute overflow-hidden"
          style={{ left: 105.75, top: 117, width: 374, height: 326 }}
        >
            <img
              alt="A couple smiling together"
              className="absolute inset-0 size-full object-cover"
              src={imgCouple}
            />
          </div>

          {/* Month numbers as interactive buttons */}
          {numberPositions.map(({ n, x, y }) => {
            const isHovered = hoveredMonth === n;
            const isSelected = selectedMonth === n;
            return (
              <button
              key={n}
              className="month-button absolute text-[12px] leading-[16px] whitespace-nowrap cursor-pointer select-none"
              style={{
                left: x,
                top: y,
                  fontFamily: '"SF Pro:Regular", ui-sans-serif, system-ui, sans-serif',
                  fontVariationSettings: '"wdth" 100',
                color: isHovered || isSelected ? "#fff" : PINK,
                background: isHovered || isSelected ? PINK : "transparent",
                padding: isHovered || isSelected ? "2px 5px" : "2px 2px",
                transform: isHovered ? "scale(1.24)" : "scale(1)",
                zIndex: isHovered ? 10 : 1,
              }}
                onClick={() => {
                  if (selectedMonth === n) {
                    setSelectedMonth(null);
                    return;
                  }

                  selectMonth(n);
                }}
                onMouseEnter={() => setHoveredMonth(n)}
                onMouseLeave={() => setHoveredMonth(null)}
                title={`Month ${n}`}
              >
                {n}
              </button>
            );
          })}

        </div>
      </div>

      <MonthTooltip
        month={selectedMonth}
        anchorX={tooltipAnchor.x}
        anchorY={tooltipAnchor.y}
        onClose={() => setSelectedMonth(null)}
      />

      <div
        className="anniversary-footer"
        style={{ width: STAGE_WIDTH * stageScale }}
      >
        <p
          className="signature-line anniversary-signature text-[#ff70ff] text-[16px] leading-[22.4px] select-none"
          style={{
            fontFamily: '"Anonymous Pro:Regular", monospace',
            width: 374 * stageScale,
            marginLeft: 105.75 * stageScale,
          }}
        >
          Mars & the Hitman
        </p>

        <button
          className="music-toggle flex items-center justify-center hover:opacity-60 transition-opacity"
          style={{ top: -(STAGE_HEIGHT - 180) * stageScale }}
          onClick={togglePlay}
          title={isPlaying ? "Pause music" : "Play music"}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <svg width="12" height="15" viewBox="0 0 12 15" fill="none" aria-hidden="true">
              <rect width="4" height="15" fill={PINK} />
              <rect x="8" width="4" height="15" fill={PINK} />
            </svg>
          ) : (
            <svg width="13" height="16" viewBox="0 0 13 16" fill="none" aria-hidden="true">
              <path d="M13 8L0 16V0L13 8Z" fill={PINK} />
            </svg>
          )}
        </button>
      </div>

      <div className="star-twinkle corner-star fixed pointer-events-none" aria-hidden="true">
        <StarWide />
      </div>

      {/* Hint text */}
      {!selectedMonth && (
        <p
          className="memory-hint text-[#ff70ff] text-[11px] opacity-50 pointer-events-none select-none"
          style={{ fontFamily: '"Anonymous Pro:Regular", monospace' }}
        >
          tap a number to read a memory
        </p>
      )}

      <style>{`
        @keyframes bounce-bar-1 { to { height: 20px; } }
        @keyframes bounce-bar-2 { to { height: 16px; } }
        @keyframes bounce-bar-3 { to { height: 22px; } }
        @keyframes bounce-bar-4 { to { height: 14px; } }
        @keyframes bounce-bar-5 { to { height: 18px; } }
      `}</style>
    </div>
  );
}
