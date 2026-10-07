import React, { useState } from 'react';
import { jobs } from '../data/jobs';
import { hireSchema } from '../lib/validation';
import { Stamp } from '../components/materials/Stamp';
import { Tape } from '../components/materials/Tape';
import { MagneticButton } from '../components/animations/MagneticButton';

export const Hire: React.FC = () => {
  const [expandedJob, setExpandedJob] = useState<string | null>('barista');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Head Artisan Barista',
    experience: '',
  });
  const [resumeFile, setResumeFile] = useState<{ name: string; size: string } | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate client-side extension & size <= 5MB (§16)
    const validExts = ['.pdf', '.doc', '.docx'];
    const fileNameLower = file.name.toLowerCase();
    const hasValidExt = validExts.some((ext) => fileNameLower.endsWith(ext));

    if (!hasValidExt) {
      setResumeError('Please upload a PDF or Word document (.pdf, .doc, .docx).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setResumeError('File size must be 5 MB or less.');
      return;
    }

    const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
    setResumeFile({ name: file.name, size: `${sizeInMb} MB` });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const res = hireSchema.safeParse(formData);
    if (!res.success) {
      setFormError(res.error.issues[0].message);
      return;
    }

    // In demo mode: save metadata locally (§16)
    localStorage.setItem(
      'bb_hire_application',
      JSON.stringify({
        ...formData,
        resumeFileName: resumeFile?.name || 'none',
        appliedAt: new Date().toISOString(),
      })
    );

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 sm:px-12 bg-[#F3FEFE]">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#AB653E] block mb-2">
          Join Our Garden Team · Scheme 71, Indore
        </span>
        <h1 className="font-display font-medium text-5xl sm:text-7xl text-[#2A1E18] tracking-tight mb-3">
          Come work in the garden.
        </h1>
        <p className="font-hand text-2xl sm:text-3xl text-[#6D4B38]">
          we are looking for people who care about plants, craft, and kindness.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Expandable Job Slips (§16) */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-display text-2xl text-[#2A1E18] mb-4">
            Open Garden Positions
          </h2>

          {jobs.map((job) => {
            const isExpanded = expandedJob === job.id;
            return (
              <div
                key={job.id}
                className="bg-[#F5F0E6] paper-texture rounded-2xl border border-[#CED9E1] shadow-md overflow-hidden transition-all duration-300"
              >
                {/* Header button */}
                <button
                  type="button"
                  onClick={() => setExpandedJob(isExpanded ? null : job.id)}
                  aria-expanded={isExpanded}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-display text-2xl font-bold text-[#AB653E]">
                      {job.num}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#2A1E18]">
                        {job.title}
                      </h3>
                      <span className="font-ui text-xs text-[#6D4B38]">
                        {job.location} · {job.type}
                      </span>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-[#2A1E18]">
                    {isExpanded ? '−' : '+'}
                  </span>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#6D4B38]/10 text-xs font-ui text-[#2A1E18] space-y-4">
                    <p className="font-body text-sm text-[#6D4B38] leading-relaxed">
                      {job.description}
                    </p>

                    <div>
                      <span className="font-bold uppercase tracking-wider text-[#2F5D3A] block mb-2">
                        Key Responsibilities:
                      </span>
                      <ul className="list-disc pl-5 space-y-1 text-[#6D4B38]">
                        {job.responsibilities.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="font-bold uppercase tracking-wider text-[#2F5D3A] block mb-2">
                        What We Look For:
                      </span>
                      <ul className="list-disc pl-5 space-y-1 text-[#6D4B38]">
                        {job.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <MagneticButton
                        type="button"
                        onClick={() => setFormData({ ...formData, role: job.title })}
                        variant="dark"
                        size="sm"
                      >
                        Apply for this role &darr;
                      </MagneticButton>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: Application Form (§16) */}
        <div className="lg:col-span-5 bg-[#F5F0E6] paper-texture rounded-2xl p-6 sm:p-8 border-2 border-[#CED9E1] shadow-xl relative">
          <Tape rotation={-4} className="-top-3 left-12" />

          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center gap-4">
              <Stamp variant="leaf" text="RECEIVED" subtext="GARDEN TEAM" size={110} rotation={-6} />
              <h3 className="font-display text-3xl text-[#2A1E18]">
                Application Received!
              </h3>
              <p className="font-body text-sm text-[#6D4B38]">
                Saved in demo mode — resume not uploaded to live server. If your experience matches our garden ethos, we will get in touch.
              </p>
              <div className="mt-4">
                <MagneticButton
                  type="button"
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  size="sm"
                >
                  Submit Another Application &rarr;
                </MagneticButton>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <span className="font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-[#AB653E] block">
                  Candidate Dossier
                </span>
                <h3 className="font-display text-2xl text-[#2A1E18]">
                  Submit Your Details
                </h3>
              </div>

              {formError && (
                <div className="p-2.5 bg-red-100 text-red-800 text-xs rounded-lg font-ui font-medium">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-ui font-bold uppercase text-[#2A1E18] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#CED9E1] font-ui text-sm focus:border-[#AB653E] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-ui font-bold uppercase text-[#2A1E18] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#CED9E1] font-ui text-sm focus:border-[#AB653E] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-ui font-bold uppercase text-[#2A1E18] mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98260 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#CED9E1] font-ui text-sm focus:border-[#AB653E] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-ui font-bold uppercase text-[#2A1E18] mb-1">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#CED9E1] font-ui text-sm focus:border-[#AB653E] focus:outline-hidden"
                >
                  {jobs.map((j) => (
                    <option key={j.id} value={j.title}>
                      {j.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-ui font-bold uppercase text-[#2A1E18] mb-1">
                  Experience &amp; Background
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about where you have worked and why you want to join our garden..."
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#CED9E1] font-ui text-sm focus:border-[#AB653E] focus:outline-hidden"
                />
              </div>

              {/* Client-side resume file upload */}
              <div>
                <label className="block text-[11px] font-ui font-bold uppercase text-[#2A1E18] mb-1">
                  Resume (PDF / DOC / DOCX &le; 5 MB)
                </label>
                {resumeFile ? (
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border-2 border-[#2A1E18] shadow-[2px_2px_0px_#2A1E18] text-xs font-mono">
                    <span className="text-[#2F5D3A] font-bold">📄 {resumeFile.name} ({resumeFile.size})</span>
                    <button
                      type="button"
                      onClick={() => setResumeFile(null)}
                      className="px-2.5 py-1 rounded-full text-xs font-bold text-red-700 bg-red-100 border border-[#2A1E18] shadow-[1px_1px_0px_#2A1E18] hover:translate-x-[0.5px] hover:translate-y-[0.5px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="w-full text-xs font-ui text-[#6D4B38] file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-2 file:border-[#2A1E18] file:shadow-[2px_2px_0px_#2A1E18] file:text-xs file:font-semibold file:bg-[#2A1E18] file:text-white hover:file:bg-[#AB653E] hover:file:translate-x-[0.5px] hover:file:translate-y-[0.5px] file:cursor-pointer transition-all"
                  />
                )}
                {resumeError && (
                  <span className="text-red-700 text-xs block mt-1">{resumeError}</span>
                )}
              </div>

              <div className="mt-2">
                <MagneticButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  Submit Application &rarr;
                </MagneticButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
