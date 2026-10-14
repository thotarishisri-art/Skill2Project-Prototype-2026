import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  FolderGit2,
  CheckCircle2,
  Kanban,
  Award,
  ExternalLink,
  MessageSquare,
  Send,
  Sparkles
} from 'lucide-react';
import { GithubIcon, FigmaIcon } from '../components/common/BrandIcons';

export const TeamWorkspacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, currentUser, showToast } = useApp();

  const project = projects.find(p => p.id === id) || projects[0];

  const [announcements, setAnnouncements] = useState(project.announcements || []);
  const [newAnnouncement, setNewAnnouncement] = useState('');

  const isLeader = project.creatorId === currentUser.id;
  const completedMilestones = project.milestones.filter(m => m.completed).length;
  const progressPercent = Math.round((completedMilestones / Math.max(1, project.milestones.length)) * 100);

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.trim()) return;

    const newPost = {
      id: `ann-${Date.now()}`,
      authorName: currentUser.name,
      avatar: currentUser.avatar,
      content: newAnnouncement.trim(),
      timestamp: 'Just now'
    };

    setAnnouncements([newPost, ...announcements]);
    setNewAnnouncement('');
    showToast('Announcement Posted', 'Your team feed has been updated.');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Workspace Top Header */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700">
                  Sprint Workspace
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    project.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {project.status === 'completed' ? 'Shipped & Graduated' : 'Active Sprint'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {project.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Quick Jumps */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                to={`/workspace/${project.id}/tasks`}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all"
              >
                <Kanban className="w-4 h-4" />
                <span>Sprint Kanban Board</span>
              </Link>

              {project.status !== 'completed' && (
                <Link
                  to={`/workspace/${project.id}/complete`}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center gap-2 transition-all"
                >
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Mark Complete & Graduate</span>
                </Link>
              )}
            </div>
          </div>

          {/* Progress Bar Strip */}
          <div className="pt-6 space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Overall Deliverables Progress</span>
              <span className="text-blue-600">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1 & 2: Announcements & Milestones */}
          <div className="lg:col-span-2 space-y-6">
            {/* Team Announcements Feed */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-900">Team Announcements & Daily Standup</h3>
                </div>
                <span className="text-[11px] text-slate-400">Share updates with co-builders</span>
              </div>

              {/* Post input */}
              <form onSubmit={handlePostAnnouncement} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Post sprint update, blockers, or milestone progress..."
                  value={newAnnouncement}
                  onChange={e => setNewAnnouncement(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post</span>
                </button>
              </form>

              {/* Feed items */}
              <div className="space-y-3 pt-2">
                {announcements.map(ann => (
                  <div key={ann.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={ann.avatar} alt={ann.authorName} className="w-6 h-6 rounded-full object-cover" />
                        <strong className="text-slate-800 font-bold">{ann.authorName}</strong>
                      </div>
                      <span className="text-[10px] text-slate-400">{ann.timestamp}</span>
                    </div>
                    <p className="text-slate-600 pl-8 leading-relaxed">{ann.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Milestones Checklist */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Project Deliverables</h3>
                <Link
                  to={`/workspace/${project.id}/tasks`}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Open Kanban Board →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.milestones.map((m, i) => (
                  <div
                    key={m.id}
                    className={`p-3.5 rounded-2xl border text-xs flex items-start gap-2.5 ${
                      m.completed ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        m.completed ? 'text-emerald-600' : 'text-slate-300'
                      }`}
                    />
                    <div>
                      <p className={`font-bold ${m.completed ? 'text-emerald-900' : 'text-slate-800'}`}>
                        {i + 1}. {m.title}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Team Roster & Resources Locker */}
          <div className="space-y-6">
            {/* Team Roster */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Team Squad ({project.currentMembers.length})
              </h3>

              <div className="space-y-3">
                {project.currentMembers.map(m => (
                  <div key={m.userId} className="flex items-center gap-3 text-xs">
                    <img
                      src={m.avatar}
                      alt={m.userName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900 truncate">{m.userName}</p>
                      <p className="text-[11px] text-indigo-600 font-medium truncate">{m.role}</p>
                    </div>
                    {m.userId === currentUser.id && (
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-md">
                        You
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Resources Locker */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Project Resource Locker
              </h3>

              <div className="space-y-2.5 text-xs">
                <a
                  href={project.githubUrl || 'https://github.com/skill2project'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <GithubIcon className="w-4 h-4 text-slate-700" />
                    <div>
                      <span className="font-bold block">GitHub Repository</span>
                      <span className="text-[10px] text-slate-400">Source code & PRs</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <a
                  href={project.figmaUrl || 'https://figma.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FigmaIcon className="w-4 h-4 text-purple-600" />
                    <div>
                      <span className="font-bold block">Figma Wireframes</span>
                      <span className="text-[10px] text-slate-400">Design system & screens</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 rounded-2xl bg-blue-50/60 hover:bg-blue-100/60 border border-blue-200 text-blue-900 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <div>
                        <span className="font-bold block">Live Preview URL</span>
                        <span className="text-[10px] text-blue-500">Staging prototype</span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
