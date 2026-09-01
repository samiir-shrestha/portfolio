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
    <section id="skills" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-medium">
            <span>SKILLS & TECHNOLOGIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Technical Stack & Competencies.
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Hands-on technical stack across backend frameworks, relational databases, cloud tooling, and modern languages.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {PORTFOLIO_DATA.skillCategories.map((cat, idx) => {
            const Icon = getIcon(cat.iconName);
            const isActive = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{cat.category}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Display */}
        <div className="rounded-2xl bg-gray-50/60 border border-gray-200 p-6 sm:p-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-200">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {PORTFOLIO_DATA.skillCategories[activeTab].category}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                {PORTFOLIO_DATA.skillCategories[activeTab].description}
              </p>
            </div>
            <div className="px-2.5 py-1 rounded bg-white border border-gray-200 text-xs font-mono text-emerald-700 self-start sm:self-auto">
              {PORTFOLIO_DATA.skillCategories[activeTab].skills.length} skills
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {PORTFOLIO_DATA.skillCategories[activeTab].skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                className="p-4 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-semibold text-gray-900 text-sm">
                      {skill.name}
                    </span>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                      skill.level === 'Advanced' 
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                  {skill.description && (
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {skill.description}
                    </p>
                  )}
                </div>

                <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center gap-1.5 text-[11px] text-gray-500 font-mono">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>Tested & verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Keywords Cloud */}
        <div className="mt-8 p-4 rounded-xl bg-white border border-gray-200 flex flex-wrap items-center gap-2 text-xs text-gray-600">
          <span className="font-semibold text-gray-900 mr-1 font-mono">Keywords:</span>
          {["FastAPI", "Node.js", "Express", "PostgreSQL", "MySQL", "Docker", "Python", "TypeScript", "React.js", "Next.js", "PHP", "Java", "RESTful APIs", "JWT", "OAuth 2.0", "Git", "Render", "Vercel", "Linux", "Random Forest ML"].map((item, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded bg-gray-100 border border-gray-200 font-mono text-[11px] text-gray-700">
              {item}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
};
