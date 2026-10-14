import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getRankedMatches } from '../services/matching';
import {
  Sparkles,
  ArrowRight,
  PlusCircle,
  FolderGit2,
  Users2,
  Award,
  CheckCircle2,
  Clock,
  Compass,
  ArrowUpRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { currentUser, allUsers, projects, tasks, badges, notifications } = useApp();
  const navigate = useNavigate();

  // Compute top ranked matches for the current user
  const topMatches = getRankedMatches(currentUser, allUsers).slice(0, 3);

  // User's active projects (where user is either creator or member)
  const myProjects = projects.filter(p =>
    p.creatorId === currentUser.id || p.currentMembers.some(m => m.userId === currentUser.id)
  );

  // Projects looking for currentUser's known skills
  const knownSkillNames = currentUser.skillsKnown.map(s => s.name.toLowerCase());
  const recommendedProjects = projects
    .filter(
      p =>
        p.status !== 'completed' &&
        p.creatorId !== currentUser.id &&
        !p.currentMembers.some(m => m.userId === currentUser.id) &&
        p.requiredSkills.some(skill => knownSkillNames.includes(skill.toLowerCase()))
    )
    .slice(0, 2);

  // User tasks
  const myTasks = tasks.filter(t => t.assigneeId === currentUser.id && t.status !== 'completed').slice(0, 3);

  // Profile readiness score calculation
  const hasSkills = currentUser.skillsKnown.length >= 2 && currentUser.skillsWanted.length >= 1;
  const hasBio = Boolean(currentUser.bio);
  const hasLinks = Boolean(currentUser.githubUrl || currentUser.portfolioUrl);
  const readiness = (hasSkills ? 40 : 10) + (hasBio ? 30 : 0) + (hasLinks ? 30 : 0);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Student Co-Builder Hub</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, {currentUser.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
                You have {myProjects.length} active project{myProjects.length === 1 ? '' : 's'} and{' '}
                <strong className="text-white font-semibold">{topMatches[0]?.compatibilityScore}% synergy match</strong> with{' '}
                {topMatches[0]?.peer.name}.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                to="/matches"
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-white text-indigo-700 hover:bg-blue-50 shadow-md transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Find Teammates</span>
              </Link>
              <Link
                to="/projects/create"
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-indigo-500/50 hover:bg-indigo-500/70 text-white border border-white/20 transition-all flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create Project</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Top Metric Cards Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Metric 1 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Profile Readiness</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{readiness}%</p>
              <span className="text-[11px] font-semibold text-emerald-600">Ready for matches</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              🎯
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Active Projects</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{myProjects.length}</p>
              <span className="text-[11px] font-semibold text-indigo-600">In Sprints</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              🚀
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Completed Works</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{currentUser.completedProjectsCount}</p>
              <span className="text-[11px] font-semibold text-purple-600">In Portfolio</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              📁
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Peer Endorsements</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{currentUser.endorsementsCount}</p>
              <span className="text-[11px] font-semibold text-amber-600">Verified</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              ⭐
            </div>
          </div>
        </div>

        {/* Main Grid: Left 2 cols, Right 1 col */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Projects In Progress */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-blue-600" />
                  <h2 className="text-base font-bold text-slate-900">My Active Projects</h2>
                </div>
                <Link
                  to="/projects"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  Browse all <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {myProjects.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-xl">
                  You haven't joined or started a project yet. Check out the Project Hub!
                </div>
              ) : (
                <div className="space-y-4">
                  {myProjects.map(proj => {
                    const completedMilestones = proj.milestones.filter(m => m.completed).length;
                    const percent = Math.round((completedMilestones / Math.max(1, proj.milestones.length)) * 100);

                    return (
                      <div
                        key={proj.id}
                        className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all bg-slate-50/50 hover:bg-white"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-900">{proj.title}</span>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                                {proj.category}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">{proj.tagline}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <Link
                              to={`/workspace/${proj.id}`}
                              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                            >
                              Open Workspace
                            </Link>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="space-y-1 mt-3">
                          <div className="flex justify-between text-[11px] text-slate-500">
                            <span>Milestones progress</span>
                            <span className="font-semibold text-slate-700">{percent}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Recommended Teammates Radar (Core Feature Highlight) */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Recommended Co-Builders</h2>
                    <p className="text-[11px] text-slate-400">Matched by complementary learning & teaching needs</p>
                  </div>
                </div>
                <Link
                  to="/matches"
                  className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  View All Matches <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topMatches.map(({ peer, compatibilityScore, youTeach, peerTeaches }) => (
                  <div
                    key={peer.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-purple-300 transition-all bg-gradient-to-b from-purple-50/20 to-white flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <img
                          src={peer.avatar}
                          alt={peer.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/20"
                        />
                        <span className="px-2 py-0.5 rounded-full text-xs font-black bg-purple-100 text-purple-800">
                          {compatibilityScore}% Match
                        </span>
                      </div>

                      <h3 className="text-xs font-bold text-slate-900">{peer.name}</h3>
                      <p className="text-[10px] text-slate-500 truncate">{peer.roleTitle}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{peer.college.split(' ')[0]}</p>

                      <div className="mt-3 pt-2 border-t border-slate-100 space-y-1 text-[11px]">
                        <div className="text-blue-700 font-semibold truncate">
                          You teach: {youTeach.slice(0, 2).join(', ')}
                        </div>
                        <div className="text-purple-700 font-semibold truncate">
                          {peer.name.split(' ')[0]} teaches: {peerTeaches.slice(0, 2).join(', ')}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                      <Link
                        to="/matches"
                        className="w-full text-center py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold transition-colors"
                      >
                        Connect & Invite
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Projects to Join */}
            {recommendedProjects.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-base font-bold text-slate-900">Projects Seeking Your Skills</h2>
                  </div>
                  <Link
                    to="/projects"
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                  >
                    Explore all
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendedProjects.map(p => (
                    <div
                      key={p.id}
                      className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 mb-1">
                          <span>By {p.creatorName}</span>
                          <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">{p.difficulty}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900">{p.title}</h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                          {p.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] text-emerald-600 font-bold">
                          {p.openRoles.filter(r => !r.filled).length} open roles
                        </span>
                        <Link
                          to={`/projects/${p.id}`}
                          className="text-xs font-bold text-blue-600 hover:text-blue-800"
                        >
                          View & Apply →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (1 Col) */}
          <div className="space-y-8">
            {/* My Skills Overview */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold text-slate-900">My Skill Matrix</h3>
                <Link to="/onboarding/skills" className="text-xs font-bold text-blue-600 hover:underline">
                  Edit
                </Link>
              </div>

              <div>
                <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1.5">
                  Skills I Offer ({currentUser.skillsKnown.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {currentUser.skillsKnown.map(s => (
                    <span
                      key={s.name}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100"
                    >
                      {s.name} <span className="text-[9px] opacity-70">({s.level})</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <p className="text-[11px] font-bold text-purple-600 uppercase tracking-wider mb-1.5">
                  Skills I Want to Learn ({currentUser.skillsWanted.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {currentUser.skillsWanted.map(s => (
                    <span
                      key={s.name}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-100"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Tasks Assigned to Me */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <h3 className="text-sm font-bold text-slate-900">Sprint Tasks Due</h3>
                </div>
                <Link
                  to="/workspace/proj-campus-events/tasks"
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Kanban
                </Link>
              </div>

              {myTasks.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No pending tasks assigned to you!</p>
              ) : (
                <div className="space-y-2.5">
                  {myTasks.map(t => (
                    <div
                      key={t.id}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between"
                    >
                      <div>
                        <p className="font-bold text-slate-800 line-clamp-1">{t.title}</p>
                        <span className="text-[10px] text-slate-500">Due {t.dueDate}</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          t.priority === 'High'
                            ? 'bg-red-100 text-red-700'
                            : t.priority === 'Medium'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {t.priority}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Unread Notifications Peek */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold text-slate-900">Activity & Alerts</h3>
                <Link to="/notifications" className="text-xs font-bold text-blue-600 hover:underline">
                  All
                </Link>
              </div>

              <div className="space-y-2">
                {notifications
                  .filter(n => n.userId === currentUser.id)
                  .slice(0, 3)
                  .map(n => (
                    <div key={n.id} className="text-xs p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <p className="font-bold text-slate-800">{n.title}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{n.message}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
