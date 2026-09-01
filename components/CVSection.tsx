import React from 'react';
import { 
  Download, 
  ExternalLink, 
  FileText, 
  CheckCircle2
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface CVSectionProps {
  onOpenPdfModal?: () => void;
}

export const CVSection: React.FC<CVSectionProps> = ({ onOpenPdfModal }) => {
  return (
    <section id="cv" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-medium">
            <span>RESUME / CV</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Curriculum Vitae & Qualifications.
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Verified academic credentials, technical skills, and production-tested project deliverables.
          </p>
        </div>

        {/* Compact Resume Preview Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gray-50/70 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {PORTFOLIO_DATA.personal.name} — Official Resume
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">
                  Format: PDF • Backend & Full-Stack Developer
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {onOpenPdfModal && (
                <button
                  onClick={onOpenPdfModal}
                  className="px-4 py-2 rounded-lg bg-white hover:bg-gray-100 text-gray-800 text-xs font-medium border border-gray-300 transition-colors shadow-sm cursor-pointer"
                >
                  Preview PDF
                </button>
              )}

              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 text-gray-800 text-xs font-medium border border-gray-300 transition-colors shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Tab</span>
              </a>

              <a
                href="/cv.pdf"
                download="Samir_Shrestha_CV.pdf"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </a>
            </div>
          </div>

          {/* Quick Summary Points */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-1.5">
              <div className="font-bold text-gray-900 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Education</span>
              </div>
              <p className="text-gray-600">
                BSc.CSIT (Final Year) at Madan Bhandari Memorial College, Tribhuvan University.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-1.5">
              <div className="font-bold text-gray-900 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Core Stack</span>
              </div>
              <p className="text-gray-600">
                FastAPI, Node.js, Express, PostgreSQL, MySQL, Docker, React.js, Python, TypeScript.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-1.5">
              <div className="font-bold text-gray-900 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Key Projects</span>
              </div>
              <p className="text-gray-600">
                Smart Fertilizer Recommendation (ML), Food Finder (OAuth), Book Rental System.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
