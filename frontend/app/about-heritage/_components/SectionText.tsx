import React from "react";

export const SectionText = ({ children }: { children: React.ReactNode }) => (
  <p className="text-slate-600 leading-relaxed">{children}</p>
);

export const HighlightIndigo = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <span className="text-indigo-600 font-bold mx-1 bg-indigo-50 px-1 rounded-sm">
    {children}
  </span>
);

export const HighlightBlack = ({ children }: { children: React.ReactNode }) => (
  <span className="font-bold text-slate-900 mx-1">{children}</span>
);
