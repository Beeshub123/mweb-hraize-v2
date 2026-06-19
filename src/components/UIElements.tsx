import React from "react";
import { motion } from "motion/react";
import { Shield, Award, CheckCircle } from "lucide-react";

// Liquid Glass Morphic Card with high-contrast subtle frosted border and backdrop blur
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  id?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  hoverEffect = true,
  id,
}) => {
  return (
    <motion.div
      id={id}
      className={`relative overflow-hidden rounded-2xl border border-white/20 bg-[#F1F5FF] p-6 shadow-[0_8px_32px_0_rgba(30,58,138,0.06)] ${className}`}
      whileHover={hoverEffect ? { y: -4, boxShadow: "0_12px_40px_0_rgba(30,58,138,0.12)" } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Liquid glass reflection line */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-40 hover:animate-[shimmer_1.5s_infinite]" />
      {children}
    </motion.div>
  );
};

// Trust Badges for the Hero Section
export const TrustBadges: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur-md">
      {/* 1. Circular Navy & Gold Certification Seal */}
      <div className="flex items-center gap-2 border-r border-gray-200 pr-4">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#D4A017] bg-[#1E3A8A]">
          <Award className="h-5 w-5 text-[#D4A017]" />
        </div>
        <div>
          <p className="text-[10px] font-bold tracking-wider text-[#1E3A8A]">HR AUDIT</p>
          <p className="text-[9px] font-medium text-[#D4A017]">CERTIFIED 2026</p>
        </div>
      </div>

      {/* 2. Blue 'CG-20' Badge */}
      <div className="flex items-center gap-2 border-r border-gray-200 pr-4">
        <div className="flex h-10 px-3 items-center justify-center rounded-lg bg-[#0EA5E9] font-mono text-xs font-black text-white shadow-inner">
          CG-20
        </div>
        <div>
          <p className="text-[10px] font-bold tracking-wider text-[#1E3A8A]">GLOBAL COMPLIANCE</p>
          <p className="text-[9px] font-medium text-gray-500">SECURE STANDARD</p>
        </div>
      </div>

      {/* 3. Detailed Professional Shield with Text */}
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-[#1E3A8A]">
          <Shield className="h-6 w-6" />
        </div>
        <div>
          <p className="text-[10px] font-bold leading-tight text-[#1E3A8A]">HRAIZE VERIFIED</p>
          <p className="text-[8px] text-gray-500 leading-none">100% Quality &amp; Guarantee</p>
        </div>
      </div>
    </div>
  );
};

// Clean Premium Mini Dashboard Widgets for Interactive Simulation
export const MiniDashboardWidget: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-xl border border-white/40 bg-white/40 p-3 shadow-sm backdrop-blur-md">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Retention Rate</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-xl font-extrabold text-[#1E3A8A]">94.2%</span>
          <span className="text-[10px] font-semibold text-emerald-500">+2.4%</span>
        </div>
        {/* Custom minimalist path element */}
        <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#0EA5E9]"
            initial={{ width: "0%" }}
            animate={{ width: "94.2%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </div>
      </div>

      <div className="rounded-xl border border-white/40 bg-white/40 p-3 shadow-sm backdrop-blur-md">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Hiring Speed</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-xl font-extrabold text-[#1E3A8A]">18 Days</span>
          <span className="text-[10px] font-semibold text-[#0EA5E9]">-4 Days</span>
        </div>
        {/* Attrition progress bar */}
        <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
          <motion.div
            className="h-full bg-[#0EA5E9]"
            initial={{ width: "0%" }}
            animate={{ width: "75%" }}
            transition={{ duration: 1.5, delay: 0.7 }}
          />
        </div>
      </div>
    </div>
  );
};
