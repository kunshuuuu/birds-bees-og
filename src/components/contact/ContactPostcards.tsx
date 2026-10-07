import React, { useState } from 'react';
import { contactSchema } from '../../lib/validation';
import { PostageStamp } from '../materials/PostageStamp';
import { Stamp } from '../materials/Stamp';
import { CurlyArrowDoodle, WavyUnderlineDoodle } from '../illustrations/DoodleDecorations';
import { Bee } from '../illustrations/Bee';
import { MagneticButton } from '../animations/MagneticButton';

export const ContactPostcards: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '',
  });

  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = contactSchema.safeParse(formData);
    if (!res.success) {
      setError(res.error.issues[0].message);
      return;
    }

    // Save in demo mode
    localStorage.setItem('bb_contact_last', JSON.stringify({ ...formData, sentAt: new Date().toISOString() }));
    setSent(true);
  };

  return (
    <div className="relative w-full max-w-lg select-none">
      {/* Black Pushpin */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 w-5 h-5 rounded-full bg-[#2A1E18] shadow-md border-2 border-white pointer-events-none" />

      {/* Main Postcard Surface */}
      <div
        className={`relative bg-[#F5F0E6] paper-texture rounded-2xl p-6 sm:p-8 border-2 border-[#CED9E1] shadow-2xl rotate-[1.5deg] transition-all duration-500 ${
          sent ? 'scale-95 opacity-90' : ''
        }`}
      >
        {/* Postage Stamp on Top-Right */}
        <div className="absolute top-4 right-4">
          <PostageStamp label="CAFE POST" value="INDORE" rotation={2} />
        </div>

        {/* Postcard Header */}
        <div className="mb-4 pr-24">
          <span className="font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-[#AB653E] block">
            Postcard Message
          </span>
          <span className="font-script text-2xl text-[#2A1E18]">
            Say hi to the garden team
          </span>
        </div>

        {sent ? (
          <div className="py-12 text-center flex flex-col items-center gap-3">
            <Stamp variant="leaf" text="DISPATCHED" size={90} rotation={-8} />
            <h3 className="font-display text-2xl text-[#2A1E18]">Postcard Sent!</h3>
            <p className="font-body text-sm text-[#6D4B38] max-w-xs">
              Saved in demo mode — our garden host will write back to you shortly.
            </p>
            <MagneticButton
              type="button"
              onClick={() => {
                setSent(false);
                setFormData({ name: '', email: '', phone: '', message: '', honeypot: '' });
              }}
              variant="outline"
              size="sm"
            >
              Send Another Note &rarr;
            </MagneticButton>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            {error && (
              <div className="p-2 bg-red-100 text-red-800 rounded-md text-xs font-ui">
                {error}
              </div>
            )}

            {/* Ruled message area */}
            <div>
              <label htmlFor="postcard-message" className="block text-[11px] font-ui font-bold uppercase text-[#6D4B38] mb-1">
                Your Note
              </label>
              <textarea
                id="postcard-message"
                required
                rows={3}
                placeholder="Writing to ask about booking a birthday table, private lawn hire, or seasonal dishes..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/80 border border-[#CED9E1] font-body text-sm text-[#2A1E18] focus:border-[#AB653E] focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="postcard-name" className="block text-[11px] font-ui font-bold uppercase text-[#6D4B38] mb-1">
                  Name
                </label>
                <input
                  id="postcard-name"
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/80 border border-[#CED9E1] font-ui text-sm text-[#2A1E18] focus:border-[#AB653E] focus:outline-hidden"
                />
              </div>

              <div>
                <label htmlFor="postcard-email" className="block text-[11px] font-ui font-bold uppercase text-[#6D4B38] mb-1">
                  Email
                </label>
                <input
                  id="postcard-email"
                  type="email"
                  required
                  placeholder="hello@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/80 border border-[#CED9E1] font-ui text-sm text-[#2A1E18] focus:border-[#AB653E] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between border-t border-[#6D4B38]/15 pt-3">
              <div className="flex items-center gap-2">
                <CurlyArrowDoodle label="Say hi →" color="#AB653E" />
              </div>

              <MagneticButton
                type="submit"
                variant="primary"
                size="md"
              >
                Send Postcard &rarr;
              </MagneticButton>
            </div>
          </form>
        )}
      </div>

      {/* Script below with drifting bee */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <div className="relative">
          <span className="font-script text-3xl text-[#2A1E18]">
            Mail your note
          </span>
          <WavyUnderlineDoodle color="#AB653E" className="w-48" />
        </div>
        <Bee size={24} flutter={true} />
      </div>
    </div>
  );
};
