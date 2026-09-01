import React, { useState, useEffect, useCallback } from 'react';

// Detailed Red Bull Ant (Myrmecia gulosa) SVG Component
export function RedBullAnt({ 
  size = 64, 
  speed = '1s', 
  delay = '0s',
  carrying = '',
  className = ''
}: { 
  size?: number; 
  speed?: string; 
  delay?: string;
  carrying?: string;
  className?: string;
}) {
  return (
    <div 
      className={`relative inline-block select-none ${className}`}
      style={{ width: size, height: size * 0.55 }}
    >
      <svg
        viewBox="0 0 200 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-[0_4px_14px_rgba(239,68,68,0.4)]"
      >
        <defs>
          <linearGradient id="redBullHead" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="70%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="redBullThorax" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="60%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </linearGradient>
          <linearGradient id="redBullGaster" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3f3f46" />
            <stop offset="40%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>
          <linearGradient id="mandibleGrad" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#9a3412" />
          </linearGradient>
        </defs>

        {/* Back Legs (Drawn behind body) */}
        <g className="ant-back-legs" style={{ animation: `antLegWalk ${speed} infinite ease-in-out ${delay}` }}>
          {/* Rear Leg Left */}
          <path
            d="M 52 50 Q 35 15 15 10 Q 5 25 2 75"
            stroke="#b91c1c"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="opacity-75"
          />
          {/* Middle Leg Left */}
          <path
            d="M 90 52 Q 80 20 65 18 Q 45 45 40 78"
            stroke="#dc2626"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="opacity-75"
          />
          {/* Front Leg Left */}
          <path
            d="M 125 54 Q 135 25 150 22 Q 165 48 175 75"
            stroke="#ef4444"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="opacity-75"
          />
        </g>

        {/* Abdomen / Gaster (Black / Deep Charcoal, characteristic of Red Bull Ant) */}
        <g id="gaster" className="transition-transform duration-300">
          {/* Stinger at rear tip */}
          <path d="M 10 58 Q 5 60 2 61" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
          {/* Gaster bulb */}
          <ellipse cx="32" cy="54" rx="26" ry="17" fill="url(#redBullGaster)" />
          {/* Gaster segment bands */}
          <path d="M 22 40 Q 25 54 22 68" stroke="#52525b" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 33 38 Q 36 54 33 70" stroke="#52525b" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 44 41 Q 47 54 44 67" stroke="#71717a" strokeWidth="1.5" fill="none" opacity="0.5" />
          {/* Shiny top highlight */}
          <ellipse cx="30" cy="47" rx="16" ry="7" fill="#ffffff" opacity="0.12" />
        </g>

        {/* Petiole & Post-petiole Nodes (Two distinct red nodules connecting gaster to thorax) */}
        <ellipse cx="58" cy="53" rx="5.5" ry="5" fill="url(#redBullThorax)" />
        <ellipse cx="68" cy="52" rx="5" ry="5.5" fill="url(#redBullThorax)" />

        {/* Thorax (Elongated crimson-red segmented structure) */}
        <g id="thorax">
          {/* Propodeum / Mesothorax / Pronotum */}
          <path
            d="M 72 53 Q 76 43 90 42 Q 108 42 118 46 Q 126 50 128 55 Q 125 61 108 62 Q 88 63 74 57 Z"
            fill="url(#redBullThorax)"
          />
          {/* Thorax muscle highlights */}
          <path d="M 85 45 Q 100 45 115 48" stroke="#fca5a5" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        </g>

        {/* Neck connection */}
        <rect x="126" y="52" width="6" height="5" rx="2" fill="#991b1b" />

        {/* Head (Broad, powerful, fiery crimson red) */}
        <g id="head">
          <path
            d="M 130 52 Q 132 40 146 38 Q 162 38 166 48 Q 170 56 164 64 Q 152 68 138 66 Q 130 62 130 52 Z"
            fill="url(#redBullHead)"
          />
          {/* Large prominent dark compound eye */}
          <ellipse cx="148" cy="46" rx="5.5" ry="4" fill="#09090b" />
          <ellipse cx="147" cy="45" rx="2" ry="1.5" fill="#f87171" opacity="0.7" />

          {/* Long elbowed Antennae (Geniculate) */}
          <g className="ant-antenna" style={{ animation: `antAntennaBob 1.2s infinite ease-in-out ${delay}` }}>
            {/* Left antenna */}
            <path
              d="M 154 42 Q 168 28 178 14 Q 192 10 200 4"
              stroke="#ea580c"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="200" cy="4" r="1.5" fill="#fdba74" />
            {/* Right antenna */}
            <path
              d="M 157 45 Q 172 34 185 24 Q 196 22 205 18"
              stroke="#c2410c"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
            <circle cx="205" cy="18" r="1.2" fill="#fdba74" />
          </g>

          {/* Signature Red Bull Ant Elongated Serrated Mandibles (Jaws) */}
          <g id="mandibles" className="ant-mandibles" style={{ animation: `antMandibleSnap 2s infinite ease-in-out ${delay}` }}>
            {/* Upper long curved mandible */}
            <path
              d="M 164 50 C 175 49 188 52 198 56 C 192 59 182 58 166 56 Z"
              fill="url(#mandibleGrad)"
            />
            {/* Lower long curved mandible */}
            <path
              d="M 164 57 C 176 58 188 62 197 66 C 190 68 180 65 165 62 Z"
              fill="url(#mandibleGrad)"
            />
            {/* Mandible serration teeth */}
            <circle cx="174" cy="52" r="1" fill="#451a03" />
            <circle cx="181" cy="54" r="1" fill="#451a03" />
            <circle cx="188" cy="56" r="1" fill="#451a03" />
            <circle cx="195" cy="57" r="1" fill="#451a03" />
            <circle cx="174" cy="59" r="1" fill="#451a03" />
            <circle cx="181" cy="62" r="1" fill="#451a03" />
            <circle cx="188" cy="64" r="1" fill="#451a03" />
          </g>
        </g>

        {/* Front Legs (Drawn in front of body) */}
        <g className="ant-front-legs" style={{ animation: `antLegWalkAlt ${speed} infinite ease-in-out ${delay}` }}>
          {/* Rear Leg Right */}
          <path
            d="M 60 55 Q 48 30 32 25 Q 18 55 12 88"
            stroke="#ef4444"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Middle Leg Right */}
          <path
            d="M 98 56 Q 95 32 82 28 Q 68 62 60 90"
            stroke="#f87171"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Front Leg Right */}
          <path
            d="M 122 58 Q 138 35 156 32 Q 172 65 182 92"
            stroke="#f87171"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>

      {/* Cargo / Carrying Item (Tech pills / glowing badges) */}
      {carrying && (
        <div 
          className="absolute -top-3 right-0 transform translate-x-2 -translate-y-1 bg-red-950/90 text-amber-300 border border-amber-500/60 rounded-full px-2 py-0.5 text-[9px] font-mono font-bold shadow-[0_0_12px_rgba(245,158,11,0.5)] flex items-center gap-1 backdrop-blur-sm whitespace-nowrap animate-bounce"
          style={{ animationDuration: '1.4s' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          {carrying}
        </div>
      )}
    </div>
  );
}

