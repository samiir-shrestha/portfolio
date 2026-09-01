import React, { useState } from 'react';
import { 
  ArrowRight, 
  FileText, 
  MapPin, 
  Copy, 
  Check, 
  Server, 
  Cpu
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface HeroProps {
  onOpenCvModal: () => void;
  onShowToast: (msg: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCvModal, onShowToast }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'fastapi' | 'node' | 'profile'>('fastapi');

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    onShowToast("Email copied to clipboard: " + PORTFOLIO_DATA.personal.email);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-grid-pattern">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bio & Core Info */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-emerald-400 tracking-wide">
                Available for Backend & Full-Stack Roles
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 leading-[1.15]">
                Architecting robust{' '}
                <span className="text-gradient">Backend Systems</span> & modern web solutions.
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 dark:text-slate-300 max-w-2xl leading-relaxed">
                Hi, I&apos;m <span className="font-semibold text-white">Samir Shrestha</span> — a final-year BSc.CSIT student focused on <span className="text-emerald-400 font-medium">FastAPI</span>, <span className="text-cyan-400 font-medium">Node.js</span>, <span className="text-blue-400 font-medium">PostgreSQL/MySQL</span>, and full-stack delivery with clean, testable code.
              </p>
            </div>

            {/* Quick Metadata Chips */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-800/40 px-3 py-1.5 rounded-lg border border-slate-700/50">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/40 px-3 py-1.5 rounded-lg border border-slate-700/50">
                <Server className="w-3.5 h-3.5 text-cyan-400" />
                <span>RESTful APIs & SQL</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/40 px-3 py-1.5 rounded-lg border border-slate-700/50">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span>BSc.CSIT (TU)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenCvModal}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm border border-slate-700 transition-all duration-200 hover:border-emerald-500/40 shadow-sm cursor-pointer"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>CV / Resume</span>
              </button>

              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 text-slate-300 hover:text-white text-sm border border-slate-800 transition-colors cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="font-mono text-xs">{PORTFOLIO_DATA.personal.email}</span>
              </button>

              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-800/80">
              {PORTFOLIO_DATA.metrics.map((metric, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
                  <div className="text-base font-bold text-slate-100 font-mono text-gradient">
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-400 leading-snug mt-0.5">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Interactive Code & Architecture Window */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-slate-950/90 border border-slate-800/90 shadow-2xl overflow-hidden backdrop-blur-xl">
              
              {/* Window Header */}
              <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">backend_engine</span>
                </div>
                
                {/* Code Window Tabs */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveCodeTab('fastapi')}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                      activeCodeTab === 'fastapi'
                        ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    api.py
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('node')}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                      activeCodeTab === 'node'
                        ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    server.ts
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('profile')}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                      activeCodeTab === 'profile'
                        ? 'bg-slate-800 text-indigo-400 border border-indigo-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    samir.json
                  </button>
                </div>
              </div>

              {/* Code Content Area */}
              <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-300 overflow-x-auto min-h-[340px] flex flex-col justify-between">
                
                {activeCodeTab === 'fastapi' && (
                  <div>
                    <div className="text-slate-500 italic">{'// FastAPI Service + ML Model Integration'}</div>
                    <div>
                      <span className="text-purple-400">from</span> fastapi <span className="text-purple-400">import</span> FastAPI, Depends, HTTPException
                    </div>
                    <div>
                      <span className="text-purple-400">from</span> sqlalchemy.orm <span className="text-purple-400">import</span> Session
                    </div>
                    <div>
                      <span className="text-purple-400">import</span> joblib
                    </div>
                    <br />
                    <div>
                      app = <span className="text-blue-400">FastAPI</span>(title=<span className="text-emerald-300">&quot;AgriPulse Recommendation API&quot;</span>)
                    </div>
                    <div>
                      model = joblib.<span className="text-blue-400">load</span>(<span className="text-emerald-300">&quot;random_forest_model.pkl&quot;</span>)
                    </div>
                    <br />
                    <div>
                      <span className="text-purple-400">@app.post</span>(<span className="text-emerald-300">&quot;/api/v1/recommend&quot;</span>)
                    </div>
                    <div>
                      <span className="text-purple-400">async def</span> <span className="text-yellow-300">recommend_fertilizer</span>(data: SoilMetrics, db: Session = <span className="text-blue-400">Depends</span>(get_db)):
                    </div>
                    <div className="pl-4">
                      prediction = model.<span className="text-blue-400">predict</span>([[data.N, data.P, data.K, data.temp, data.humidity]])
                    </div>
                    <div className="pl-4">
                      db_record = <span className="text-blue-400">save_prediction_history</span>(db, prediction[<span className="text-amber-400">0</span>])
                    </div>
                    <div className="pl-4">
                      <span className="text-purple-400">return</span> &#123; <span className="text-emerald-300">&quot;status&quot;</span>: <span className="text-emerald-300">&quot;success&quot;</span>, <span className="text-emerald-300">&quot;recommendation&quot;</span>: prediction[<span className="text-amber-400">0</span>] &#125;
                    </div>
                  </div>
                )}

                {activeCodeTab === 'node' && (
                  <div>
                    <div className="text-slate-500 italic">{'// RESTful API Handler with Auth & Dockerized MySQL'}</div>
                    <div>
                      <span className="text-purple-400">import</span> &#123; NextRequest, NextResponse &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">&quot;next/server&quot;</span>;
                    </div>
                    <div>
                      <span className="text-purple-400">import</span> &#123; getServerSession &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">&quot;next-auth&quot;</span>;
                    </div>
                    <div>
                      <span className="text-purple-400">import</span> &#123; db &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">&quot;@/lib/mysql-pool&quot;</span>;
                    </div>
                    <br />
                    <div>
                      <span className="text-purple-400">export async function</span> <span className="text-yellow-300">POST</span>(req: NextRequest) &#123;
                    </div>
                    <div className="pl-4">
                      <span className="text-purple-400">const</span> session = <span className="text-purple-400">await</span> <span className="text-blue-400">getServerSession</span>();
                    </div>
                    <div className="pl-4">
                      <span className="text-purple-400">if</span> (!session?.user) <span className="text-purple-400">return</span> NextResponse.<span className="text-blue-400">json</span>(&#123; error: <span className="text-emerald-300">&quot;Unauthorized&quot;</span> &#125;, &#123; status: <span className="text-amber-400">401</span> &#125;);
                    </div>
                    <br />
                    <div className="pl-4">
                      <span className="text-purple-400">const</span> &#123; restaurantId &#125; = <span className="text-purple-400">await</span> req.<span className="text-blue-400">json</span>();
                    </div>
                    <div className="pl-4">
                      <span className="text-purple-400">const</span> [result] = <span className="text-purple-400">await</span> db.<span className="text-blue-400">execute</span>(
                    </div>
                    <div className="pl-8 text-emerald-300">
                      {`INSERT INTO user_wishlists (user_id, restaurant_id) VALUES (?, ?)`},
                    </div>
                    <div className="pl-8">
                      [session.user.id, restaurantId]
                    </div>
                    <div className="pl-4">);</div>
                    <div className="pl-4">
                      <span className="text-purple-400">return</span> NextResponse.<span className="text-blue-400">json</span>(&#123; success: <span className="text-amber-400">true</span>, id: result.insertId &#125;);
                    </div>
                    <div>&#125;</div>
                  </div>
                )}

                {activeCodeTab === 'profile' && (
                  <div>
                    <div className="text-slate-500 italic">{'// samir_shrestha.json metadata'}</div>
                    <div className="text-slate-400">&#123;</div>
                    <div className="pl-4">
                      <span className="text-cyan-400">&quot;name&quot;</span>: <span className="text-emerald-300">&quot;Samir Shrestha&quot;</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-cyan-400">&quot;role&quot;</span>: <span className="text-emerald-300">&quot;Backend & Full-Stack Developer&quot;</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-cyan-400">&quot;location&quot;</span>: <span className="text-emerald-300">&quot;Kathmandu, Nepal&quot;</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-cyan-400">&quot;education&quot;</span>: <span className="text-emerald-300">&quot;BSc.CSIT - Madan Bhandari Memorial College (TU)&quot;</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-cyan-400">&quot;core_stack&quot;</span>: [
                    </div>
                    <div className="pl-8 text-amber-300">
                      &quot;FastAPI&quot;, &quot;Node.js&quot;, &quot;Express&quot;, &quot;Next.js&quot;, &quot;PostgreSQL&quot;, &quot;MySQL&quot;, &quot;Docker&quot;, &quot;React&quot;
                    </div>
                    <div className="pl-4">],</div>
                    <div className="pl-4">
                      <span className="text-cyan-400">&quot;focus&quot;</span>: <span className="text-emerald-300">&quot;Clean REST APIs, DB Indexing & Scalable Systems&quot;</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-cyan-400">&quot;open_for_hire&quot;</span>: <span className="text-purple-400">true</span>
                    </div>
                    <div className="text-slate-400">&#125;</div>
                  </div>
                )}

                {/* Footer of code card */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="font-mono text-emerald-400">API Status: 200 OK</span>
                  </div>
                  <span className="font-mono text-slate-500">Latency: ~18ms</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
