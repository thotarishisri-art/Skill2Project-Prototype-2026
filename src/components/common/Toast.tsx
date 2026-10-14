import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, Info, Award, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { activeToast, hideToast } = useApp();

  if (!activeToast) return null;

  const isBadge = activeToast.type === 'badge';
  const isInfo = activeToast.type === 'info';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-short shadow-2xl rounded-2xl bg-white border border-slate-200/80 p-4 transition-all duration-300">
      <div className="flex items-start gap-3">
        <div
          className={`p-2.5 rounded-xl flex-shrink-0 ${
            isBadge
              ? 'bg-amber-100 text-amber-600'
              : isInfo
              ? 'bg-blue-100 text-blue-600'
              : 'bg-emerald-100 text-emerald-600'
          }`}
        >
          {isBadge ? (
            <Award className="w-5 h-5" />
          ) : isInfo ? (
            <Info className="w-5 h-5" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
        </div>
        <div className="flex-1 min-w-0 pr-2">
          <p className="text-sm font-semibold text-slate-900">{activeToast.title}</p>
          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{activeToast.message}</p>
        </div>
        <button
          onClick={hideToast}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
