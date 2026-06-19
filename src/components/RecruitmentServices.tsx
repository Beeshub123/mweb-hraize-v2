import React, { useEffect } from "react";
import { motion } from "motion/react";
import {
  CheckCircle, XCircle, Users, Award, Briefcase, ChevronRight,
  Settings, Building2, GraduationCap, Check, ArrowRight
} from "lucide-react";
import { GlassCard } from "./UIElements";

interface RecruitmentServicesProps {
  onEmployerClick: () => void;
  onCandidateClick: () => void;
}

export const RecruitmentServices: React.FC<RecruitmentServicesProps> = ({
  onEmployerClick,
  onCandidateClick,
}) => {

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    };

    const timer = setTimeout(scrollToHash, 250);

    window.addEventListener("hashchange", scrollToHash);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  const corePillars = [
    {
      title: "Vetted Candidates, Not Bulk Lists",
      desc: "Every candidate we send has passed technical, behavioural, and culture-fit evaluation. No screening time wasted on unqualified profiles."
    },
    {
      title: "Candidates Come Prepared",
      desc: "We coach candidates before interviews so they understand your business and show up professionally. Saves you significant interview time."
    },
    {
      title: "Full Process Management",
      desc: "We handle JD definition, sourcing, screening, interview coordination, and offer negotiations. You focus on the final decision."
    },
    {
      title: "60-Day Replacement Guarantee",
      desc: "If a hired candidate leaves within 60 days for any reason, we conduct a complete replacement search at zero cost."
    },
    {
      title: "Quality Over Speed",
      desc: "Finding the right cultural and technical match matters more than filling roles fast. Your success is our success."
    }
  ];

  const hiringModels = [
    {
      id: "permanent",
      title: "Permanent Placement",
      desc: "Full-time positions for your core team. We handle sourcing, screening, coaching, and placement. 60-day replacement guarantee included.",
      tag: "Core Team"
    },
    {
      id: "contract",
      title: "Contract & Temporary Staffing",
      desc: "Project-based, seasonal, or interim roles. We source and place professionals on flexible terms from 3 months to 12 months.",
      tag: "Flexible Output"
    },
    {
      id: "graduate",
      title: "Graduate & Emerging Talent Pipeline",
      desc: "Build your bench before you need it. We identify high-potential graduates, freshers, and early-career professionals ready and hungry to prove themselves.",
      tag: "Next Generation"
    }
  ];

  const recruits = [
    "HR and Administrative roles",
    "Engineers and Project Managers",
    "Operations and Management positions",
    "Sales and Customer Success roles",
    "Entry to mid-level professional positions"
  ];

  const industries = [
    "Manufacturing", "Engineering", "Healthcare", "Hospitality",
    "Revenue Cycle Management", "Education", "Retail", "Financial Services"
  ];

  const comparisonRows = [
    {
      feature: "Candidate Volume",
      agency: "Sends 50–100 raw CVs based on keywords",
      hraize: "Sends 3–5 rigorously vetted, interview-ready candidates",
    },
    {
      feature: "Screening Burden",
      agency: "You spend hours verifying basics and schedules",
      hraize: "All screening, technical filters & background checks done for you",
    },
    {
      feature: "Interview Preparation",
      agency: "Candidate shows up blind and unprepared",
      hraize: "Candidate thoroughly briefed and coached on your exact business needs",
    },
    {
      feature: "Transparency & Costs",
      agency: "Hidden contingency fees, no follow-up reporting",
      hraize: "Transparent pricing, comprehensive feedback loops, strategic onboarding support",
    },
    {
      feature: "Integration Care",
      agency: "Transaction terminates immediately at placement",
      hraize: "Partnership, check-ins, and alignment audits continue through day 60+",
    },
    {
      feature: "Guarantee Security",
      agency: "No candidate replacement guarantee",
      hraize: "FREE replacement if candidate leaves within 60 days for any reason",
    }
  ];

  return (
    <div id="recruitment-services-view" className="bg-[#F8FAFF] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Title Headers */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#0EA5E9]">TALENT REQUISITION</span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E3A8A] uppercase tracking-tight">
            Quality Hiring for Growing Business
          </h2>
          <p className="mt-3 text-lg font-bold text-gray-500 uppercase tracking-[0.12em]">
            Permanent &amp; Contract Staffing Services
          </p>
          <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">
            We are a hiring partner that understands your business. We don't flood your inbox with generic resumes. We deliver high-caliber candidates aligned with your culture, systems, and standard.
          </p>
        </div>

        {/* The Hraize Difference (Quality Not Volume) - Split with Graph vector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">

          {/* Left illustration graphic */}
          <div className="lg:col-span-5 relative bg-[#07112E] p-8 rounded-3xl text-white shadow-xl flex flex-col justify-between h-[450px]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0EA5E9]">PIPELINE ARCHITECTURE</span>
              <h3 className="mt-2 text-2xl font-black uppercase tracking-tight leading-tight">
                RECRUITMENT BUILT ON QUALITY, NOT VOLUME
              </h3>
            </div>

            {/* Custom SVG candidate filtering graphic */}
            <div className="my-6 relative flex-grow flex items-center justify-center">
              <svg viewBox="0 0 300 200" className="w-full h-full max-h-[180px]">
                {/* funnelling lines represent screening */}
                <path d="M 20,20 L 280,20 L 190,140 L 110,140 Z" fill="none" stroke="#64748B" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 60,50 L 240,50 L 175,140 L 125,140 Z" fill="none" stroke="#1E3A8A" strokeWidth="2" />
                <path d="M 125,140 L 175,140 L 160,190 L 140,190 Z" fill="none" stroke="#0EA5E9" strokeWidth="3" />

                {/* Dots representation */}
                <circle cx="50" cy="35" r="5" fill="#64748B" />
                <circle cx="100" cy="35" r="5" fill="#64748B" />
                <circle cx="150" cy="35" r="5" fill="#1E3A8A" />
                <circle cx="200" cy="35" r="5" fill="#64748B" />
                <circle cx="250" cy="35" r="5" fill="#64748B" />

                <circle cx="110" cy="80" r="5" fill="#1E3A8A" />
                <circle cx="150" cy="80" r="5" fill="#0EA5E9" />
                <circle cx="190" cy="80" r="5" fill="#1E3A8A" />

                {/* Hired stars / vetted dots */}
                <circle cx="150" cy="165" r="6" fill="#D4A017" />
                <circle cx="150" cy="165" r="2" fill="white" />
              </svg>

              <div className="absolute bottom-5 bg-[#09153A] border border-slate-700 px-3 py-1.5 rounded-lg text-center">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Selection Rate</span>
                <span className="text-sm font-black text-[#D4A017]">3.5% Match SLA</span>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-mono text-slate-400">
                We believe great hiring is a partnership, not a transaction. While others send bulk CVs and move on, we stay invested until the right candidate is perfectly positioned.
              </p>
            </div>
          </div>

          {/* Right Core Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-black text-[#1E3A8A] uppercase tracking-tight">
              THE HRAIZE DIFFERENCE
            </h3>

            <div className="space-y-4">
              {corePillars.map((p, idx) => (
                <div key={idx} className="flex gap-4 items-start p-4 bg-[#F1F5FF] rounded-xl border border-slate-100 hover:border-[#0EA5E9] transition-colors">
                  <div className="h-6 w-6 rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-[#0EA5E9]" strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#1E3A8A] uppercase tracking-wide">{p.title}</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed font-medium">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Hiring Models Section with Zero CTAs */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0EA5E9]">ENGAGEMENT STRUCTURES</span>
            <h3 className="mt-1 text-2xl sm:text-3xl font-black text-[#1E3A8A] uppercase tracking-tight">
              Hiring Models
            </h3>
            <p className="mt-2 text-sm text-gray-500 font-bold uppercase tracking-wider">
              Dynamic Placements Mapped to Your Business Growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hiringModels.map((m, idx) => (
              <GlassCard key={idx} id={m.id} className="p-6 h-full flex flex-col justify-between" hoverEffect={true}>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono font-bold bg-[#1E3A8A]/10 text-[#1E3A8A] px-2.5 py-1 rounded">
                      {m.tag}
                    </span>
                    <span className="text-[#0EA5E9] font-black text-xs">MODEL {idx + 1}</span>
                  </div>
                  <h4 className="text-base font-black text-[#1E293B] uppercase tracking-wide mb-3">{m.title}</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">{m.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">60-Day Replacement Covered</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* WHO WE SERVE SECTION */}


        {/* Comparison Grid Table: Traditional Agency vs Hraize */}
        <div className="mb-24 bg-[#F1F5FF] border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0EA5E9]">AGENCY MATRIX</span>
            <h3 className="mt-1 text-2xl font-black text-[#1E3A8A] uppercase tracking-tight">
              Traditional Agency vs. Hraize
            </h3>
            <p className="mt-2 text-xs text-gray-500 font-bold">
              Comparing operational frameworks side-by-side.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-4 px-4 text-xs font-black uppercase text-[#1E3A8A] tracking-wider w-[20%]">Dimension</th>
                  <th className="py-4 px-4 text-xs font-black uppercase text-gray-400 tracking-wider w-[40%]">Traditional Agency</th>
                  <th className="py-4 px-4 text-xs font-black uppercase text-[#1E293B] bg-[#0EA5E9]/10 rounded-t-xl tracking-wider w-[40%]">
                    Hraize Advantage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/55 transition-colors">
                    <td className="py-4 px-4 text-xs font-black text-[#1E293B] uppercase">{row.feature}</td>
                    <td className="py-4 px-4 text-xs text-gray-400 flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-rose-500 flex-shrink-0" />
                      {row.agency}
                    </td>
                    <td className="py-4 px-4 text-xs text-[#1E293B] bg-[#0EA5E9]/5 border-x border-[#0EA5E9]/10 font-bold">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        {row.hraize}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Split Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* Card 1: For Employers */}
          <div className="bg-[#1E3A8A] rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between items-start group relative overflow-hidden">
            <div className="absolute right-0 top-0 p-4 opacity-5 pointer-events-none">
              <Building2 className="h-32 w-32" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest bg-white/10 px-2.5 py-1 rounded inline-block uppercase text-white font-bold mb-4">
                FOR EMPLOYERS
              </span>
              <h4 className="text-xl font-black uppercase tracking-tight text-white mb-3">Ready to Hire the Best?</h4>
              <p className="text-xs text-slate-200 leading-relaxed font-semibold mb-6">
                Tell us what you're looking for. We'll build a shortlist of exceptional candidates and manage the entire lifecycle with a 60-day replacement guarantee.
              </p>
            </div>
            <button
              onClick={onEmployerClick}
              className="flex items-center gap-2 rounded-full bg-[#0EA5E9] px-6 py-3 text-xs font-black hover:bg-[#0EA5E9]/90 shadow-md cursor-pointer text-white"
            >
              Submit Your Requisition
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Card 2: For Candidates */}
          <div className="bg-[#F1F5FF] border border-slate-150 rounded-3xl p-8 shadow-xl flex flex-col justify-between items-start group relative overflow-hidden">
            <div className="absolute right-0 top-0 p-4 opacity-5 pointer-events-none">
              <GraduationCap className="h-32 w-32 text-gray-300" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest bg-slate-100 px-2.5 py-1 rounded inline-block uppercase text-[#1E3A8A] font-bold mb-4">
                FOR CANDIDATES
              </span>
              <h4 className="text-xl font-black uppercase text-[#1E3A8A] tracking-tight mb-3">Ready for Your Next Opportunity?</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-medium mb-6">
                Tell us about your background and goals. We'll connect you with growing industries where you'll actually thrive and command market-leading compensation.
              </p>
            </div>
            <button
              onClick={onCandidateClick}
              className="flex items-center gap-2 rounded-full bg-[#1E3A8A] px-6 py-3 text-xs font-black hover:bg-[#1E3A8A]/90 shadow-md cursor-pointer text-white"
            >
              Submit Your Resume
              <ArrowRight className="h-4 w-4 text-[#0EA5E9]" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
