import React from "react";
import { Info } from "lucide-react";

interface InfoBlockProps {
  title: string;
  children: React.ReactNode;
}

export const InfoBlock = ({ title, children }: InfoBlockProps) => {
  return (
    <div className="px-4 py-3 bg-indigo-50/50 rounded-lg border-l-4 border-indigo-200">
      <div className="flex items-center gap-2 mb-1.5">
        <Info size={18} className="text-indigo-400 shrink-0" />
        <h3 className="font-bold text-slate-900 text-sm md:text-base m-0">
          {title}
        </h3>
      </div>
      <div className="text-sm text-slate-500 leading-relaxed pl-[26px] m-0">
        {children}
      </div>
    </div>
  );
};
