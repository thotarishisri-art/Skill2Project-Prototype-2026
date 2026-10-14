import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  FolderGit2,
  ExternalLink,
  Send,
  X,
  UserPlus,
  Check,
  Sparkles
} from 'lucide-react';
import { GithubIcon } from '../components/common/BrandIcons';

export const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    projects,
    currentUser,
    applyToProject,
    applications,
    acceptApplication,
    declineApplication
  } = useApp();

  const project = projects.find(p => p.id === id);

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [pitch, setPitch] = useState('');
  const [learningGoals, setLearningGoals] = useState('');

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">Project Not Found</h2>
          <p className="text-xs text-slate-500 mt-1">This project does not exist or was removed.</p>
          <Link
            to="/projects"
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
          >
            Back to Project Hub
          </Link>
        </div>
      </div>
    );
  }

  const isMember =
    project.creatorId === currentUser.id || project.currentMembers.some(m => m.userId === currentUser.id);

  const isCreator = project.creatorId === currentUser.id;

  const projectApplications = applications.filter(a => a.projectId === project.id && a.status === 'pending');

  const completedMilestones = project.milestones.filter(m => m.completed).length;
  const progressPercent = Math.round((completedMilestones / Math.max(1, project.milestones.length)) * 100);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const role = selectedRole || project.openRoles[0]?.title || 'Collaborator';
    applyToProject(
      project.id,
      role,
      pitch || 'I am excited to collaborate and contribute my skills while learning from the team.',
      learningGoals || 'Master project architecture and team sprint delivery.'
    );
    setApplyModalOpen(false);
    setPitch('');
    setLearningGoals('');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/projects" className="hover:text-blue-600">
            Project Hub
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">{project.title}</span>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700">
                  {project.category}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700">
                  {project.difficulty}
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    project.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : project.status === 'in_progress'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}
                >
                  {project.status === 'in_progress'
                    ? 'In Progress'
                    : project.status === 'completed'
                    ? 'Completed'
                    : 'Recruiting Roles'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {project.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                {project.tagline || project.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {isMember ? (
                <Link
                  to={`/workspace/${project.id}`}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all"
                >
                  <FolderGit2 className="w-4 h-4" />
                  <span>Open Workspace</span>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setSelectedRole(project.openRoles[0]?.title || 'Contributor');
                    setApplyModalOpen(true);
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md shadow-purple-500/20 flex items-center gap-2 transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Apply / Join Team</span>
                </button>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600"
                  title="GitHub Repository"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Meta Row */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">Led by</span>
              <p className="font-bold text-slate-800 mt-0.5">{project.creatorName}</p>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">Team Size</span>
              <p className="font-bold text-slate-800 mt-0.5">
                {project.teamSize} / {project.maxTeamSize} Members
              </p>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">Duration</span>
              <p className="font-bold text-slate-800 mt-0.5">{project.durationWeeks} Weeks</p>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">Sprint Progress</span>
              <p className="font-bold text-slate-800 mt-0.5">{progressPercent}%</p>
            </div>
          </div>
        </div>

        {/* Creator View: Pending Applications Drawer */}
        {isCreator && projectApplications.length > 0 && (
          <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-bold text-amber-900">
                  Pending Applications ({projectApplications.length})
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-amber-700">Review & accept co-builders</span>
            </div>

            <div className="space-y-3">
              {projectApplications.map(app => (
                <div
                  key={app.id}
                  className="bg-white p-4 rounded-2xl border border-amber-100 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={app.applicantAvatar}
                      alt={app.applicantName}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-amber-300"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-slate-900 font-bold">{app.applicantName}</strong>
                        <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-semibold text-[10px]">
                          Applied for: {app.roleTitle}
                        </span>
                      </div>
                      <p className="text-slate-500 mt-1 leading-relaxed italic">"{app.pitch}"</p>
                      <p className="text-[11px] text-indigo-600 mt-0.5">
                        Learning Goals: {app.learningGoals}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => acceptApplication(app.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1 shadow-xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Accept</span>
                    </button>
                    <button
                      onClick={() => declineApplication(app.id)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two Columns: Overview vs Team & Open Roles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Problem, Description, Milestones */}
          <div className="lg:col-span-2 space-y-6">
            {/* Problem & Description */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  The Problem It Solves
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {project.problemStatement}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Detailed Project Vision
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Key Technologies & Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.requiredSkills.map(s => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Milestones Checklist */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Roadmap & Deliverables</h3>
                <span className="text-xs text-slate-400">
                  {completedMilestones} of {project.milestones.length} Completed
                </span>
              </div>

              <div className="space-y-3">
                {project.milestones.map((m, idx) => (
                  <div
                    key={m.id}
                    className={`p-3.5 rounded-2xl border text-xs flex items-start gap-3 transition-colors ${
                      m.completed
                        ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        m.completed ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {m.completed ? <Check className="w-3 h-3" /> : idx + 1}
                    </div>
                    <div>
                      <p className={`font-bold ${m.completed ? 'line-through text-emerald-800' : 'text-slate-900'}`}>
                        {m.title}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Team Roster & Open Roles */}
          <div className="space-y-6">
            {/* Team Members */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Team Roster ({project.currentMembers.length})
              </h3>

              <div className="space-y-3">
                {project.currentMembers.map(m => (
                  <div key={m.userId} className="flex items-center gap-3 text-xs">
                    <img
                      src={m.avatar}
                      alt={m.userName}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-blue-500/20"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900 truncate">{m.userName}</p>
                      <p className="text-[11px] text-slate-500 truncate">{m.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Open Roles */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold text-slate-900">Open Team Roles</h3>
                <span className="text-[10px] font-bold uppercase text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
                  Recruiting
                </span>
              </div>

              {project.openRoles.length === 0 ? (
                <p className="text-xs text-slate-400 py-2">All roles for this squad have been filled!</p>
              ) : (
                <div className="space-y-3">
                  {project.openRoles.map(role => (
                    <div
                      key={role.id}
                      className={`p-3 rounded-2xl border text-xs space-y-2 ${
                        role.filled ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-purple-50/40 border-purple-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{role.title}</span>
                        {role.filled ? (
                          <span className="text-[10px] text-slate-500 font-semibold">Filled</span>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedRole(role.title);
                              setApplyModalOpen(true);
                            }}
                            className="text-[10px] font-bold text-purple-700 hover:underline"
                          >
                            Apply →
                          </button>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {role.skillsRequired.map(s => (
                          <span
                            key={s}
                            className="text-[10px] font-medium bg-white px-2 py-0.5 rounded border border-purple-100 text-purple-700"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Join Project Application Modal */}
        {applyModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Apply to Join "{project.title}"
                  </h3>
                  <p className="text-xs text-slate-500">Send your pitch to {project.creatorName}</p>
                </div>
                <button
                  onClick={() => setApplyModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Select Role</label>
                  <select
                    value={selectedRole}
                    onChange={e => setSelectedRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                  >
                    {project.openRoles
                      .filter(r => !r.filled)
                      .map(r => (
                        <option key={r.id} value={r.title}>
                          {r.title}
                        </option>
                      ))}
                    <option value="General Collaborator">General Collaborator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Why are you a great fit? (Your Pitch)
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Mention the skills you bring and any past experience..."
                    value={pitch}
                    onChange={e => setPitch(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    What skills do you hope to learn from this team?
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="e.g. Master backend APIs, understand design systems, or practice agile..."
                    value={learningGoals}
                    onChange={e => setLearningGoals(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setApplyModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Application</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
