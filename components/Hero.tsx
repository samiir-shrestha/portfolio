import React, { useState } from 'react';
import { 
  ArrowRight, 
  FileText, 
  MapPin, 
  Copy, 
  Check, 
  Server, 
  GraduationCap,
  Code2,
  Database,
  Mail
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface HeroProps {
  onOpenCvModal: () => void;
  onShowToast: (msg: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCvModal, onShowToast }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    onShowToast("Email copied to clipboard: " + PORTFOLIO_DATA.personal.email);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="hero" className="pt-28 pb-16 sm:pt-36 sm:pb-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-medium text-emerald-800">
                Available for Backend & Full-Stack Roles
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Hi, I&apos;m Samir Shrestha.
                <span className="block text-emerald-700 mt-1 font-bold">
                  Backend & Full-Stack Developer
                </span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
                Final-year BSc.CSIT student at Tribhuvan University, building robust backend systems, RESTful APIs, and database architectures with <strong className="text-gray-900 font-semibold">FastAPI</strong>, <strong className="text-gray-900 font-semibold">Node.js</strong>, <strong className="text-gray-900 font-semibold">PostgreSQL</strong>, and <strong className="text-gray-900 font-semibold">React</strong>.
              </p>
            </div>

            {/* Quick Metadata */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-gray-600">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
                <Server className="w-3.5 h-3.5 text-emerald-600" />
                <span>REST APIs & Relational DBs</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                <span>BSc.CSIT (TU, Final Year)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-sm"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenCvModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-gray-50 text-gray-800 font-medium text-sm border border-gray-300 transition-colors shadow-sm cursor-pointer"
              >
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>CV / Resume</span>
              </button>

              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-white hover:bg-gray-50 text-gray-700 text-xs font-mono border border-gray-200 transition-colors cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gray-500" />}
                <span>{PORTFOLIO_DATA.personal.email}</span>
              </button>

              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 transition-colors"
                aria-label="GitHub Profile"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Clean Profile Highlights Card */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-gray-700">
                  Quick Profile Summary
                </div>
                <span className="text-[11px] font-mono text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Open for hire
                </span>
              </div>

              <div className="space-y-3.5 text-xs text-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Backend Specialization</div>
                    <div>FastAPI, Node.js, Express, RESTful APIs, JWT Auth</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Relational Databases</div>
                    <div>PostgreSQL, MySQL, Schema Design, Indexing, Docker</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Languages & Tools</div>
                    <div>Python, JavaScript, TypeScript, Java, PHP, Git, Docker</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Academic Background</div>
                    <div>BSc.CSIT — Madan Bhandari Memorial College (TU)</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  samirstha9087@gmail.com
                </span>
                <a
                  href="#contact"
                  className="text-emerald-700 hover:text-emerald-800 font-medium"
                >
                  Send a message &rarr;
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Metrics Row */}
        <div className="mt-12 pt-8 border-t border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {PORTFOLIO_DATA.metrics.map((metric, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white border border-gray-200">
              <div className="text-xl font-bold text-gray-900 font-mono">
                {metric.value}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
