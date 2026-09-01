import React, { useState } from 'react';
import { 
  Download, 
  ExternalLink, 
  Printer, 
  FileText, 
  MapPin, 
  Phone, 
  Mail, 
  BookOpen, 
  Briefcase, 
  Layers, 
  Award 
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface CVSectionProps {
  onOpenPdfModal?: () => void;
}

export const CVSection: React.FC<CVSectionProps> = ({ onOpenPdfModal }) => {
  const [viewMode, setViewMode] = useState<'structured' | 'preview'>('structured');

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="cv" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
            <FileText className="w-3.5 h-3.5" />
            <span>CURRICULUM VITAE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Resume & Professional Profile.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Directly derived from official credentials with verified project deliverables and academic milestones.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('structured')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                viewMode === 'structured'
                  ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Interactive ATS View
            </button>
            <button
              onClick={() => {
                setViewMode('preview');
                if (onOpenPdfModal && window.innerWidth < 768) {
                  onOpenPdfModal();
                }
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                viewMode === 'preview'
                  ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Embedded PDF Viewer
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
              title="Print Resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open PDF</span>
            </a>

            <a
              href="/cv.pdf"
              download="Samir_Shrestha_CV.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Download CV (PDF)</span>
            </a>
          </div>
        </div>

        {/* View Content: Structured Resume Sheet */}
        {viewMode === 'structured' ? (
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-12 shadow-2xl backdrop-blur-xl space-y-10 print:bg-white print:text-black print:p-0 print:border-none print:shadow-none">
            
            {/* CV Header */}
            <div className="text-center space-y-3 pb-8 border-b border-slate-800 print:border-black">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white print:text-black tracking-tight">
                {PORTFOLIO_DATA.personal.name}
              </h1>
              <div className="text-lg font-semibold text-emerald-400 print:text-emerald-700">
                Backend Developer
              </div>

              {/* Contact meta line */}
              <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-300 print:text-gray-800 font-mono">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 print:text-black" />
                  {PORTFOLIO_DATA.personal.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 print:text-black" />
                  <a href={`tel:${PORTFOLIO_DATA.personal.phone}`} className="hover:underline">{PORTFOLIO_DATA.personal.phoneFormatted}</a>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-400 print:text-black" />
                  <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="hover:underline">{PORTFOLIO_DATA.personal.email}</a>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <GithubIcon className="w-3.5 h-3.5 text-emerald-400 print:text-black" />
                  <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    github.com/samiir-shrestha
                  </a>
                </span>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-2">
              <p className="text-slate-300 print:text-gray-900 text-sm sm:text-base leading-relaxed">
                {PORTFOLIO_DATA.personal.fullBio}
              </p>
            </div>

            {/* Education Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-700 print:border-black">
                <BookOpen className="w-5 h-5 text-emerald-400 print:text-black" />
                <h3 className="text-lg font-bold tracking-wider uppercase text-white print:text-black font-mono">
                  EDUCATION
                </h3>
              </div>

              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-bold text-white print:text-black text-base">
                      {edu.institution}
                    </h4>
                    <span className="text-xs sm:text-sm font-mono text-emerald-400 print:text-gray-700">
                      {edu.period}
                    </span>
                  </div>
                  <div className="text-sm text-slate-300 print:text-gray-800">
                    <span className="font-semibold">{edu.degree}</span> — {edu.field} ({edu.university})
                  </div>
                </div>
              ))}
            </div>

            {/* Projects Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-700 print:border-black">
                <Briefcase className="w-5 h-5 text-emerald-400 print:text-black" />
                <h3 className="text-lg font-bold tracking-wider uppercase text-white print:text-black font-mono">
                  PROJECTS
                </h3>
              </div>

              {/* 1. Smart Fertilizer Recommendation System */}
              <div className="space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="font-bold text-white print:text-black text-base">
                    Smart Fertilizer Recommendation System
                  </h4>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <a
                      href="https://github.com/samiir-shrestha/agripulse"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 print:text-blue-700 hover:underline"
                    >
                      GitHub: github.com/samiir-shrestha/agripulse
                    </a>
                  </div>
                </div>
                
                <div className="text-xs font-mono text-cyan-400 print:text-blue-700">
                  Live Demo:{' '}
                  <a href="https://final-front-sandy.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline">
                    https://final-front-sandy.vercel.app/
                  </a>
                </div>

                <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-slate-300 print:text-gray-900 leading-relaxed pl-1">
                  <li>Designed and built a full-stack web app that recommends fertilizers using a trained machine learning model.</li>
                  <li>Developed the backend with FastAPI and PostgreSQL, deployed on Render, exposing a RESTful API layer.</li>
                  <li>Built the frontend with React, deployed on Vercel, including a location picker using OpenStreetMap.</li>
                  <li>Integrated a Random Forest classifier for fertilizer recommendations.</li>
                  <li>Implemented JWT-based authentication, rain-delay alerts, and automated PDF report generation.</li>
                </ul>
              </div>

              {/* 2. Book Rental System */}
              <div className="space-y-2.5 pt-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="font-bold text-white print:text-black text-base">
                    Book Rental System
                  </h4>
                  <div className="text-xs font-mono">
                    <a
                      href="https://github.com/samiir-shrestha/book-rental"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 print:text-blue-700 hover:underline"
                    >
                      GitHub: github.com/samiir-shrestha/book-rental
                    </a>
                  </div>
                </div>

                <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-slate-300 print:text-gray-900 leading-relaxed pl-1">
                  <li>Built a complete book rental web app, handling frontend and backend independently.</li>
                  <li>Developed a dynamic, responsive UI using React.js with reusable component-based architecture.</li>
                  <li>Built server-side logic with PHP for user authentication and data operations.</li>
                  <li>Implemented full CRUD functionality: browse, rent, return, and manage books.</li>
                  <li>Managed relational data with MYSQL for book inventory, user records and rental history.</li>
                </ul>
              </div>

              {/* 3. Food Finder */}
              <div className="space-y-2.5 pt-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="font-bold text-white print:text-black text-base">
                    Food Finder
                  </h4>
                  <div className="text-xs font-mono">
                    <a
                      href="https://github.com/samiir-shrestha/food-finder"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 print:text-blue-700 hover:underline"
                    >
                      GitHub: github.com/samiir-shrestha/food-finder
                    </a>
                  </div>
                </div>

                <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-slate-300 print:text-gray-900 leading-relaxed pl-1">
                  <li>Built a full-stack restaurant discovery and wishlist app using Next.js and TypeScript.</li>
                  <li>Designed a reusable, component-based React UI including dynamic listing, detail, and wishlist pages.</li>
                  <li>Developed a RESTful API layer in Next.js for browsing restaurants and managing user wishlists.</li>
                  <li>Implemented GitHub OAuth authentication via NextAuth.js, with session-based route protection for user-specific actions.</li>
                  <li>Managed relational data in MySQL for restaurant listings and user wishlist records, containerized with Docker for local development.</li>
                </ul>
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-700 print:border-black">
                <Layers className="w-5 h-5 text-emerald-400 print:text-black" />
                <h3 className="text-lg font-bold tracking-wider uppercase text-white print:text-black font-mono">
                  SKILLS
                </h3>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-slate-300 print:text-gray-900 leading-relaxed">
                <div>
                  <strong className="text-white print:text-black">Backend:</strong> Node.js, Express.js, FastAPI, Next.js, RESTful API Design
                </div>
                <div>
                  <strong className="text-white print:text-black">Languages:</strong> Java, Python, JavaScript, TypeScript
                </div>
                <div>
                  <strong className="text-white print:text-black">Databases:</strong> PostgreSQL, MySQL
                </div>
                <div>
                  <strong className="text-white print:text-black">DevOps & Tools:</strong> Docker, Git/GitHub
                </div>
                <div>
                  <strong className="text-white print:text-black">Frontend:</strong> React.js, HTML5, CSS3
                </div>
                <div>
                  <strong className="text-white print:text-black">Concepts:</strong> Full Stack Development, MVC Pattern, RESTful Architecture, Component Design
                </div>
                <div>
                  <strong className="text-white print:text-black">Soft Skills:</strong> Problem Solving, Teamwork, Effective Communication, Time Management
                </div>
              </div>
            </div>

            {/* Languages Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-700 print:border-black">
                <Award className="w-5 h-5 text-emerald-400 print:text-black" />
                <h3 className="text-lg font-bold tracking-wider uppercase text-white print:text-black font-mono">
                  LANGUAGES
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 print:text-gray-900">
                Nepali, English, Hindi
              </p>
            </div>

          </div>
        ) : (
          /* Embedded PDF Viewer View */
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 sm:p-6 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <span className="text-sm font-mono text-emerald-400">Viewing cv.pdf</span>
              <a
                href="/cv.pdf"
                download="Samir_Shrestha_CV.pdf"
                className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-xs"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </a>
            </div>
            <div className="w-full h-[750px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <iframe
                src="/cv.pdf"
                className="w-full h-full border-none"
                title="Samir Shrestha CV PDF"
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
