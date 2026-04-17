import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  icon: LucideIcon;
}

export const SectionHeader = ({ title, icon: Icon }: SectionHeaderProps) => {
  return (
    <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-3">
      <Icon size={24} className="text-slate-900" />
      <h2 className="text-2xl font-black text-slate-900">{title}</h2>
    </div>
  );
};
