import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  Maximize2
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { PORTFOLIO_DATA, Project } from '@/data/portfolioData';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Backend' | 'Full Stack'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters: ('All' | 'Backend' | 'Full Stack')[] = ['All', 'Backend', 'Full Stack'];

  const filteredProjects = activeFilter === 'All'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-medium">
              <span>PROJECTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Featured Projects & Systems.
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Web applications demonstrating REST API architecture, database design, ML integration, and full-stack execution.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg border border-gray-200 bg-gray-50 self-start md:self-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-white text-gray-900 font-semibold shadow-sm border border-gray-200'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {filter === 'All' ? 'All' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col justify-between rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-colors p-6 shadow-sm"
            >
              <div>
                {/* Top Badge & Live Indicator */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {project.category}
                  </span>
                  
                  {project.liveUrl && (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      Live Demo
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-500 mb-3 font-mono">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Bullet Highlights */}
                <div className="space-y-1.5 mb-5">
                  {project.bullets.slice(0, 3).map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1 mb-5 pt-3 border-t border-gray-100">
                  {project.technologies.slice(0, 5).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-gray-100 text-[11px] font-mono text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-1.5 py-0.5 text-[11px] font-mono text-gray-500">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-2 pt-2">
                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-colors flex items-center justify-center"
                      title="GitHub Repository"
                      aria-label={`${project.title} GitHub`}
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-sm"
                        title="Live Application"
                      >
                        <span>Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <span>Details</span>
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Details Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};
