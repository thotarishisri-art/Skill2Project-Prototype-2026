import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, UserCheck, CheckCircle2, Lock, Mail, User as UserIcon, School } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { allUsers, switchUser, showToast } = useApp();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      showToast('Account Created!', `Welcome to Skill2Project, ${name || 'Student'}! Let's select your skills.`);
      // For demo, switch to Alex as primary base and route to onboarding skills
      switchUser('user-alex');
      navigate('/onboarding/skills');
    } else {
      showToast('Logged In Successfully', 'Welcome back to your workspace!');
      switchUser('user-alex');
      navigate('/dashboard');
    }
  };

  const handleDemoLogin = (userId: string) => {
    switchUser(userId);
    const target = allUsers.find(u => u.id === userId);
    showToast('Demo Login Active', `Signed in as ${target?.name} (${target?.roleTitle})`, 'info');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
        {/* Left Side: Brand Promo Strip */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Skill2Project</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Connect. Exchange skills. Build portfolios.
            </h2>

            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Find your ideal peer collaborator on campus. Learn backend if you do frontend, learn UI if you do AI, and ship real projects together.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Complementary skill pairing algorithm</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Integrated Kanban workspace & sprints</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Verifiable portfolio with peer endorsements</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/20 relative z-10 text-[11px] text-blue-200">
            Prototype demo mode: test instant logins below without creating credentials.
          </div>
        </div>

        {/* Right Side: Auth Forms & 1-Click Demo Personas */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-center">
          {/* Quick Demo Personas Selector Box */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-indigo-600" />
                <span>One-Click Demo Personas:</span>
              </span>
              <span className="text-[10px] text-indigo-600 font-semibold uppercase tracking-wider">Instant Access</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {allUsers.slice(0, 4).map(u => (
                <button
                  key={u.id}
                  onClick={() => handleDemoLogin(u.id)}
                  className="p-2 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all text-left flex items-center gap-2.5 group"
                >
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 group-hover:ring-blue-500"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">{u.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{u.roleTitle.split('&')[0]}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center border-b border-slate-200 pb-2">
            <button
              onClick={() => setIsSignUp(false)}
              className={`pb-2 text-sm font-bold border-b-2 transition-all mr-6 ${
                !isSignUp ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`pb-2 text-sm font-bold border-b-2 transition-all ${
                isSignUp ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Alex Rivera"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">University / College</label>
                  <div className="relative">
                    <School className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Stanford University"
                      value={college}
                      onChange={e => setCollege(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Campus Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="student@university.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 text-xs flex items-center justify-center gap-2 transition-all mt-2"
            >
              <span>{isSignUp ? 'Create Student Account' : 'Sign In to Workspace'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
