import React from 'react';
import { ArrowUp, Mail, FileText } from 'lucide-react';
import { GithubIcon } from './Icons';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-100">
          
          {/* Brand & Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
            <span className="font-bold text-gray-900 text-base">
              {PORTFOLIO_DATA.personal.name}
            </span>
            <p className="text-xs text-gray-500">
              Backend Developer & Full-Stack Engineer • Kathmandu, Nepal
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600">
            <a href="#about" className="hover:text-gray-900 transition-colors">About</a>
            <a href="#projects" className="hover:text-gray-900 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-gray-900 transition-colors">Skills</a>
            <a href="#education" className="hover:text-gray-900 transition-colors">Education</a>
            <a href="#cv" className="hover:text-gray-900 transition-colors">CV / Resume</a>
            <a href="#contact" className="hover:text-gray-900 transition-colors">Contact</a>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-2">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-colors"
              title="CV PDF"
            >
              <FileText className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer ml-2"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <div>
            &copy; {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}. All rights reserved.
          </div>
          <div>
            FastAPI • Node.js • PostgreSQL • Next.js • React
          </div>
        </div>

      </div>
    </footer>
  );
};
