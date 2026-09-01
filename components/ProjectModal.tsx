import React from 'react';
import { X, ExternalLink, CheckCircle2, Server } from 'lucide-react';
import { GithubIcon } from './Icons';
import { Project } from '@/data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl rounded-2xl bg-white border border-gray-200 shadow-xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 py-5 bg-gray-50 border-b border-gray-200 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono mb-2">
            <span>{project.category} System</span>
          </div>

          <h3 className="text-xl font-bold text-gray-900">
            {project.title}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5 font-mono">
            {project.subtitle}
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto text-xs sm:text-sm">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
              System Overview
            </h4>
            <p className="text-gray-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Stats Grid */}
          {project.stats && project.stats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {project.stats.map((stat, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-gray-50 border border-gray-200">
                  <div className="text-[11px] text-gray-500">{stat.label}</div>
                  <div className="text-xs font-semibold text-gray-900 font-mono mt-0.5">{stat.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Key Deliverables */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-gray-700 mb-2">
              Engineering Features & Deliverables
            </h4>
            <ul className="space-y-2">
              {project.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-gray-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture Highlights */}
          {project.architectureHighlights && project.architectureHighlights.length > 0 && (
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-gray-700 mb-2">
                Architectural Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.architectureHighlights.map((arch, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 flex items-start gap-2 text-xs text-gray-700">
                    <Server className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{arch}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-gray-700 mb-2">
              Tech Stack & Tools
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-gray-100 border border-gray-200 text-xs font-mono text-gray-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-gray-100 text-gray-800 text-xs font-medium border border-gray-300 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-sm"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg hover:bg-gray-200 text-gray-600 text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
