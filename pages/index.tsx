import React, { useState } from 'react';
import Head from 'next/head';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { Education } from '@/components/Education';
import { CVSection } from '@/components/CVSection';
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

      <div className="min-h-screen flex flex-col justify-between bg-white text-gray-900 selection:bg-emerald-100 selection:text-emerald-900">
        {/* Navigation Bar */}
        <Navbar onOpenCvModal={() => setIsResumeModalOpen(true)} />

        {/* Main Content Sections */}
        <main className="flex-1 w-full bg-white">
          <Hero 
            onOpenCvModal={() => setIsResumeModalOpen(true)} 
            onShowToast={showToast} 
          />
          <About />
          <Projects />
          <Skills />
          <Education />
          <CVSection onOpenPdfModal={() => setIsResumeModalOpen(true)} />
          <Contact onShowToast={showToast} />
        </main>

        {/* Footer */}
        <Footer />

        {/* Fullscreen CV / Resume PDF Modal */}
        <ResumeModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />

        {/* Toast Notifications */}
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage('')}
        />
      </div>
    </>
  );
}