// Full-screen Loading Overlay Component
export default function AntLoader({
  minDuration = 2200,
  onFinished,
}: {
  minDuration?: number;
  onFinished?: () => void;
}) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Awakening Red Bull Ant swarm...');
  const [isFadingOut, setIsFadingOut] = useState(false);

  const startAnimation = useCallback(() => {
    setVisible(true);
    setIsFadingOut(false);
    setProgress(0);

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.floor((elapsed / minDuration) * 100), 100);
      setProgress(pct);

      if (pct < 20) {
        setStatusText('Awakening Red Bull Ant swarm...');
      } else if (pct < 45) {
        setStatusText('Carrying Next.js & React 19 payloads...');
      } else if (pct < 75) {
        setStatusText('Establishing secure API routes & CV assets...');
      } else if (pct < 95) {
        setStatusText('Optimizing portfolio layout & theme engines...');
      } else {
        setStatusText('All systems operational!');
      }

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            setVisible(false);
            if (onFinished) onFinished();
          }, 500);
        }, 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [minDuration, onFinished]);

  useEffect(() => {
    const cleanup = startAnimation();

    // Listen for custom trigger to replay ant march
    const handleReplay = () => {
      startAnimation();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };

    window.addEventListener('trigger-ant-loader', handleReplay);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cleanup();
      window.removeEventListener('trigger-ant-loader', handleReplay);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [startAnimation]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setVisible(false);
      if (onFinished) onFinished();
    }, 300);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Loading Portfolio"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-[#080c14] text-slate-100 select-none overflow-hidden transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 30%, rgba(220, 38, 38, 0.12) 0%, transparent 60%),
          radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.08) 0%, transparent 50%),
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 100% 100%, 32px 32px, 32px 32px',
      }}
    >
      {/* Top Header */}
      <div className="w-full max-w-5xl pt-8 px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
          <div>
            <h1 className="text-xs md:text-sm font-mono tracking-widest text-red-400 font-bold uppercase flex items-center gap-2">
              Samir Shrestha // Portfolio Runtime
            </h1>
            <p className="text-[10px] md:text-xs text-slate-400 font-mono">
              Species: <span className="text-amber-400 italic font-semibold">Myrmecia gulosa</span> (Australian Red Bull Ant)
            </p>
          </div>
        </div>

        <button
          onClick={handleSkip}
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-red-500/50 bg-slate-900/60 hover:bg-red-950/40 text-slate-400 hover:text-red-300 text-xs font-mono transition-all backdrop-blur-sm cursor-pointer shadow-sm"
          title="Skip intro (Press Esc)"
        >
          <span>Skip</span>
          <span className="text-[10px] text-slate-600 group-hover:text-red-400 font-bold">Esc</span>
        </button>
      </div>

      {/* Center Ant Highway (Ants Running from Left to Right) */}
      <div className="w-full relative flex-1 flex flex-col justify-center overflow-hidden py-12">
        {/* Ant Highway Glowing Track */}
        <div className="relative w-full h-48 flex items-center">
          {/* Laser Guide Pheromone Lines */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
          <div className="absolute inset-x-0 top-[65%] h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>

          {/* Running Red Bull Ants in Staggered Lanes (Left to Right) */}

          {/* Ant 1: Lead Scout Ant (Fast) */}
          <div
            className="absolute ant-runner"
            style={{
              top: '12%',
              animation: 'antRunAcross 4.2s linear infinite',
              animationDelay: '0s',
            }}
          >
            <RedBullAnt size={86} speed="0.32s" carrying="⚡ FastScout" />
          </div>

          {/* Ant 2: Heavy Payload Worker (Carrying Next.js) */}
          <div
            className="absolute ant-runner"
            style={{
              top: '40%',
              animation: 'antRunAcross 5.6s linear infinite',
              animationDelay: '1.1s',
            }}
          >
            <RedBullAnt size={102} speed="0.45s" delay="0.2s" carrying="Next.js 16" />
          </div>

          {/* Ant 3: TypeScript Carrier */}
          <div
            className="absolute ant-runner"
            style={{
              top: '22%',
              animation: 'antRunAcross 5.0s linear infinite',
              animationDelay: '2.4s',
            }}
          >
            <RedBullAnt size={80} speed="0.38s" delay="0.1s" carrying="TypeScript" />
          </div>

          {/* Ant 4: Full-Stack Queen / Major Bull Ant (Large) */}
          <div
            className="absolute ant-runner"
            style={{
              top: '55%',
              animation: 'antRunAcross 6.2s linear infinite',
              animationDelay: '3.3s',
            }}
          >
            <RedBullAnt size={118} speed="0.5s" delay="0.3s" carrying="🚀 Portfolio Core" />
          </div>

          {/* Ant 5: Agile Rear Guard Ant */}
          <div
            className="absolute ant-runner"
            style={{
              top: '32%',
              animation: 'antRunAcross 4.6s linear infinite',
              animationDelay: '4.5s',
            }}
          >
            <RedBullAnt size={76} speed="0.35s" delay="0.15s" carrying="Python & ML" />
          </div>
        </div>

        {/* Ant Sand Particles / Pheromone Dust */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-8 opacity-20 pointer-events-none">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping"></div>
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
          <div className="w-1 h-1 rounded-full bg-red-500"></div>
        </div>
      </div>

      {/* Bottom Progress & Diagnostics Panel */}
      <div className="w-full max-w-xl pb-10 px-6 z-10">
        <div className="bg-slate-900/85 border border-slate-800/90 rounded-2xl p-5 shadow-2xl backdrop-blur-md">
          {/* Status Label & Percentage */}
          <div className="flex items-center justify-between mb-2 font-mono">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-slate-300 font-medium tracking-wide">
                {statusText}
              </span>
            </div>
            <span className="text-sm font-bold text-red-400 tracking-wider">
              {progress}%
            </span>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-400 transition-all duration-100 ease-out shadow-[0_0_12px_rgba(239,68,68,0.8)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Subtitle Footer info */}
          <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>Aggressive Bull Ant Worker Threads: Active</span>
            <span>Kathmandu, NP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
