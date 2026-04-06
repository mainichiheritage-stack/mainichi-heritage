import React from 'react';
import { X, Calendar, Tag } from 'lucide-react';
import { NotificationItem } from '@/app/types';

interface Props {
  item: NotificationItem | null;
  onClose: () => void;
}

export default function NotificationModal({ item, onClose }: Props) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-slate-100 flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
              <Calendar size={12} />
              {new Date(item.published_at).toLocaleDateString('ja-JP')}
              <Tag size={12} className="ml-2" />
              {item.category_display}
            </div>
            <h3 className="text-xl font-bold text-slate-800 leading-tight">
              {item.title}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="p-8 max-h-[60vh] overflow-y-auto text-slate-600 leading-relaxed whitespace-pre-wrap">
          {item.content}
        </div>

        <div className="p-6 bg-slate-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all shadow-md"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}