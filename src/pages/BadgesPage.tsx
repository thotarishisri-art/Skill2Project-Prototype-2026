import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  Lock,
  CheckCircle2,
  Users,
  Rocket,
  Handshake,
  Repeat,
  Zap,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const BadgesPage: React.FC = () => {
  const { badges } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return Users;
      case 'Rocket':
        return Rocket;
      case 'Handshake':
        return Handshake;
      case 'Repeat':
        return Repeat;
      case 'Zap':
        return Zap;
      default:
        return Award;
    }
  };

  const unlockedCount = badges.filter(b => b.unlocked).length;
  const progressPercent = Math.round((unlockedCount / badges.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-500/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gamified Milestone Badges</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Achievements & Proof of Work
              </h1>
              <p className="text-xs sm:text-sm text-purple-100 max-w-xl">
                Earn verifiable milestone badges as you form peer squads, complete sprint tasks, and graduate collaborative projects.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20 min-w-[160px]">
              <span className="text-[11px] uppercase tracking-wider font-bold block text-purple-200">Unlocked</span>
              <p className="text-3xl font-black mt-0.5">
                {unlockedCount} / {badges.length}
              </p>
              <span className="text-[10px] text-emerald-300 font-semibold">{progressPercent}% Achieved</span>
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map(badge => {
            const Icon = getIcon(badge.iconName);
            const isUnlocked = badge.unlocked;

            return (
              <div
                key={badge.id}
                className={`rounded-3xl border p-6 transition-all duration-200 flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-white border-purple-200 shadow-sm hover:shadow-md hover:border-purple-300'
                    : 'bg-slate-50/80 border-slate-200 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        isUnlocked
                          ? 'bg-gradient-to-tr from-purple-500 to-indigo-600 text-white shadow-md shadow-indigo-500/20'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        isUnlocked
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-500 flex items-center gap-1'
                      }`}
                    >
                      {isUnlocked ? (
                        'Unlocked'
                      ) : (
                        <>
                          <Lock className="w-2.5 h-2.5" />
                          <span>Locked</span>
                        </>
                      )}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">{badge.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{badge.description}</p>
                </div>

                {/* Progress bar / Unlock date */}
                <div className="mt-5 pt-4 border-t border-slate-100 space-y-1.5 text-xs">
                  {isUnlocked ? (
                    <div className="flex items-center justify-between text-emerald-600 font-semibold text-[11px]">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked
                      </span>
                      <span className="text-slate-400">{badge.unlockedAt || 'Recently'}</span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                        <span>Progress</span>
                        <span>
                          {badge.progress} / {badge.maxProgress}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-purple-600 h-1.5 rounded-full"
                          style={{
                            width: `${Math.round((badge.progress / badge.maxProgress) * 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
