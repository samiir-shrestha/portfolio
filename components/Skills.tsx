import React, { useState } from 'react';
import { 
  Server, 
  Code2, 
  Database, 
  Terminal, 
  Layout, 
  Cpu, 
  Check 
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server': return Server;
      case 'Code2': return Code2;
      case 'Database': return Database;
      case 'Terminal': return Terminal;
      case 'Layout': return Layout;
      case 'Cpu': return Cpu;
      default: return Server;
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Tech Stack & Competencies.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Practical experience across backend frameworks, relational databases, cloud deployments, and modern languages.
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {PORTFOLIO_DATA.skillCategories.map((cat, idx) => {
            const Icon = getIcon(cat.iconName);
            const isActive = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 font-semibold shadow-lg shadow-emerald-500/20 scale-102'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{cat.category}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Skills Display */}
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800/90 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span>{PORTFOLIO_DATA.skillCategories[activeTab].category}</span>
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                {PORTFOLIO_DATA.skillCategories[activeTab].description}
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs font-mono text-emerald-400 self-start sm:self-auto">
              {PORTFOLIO_DATA.skillCategories[activeTab].skills.length} core competencies
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO_DATA.skillCategories[activeTab].skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                className="p-5 rounded-2xl bg-slate-950/60 hover:bg-slate-950 border border-slate-800/80 hover:border-emerald-500/30 transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors text-base">
                      {skill.name}
                    </span>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md ${
                      skill.level === 'Advanced' 
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/20'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                  {skill.description && (
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      {skill.description}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-900 flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Production & Academic Tested</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All skills quick badge clouds */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900/30 border border-slate-800/50 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-slate-400">
          <span className="text-slate-200 font-semibold mr-2">Full Keyword Matrix:</span>
          {["FastAPI", "Node.js", "PostgreSQL", "MySQL", "Docker", "Python", "TypeScript", "React.js", "Next.js", "PHP", "Java", "RESTful APIs", "JWT", "OAuth 2.0", "Git", "Render", "Vercel", "Linux", "Random Forest ML", "MVC"].map((item, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800/50 border border-slate-700/40 text-slate-300">
              #{item}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
};
