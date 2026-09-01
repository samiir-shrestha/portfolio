import React from 'react';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-5xl h-[88vh] rounded-2xl bg-white border border-gray-200 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 leading-none">
                {PORTFOLIO_DATA.personal.name} — Resume (PDF)
              </h3>
              <p className="text-[11px] text-gray-500 font-mono mt-0.5">
                Official Curriculum Vitae
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 transition-colors"
              title="Open in new window"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href="/cv.pdf"
              download="Samir_Shrestha_CV.pdf"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors cursor-pointer ml-1"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PDF iframe viewer */}
        <div className="flex-1 bg-gray-100 p-2 overflow-hidden">
          <iframe
            src="/cv.pdf"
            className="w-full h-full rounded-xl border border-gray-200 bg-white"
            title="Samir Shrestha Resume Modal View"
          />
        </div>

      </div>
    </div>
  );
};
