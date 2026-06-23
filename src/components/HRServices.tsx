import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users, Layers, ShieldCheck, BarChart3, Settings, FileText,
  Check, ArrowRight, Sparkles
} from "lucide-react";
import { SectionLabel, StepLine, FeatureCheck } from "./UIElements";

interface HRServicesProps {
  onBookCall: () => void;
}

export const HRServices: React.FC<HRServicesProps> = ({ onBookCall }) => {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
    const timer = setTimeout(scrollToHash, 250);
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  const [openService, setOpenService] = useState<number>(0);

  const strategicServices = [
    {
      id: "support",
      title: "HR Subscription Support",
      desc: "Instant answer desk and day-to-day consultation for operations, employee relations, and advisory workflows.",
      icon: Users,
      details: [
        "Dedicated HR point of contact",
        "Email and phone support during business hours",
        "Employee relations guidance",
        "Policy interpretation and application",
        "Monthly check-in and reporting"
      ]
    },
    {
      id: "consulting",
      title: "HR Consulting & Systems Setup",
      desc: "Structured systems implementation matching specific organizational goals.",
      icon: Settings,
      details: [
        "HR technology stack assessment",
        "System implementation roadmap",
        "Process automation setup",
        "Integration with existing tools",
        "Team training and handover"
      ]
    },
    {
      id: "audit",
      title: "HR Audit",
      desc: "Full comprehensive compliance audit identifying statutory gaps and structural risks.",
      icon: ShieldCheck,
      details: [
        "Statutory compliance review",
        "Policy gap analysis",
        "Payroll and benefits audit",
        "Data privacy assessment",
        "Risk mitigation roadmap"
      ]
    },
    {
      id: "analytics",
      title: "People Analytics & Dashboard",
      desc: "Turn employee spreadsheets into powerful executive-level metrics and predictive insights.",
      icon: BarChart3,
      details: [
        "Custom KPI dashboard design",
        "Headcount and attrition tracking",
        "Diversity and inclusion metrics",
        "Predictive workforce modeling",
        "Executive reporting suite"
      ]
    },
    {
      id: "policies",
      title: "HR Policy & Process Documentation",
      desc: "Handbooks, SOPs, and operational policies structured clearly and tailored to use.",
      icon: FileText,
      details: [
        "Employee handbook creation",
        "SOP documentation",
        "Policy templates and frameworks",
        "Compliance-ready formats",
        "Version-controlled repository"
      ]
    },
    {
      id: "workforce",
      title: "Strategic Workforce Planning",
      desc: "Comprehensive role assessments, talent pipelines, and hiring models aligned to forecasts.",
      icon: Layers,
      details: [
        "Workforce demand modeling",
        "Skills gap analysis",
        "Talent pipeline development",
        "Succession planning frameworks",
        "Cost forecasting models"
      ]
    }
  ];

  const methodology = [
    {
      step: "01",
      title: "Audit & Diagnose",
      desc: "We understand exactly where you are and what needs attention, scoping out latent operational or legal bottlenecks.",
      duration: "Week 1-2"
    },
    {
      step: "02",
      title: "Build Your Foundation",
      desc: "We create your complete HR system: policies, processes, custom dashboards, integrated cleanly.",
      duration: "Week 3-6"
    },
    {
      step: "03",
      title: "Stay as Your People Partner",
      desc: "Ongoing support: monthly reports, database queries, compliance tracking, and strategic guidance.",
      duration: "Ongoing"
    }
  ];

  return (
    <div className="bg-cream-100 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel>Strategic Consulting</SectionLabel>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-navy-900 uppercase tracking-tight">
            Your HR Partner for the Next Stage of Growth
          </h2>
          <p className="mt-4 text-base sm:text-lg text-navy-900/60 font-semibold">
            Growing companies routinely reach a transition phase (100-500 employees).
            We bring complete framework clarity to your workforce.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-24">
          <div className="space-y-3">
            {strategicServices.map((srv, idx) => {
              const Icon = srv.icon;
              const isOpen = openService === idx;
              return (
                <div
                  key={srv.id}
                  id={srv.id}
                  className="shadow-lg hover:shadow-xl rounded-2xl border border-sky-600/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenService(isOpen ? -1 : idx)}
                    className="w-full flex items-center gap-5 p-5 text-left hover:bg-cream-50 transition-colors cursor-pointer"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-600/5 text-sky-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-black text-navy-900 uppercase tracking-tight">{srv.title}</h4>
                      <p className="text-xs text-navy-900/50 font-medium mt-0.5">{srv.desc}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-600/5 text-sky-600"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-0 border-t border-sky-600/50">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                            {srv.details.map((detail, di) => (
                              <FeatureCheck key={di}>{detail}</FeatureCheck>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-24 max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>Our Methodology</SectionLabel>
            <h3 className="mt-3 text-2xl sm:text-3xl font-black text-navy-900 uppercase tracking-tight">
              How It Works in 3 Steps
            </h3>
            <p className="mt-3 text-sm text-navy-900/50 font-semibold">
              A straightforward process designed to integrate smoothly with your business.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            {methodology.map((m, idx) => (
              <StepLine
                key={idx}
                number={m.step}
                title={m.title}
                description={m.desc}
                duration={m.duration}
                isLast={idx === methodology.length - 1}
              />
            ))}
          </div>
        </div>

        <div className="mb-24 overflow-hidden rounded-3xl bg-navy-card-subtle shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <SectionLabel className="text-sky-400">HR Dashboard Builder</SectionLabel>
              <h3 className="mt-3 text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                People Analytics That Works
              </h3>
              <p className="mt-4 text-sm text-sage-100/70 font-semibold leading-relaxed">
                Turn employee data into real-time dashboards for headcount, attrition, diversity, and hiring costs.
              </p>
              <div className="mt-6 text-white space-y-3">
                {[
                  "Headcount trends & forecasting",
                  "Attrition analysis with predictive alerts",
                  "Diversity & inclusion metrics",
                  "Time-to-hire & cost-per-hire tracking",
                  "Custom report builder"
                ].map((item, idx) => (
                  <FeatureCheck key={idx} className="text-white">{item}</FeatureCheck>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-navy-800 to-navy-900 p-8 sm:p-12 flex items-center justify-center min-h-[300px] relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--color-sky-600)_8%,transparent)_0%,transparent_70%)]" />
              <div className="relative w-full max-w-sm space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Headcount", value: "342" },
                    { label: "Attrition", value: "6.8%" },
                    { label: "Avg Tenure", value: "3.2yr" },
                  ].map((kpi, idx) => (
                    <div key={idx} className="glass-dark rounded-xl p-4 text-center">
                      <p className="text-[9px] text-sage-100/50 font-bold uppercase tracking-wider">{kpi.label}</p>
                      <p className="text-xl font-black mt-1 text-sky-400">{kpi.value}</p>
                    </div>
                  ))}
                </div>

                <div className="glass-dark rounded-xl p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] text-sage-100/50 font-bold uppercase tracking-wider">Headcount Trend</span>
                    <span className="text-[10px] text-forest-500 font-bold">+14.2% YoY</span>
                  </div>
                  <div className="h-8 flex items-end gap-1.5">
                    {[35, 42, 38, 55, 50, 62, 78].map((h, i) => (
                      <div key={i} className="flex-1 bg-white/5 rounded-sm h-full flex flex-col justify-end overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-t from-sky-600 to-sky-400 w-full"
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: i * 0.1, duration: 0.8 }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-dark rounded-xl p-4">
                  <p className="text-[10px] text-sage-100/50 font-bold uppercase tracking-wider mb-2">Departments</p>
                  <div className="space-y-2">
                    {[
                      { dept: "Engineering", pct: 42 },
                      { dept: "Operations", pct: 28 },
                      { dept: "Sales & Marketing", pct: 18 },
                      { dept: "Support", pct: 12 },
                    ].map((d, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-[10px] mb-0.5">
                          <span className="text-sage-100/70 font-semibold">{d.dept}</span>
                          <span className="text-sage-100/50">{d.pct}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-sky-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${d.pct}%` }}
                            transition={{ delay: 0.5 + idx * 0.1, duration: 0.8 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="shadow-lg text-center max-w-3xl mx-auto bg-cream-50 border border-sky-600/10 rounded-3xl p-8 sm:p-12">
          <SectionLabel>Workforce Architecture</SectionLabel>
          <h3 className="mt-3 text-2xl sm:text-3xl font-black text-navy-900 uppercase tracking-tight">
            Ready to Have Your People Partner Today
          </h3>
          <p className="mt-4 text-sm text-navy-900/60 font-semibold max-w-xl mx-auto">
            Schedule a free discovery call. We'll assess your needs, locate bottlenecks, and show you how
            fractional HR can transform your business.
          </p>
          <div className="mt-8">
            <button
              onClick={onBookCall}
              className="inline-flex items-center gap-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 px-8 py-3.5 text-xs font-black tracking-wider uppercase shadow-lg shadow-sky-600/20 transition-all cursor-pointer"
            >
              Book Your Call
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
