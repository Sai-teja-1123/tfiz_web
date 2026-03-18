import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, TicketPercent, AlertCircle } from 'lucide-react';

const SEGMENTS = [
  { label: '5% OFF',     value: 5,  color: '#cc0000' },
  { label: 'TRY AGAIN', value: 0,  color: '#111111' },
  { label: '10% OFF',   value: 10, color: '#cc0000' },
  { label: 'NO LUCK',   value: 0,  color: '#111111' },
  { label: '15% OFF',   value: 15, color: '#cc0000' },
  { label: '7% OFF',    value: 7,  color: '#111111' },
];

export interface SpinResult {
  label: string;
  value: number;
}

interface SpinWheelProps {
  onWin?: (result: SpinResult) => void;
}

const SIZE = 300;
const R = SIZE / 2;
const COUNT = SEGMENTS.length;
const SLICE = (2 * Math.PI) / COUNT;

function polarToXY(angle: number, r: number) {
  return {
    x: R + r * Math.cos(angle),
    y: R + r * Math.sin(angle),
  };
}

function slicePath(i: number) {
  const start = i * SLICE - Math.PI / 2;
  const end = start + SLICE;
  const outer = R - 4;
  const p1 = polarToXY(start, outer);
  const p2 = polarToXY(end, outer);
  const large = SLICE > Math.PI ? 1 : 0;
  return `M ${R} ${R} L ${p1.x} ${p1.y} A ${outer} ${outer} 0 ${large} 1 ${p2.x} ${p2.y} Z`;
}

function labelTransform(i: number) {
  const mid = i * SLICE - Math.PI / 2 + SLICE / 2;
  const r = R * 0.62;
  const { x, y } = polarToXY(mid, r);
  const deg = (mid * 180) / Math.PI + 90;
  return { x, y, deg };
}

export const SpinWheel: React.FC<SpinWheelProps> = ({ onWin }) => {
  const [isSpinning, setIsSpinning] = React.useState(false);
  const [rotation, setRotation] = React.useState(0);
  const [result, setResult] = React.useState<SpinResult | null>(null);
  const [winningIndex, setWinningIndex] = React.useState<number | null>(null);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);
    setWinningIndex(null);

    const index = Math.floor(Math.random() * COUNT);
    const segDeg = 360 / COUNT;
    // Rotate so segment `index` lands under the top pointer (0°)
    const targetDeg = 360 * 5 + (360 - index * segDeg - segDeg / 2);
    setRotation((prev) => prev + targetDeg);

    setTimeout(() => {
      setResult(SEGMENTS[index]);
      setWinningIndex(index);
      setIsSpinning(false);
      onWin?.(SEGMENTS[index]);
    }, 3500);
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: info card */}
          <div className="relative z-10">
            <div className="bg-black rounded-[36px] p-8 sm:p-10 overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
              <div className="absolute -left-16 bottom-0 w-60 h-60 bg-red-700/40 rounded-full blur-[100px] pointer-events-none" />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center">
                  <Sparkles size={18} className="text-red-500" />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                  Exclusive drop // Spin to unlock
                </p>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tight text-white mb-4">
                Spin the Wheel.
                <br />
                <span className="text-red-500">Steal the Deal.</span>
              </h2>

              <p className="text-sm text-white/60 max-w-md mb-8">
                Click <strong className="text-white">Spin &amp; Win</strong>. The sector the pointer lands on is your discount — applied automatically at checkout.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <button
                  type="button"
                  onClick={handleSpin}
                  className="px-10 py-4 rounded-full bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-white/90 active:scale-95 transition-all"
                >
                  {isSpinning ? 'Spinning…' : 'Spin & Win'}
                </button>

                {result && result.value > 0 && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/40">
                    <TicketPercent size={16} className="text-red-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white">
                      You won {result.value}% OFF
                    </span>
                  </div>
                )}
                {result && result.value === 0 && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <AlertCircle size={16} className="text-white/50" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                      Better luck next spin!
                    </span>
                  </div>
                )}
              </div>

              {result && (
                <p className="text-xs text-white/40 font-medium">
                  The pointer landed on&nbsp;
                  <span className="font-bold text-white">"{result.label}"</span>
                  &nbsp;— that's your reward.
                </p>
              )}
            </div>
          </div>

          {/* Right: SVG wheel */}
          <div className="flex items-center justify-center">
            <div className="relative" style={{ width: SIZE, height: SIZE + 32 }}>

              {/* Pointer arrow pointing DOWN into wheel */}
              <div
                className="absolute left-1/2 z-20"
                style={{ top: 0, transform: 'translateX(-50%)' }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-black border-2 border-white shadow-lg" />
                  <div
                    className="w-0 h-0"
                    style={{
                      borderLeft: '10px solid transparent',
                      borderRight: '10px solid transparent',
                      borderTop: '22px solid black',
                    }}
                  />
                </div>
              </div>

              {/* Spinning wheel */}
              <motion.div
                animate={{ rotate: rotation }}
                transition={{ duration: 3.5, ease: [0.19, 1.0, 0.22, 1.0] }}
                className="absolute"
                style={{ top: 32, left: 0 }}
              >
                <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
                  <defs>
                    <clipPath id="wheel-clip">
                      <circle cx={R} cy={R} r={R - 6} />
                    </clipPath>
                  </defs>

                  {/* Slices clipped to perfect circle */}
                  <g clipPath="url(#wheel-clip)">
                    {SEGMENTS.map((seg, i) => {
                      const isWinner = winningIndex === i && result !== null;
                      return (
                        <g key={i}>
                          <path
                            d={slicePath(i)}
                            fill={isWinner ? '#facc15' : seg.color}
                            stroke="white"
                            strokeWidth={2}
                          />
                          {(() => {
                            const { x, y, deg } = labelTransform(i);
                            return (
                              <text
                                x={x}
                                y={y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                transform={`rotate(${deg}, ${x}, ${y})`}
                                fontSize={13}
                                fontWeight="900"
                                fill={isWinner ? '#000' : '#ffffff'}
                                style={{ fontFamily: 'sans-serif', letterSpacing: 1, textTransform: 'uppercase' }}
                              >
                                {seg.label}
                              </text>
                            );
                          })()}
                        </g>
                      );
                    })}
                  </g>

                  {/* Smooth outer ring on top of everything */}
                  <circle cx={R} cy={R} r={R - 6} fill="none" stroke="black" strokeWidth={12} />

                  {/* Center knob */}
                  <circle cx={R} cy={R} r={22} fill="black" />
                  <circle cx={R} cy={R} r={12} fill="white" />
                </svg>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
