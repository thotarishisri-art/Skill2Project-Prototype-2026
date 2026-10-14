import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Search,
  PlusCircle,
  ArrowRight
} from 'lucide-react';

export const ProjectHubPage: React.FC = () => {
  const { projects, currentUser } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const categories = [
    'All',
    'Web Development',
    'Mobile Development',
    'AI / ML',
    'Cloud / DevOps'
  ];

  const filteredProjects = projects.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.requiredSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'Recruiting' && p.status === 'recruiting') ||
      (selectedStatus === 'In Progress' && p.status === 'in_progress') ||
      (selectedStatus === 'Completed' && p.status === 'completed');

    return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>Collaborative Repository</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Campus Project Hub
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
                Explore student-led projects, apply for open roles that match your learning aspirations, or launch your own venture squad.
              </p>
            </div>

            <Link
              to="/projects/create"
              className="px-5 py-3 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Project</span>
            </Link>
          </div>

          {/* Filter and Search Bar */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search projects by title, description, or skill (e.g. React, Python)..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none"
              >
                {categories.map(c => (
                  <option key={c} value={c}>
                    {c === 'All' ? 'All Domains' : c}
                  </option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={e => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none"
              >
                <option value="All">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Recruiting">Recruiting Spots</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed Showcase</option>
              </select>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(proj => {
            const completedCount = proj.milestones.filter(m => m.completed).length;
            const progress = Math.round((completedCount / Math.max(1, proj.milestones.length)) * 100);
            const openRolesCount = proj.openRoles.filter(r => !r.filled).length;
            const isMember =
              proj.creatorId === currentUser.id || proj.currentMembers.some(m => m.userId === currentUser.id);

            return (
              <div
                key={proj.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-200 p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Category & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700">
                      {proj.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        proj.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : proj.status === 'in_progress'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {proj.status === 'in_progress' ? 'In Progress' : proj.status === 'completed' ? 'Completed' : 'Recruiting'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">{proj.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {proj.tagline || proj.description}
                  </p>

                  {/* Creator info */}
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
                    <span>Led by <strong className="text-slate-700 font-semibold">{proj.creatorName}</strong></span>
                    <span>•</span>
                    <span className="capitalize">{proj.difficulty}</span>
                  </div>

                  {/* Required Skills */}
                  <div className="mt-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Required Skills
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.requiredSkills.map(s => (
                        <span
                          key={s}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Open roles badge */}
                  {openRolesCount > 0 && (
                    <div className="mt-3 py-1.5 px-2.5 rounded-xl bg-purple-50 text-purple-800 text-[11px] font-semibold flex items-center justify-between">
                      <span>{openRolesCount} open role{openRolesCount > 1 ? 's' : ''} available</span>
                      <span className="text-[10px] uppercase font-bold text-purple-600">Apply now</span>
                    </div>
                  )}

                  {/* Progress bar */}
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-[10px] font-semibold text-slate-400">
                      <span>Milestones Completed</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {proj.currentMembers.map((m, i) => (
                        <img
                          key={i}
                          src={m.avatar}
                          alt={m.userName}
                          title={`${m.userName} (${m.role})`}
                          className="w-7 h-7 rounded-full border-2 border-white object-cover"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      {proj.teamSize}/{proj.maxTeamSize}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isMember && (
                      <Link
                        to={`/workspace/${proj.id}`}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                      >
                        Workspace
                      </Link>
                    )}
                    <Link
                      to={`/projects/${proj.id}`}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-1"
                    >
                      <span>{isMember ? 'Details' : 'Join / Details'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <p className="text-sm font-bold text-slate-700">No projects match the selected filters.</p>
            <p className="text-xs text-slate-400 mt-1">Try relaxing your search terms or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};
