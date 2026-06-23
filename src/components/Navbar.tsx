"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, X, ArrowUpRight, Mail } from "lucide-react";

const serviceCategories = [
  {
    title: "HR Services",
    href: "/hr-services",
    items: [
      { name: "HR Subscription Support", href: "/hr-services#support" },
      { name: "HR Consulting & Systems Setup", href: "/hr-services#consulting" },
      { name: "HR Audit", href: "/hr-services#audit" },
      { name: "People Analytics & Dashboard", href: "/hr-services#analytics" },
      { name: "HR Policy and Process Documentation", href: "/hr-services#policies" },
      { name: "Strategic Workforce Planning", href: "/hr-services#workforce" },
    ],
  },
  {
    title: "Recruitment Services",
    href: "/recruitment",
    items: [
      { name: "Permanent Recruitment", href: "/recruitment#permanent" },
      { name: "Contract & Temp Staffing", href: "/recruitment#contract" },
    ],
  },
  {
    title: "Training and Development",
    href: "/training",
    items: [
      { name: "Fresher to professional", href: "/training#fresher" },
      { name: "Mid Career Acceleration", href: "/training#mid-career" },
      { name: "First-Time Managers", href: "/training#manager" },
    ],
  },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [careersOpen, setCareersOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setCareersOpen(false);
  };

  const isActive = (path: string) => pathname === path;
  const isServiceActive = pathname === "/hr-services" || pathname === "/recruitment" || pathname === "/training";
  const isCareerActive = pathname === "/careers" || pathname === "/submit-resume" || pathname === "/vacancies";

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg bg-cream-100/80 backdrop-blur-md">
      <div className="flex flex-col items-center gap-1 md:flex-row md:items-center md:justify-between px-4 sm:px-6 lg:px-8 py-1.5 border-b border-sky-600/50 bg-navy-card">
        <div className="flex items-center gap-4 mx-auto max-w-7xl w-full">
          <div className="flex items-center gap-3">
            <a href="mailto:info@hraize.com" className="flex items-center gap-1.5 text-[10px] font-bold text-white hover:text-white transition-colors">
              <Mail className="h-3 w-3" />
              info@hraize.com
            </a>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <a href="https://linkedin.com/company/hraize" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md text-white hover:text-white hover:bg-white/10 transition-colors">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
            <a href="https://facebook.com/hraize" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md text-white hover:text-white hover:bg-white/10 transition-colors">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
            <a href="https://instagram.com/hraize" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md text-white hover:text-white hover:bg-white/10 transition-colors">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.909-1.382-.164-.42-.361-1.065-.414-2.235-.062-1.274-.073-1.649-.073-4.859s.012-3.586.073-4.859c.053-1.171.25-1.816.414-2.236.219-.569.489-.96.909-1.379.419-.421.81-.69 1.379-.909.42-.164 1.065-.36 2.236-.413 1.273-.06 1.648-.073 4.859-.073zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z" /></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          onClick={closeMenus}
        >
          <img src="/logo.svg" alt="Hraize" className="h-6 rounded-md w-auto" />
          <div className="flex flex-col min-w-0">
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl font-black tracking-widest truncate text-navy-900 group-hover:text-navy-900/70 transition-all duration-300">
                Hra<span className="text-sky-600">i</span>ze<span className="text-sky-600">.</span>
              </span>
            </div>
          </div>
        </Link>

        <nav className="hidden md:ml-10 md:flex md:items-center md:gap-x-8">
          <Link
            href="/"
            onClick={closeMenus}
            className={`text-sm font-semibold transition-colors duration-200 ${isActive("/") ? "text-sky-600" : "text-navy-900/80 hover:text-sky-600"
              }`}
          >
            Home
          </Link>

          <Link
            href="/about"
            onClick={closeMenus}
            className={`text-sm font-semibold transition-colors duration-200 ${isActive("/about") ? "text-sky-600" : "text-navy-900/80 hover:text-sky-600"
              }`}
          >
            About us
          </Link>

          <div
            className="relative"
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              onMouseEnter={() => setServicesOpen(true)}
              className={`flex items-center gap-1 text-sm font-semibold transition-colors duration-200 cursor-pointer ${isServiceActive ? "text-sky-600" : "text-navy-900/80 hover:text-sky-600"
                }`}
            >
              Services
              <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-1/2 z-50 top-full pt-3 -translate-x-1/2"
                >
                  <div className="w-[640px] md:w-[760px] lg:w-[840px] rounded-2xl border border-sky-200/50 bg-cream-50 p-6 shadow-2xl">
                    <div className="grid grid-cols-3 gap-8">
                      {serviceCategories.map((cat, idx) => (
                        <div key={idx} className="space-y-4 text-left">
                          <Link
                            href={cat.href}
                            onClick={closeMenus}
                            className="block text-sm font-extrabold uppercase tracking-wider text-sky-600 hover:text-sky-700 transition-colors"
                          >
                            {cat.title}
                          </Link>
                          <ul className="space-y-3">
                            {cat.items.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <Link
                                  href={item.href}
                                  onClick={closeMenus}
                                  className="flex items-center text-xs font-semibold text-navy-900/60 hover:text-navy-900 transition-all duration-200 hover:translate-x-1"
                                >
                                  <span className="h-2 w-2 bg-copper-400 rotate-45 shrink-0 mr-2.5" />
                                  <span>{item.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className="relative"
            onMouseLeave={() => setCareersOpen(false)}
          >
            <button
              onClick={() => setCareersOpen(!careersOpen)}
              onMouseEnter={() => setCareersOpen(true)}
              className={`flex items-center gap-1 text-sm font-semibold transition-colors duration-200 cursor-pointer ${isCareerActive ? "text-sky-600" : "text-navy-900/80 hover:text-sky-600"
                }`}
            >
              Careers
              <ChevronDown className={`h-4 w-4 transition-transform ${careersOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {careersOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-1/2 z-50 top-full pt-3 -translate-x-1/2"
                >
                  <div className="w-[260px] rounded-2xl border border-sky-200/50 bg-cream-50 p-6 shadow-2xl">
                    <ul className="space-y-3">
                      <li>
                        <Link
                          href="/submit-resume"
                          onClick={closeMenus}
                          className="flex items-center text-xs font-semibold text-navy-900/60 hover:text-navy-900 transition-all duration-200 hover:translate-x-1"
                        >
                          <span className="h-2 w-2 bg-copper-400 rotate-45 shrink-0 mr-2.5" />
                          <span>Submit your resume</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/vacancies"
                          onClick={closeMenus}
                          className="flex items-center text-xs font-semibold text-navy-900/60 hover:text-navy-900 transition-all duration-200 hover:translate-x-1"
                        >
                          <span className="h-2 w-2 bg-copper-400 rotate-45 shrink-0 mr-2.5" />
                          <span>Current Vacancies</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="hidden md:flex items-center">
          <Link
            href="/contact?tab=general"
            onClick={closeMenus}
            className="inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-5 py-2 text-sm font-bold text-white shadow-md hover:bg-sky-700 transition-all duration-200"
          >
            Get in Touch
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-navy-900/70 hover:bg-cream-50 transition-colors duration-300 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-sky-600/50 bg-cream-100 px-4 py-4 space-y-2"
          >
            <Link
              href="/"
              onClick={closeMenus}
              className="block w-full px-3 py-2 text-base font-semibold rounded-lg text-navy-900 hover:bg-cream-50 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={closeMenus}
              className="block w-full px-3 py-2 text-base font-semibold rounded-lg text-navy-900 hover:bg-cream-50 transition-colors duration-300"
            >
              About us
            </Link>

            <div className="border-l-2 border-sky-600/50 ml-2 pl-3 space-y-3">
              <p className="text-xs font-extrabold tracking-widest uppercase py-1 text-navy-900/50 transition-colors duration-300">Services</p>

              {serviceCategories.map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <Link
                    href={cat.href}
                    onClick={closeMenus}
                    className="block w-full px-3 py-0.5 text-sm font-bold text-sky-600 hover:text-sky-500"
                  >
                    {cat.title}
                  </Link>
                  <div className="pl-4 space-y-1.5">
                    {cat.items.map((item, itemIdx) => (
                      <Link
                        key={itemIdx}
                        href={item.href}
                        onClick={closeMenus}
                        className="flex items-center w-full px-3 py-0.5 text-xs font-medium text-navy-900/60 hover:text-navy-900 transition-colors duration-300"
                      >
                        <span className="h-2 w-2 rounded-full border border-sky-600/50 shrink-0 mr-2" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-l-2 border-sky-600/50 ml-2 pl-3 space-y-3">
              <p className="text-xs font-extrabold tracking-widest uppercase py-1 text-navy-900/50 transition-colors duration-300">Careers</p>
              <div className="space-y-1.5">
                <Link
                  href="/submit-resume"
                  onClick={closeMenus}
                  className="flex items-center w-full px-3 py-1.5 text-xs font-semibold rounded-lg text-sky-600 hover:text-sky-500"
                >
                  <span className="h-2 w-2 bg-copper-400 rotate-45 shrink-0 mr-2" />
                  Submit your resume
                </Link>
                <Link
                  href="/vacancies"
                  onClick={closeMenus}
                  className="flex items-center w-full px-3 py-1.5 text-xs font-semibold rounded-lg text-sky-600 hover:text-sky-500"
                >
                  <span className="h-2 w-2 bg-copper-400 rotate-45 shrink-0 mr-2" />
                  Current Vacancies
                </Link>
              </div>
            </div>
            <Link
              href="/contact?tab=general"
              onClick={closeMenus}
              className="block w-full text-center mt-4 bg-sky-600 py-2.5 text-base font-bold text-white rounded-lg shadow-md hover:bg-sky-700"
            >
              Get in Touch
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
