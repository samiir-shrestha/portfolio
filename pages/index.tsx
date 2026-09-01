import React, { useState } from 'react';
import Head from 'next/head';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { CVSection } from '@/components/CVSection';
import { TerminalPlayground } from '@/components/TerminalPlayground';
import { Education } from '@/components/Education';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { ResumeModal } from '@/components/ResumeModal';
import { Toast } from '@/components/Toast';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export default function Home() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  return (
    <>
      <Head>
        <title>{PORTFOLIO_DATA.personal.name} | Backend & Full-Stack Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950">
        {/* Navigation Bar */}
        <Navbar onOpenCvModal={() => setIsResumeModalOpen(true)} />

        {/* Main Content Sections */}
        <main className="flex-1 w-full">
          <Hero 
            onOpenCvModal={() => setIsResumeModalOpen(true)} 
            onShowToast={showToast} 
          />
          <About />
          <Projects />
          <Skills />
          <CVSection onOpenPdfModal={() => setIsResumeModalOpen(true)} />
          <TerminalPlayground />
          <Education />
          <Contact onShowToast={showToast} />
        </main>

        {/* Footer */}
        <Footer />

        {/* Fullscreen CV / Resume PDF Modal */}
        <ResumeModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />

        {/* Non-intrusive Toast Notifications */}
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage('')}
        />
      </div>
    </>
  );
}
