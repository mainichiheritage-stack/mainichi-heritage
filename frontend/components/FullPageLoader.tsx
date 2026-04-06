"use client";

export const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/70 backdrop-blur-md cursor-wait">      
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
      
      <span className="mt-4 text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">
        loading now
      </span>
    </div>
  );
};