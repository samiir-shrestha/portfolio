import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, RefreshCw } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
  time: string;
}

export const TerminalPlayground: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-emerald-400 font-bold">
            Welcome to my Interactive Backend Terminal v2.4.0
          </p>
          <p className="text-slate-400">
            Type <span className="text-amber-400 font-semibold">&apos;help&apos;</span> to see available commands or click the suggestion chips below.
          </p>
        </div>
      ),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let output: string | React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-emerald-400 font-semibold">Available Shell Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pl-2">
              <div><span className="text-amber-300 font-mono">bio</span> - My profile summary</div>
              <div><span className="text-amber-300 font-mono">skills</span> - Full backend & tech stack</div>
              <div><span className="text-amber-300 font-mono">projects</span> - Production & academic systems</div>
              <div><span className="text-amber-300 font-mono">education</span> - Degree & college details</div>
              <div><span className="text-amber-300 font-mono">contact</span> - Phone, email, socials</div>
              <div><span className="text-amber-300 font-mono">curl</span> - Mock API execution</div>
              <div><span className="text-amber-300 font-mono">hire</span> - Hiring & availability status</div>
              <div><span className="text-rose-400 font-mono">ants</span> - Launch Red Bull Ant swarm</div>
              <div><span className="text-amber-300 font-mono">clear</span> - Clear terminal screen</div>
            </div>
          </div>
        );
        break;

      case 'bio':
        output = PORTFOLIO_DATA.personal.fullBio;
        break;

      case 'skills':
        output = (
          <div className="space-y-1.5 text-slate-300">
            <p><span className="text-emerald-400 font-bold">Backend:</span> Node.js, FastAPI, Express.js, Next.js, REST API</p>
            <p><span className="text-cyan-400 font-bold">Languages:</span> Python, TypeScript, JavaScript, Java, PHP, SQL</p>
            <p><span className="text-indigo-400 font-bold">Databases:</span> PostgreSQL, MySQL</p>
            <p><span className="text-amber-400 font-bold">DevOps:</span> Docker, Git/GitHub, Render, Vercel</p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-slate-300">
            <div>
              <p className="text-emerald-400 font-bold">1. Smart Fertilizer Recommendation System</p>
              <p className="text-xs text-slate-400">FastAPI + PostgreSQL + React + Random Forest ML (Render & Vercel)</p>
            </div>
            <div>
              <p className="text-cyan-400 font-bold">2. Food Finder</p>
              <p className="text-xs text-slate-400">Next.js + TypeScript + MySQL + Docker + NextAuth (GitHub OAuth)</p>
            </div>
            <div>
              <p className="text-indigo-400 font-bold">3. Book Rental System</p>
              <p className="text-xs text-slate-400">React.js + PHP + MySQL (Full CRUD & Rental Lifecycle)</p>
            </div>
          </div>
        );
        break;

      case 'education':
        output = (
          <div className="text-slate-300">
            <p className="text-emerald-400 font-bold">Madan Bhandari Memorial College (Tribhuvan University)</p>
            <p className="text-sm">BSc.CSIT — Bachelor of Science in Computer Science & IT (2023 – Present)</p>
            <p className="text-xs text-slate-400 mt-1">Location: Kathmandu, Nepal</p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-slate-300">
            <p><span className="text-emerald-400">Email:</span> samirstha9087@gmail.com</p>
            <p><span className="text-cyan-400">Phone:</span> +977 9869152627</p>
            <p><span className="text-indigo-400">GitHub:</span> https://github.com/samiir-shrestha</p>
            <p><span className="text-amber-400">Location:</span> Kathmandu, Nepal</p>
          </div>
        );
        break;

      case 'curl':
      case 'curl api':
      case 'curl /api/recommend':
        output = (
          <div className="font-mono text-xs text-emerald-300 bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div>HTTP/1.1 200 OK</div>
            <div>Content-Type: application/json</div>
            <div>X-Response-Time: 14ms</div>
            <br />
            <div>&#123;</div>
            <div className="pl-4">&quot;status&quot;: &quot;success&quot;,</div>
            <div className="pl-4">&quot;recommended_fertilizer&quot;: &quot;Urea (46-0-0) + DAP&quot;,</div>
            <div className="pl-4">&quot;confidence&quot;: 0.962,</div>
            <div className="pl-4">&quot;inference_model&quot;: &quot;RandomForestClassifier_v1&quot;</div>
            <div>&#125;</div>
          </div>
        );
        break;

      case 'hire':
        output = (
          <div className="text-emerald-400 font-medium">
            🟢 I am actively open for Backend & Full-Stack developer positions, internships, and project collaborations! Reach out at samirstha9087@gmail.com.
          </div>
        );
        break;

      case 'ants':
      case 'ant':
      case 'redbull':
      case 'bullant':
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('trigger-ant-loader'));
        }
        output = (
          <div className="text-red-400 font-mono text-xs space-y-1">
            <p className="font-bold">🐜 Swarm Activated: Myrmecia gulosa (Australian Red Bull Ant)</p>
            <p className="text-slate-400">Launching high-speed ant convoy across the viewport...</p>
          </div>
        );
        break;

      case 'admin':
        output = (
          <div className="text-slate-500 font-mono text-xs">
            [ACCESS RESTRICTED: Endpoint unauthorized]
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        output = (
          <span className="text-rose-400">
            Command not recognized: &quot;{trimmed}&quot;. Type &apos;help&apos; for a list of valid commands.
          </span>
        );
    }

    setHistory((prev) => [...prev, { command: cmdStr, output, time }]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  const handleChipClick = (cmd: string) => {
    setInput(cmd);
    handleCommand(cmd);
  };

  return (
    <section id="terminal" className="py-24 relative overflow-hidden bg-slate-950/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>INTERACTIVE DEVELOPER SHELL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Backend Terminal Playground.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Interact directly with the environment via simulated CLI commands.
          </p>
        </div>

        {/* Terminal Window Box */}
        <div className="rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
          
          {/* Header */}
          <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-300 font-medium">
                samir@shrestha-backend: ~ (zsh)
              </span>
            </div>

            <button
              onClick={() => handleCommand('clear')}
              className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Clear terminal"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>clear</span>
            </button>
          </div>

          {/* Console Output Body */}
          <div 
            className="p-6 font-mono text-xs sm:text-sm max-h-[380px] min-h-[260px] overflow-y-auto space-y-4 cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-emerald-400 font-bold">samir@server:~$</span>
                  <span className="text-white font-semibold">{item.command}</span>
                  <span className="text-[10px] text-slate-500 ml-auto">{item.time}</span>
                </div>
                <div className="pl-4 py-1">{item.output}</div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Console Input Bar */}
          <form
            onSubmit={handleSubmit}
            className="px-5 py-3.5 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2"
          >
            <span className="text-emerald-400 font-mono text-sm font-bold">samir@server:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type 'help', 'bio', 'projects', 'skills', 'curl'..."
              className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none placeholder-slate-500"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-colors cursor-pointer"
              aria-label="Execute command"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>

        </div>

        {/* Quick Command Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-mono text-slate-400">Quick run:</span>
          {['help', 'bio', 'skills', 'projects', 'education', 'curl', 'hire', 'ants'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleChipClick(cmd)}
              className={`px-3 py-1 rounded-xl border text-xs font-mono transition-colors cursor-pointer ${
                cmd === 'ants'
                  ? 'bg-red-950/40 hover:bg-red-900/60 border-red-850 hover:border-red-500 text-red-300 hover:text-red-200'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300'
              }`}
            >
              &gt; {cmd}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
