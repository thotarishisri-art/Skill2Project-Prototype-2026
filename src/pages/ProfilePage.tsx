import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Edit3,
  School
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, projects } = useApp();

  const myProjects = projects.filter(
    p => p.creatorId === currentUser.id || p.currentMembers.some(m => m.userId === currentUser.id)
  );

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-5">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-blue-500/20 shadow-md"
              />
              <div className="space-y-1">
                <h1 className="text-2xl font-extrabold text-slate-900">{currentUser.name}</h1>
                <p className="text-xs sm:text-sm font-semibold text-blue-600">{currentUser.roleTitle}</p>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <School className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {currentUser.college} • {currentUser.department} ({currentUser.year})
                  </span>
                </div>
              </div>
            </div>

            <Link
              to="/profile/edit"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </Link>
          </div>

          {/* Bio */}
          <div className="pt-6 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Bio</span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {currentUser.bio}
            </p>
          </div>

          {/* Skills Split */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
              <span className="font-bold text-blue-700 uppercase tracking-wider text-[10px]">
                Skills Known & Offered ({currentUser.skillsKnown.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentUser.skillsKnown.map(s => (
                  <span
                    key={s.name}
                    className="px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-blue-800 font-semibold"
                  >
                    {s.name} <span className="text-[9px] text-blue-500">({s.level})</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2">
              <span className="font-bold text-purple-700 uppercase tracking-wider text-[10px]">
                Skills In-Learning Wishlist ({currentUser.skillsWanted.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentUser.skillsWanted.map(s => (
                  <span
                    key={s.name}
                    className="px-2.5 py-1 rounded-lg bg-white border border-purple-200 text-purple-800 font-semibold"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* User's Projects */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Projects Involved In ({myProjects.length})
            </h2>
            <Link to="/portfolio" className="text-xs font-bold text-blue-600 hover:underline">
              View Public Portfolio →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myProjects.map(proj => (
              <div
                key={proj.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 mb-2 inline-block">
                    {proj.category}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 leading-snug">{proj.title}</h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{proj.tagline}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 capitalize">{proj.status}</span>
                  <Link
                    to={`/workspace/${proj.id}`}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    Workspace →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
