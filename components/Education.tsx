import React from 'react';
import { GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-medium">
            <span>EDUCATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Academic Background.
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Structured computer science curriculum focusing on software engineering, database systems, and algorithms.
          </p>
        </div>

        {/* Education Card */}
        <div className="space-y-4">
          {PORTFOLIO_DATA.education.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-gray-50/70 border border-gray-200"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-5 border-b border-gray-200">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                        {item.institution}
                      </h3>
                      <p className="text-xs font-medium text-emerald-700 font-mono">
                        {item.university}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 font-medium pl-0 sm:pl-11">
                    {item.degree} — <span className="text-gray-600">{item.field}</span>
                  </p>
                </div>

                <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs font-mono text-gray-500">
                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-gray-200">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    <span>{item.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-gray-200">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-5 space-y-2.5">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-gray-700">
                  Academic Focus & Key Coursework
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
                  {item.highlights.map((h, hIdx) => (
                    <div
                      key={hIdx}
                      className="p-3.5 rounded-xl bg-white border border-gray-200 flex items-start gap-2 text-xs text-gray-600 leading-relaxed"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
