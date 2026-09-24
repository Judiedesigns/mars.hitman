import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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
  month: number;
  anchorX: number;
  anchorY: number;
  onClose: () => void;
}

function MonthTooltip({ month, anchorX, anchorY, onClose }: MonthTooltipProps) {
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
    <motion.div
      key={month}
      className="memory-tooltip fixed z-50 border border-[#ff70ff] bg-white p-4"
      initial={{
        opacity: 0,
        scale: 0.96,
        x: opensLeft ? 10 : opensRight ? -10 : 0,
        y: opensLeft || opensRight ? 0 : 8,
      }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      exit={{
        opacity: 0,
        scale: 0.98,
        y: 4,
        transition: { duration: 0.13, ease: [0.23, 1, 0.32, 1] },
      }}
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      style={{
        left,
        top,
        width: tipWidth,
        transformOrigin: opensLeft ? "right center" : opensRight ? "left center" : "center top",
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
    </motion.div>
  );
}

export default function App() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [tooltipAnchor, setTooltipAnchor] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const [stageScale, setStageScale] = useState(getStageScale);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const reduceMotion = useReducedMotion();

  const entrance = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: reduceMotion
      ? { duration: 0 }
      : { duration: 0.46, delay, ease: [0.23, 1, 0.32, 1] as const },
  });

  useEffect(() => {
    const updateStageScale = () => setStageScale(getStageScale());
    updateStageScale();
    window.addEventListener("resize", updateStageScale);
    return () => window.removeEventListener("resize", updateStageScale);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const removeUnlockListeners = () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };

    const tryPlay = () => {
      void audio
        .play()
        .then(removeUnlockListeners)
        .catch(() => {
          // Audible autoplay may be blocked until the first visitor interaction.
        });
    };

    const unlockAudio = () => {
      tryPlay();
    };

    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });
    tryPlay();

    return removeUnlockListeners;
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
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
      onClick={() => setSelectedMonth(null)}
    >
      <audio
        ref={audioRef}
        src="/audio/so-into-you.mp3"
        preload="auto"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <motion.header className="anniversary-hero" {...entrance(0)}>
        <h1
          className="anniversary-title text-[#ff70ff] text-[24px] leading-[1.15] select-none"
          style={{ fontFamily: '"Anonymous Pro:Regular", monospace' }}
        >
          Happy 24-month anniversary baby
          <motion.span
            aria-hidden="true"
            initial={reduceMotion ? false : { scale: 1 }}
            animate={
              reduceMotion || !isPlaying
                ? { scale: 1 }
                : { scale: [1, 1.1, 1, 1.05, 1] }
            }
            transition={
              isPlaying
                ? {
                    duration: 1.15,
                    ease: [0.23, 1, 0.32, 1],
                    repeat: Infinity,
                    repeatDelay: 1.65,
                  }
                : { duration: reduceMotion ? 0 : 0.2 }
            }
            style={{
              display: "inline-flex",
              marginLeft: 8,
              position: "relative",
              top: 1,
              verticalAlign: "baseline",
            }}
          >
            <AnimatePresence>
              {selectedMonth && !reduceMotion && (
                <motion.svg
                  key={selectedMonth}
                  className="absolute inset-0 pointer-events-none"
                  width="20"
                  height="18"
                  viewBox="0 0 18 16"
                  fill="none"
                  initial={{ opacity: 0.38, scale: 0.88 }}
                  animate={{ opacity: 0, scale: 1.75 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.62, ease: [0.23, 1, 0.32, 1] }}
                >
                  <path
                    d="M9 15.25C8.78 15.25 8.56 15.17 8.39 15.02C2.7 10.1 0 7.23 0 3.96C0 1.75 1.75 0 3.96 0C5.2 0 6.39.58 7.16 1.5L9 3.7L10.84 1.5C11.61.58 12.8 0 14.04 0C16.25 0 18 1.75 18 3.96C18 7.23 15.3 10.1 9.61 15.02C9.44 15.17 9.22 15.25 9 15.25Z"
                    fill="#ff70ff"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
            <svg width="20" height="18" viewBox="0 0 18 16" fill="none">
              <path
                d="M9 15.25C8.78 15.25 8.56 15.17 8.39 15.02C2.7 10.1 0 7.23 0 3.96C0 1.75 1.75 0 3.96 0C5.2 0 6.39.58 7.16 1.5L9 3.7L10.84 1.5C11.61.58 12.8 0 14.04 0C16.25 0 18 1.75 18 3.96C18 7.23 15.3 10.1 9.61 15.02C9.44 15.17 9.22 15.25 9 15.25Z"
                fill="#ff70ff"
              />
            </svg>
          </motion.span>
        </h1>
      </motion.header>

      {/* Opening letter */}
      <motion.div className="anniversary-copy flex flex-col items-center px-4 relative" {...entrance(0.08)}>
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
      </motion.div>

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
          <motion.div
          className="anniversary-photo absolute overflow-hidden"
          {...entrance(0.3)}
          style={{ left: 105.75, top: 117, width: 374, height: 326 }}
        >
            <img
              alt="A couple smiling together"
              className="absolute inset-0 size-full object-cover"
              src={imgCouple}
            />
          </motion.div>

          {/* Month numbers as interactive buttons */}
          <motion.div className="absolute inset-0" {...entrance(0.18)}>
            {numberPositions.map(({ n, x, y }) => {
              const isHovered = hoveredMonth === n;
              const isSelected = selectedMonth === n;
              return (
                <motion.button
                  key={n}
                  className="month-button absolute text-[12px] leading-[16px] whitespace-nowrap cursor-pointer select-none"
                  whileHover={reduceMotion ? undefined : { scale: 1.12 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                  animate={isSelected && !reduceMotion ? { scale: [1, 1.14, 1.06] } : { scale: 1 }}
                  transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    left: x,
                    top: y,
                    fontFamily: '"SF Pro:Regular", ui-sans-serif, system-ui, sans-serif',
                    fontVariationSettings: '"wdth" 100',
                    color: isHovered || isSelected ? "#fff" : PINK,
                    background: isHovered || isSelected ? PINK : "transparent",
                    padding: isHovered || isSelected ? "2px 5px" : "2px 2px",
                    zIndex: isHovered ? 10 : 1,
                  }}
                  onClick={(event) => {
                    event.stopPropagation();

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
                </motion.button>
              );
            })}
          </motion.div>

        </div>
      </div>

      <AnimatePresence>
        {selectedMonth && (
          <MonthTooltip
            key={selectedMonth}
            month={selectedMonth}
            anchorX={tooltipAnchor.x}
            anchorY={tooltipAnchor.y}
            onClose={() => setSelectedMonth(null)}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="anniversary-footer"
        {...entrance(0.34)}
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

        <motion.button
          className="music-toggle flex items-center justify-center hover:opacity-60 transition-opacity"
          style={{ top: -(STAGE_HEIGHT - 180) * stageScale }}
          whileTap={reduceMotion ? undefined : { scale: 0.9 }}
          transition={{ type: "spring", duration: 0.22, bounce: 0.15 }}
          onClick={togglePlay}
          title={isPlaying ? "Pause music" : "Play music"}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          <AnimatePresence>
            {isPlaying && !reduceMotion && (
              <motion.span
                key="music-start-ring"
                className="absolute inset-0 rounded-full border border-[#ff70ff] pointer-events-none"
                initial={{ opacity: 0.45, scale: 0.75 }}
                animate={{ opacity: 0, scale: 1.75 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                aria-hidden="true"
              />
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait" initial={false}>
            {isPlaying ? (
              <motion.svg
                key="pause"
                width="12"
                height="15"
                viewBox="0 0 12 15"
                fill="none"
                aria-hidden="true"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.86 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.86 }}
                transition={{ duration: 0.12 }}
              >
                <rect width="4" height="15" fill={PINK} />
                <rect x="8" width="4" height="15" fill={PINK} />
              </motion.svg>
            ) : (
              <motion.svg
                key="play"
                width="13"
                height="16"
                viewBox="0 0 13 16"
                fill="none"
                aria-hidden="true"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.86 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.86 }}
                transition={{ duration: 0.12 }}
              >
                <path d="M13 8L0 16V0L13 8Z" fill={PINK} />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

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
