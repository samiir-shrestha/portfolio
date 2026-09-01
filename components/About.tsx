import React from 'react';
import { 
  Server, 
  Database, 
  Cpu, 
  Languages, 
  Layers
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export const About: React.FC = () => {
  const highlights = [
    {
      title: "Backend & API Architecture",
      description: "Designing structured RESTful APIs with FastAPI, Node.js, and Express, emphasizing strict schema validation, JWT auth, and clean error handling.",
      icon: Server,
    },
    {
      title: "Relational Database Design",
      description: "Managing PostgreSQL and MySQL schemas with optimal indexing, foreign key constraints, query optimization, and Docker containerization.",
      icon: Database,
    },
    {
      title: "Full-Stack Project Delivery",
      description: "Building responsive React and Next.js interfaces that integrate seamlessly with backend services, OpenStreetMap APIs, and OAuth providers.",
      icon: Layers,
    },
    {
      title: "Machine Learning Integration",
      description: "Bridging the gap between data science and production by serving trained Scikit-learn Random Forest classifiers via fast asynchronous endpoints.",
      icon: Cpu,
    }
  ];

  return (
    <section id="about" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-medium">
            <span>ABOUT ME</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Driven by clean architecture & reliable systems.
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Building software with a focus on maintainability, modular design, and robust server-side performance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Personal Narrative */}
          <div className="lg:col-span-6 space-y-5">
            <div className="p-6 sm:p-7 rounded-2xl bg-gray-50/70 border border-gray-200 space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center justify-between">
                <span>Background & Experience</span>
                <span className="text-xs px-2 py-0.5 rounded bg-gray-200/80 text-gray-700 font-mono font-normal">
                  TU CSIT
                </span>
              </h3>

              <p className="text-gray-700 text-sm leading-relaxed">
                I am <strong className="text-gray-900">Samir Shrestha</strong>, in my final year of Bachelor of Science in Computer Science & Information Technology (BSc.CSIT) at <strong className="text-gray-900">Madan Bhandari Memorial College</strong> (Tribhuvan University) in Kathmandu, Nepal.
              </p>

              <p className="text-gray-700 text-sm leading-relaxed">
                My primary focus is <strong>backend engineering</strong>: turning complex problem statements into clean, testable REST APIs, optimizing relational databases, and structuring applications with clear architectural boundaries.
              </p>

              <p className="text-gray-700 text-sm leading-relaxed">
                Whether developing independently or collaborating in teams, I enjoy taking full ownership from schema design and API contracts to containerization and cloud deployment.
              </p>

              {/* Languages Spoken */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700 mb-2.5">
                  <Languages className="w-4 h-4 text-emerald-600" />
                  <span>Languages Spoken:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PORTFOLIO_DATA.personal.languagesSpoken.map((lang, i) => (
                    <div
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-xs text-gray-800"
                    >
                      <span className="font-semibold">{lang.language}</span>{' '}
                      <span className="text-gray-500 font-mono">({lang.proficiency})</span>
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
                  className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-emerald-300 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-3 text-emerald-700">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
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
