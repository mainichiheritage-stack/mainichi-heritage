import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  iconBg: string;
  onClick?: () => void;
  isAvailable?: boolean;
}

export function FeatureCard({
  icon,
  title,
  desc,
  iconBg,
  isAvailable = true,
}: FeatureCardProps) {
  return (
    <div
      className={`
      relative 
      p-4 md:p-6 
      rounded-2xl border transition-all duration-300 h-full flex flex-col group
      ${
        isAvailable
          ? "bg-white border-slate-100 shadow-sm hover:shadow-lg hover:shadow-blue-500/5 hover:border-blue-400 hover:bg-blue-50/30 cursor-pointer active:scale-[0.98]"
          : "bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed"
      }
    `}
    >
      {!isAvailable && (
        <span className="absolute top-2 right-2 md:top-3 md:right-3 bg-slate-200 text-slate-500 text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
          Coming Soon
        </span>
      )}

      <div
        className={`w-10 h-10 md:w-12 md:h-12 ${iconBg} rounded-xl flex items-center justify-center mb-3 md:mb-4 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
      >
        <div className="scale-90 md:scale-100">{icon}</div>
      </div>

      <div className="flex-1">
        <h3
          className={`font-bold text-sm md:text-base mb-1 md:mb-2 leading-tight transition-colors duration-300 ${
            isAvailable
              ? "text-slate-900 group-hover:text-blue-600"
              : "text-slate-500"
          }`}
        >
          {title}
        </h3>

        {/* 説明文 */}
        <p
          className={`hidden md:block text-xs md:text-sm leading-relaxed line-clamp-2 transition-colors duration-300 ${
            isAvailable
              ? "text-slate-500 group-hover:text-blue-500/80"
              : "text-slate-400"
          }`}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}
