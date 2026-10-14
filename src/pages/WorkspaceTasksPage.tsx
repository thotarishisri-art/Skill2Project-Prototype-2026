import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { TaskStatus, TaskPriority } from '../types';
import {
  Kanban,
  Plus,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Clock,
  X,
  FolderGit2
} from 'lucide-react';

export const WorkspaceTasksPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, tasks, moveTask, addTask, deleteTask, currentUser } = useApp();

  const projectId = id || 'proj-campus-events';
  const project = projects.find(p => p.id === projectId) || projects[0];

  const projectTasks = tasks.filter(t => t.projectId === project.id);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newAssigneeId, setNewAssigneeId] = useState(currentUser.id);
  const [newPriority, setNewPriority] = useState<TaskPriority>('Medium');
  const [newDueDate, setNewDueDate] = useState('Oct 20, 2026');

  // Columns definition
  const columns: { status: TaskStatus; label: string; color: string }[] = [
    { status: 'todo', label: 'To Do', color: 'border-slate-300' },
    { status: 'in_progress', label: 'In Progress', color: 'border-blue-400' },
    { status: 'review', label: 'In Review', color: 'border-purple-400' },
    { status: 'completed', label: 'Completed', color: 'border-emerald-400' }
  ];

  const completedCount = projectTasks.filter(t => t.status === 'completed').length;
  const progressPercent = projectTasks.length > 0 ? Math.round((completedCount / projectTasks.length) * 100) : 0;

  const handleCreateTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const assignee = project.currentMembers.find(m => m.userId === newAssigneeId) || {
      userId: currentUser.id,
      userName: currentUser.name,
      avatar: currentUser.avatar
    };

    addTask({
      projectId: project.id,
      title: newTitle.trim(),
      description: newDesc.trim() || 'Sprint item deliverable',
      assigneeId: assignee.userId,
      assigneeName: assignee.userName,
      assigneeAvatar: assignee.avatar,
      priority: newPriority,
      status: 'todo',
      dueDate: newDueDate
    });

    setCreateModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  const getNextStatus = (curr: TaskStatus): TaskStatus | null => {
    if (curr === 'todo') return 'in_progress';
    if (curr === 'in_progress') return 'review';
    if (curr === 'review') return 'completed';
    return null;
  };

  const getPrevStatus = (curr: TaskStatus): TaskStatus | null => {
    if (curr === 'completed') return 'review';
    if (curr === 'review') return 'in_progress';
    if (curr === 'in_progress') return 'todo';
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Link to={`/workspace/${project.id}`} className="hover:text-blue-600 flex items-center gap-1 font-semibold">
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>{project.title} Workspace</span>
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-bold">Sprint Tasks</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Interactive Sprint Kanban
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Move tasks to update live sprint completion metrics.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Progress Meter */}
            <div className="hidden sm:block text-right">
              <span className="text-xs font-bold text-slate-700 block">
                {completedCount} of {projectTasks.length} Done ({progressPercent}%)
              </span>
              <div className="w-36 bg-slate-100 rounded-full h-2 mt-1">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => setCreateModalOpen(true)}
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Sprint Task</span>
            </button>
          </div>
        </div>

        {/* Kanban Board Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map(col => {
            const columnTasks = projectTasks.filter(t => t.status === col.status);

            return (
              <div
                key={col.status}
                className="bg-slate-100/70 rounded-3xl p-4 flex flex-col min-h-[500px] border border-slate-200/60"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800">{col.label}</span>
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-white text-slate-600 border border-slate-200">
                      {columnTasks.length}
                    </span>
                  </div>
                </div>

                {/* Tasks Container */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {columnTasks.map(task => {
                    const next = getNextStatus(task.status);
                    const prev = getPrevStatus(task.status);

                    return (
                      <div
                        key={task.id}
                        className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3 group"
                      >
                        {/* Priority & Delete */}
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                              task.priority === 'High'
                                ? 'bg-red-50 text-red-700'
                                : task.priority === 'Medium'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {task.priority} Priority
                          </span>

                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-slate-300 hover:text-red-500 p-1 transition-colors"
                            title="Delete task"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Title & Desc */}
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 leading-snug">{task.title}</h4>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                            {task.description}
                          </p>
                        </div>

                        {/* Assignee & Due Date */}
                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                          <div className="flex items-center gap-1.5">
                            <img
                              src={task.assigneeAvatar}
                              alt={task.assigneeName}
                              className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200"
                            />
                            <span className="font-semibold text-slate-700 truncate max-w-[80px]">
                              {task.assigneeName.split(' ')[0]}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{task.dueDate}</span>
                          </div>
                        </div>

                        {/* Move Buttons */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                          {prev ? (
                            <button
                              onClick={() => moveTask(task.id, prev)}
                              className="px-2 py-1 rounded-lg text-[10px] font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-800 flex items-center gap-1 transition-colors"
                              title="Move back"
                            >
                              <ArrowLeft className="w-3 h-3" />
                              <span>Back</span>
                            </button>
                          ) : (
                            <div />
                          )}

                          {next && (
                            <button
                              onClick={() => moveTask(task.id, next)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
                                next === 'completed'
                                  ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                              }`}
                            >
                              <span>{next === 'completed' ? 'Finish' : 'Advance'}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {columnTasks.length === 0 && (
                    <div className="h-28 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center text-[11px] text-slate-400">
                      Empty column
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Task Modal */}
        {createModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-base text-slate-900">Add Sprint Task</h3>
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateTaskSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Task Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Implement API rate limiter"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    placeholder="Acceptance criteria and technical details..."
                    value={newDesc}
                    onChange={e => setNewDesc(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Assignee</label>
                    <select
                      value={newAssigneeId}
                      onChange={e => setNewAssigneeId(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-white"
                    >
                      {project.currentMembers.map(m => (
                        <option key={m.userId} value={m.userId}>
                          {m.userName} ({m.role.split(' ')[0]})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                    <select
                      value={newPriority}
                      onChange={e => setNewPriority(e.target.value as any)}
                      className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-white"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Due Date</label>
                  <input
                    type="text"
                    placeholder="e.g. Oct 25, 2026"
                    value={newDueDate}
                    onChange={e => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setCreateModalOpen(false)}
                    className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all"
                  >
                    Create Task
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
