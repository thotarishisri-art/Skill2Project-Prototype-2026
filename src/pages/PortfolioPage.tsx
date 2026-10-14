import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  Share2,
  ExternalLink,
  Award,
  Star,
  CheckCircle2
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/common/BrandIcons';

export const PortfolioPage: React.FC = () => {
  const { currentUser, projects, badges, showToast } = useApp();

  // Find all projects where currentUser is a member or creator AND status is 'completed'
  const completedProjects = projects.filter(
    p =>
      p.status === 'completed' &&
      (p.creatorId === currentUser.id || p.currentMembers.some(m => m.userId === currentUser.id))
  );

  // Unlocked badges
  const unlockedBadges = badges.filter(b => b.unlocked);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Portfolio Link Copied!', 'Shareable link copied to clipboard.');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Showcase Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-blue-500/10 shadow-md"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-slate-900">{currentUser.name}</h1>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Verified Student
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-blue-600">{currentUser.roleTitle}</p>
                <p className="text-xs text-slate-500">
                  {currentUser.department} • {currentUser.college} ({currentUser.year})
                </p>
              </div>
            </div>

            {/* Social & Share */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Portfolio</span>
              </button>

              {currentUser.githubUrl && (
                <a
                  href={currentUser.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {currentUser.linkedinUrl && (
                <a
                  href={currentUser.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Bio & Skills Bar */}
          <div className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
            <div className="lg:col-span-2 space-y-2">
              <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">About Me</span>
              <p className="text-slate-600 leading-relaxed font-medium">{currentUser.bio}</p>
            </div>

            <div className="space-y-3">
              <div>
                <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px] block mb-1">
                  Core Skills
                </span>
                <div className="flex flex-wrap gap-1">
                  {currentUser.skillsKnown.map(s => (
                    <span
                      key={s.name}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px] block mb-1">
                  Learning Aspirations
                </span>
                <div className="flex flex-wrap gap-1">
                  {currentUser.skillsWanted.map(s => (
                    <span
                      key={s.name}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Projects Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Shipped & Completed Projects ({completedProjects.length})
              </h2>
            </div>
            <span className="text-xs text-slate-500">Peer-built Proof of Work</span>
          </div>

          {completedProjects.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-3">
              <p className="text-sm font-bold text-slate-800">No completed projects yet!</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Join a project or complete your active sprint in the workspace to graduate it into your public portfolio.
              </p>
              <Link
                to="/projects"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
              >
                Browse Projects
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedProjects.map(proj => {
                const memberRecord = proj.currentMembers.find(m => m.userId === currentUser.id);
                const roleInProject = memberRecord ? memberRecord.role : 'Core Team Member';

                return (
                  <div
                    key={proj.id}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                          {proj.category}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Verified Complete
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 leading-snug">{proj.title}</h3>
                      <p className="text-xs text-blue-600 font-semibold mt-0.5">Role: {roleInProject}</p>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        {proj.finalSummary || proj.description}
                      </p>

                      {/* Skills Used */}
                      <div className="mt-4">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                          Stack Utilized
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(proj.skillsUsed || proj.requiredSkills).map(s => (
                            <span
                              key={s}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Co-builders */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">Squad:</span>
                        <div className="flex -space-x-2">
                          {proj.currentMembers.map((m, i) => (
                            <img
                              key={i}
                              src={m.avatar}
                              alt={m.userName}
                              title={`${m.userName} (${m.role})`}
                              className="w-6 h-6 rounded-full border-2 border-white object-cover"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* External links */}
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-black"
                        >
                          <GithubIcon className="w-4 h-4" />
                          <span>Code Repository</span>
                        </a>
                      )}
                      {proj.demoUrl && (
                        <a
                          href={proj.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Peer Endorsements Showcase */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="text-base font-bold text-slate-900">
              Verified Teammate Endorsements ({currentUser.endorsementsCount})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Team Synergist Badge</span>
                </span>
                <span className="text-[10px] text-amber-700">Campus Event Hub</span>
              </div>
              <p className="text-slate-700 italic leading-relaxed">
                "Alex built the responsive UI in record time, communicated proactively during every sprint, and made API integration effortless."
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="font-bold text-slate-900 text-[11px]">— Priya Sharma</span>
                <span className="text-[10px] text-slate-400">AI / Backend Lead</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200/80 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-900 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" />
                  <span>Fast Debugger Badge</span>
                </span>
                <span className="text-[10px] text-indigo-700">Skill Marketplace</span>
              </div>
              <p className="text-slate-700 italic leading-relaxed">
                "Unblocked multiple client-side rendering bottlenecks and ensured 100% test coverage before demo day!"
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="font-bold text-slate-900 text-[11px]">— Ananya Gupta</span>
                <span className="text-[10px] text-slate-400">Product Lead</span>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Preview Strip */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              <h2 className="text-base font-bold text-slate-900">
                Unlocked Achievements ({unlockedBadges.length} / {badges.length})
              </h2>
            </div>
            <Link to="/badges" className="text-xs font-bold text-purple-600 hover:underline">
              View all badges →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {unlockedBadges.map(b => (
              <div
                key={b.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto">
                  <Award className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-slate-900">{b.title}</p>
                <span className="text-[10px] text-emerald-600 font-semibold">Unlocked</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
