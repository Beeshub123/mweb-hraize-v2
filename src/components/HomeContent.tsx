import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Heart, BarChart3, Target, ArrowRight,
  Building2, FileText, BadgeCheck, Clock
} from "lucide-react";
import { SectionLabel, FeatureCheck } from "./UIElements";

interface HomeContentProps {
  onGetStarted: () => void;
  onNavigateToService: (service: string) => void;
}

export const HomeContent: React.FC<HomeContentProps> = ({
  onGetStarted,
  onNavigateToService,
}) => {
  const [activeService, setActiveService] = useState(0);
  const whatWeDo = [
    {
      title: "For Growing Businesses",
      desc: "HR systems, analytics dashboards, recruitment frameworks, and legal compliance structures so you scale seamlessly without a bloated, full-time HR team.",
      badge: "Scale Growth"
    },
    {
      title: "For Ambitious Professionals",
      desc: "Comprehensive 1-on-1 career coaching, interview prep pipelines, career positioning strategy, and executive mentorship to guide you to your target role.",
      badge: "Talent Career"
    },
    {
      title: "For Hiring Leaders",
      desc: "Quality-focused talent acquisition with a bulletproof 60-day replacement guarantee, ensuring high-caliber, carefully briefed candidates.",
      badge: "Quality Hires"
    }
  ];

  const whyChooseHraize = [
    {
      title: "Complete HR Partner Under One Roof",
      desc: "HR systems, live employee analytics, high-caliber recruitment, and ongoing strategic retention support in a single trusted partnership.",
      icon: Building2
    },
    {
      title: "Build Professional HR Systems",
      desc: "Stop managing people in fragile spreadsheets. Obtain fully documented structured policies, compliant onboarding workflows, and live KPI dashboards.",
      icon: FileText
    },
    {
      title: "Data-Driven People Decisions",
      desc: "Beautiful analytics dashboards highlight headcount shifts, regional attrition vectors, retention rates, and hiring costs.",
      icon: BarChart3
    },
    {
      title: "Quality Recruitment With Guarantee",
      desc: "We send only rigorously vetted candidates, not bulk CVs. Our 60-day replacement guarantee ensures we remain active partners in your success.",
      icon: BadgeCheck
    },
    {
      title: "Stays With You Long-Term",
      desc: "Continuous monthly HR subscription support, ongoing contract hiring, and quarterly compliance tracking, not an isolated project.",
      icon: Clock
    }
  ];

  const coreValues = [
    {
      title: "People First",
      desc: "We put people at the heart of every decision, every process, and every conversation. When businesses get their people right, everything else follows.",
      icon: Heart,
    },
    {
      title: "Data Driven",
      desc: "We replace guesswork with metrics. Every recommendation is backed by real analytics, workforce telemetry, and deep operational experience.",
      icon: BarChart3,
    },
    {
      title: "Outcome Focused",
      desc: "We don't consider an engagement complete until the results are visible. Your success remains the single metric that matters.",
      icon: Target,
    }
  ];

  return (
    <div>
      {/* <section className="relative overflow-hidden bg-navy-card py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--color-sky-600)_15%,transparent)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,color-mix(in_srgb,var(--color-copper-400)_8%,transparent)_0%,transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.05]">
                Build Stronger Teams.
                <br />
                <span className="text-sky-400">Scale with Confidence.</span>
              </h2>
              <p className="text-sm sm:text-base text-sage-100/70 font-semibold max-w-2xl leading-relaxed">
                Hraize acts as your strategic HR partner, providing structured recruitment and people operations support that helps growing businesses build, manage, and scale their teams.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
              <motion.button
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 rounded-full bg-copper-400 hover:bg-copper-500 px-8 py-4 text-xs font-black tracking-wider uppercase text-white shadow-lg shadow-copper-400/20 cursor-pointer transition-all"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </section> */}

      <section className="relative py-24 bg-white">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-sky-600/30 rounded-full" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionLabel>Practical Offerings</SectionLabel>
            <h3 className="mt-3 text-3xl sm:text-4xl font-black text-navy-900 uppercase tracking-tight">
              Our Services
            </h3>
            <p className="mt-4 text-sm text-navy-900/60 font-semibold max-w-2xl mx-auto">
              Complete HR frameworks, high-caliber recruitment, and certified career coaching
              pathways for growing SMEs, ambitious talents, and professional organizations.
            </p>
          </div>

          {/* Services accordion — matches reference design */}
          <div className="flex flex-col md:flex-row gap-3 h-[580px] md:h-[440px]">
            {[
              {
                title: "HR Services",
                number: "01",
                desc: "Setup compliant systems, handbook policies, and advanced interactive dashboards. Audit legal compliance gaps and manage attrition scientifically.",
                href: "hr-services",
                image: "/services-hr.png",
              },
              {
                title: "Recruitment Services",
                number: "02",
                desc: "Identify high-caliber permanent, temporary, and contract team members. Bulletproof candidate preparation with a 60-day replacement guarantee.",
                href: "recruitment",
                image: "/services-recruitment.png",
              },
              {
                title: "Training & Development",
                number: "03",
                desc: "Empower graduates, mid-career professionals, and first-time executives with resume rewriting and recruitment coaching channels.",
                href: "training",
                image: "/services-training.png",
              }
            ].map((svc, idx) => {
              const isActive = idx === activeService;

              const handleMouseEnter = () => {
                if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
                  setActiveService(idx);
                }
              };

              const handleCardClick = () => {
                if (isActive) {
                  onNavigateToService(svc.href);
                } else {
                  setActiveService(idx);
                }
              };

              return (
                <div
                  key={idx}
                  className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-100 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive
                    ? "flex-[4] md:flex-[3.5] bg-white shadow-xl border border-gray-100"
                    : "flex-[0.6] md:flex-[0.55] min-h-[60px] md:min-h-0 md:min-w-[64px]"
                    }`}
                  onMouseEnter={handleMouseEnter}
                  onClick={handleCardClick}
                >
                  {isActive ? (
                    /* ── EXPANDED: white card with image on top, text below ── */
                    <div className="flex flex-col h-full w-full">
                      {/* Image panel — takes ~70% of height */}
                      <div className="relative flex-1 m-3 rounded-2xl overflow-hidden">
                        <Image
                          src={svc.image}
                          alt={svc.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 40vw"
                        />
                      </div>

                      {/* Text + CTA below the image */}
                      <div className="px-5 pb-5 pt-2 flex items-end justify-between gap-3">
                        <div className="min-w-0">
                          <h4 className="text-lg font-black text-sky-600  tracking-tight leading-tight">
                            {svc.title}
                          </h4>
                          <p className="text-xs text-navy-900/55 font-medium leading-relaxed mt-1 line-clamp-2">
                            {svc.desc}
                          </p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); onNavigateToService(svc.href); }}
                          className="shrink-0 h-9 w-9 rounded-full bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center transition-colors shadow-md shadow-sky-600/30"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ── COLLAPSED: narrow strip — image bg + rotated title ── */
                    <div className="relative h-full w-full rounded-3xl overflow-hidden">
                      <Image
                        src={svc.image}
                        alt={svc.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 80px"
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-navy-900/55" />

                      {/* Rotated title (Desktop: bottom-up) */}
                      <div className="absolute inset-0 hidden md:flex items-center justify-center">
                        <span
                          className="text-sm font-black text-white uppercase tracking-widest whitespace-nowrap select-none"
                          style={{
                            writingMode: "vertical-rl",
                            textOrientation: "mixed",
                            transform: "rotate(180deg)",
                          }}
                        >
                          {svc.title}
                        </span>
                      </div>

                      {/* Horizontal title (Mobile: horizontal centered) */}
                      <div className="absolute inset-0 flex md:hidden items-center justify-between px-6">
                        <span className="text-sm font-black text-white uppercase tracking-widest">
                          {svc.title}
                        </span>
                        <span className="text-xs font-bold text-sky-400">
                          {svc.number}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-sky-50">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-copper-400/20 rounded-full" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            <div className="lg:col-span-5">
              <SectionLabel>Who We Are</SectionLabel>
              <h3 className="mt-3 text-3xl sm:text-4xl font-black text-navy-900 uppercase tracking-tight">
                Why Us?
              </h3>
            </div>
            <div className="lg:col-span-7">
              <div className="border-l-4 border-sky-600/50 pl-6">
                <p className="text-base sm:text-lg text-navy-900/70 font-semibold leading-relaxed">
                  Hraize is more than an HR service provider; we are your people partner.
                  We believe businesses deserve HR that actually works, and ambitious
                  professionals deserve careers they are truly proud of.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-3 mb-10">
              <span className="h-px flex-1 bg-navy-900/10" />
              <span className="text-[10px] font-black text-sand-400 uppercase tracking-[0.2em]">What We Do</span>
              <span className="h-px flex-1 bg-navy-900/10" />
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
            }}
          >
            {whatWeDo.map((w, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
                }}
                className="relative group"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-[40px] font-black text-sand-200 leading-none group-hover:text-sky-600/30 transition-colors duration-500">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <motion.span
                    className="h-px flex-1 bg-sky-600/10"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + idx * 0.12 }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
                <motion.span
                  className="inline-block text-[10px] font-black tracking-wider text-copper-400 uppercase mb-3"
                  whileHover={{ letterSpacing: "0.25em" }}
                  transition={{ duration: 0.3 }}
                >
                  {w.badge}
                </motion.span>
                <h4 className="text-base font-black text-navy-900 uppercase tracking-tight mb-3 group-hover:text-sky-700 transition-colors duration-300">{w.title}</h4>
                <p className="text-xs text-navy-900/60 font-medium leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 bg-sand-100/70">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-sky-600/30 rounded-full" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>Our Credentials</SectionLabel>
            <h3 className="mt-3 text-3xl sm:text-4xl font-black text-navy-900 uppercase tracking-tight">
              Why Choose Hraize
            </h3>
            <p className="mt-3 text-xs text-navy-900/50 font-bold uppercase tracking-wide">
              Complete support frameworks bypassing the limits of traditional networks.
            </p>
          </div>

          <motion.div
            className="max-w-4xl mx-auto space-y-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
            }}
          >
            {whyChooseHraize.map((item, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
                }}
                className="group flex gap-4 sm:gap-8 py-8 border-t border-sky-600/50 first:border-t-0 hover:bg-cream-50/50 px-4 -mx-4 rounded-2xl transition-colors cursor-default"
              >
                <motion.div
                  className="flex w-10 sm:w-12 shrink-0 items-start pt-1"
                  whileHover={{ scale: 1.2, rotate: [0, -15, 15, -5, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-sky-600 group-hover:text-sky-500 transition-colors" />
                </motion.div>
                <div className="flex-1">
                  <h4 className="text-base font-black text-navy-900 uppercase tracking-tight mb-2 group-hover:text-sky-700 transition-colors duration-300">{item.title}</h4>
                  <p className="text-sm text-navy-900/60 font-medium leading-relaxed">{item.desc}</p>
                </div>
                <div className="hidden lg:flex w-8 shrink-0 items-start pt-1 justify-center">
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="h-4 w-4 text-sky-600/20 group-hover:text-sky-600 transition-colors" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-cream-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>Our Ethical Standard</SectionLabel>
            <h3 className="mt-3 text-3xl sm:text-4xl font-black text-navy-900 uppercase tracking-tight">
              Our Core Values
            </h3>
            <p className="mt-3 text-xs text-navy-900/50 font-bold uppercase tracking-wide">
              The foundational principles steering every client engagement.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
            }}
          >
            {coreValues.map((value, idx) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, scale: 0.85 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
                  }}
                  className="text-center group"
                >
                  <motion.div
                    className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-600/5 text-sky-600 mb-6 mx-auto"
                    whileHover={{ scale: 1.15, backgroundColor: "rgba(2,132,199,0.12)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent className="h-7 w-7" />
                  </motion.div>
                  <h4 className="text-lg font-black text-navy-900 uppercase tracking-tight mb-4 group-hover:text-sky-700 transition-colors duration-300">
                    {value.title}
                  </h4>
                  <p className="text-sm text-navy-900/60 font-medium leading-relaxed max-w-xs mx-auto">
                    {value.desc}
                  </p>
                  <motion.div
                    className="mt-6 mx-auto w-12 h-px bg-sky-600/20"
                    whileHover={{ width: 48, backgroundColor: "rgba(2,132,199,0.5)" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
};