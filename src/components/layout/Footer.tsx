import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { allUsers, switchUser } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">Skill2Project</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering college students to master real skills through mutual peer projects and collaborative experiential learning.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-blue-400 border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Learn | Collaborate | Build
            </div>
          </div>

          {/* Quick Platform Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/matches" className="text-slate-400 hover:text-white transition-colors">
                  Skill Matching Engine
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-400 hover:text-white transition-colors">
                  Project Hub & Open Roles
                </Link>
              </li>
              <li>
                <Link to="/projects/create" className="text-slate-400 hover:text-white transition-colors">
                  Create a Project
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-slate-400 hover:text-white transition-colors">
                  Student Portfolios
                </Link>
              </li>
              <li>
                <Link to="/badges" className="text-slate-400 hover:text-white transition-colors">
                  Achievements & Badges
                </Link>
              </li>
            </ul>
          </div>

          {/* Student Personas Switcher */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Demo Personas</h4>
            <div className="space-y-1.5 text-xs">
              {allUsers.slice(0, 4).map(u => (
                <button
                  key={u.id}
                  onClick={() => switchUser(u.id)}
                  className="w-full text-left flex items-center gap-2 px-2 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <img src={u.avatar} alt={u.name} className="w-5 h-5 rounded-full object-cover" />
                  <span className="truncate">{u.name} — {u.roleTitle.split('&')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* College Venture Info */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">College Venture</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Built as a functional frontend prototype for campus incubation and peer collaborative research.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:text-white transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:text-white transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://skill2project.edu"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Skill2Project. Functional Prototype for Venture Demonstration.</p>
          <p className="flex items-center gap-1">
            Designed with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for ambitious college builders
          </p>
        </div>
      </div>
    </footer>
  );
};
