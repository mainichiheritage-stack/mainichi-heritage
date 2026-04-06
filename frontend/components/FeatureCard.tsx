import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  iconBg: string;
  onClick?: () => void;
  isAvailable?: boolean;
}

export function FeatureCard({ icon, title, desc, iconBg, isAvailable = true }: FeatureCardProps) {
  return (
    <div className={`
      relative 
      /* スマホでは p-4、PC（md以上）では p-6 に可変 */
      p-4 md:p-6 
      rounded-2xl border transition-all duration-200 h-full flex flex-col
      ${isAvailable 
        ? 'bg-white border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 cursor-pointer' 
        : 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'}
    `}>
      {!isAvailable && (
        <span className="absolute top-2 right-2 md:top-3 md:right-3 bg-slate-200 text-slate-500 text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
          Coming Soon
        </span>
      )}

      {/* アイコンサイズもスマホでは小さく (w-10)、PCでは大きく (md:w-12) */}
      <div className={`w-10 h-10 md:w-12 md:h-12 ${iconBg} rounded-xl flex items-center justify-center mb-3 md:mb-4 shrink-0`}>
        {/* アイコン自体も少し縮小 */}
        <div className="scale-90 md:scale-100">
          {icon}
        </div>
      </div>

      <div className="flex-1">
        {/* タイトル：スマホでは文字サイズを落とし、1行に収める工夫 */}
        <h3 className={`font-bold text-sm md:text-base mb-1 md:mb-2 leading-tight ${isAvailable ? 'text-slate-900' : 'text-slate-500'}`}>
          {title}
        </h3>
        
        {/* 説明文：スマホ（2列時）では非表示にするか、極めて小さく表示する */}
        <p className="hidden md:block text-xs md:text-sm text-slate-400 leading-relaxed line-clamp-2">
          {desc}
        </p>
      </div>
    </div>
  );
}