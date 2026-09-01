import React from 'react';
import { 
  Server, 
  Database, 
  Cpu, 
  Languages, 
  Sparkles,
  Layers
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export const About: React.FC = () => {
  const highlights = [
    {
      title: "Backend & API Architecture",
      description: "Designing structured RESTful APIs with FastAPI, Node.js, and Express, emphasizing strict schema validation, JWT auth, and clean error handling.",
      icon: Server,
      accent: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"
    },
    {
      title: "Relational Database Design",
      description: "Managing PostgreSQL and MySQL schemas with optimal indexing, relational foreign key constraints, query optimization, and Docker containerization.",
      icon: Database,
      accent: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10"
    },
    {
      title: "Full-Stack Project Delivery",
      description: "Building responsive React and Next.js interfaces that integrate seamlessly with backend services, OpenStreetMap APIs, and OAuth providers.",
      icon: Layers,
      accent: "text-indigo-400 border-indigo-500/20 bg-indigo-500/10"
    },
    {
      title: "Machine Learning Integration",
      description: "Bridging the gap between data science and production by serving trained Scikit-learn Random Forest classifiers via fast asynchronous endpoints.",
      icon: Cpu,
      accent: "text-amber-400 border-amber-500/20 bg-amber-500/10"
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ABOUT & ENGINEERING PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Driven by clean architecture & reliable systems.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Building software with a focus on maintainability, modular design, and robust server-side performance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Personal Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-md shadow-xl space-y-5">
              <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2.5">
                <span>Who I Am</span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono font-normal">
                  CSIT Final Year
                </span>
              </h3>

              <p className="text-slate-300 text-base leading-relaxed">
                I am <strong className="text-white">Samir Shrestha</strong>, currently in my final year of Bachelor of Science in Computer Science & Information Technology (BSc.CSIT) at <strong className="text-white">Madan Bhandari Memorial College</strong> (affiliated with Tribhuvan University) in Kathmandu, Nepal.
              </p>

              <p className="text-slate-300 text-base leading-relaxed">
                My passion lies in <strong>backend engineering</strong>: turning complex problem statements into clean, testable REST APIs, optimizing database queries, and structuring services with clear architectural boundaries (MVC, modular services, decoupled frontend/backend).
              </p>

              <p className="text-slate-300 text-base leading-relaxed">
                Whether working independently on end-to-end applications or collaborating in teams, I enjoy taking ownership from schema design and API contracts to containerization and cloud deployment.
              </p>

              {/* Languages Spoken Chips */}
              <div className="pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
                  <Languages className="w-4 h-4 text-emerald-400" />
                  <span>Languages Spoken:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PORTFOLIO_DATA.personal.languagesSpoken.map((lang, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs font-medium text-slate-200"
                    >
                      <span className="text-white font-semibold">{lang.language}</span>
                      <span className="text-slate-400 font-mono">({lang.proficiency})</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Pillars of Expertise */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 group flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${item.accent}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
