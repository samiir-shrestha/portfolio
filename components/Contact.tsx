import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  Clock, 
  ArrowUpRight 
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface ContactProps {
  onShowToast: (msg: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      onShowToast("Email copied: " + text);
      setTimeout(() => setCopiedEmail(false), 2500);
    } else {
      setCopiedPhone(true);
      onShowToast("Phone copied: " + text);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onShowToast("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onShowToast(`Thank you, ${formData.name}! Your message has been prepared.`);
      const mailtoUrl = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${encodeURIComponent(
        formData.subject || 'Portfolio Inquiry'
      )}&body=${encodeURIComponent(
        `Hi Samir,\n\nMy name is ${formData.name} (${formData.email}).\n\n${formData.message}`
      )}`;
      window.open(mailtoUrl, '_blank');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-medium">
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Let&apos;s Connect & Build.
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Open for Backend Developer and Full-Stack Engineer positions, internships, and technical collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Availability Box */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                <span className="font-semibold text-gray-900 text-sm">
                  Actively Seeking Opportunities
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Currently open for Backend Developer, Full-Stack roles, and software engineering internships.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-mono pt-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Response time: Within 24 hours</span>
              </div>
            </div>

            {/* Contact Channels */}
            <div className="space-y-2.5">
              
              {/* Email Card */}
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-emerald-600">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 font-mono">Email</div>
                    <a
                      href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                      className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-emerald-700 transition-colors"
                    >
                      {PORTFOLIO_DATA.personal.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(PORTFOLIO_DATA.personal.email, 'email')}
                  className="p-2 rounded-lg bg-white hover:bg-gray-100 border border-gray-200 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Phone Card */}
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-emerald-600">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 font-mono">Phone / WhatsApp</div>
                    <a
                      href={`tel:${PORTFOLIO_DATA.personal.phone}`}
                      className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-emerald-700 transition-colors"
                    >
                      {PORTFOLIO_DATA.personal.phoneFormatted}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(PORTFOLIO_DATA.personal.phoneFormatted, 'phone')}
                  className="p-2 rounded-lg bg-white hover:bg-gray-100 border border-gray-200 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                  title="Copy Phone"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-emerald-600">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-500 font-mono">Location</div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900">
                    {PORTFOLIO_DATA.personal.location}
                  </div>
                </div>
              </div>

              {/* GitHub Card */}
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-between gap-3 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-800">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 font-mono">GitHub Profile</div>
                    <div className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                      github.com/samiir-shrestha
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900" />
              </a>

            </div>

          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-gray-50/70 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-gray-500 mb-5">
                Leave your details below to start a conversation.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-medium text-gray-700 mb-1">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Johnson"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-gray-300 focus:border-emerald-600 focus:outline-none text-gray-900 text-xs placeholder-gray-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-gray-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-gray-300 focus:border-emerald-600 focus:outline-none text-gray-900 text-xs placeholder-gray-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Backend Role Inquiry / Collaboration"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-gray-300 focus:border-emerald-600 focus:outline-none text-gray-900 text-xs placeholder-gray-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-gray-700 mb-1">
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Samir, I would like to discuss..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-gray-300 focus:border-emerald-600 focus:outline-none text-gray-900 text-xs placeholder-gray-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
