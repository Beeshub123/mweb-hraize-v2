import React, { useEffect } from "react";
import { motion } from "motion/react";
import { 
  GraduationCap, Calendar, Compass, Star, TrendingUp, Handshake, 
  Clock, ShieldCheck, Heart, Flame, Check, BookmarkCheck
} from "lucide-react";
import { GlassCard } from "./UIElements";

interface TrainingAndDevelopmentProps {
  onLetsFindPath: () => void;
}

export const TrainingAndDevelopment: React.FC<TrainingAndDevelopmentProps> = ({
  onLetsFindPath,
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

  const whatMakesUsDifferent = [
    {
      title: "Honest Feedback",
      desc: "Real feedback on what needs improvement, not generic praise. We pinpoint resume structural issues and behavioral interview flaws."
    },
    {
      title: "Industry Experience",
      desc: "We have active recruiters who have placed thousands of candidates across tech, healthcare, finance, and logistics operations."
    },
    {
      title: "Practical, Not Theoretical",
      desc: "Every resume gets rewritten from scratch. Every interview framework is practiced interactively. You walk away 100% ready."
    },
    {
      title: "Career Strategy",
      desc: "Beyond simple resume help. We construct your entire professional positioning, highlighting high-value skills to double your inbound leads."
    },
    {
      title: "Ongoing Support",
      desc: "We check in regularly, adjust outbound application strategies, refine target numbers, and keep you moving forward steadily."
    },
    {
      title: "Affordable Professional Coaching",
      desc: "Acquire senior-level executive guidance at a fractional, highly transparent advisory cost with zero long-term retainers."
    }
  ];

  const pathways = [
    {
      id: "fresher",
      title: "CARD 1: Fresher to professional",
      subtitle: "Who This Is For: Fresh graduates entering corporate for the first time. You have a degree. You need the positioning to land the job.",
      timeline: "Timeline: 4 Weeks",
      features: [
        "Professional resume (rewritten from scratch)",
        "Optimised LinkedIn & Naukri profiles (recruiter-ready)",
        "Interview coaching & detailed mock interviews",
        "Targeted career clarity session (role types & alignments)",
        "Job search strategy (which companies, which roles)",
        "1 month of ongoing support & check-ins"
      ],
      tag: "GRADUATE"
    },
    {
      id: "mid-career",
      title: "CARD 2: MID-CAREER ACCELERATION",
      subtitle: "Who This Is For: Professionals with 3-6 years of experience. You're good at your job, but invisible to promotions. You're ready for the next level.",
      timeline: "Timeline: 6 Weeks",
      features: [
        "Resume repositioning (shifting from tasks to business impact)",
        "LinkedIn visibility boost (get noticed by top-tier executive search)",
        "Advanced interview coaching (behavioural, leadership, and salary negotiation)",
        "Career strategy session (next role, target market valuation, clear growth paths)",
        "Application strategy (which companies, which roles, optimal times to apply)",
        "6 weeks of ongoing support and application monitoring"
      ],
      tag: "ACCELERATOR"
    },
    {
      id: "manager",
      title: "CARD 3: First-time managers",
      subtitle: "Who This Is For: Professionals with 6+ years of experience ready for executive or Managerial roles. You need to be positioned as a strategic leader.",
      timeline: "Timeline: 8 Weeks",
      features: [
        "Executive resume & cv (board-ready core format)",
        "Executive LinkedIn branding (establishing thought leadership & high visibility)",
        "Executive level interview coaching (articulating vision, strategy, and panel interview pacing)",
        "Essential soft skills training (team alignment, situational delegation)",
        "8 weeks of ongoing support, coaching consults, and transition check-ins"
      ],
      tag: "LEADER"
    }
  ];

  return (
    <div id="training-view" className="bg-[#F8FAFF] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#0EA5E9]">ACADEMY &amp; COACHING</span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E3A8A] uppercase tracking-tight">
            Career coaching designed for your stage of growth.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 font-medium leading-relaxed">
            Career growth shouldn't be left to chance. Whether you're stepping into your first corporate role, advancing to leadership, or moving into the executive suite, you need real, practical coaching at the right moment. We provide career strategy, interview preparation, personal branding, and ongoing support tailored to exactly where you are in your career.
          </p>
        </div>

        {/* Replicated "What Makes Us Different" Grid */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E3A8A]">HIGH-VALUE FRAMEWORK</span>
            <h3 className="mt-1 text-2xl font-black text-[#1E3A8A] uppercase tracking-tight">
              What Makes Us Different
            </h3>
            <p className="mt-2 text-xs text-gray-500 font-bold uppercase tracking-wide">
              No generic tutorials. Just direct, recruitment-backed results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatMakesUsDifferent.map((diff, idx) => (
              <div 
                key={idx} 
                className="bg-[#F1F5FF] border border-slate-100 rounded-2xl p-6 shadow-sm transition hover:border-[#0EA5E9] flex flex-col justify-between"
              >
                <div>
                  <div className="h-10 w-10 text-[#0EA5E9] bg-[#0EA5E9]/5 rounded-lg flex items-center justify-center mb-4">
                    <BookmarkCheck className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-black text-[#1E293B] uppercase tracking-wide mb-2">{diff.title}</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">{diff.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100/60">
                  <span className="text-[9px] font-mono font-bold text-[#1E3A8A] tracking-wider uppercase">Verified Method</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Three Pathways */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0EA5E9]">THE THREE PATHWAYS</span>
            <h3 className="mt-1 text-2xl sm:text-3xl font-black text-[#1E3A8A] uppercase tracking-tight">
              A Career Partner for Every Stage
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-gray-500 font-medium">
              Most professionals navigate career transitions alone. At Hraize, we guide you through every critical career moment with strategy, positioning, and support.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pathways.map((path) => (
              <GlassCard key={path.id} id={path.id} className="relative p-6 flex flex-col justify-between h-full hover:border-[#1E3A8A] transition-all">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono font-extrabold bg-[#0EA5E9]/10 text-[#0EA5E9] px-2.5 py-1 rounded">
                      {path.tag}
                    </span>
                    <span className="text-xs font-black text-[#D4A017]">{path.timeline}</span>
                  </div>

                  <h4 className="text-base font-black text-[#1E3A8A] uppercase tracking-tight mb-2">
                    {path.title}
                  </h4>

                  <p className="text-xs text-gray-600 leading-relaxed font-semibold mb-6">
                    {path.subtitle}
                  </p>

                  <div className="space-y-2 border-t border-gray-100 pt-4">
                    <p className="text-[9px] font-mono tracking-widest text-[#1E3A8A] uppercase font-black mb-1">What You Get</p>
                    {path.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex gap-2 items-start">
                        <Check className="h-3.5 w-3.5 text-[#0EA5E9] flex-shrink-0 mt-0.5" />
                        <span className="text-xs font-bold text-gray-750 leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-gray-400 uppercase">Customised services available</span>
                  <div className="h-2 w-2 rounded-full bg-[#D4A017]" />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Closing Career Coaching CTA */}
        <div className="bg-[#07112E] rounded-3xl p-8 sm:p-12 text-center text-white max-w-4xl mx-auto shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 p-4 opacity-5 pointer-events-none">
            <TrendingUp className="h-32 w-32" />
          </div>
          
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#0EA5E9]">TAKE COMMAND</span>
          <h3 className="mt-2 text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            Ready to Own Your Career
          </h3>
          <p className="mt-4 text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto leading-relaxed">
            Stop leaving transitions to chance. Partner with premium advisors who understand precisely what global internal talent acquisition leaders look for.
          </p>

          <div className="mt-6">
            <button
              onClick={onLetsFindPath}
              className="rounded-full bg-[#0EA5E9] text-white font-black hover:bg-[#0EA5E9]/90 px-8 py-3.5 text-xs uppercase tracking-wider shadow-md focus:outline-none transition cursor-pointer"
            >
              Let's find your path
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
