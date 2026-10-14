import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { ProjectRole, ProjectMilestone } from '../types';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Check
} from 'lucide-react';

export const CreateProjectPage: React.FC = () => {
  const { createProject, currentUser } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // Step 1
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');

  // Step 2
  const [requiredSkillsInput, setRequiredSkillsInput] = useState('React, TypeScript, Tailwind');
  const [maxTeamSize, setMaxTeamSize] = useState(4);
  const [openRoles, setOpenRoles] = useState<ProjectRole[]>([
    {
      id: 'role-1',
      title: 'Backend Engineer',
      skillsRequired: ['Python', 'FastAPI'],
      filled: false
    },
    {
      id: 'role-2',
      title: 'UI/UX Designer',
      skillsRequired: ['Figma', 'User Research'],
      filled: false
    }
  ]);
  const [newRoleTitle, setNewRoleTitle] = useState('');
  const [newRoleSkills, setNewRoleSkills] = useState('');

  // Step 3
  const [durationWeeks, setDurationWeeks] = useState(6);
  const [milestones, setMilestones] = useState<ProjectMilestone[]>([
    { id: 'm-1', title: 'System Architecture & Wireframes', description: 'Complete Figma flows and database design', completed: false },
    { id: 'm-2', title: 'Core MVP Features & API Wiring', description: 'Implement primary user journeys and authentication', completed: false },
    { id: 'm-3', title: 'Beta Testing & Live Deployment', description: 'Deploy prototype and gather peer reviews', completed: false }
  ]);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');

  const handleAddRole = () => {
    if (!newRoleTitle.trim()) return;
    const skills = newRoleSkills.split(',').map(s => s.trim()).filter(Boolean);
    setOpenRoles([
      ...openRoles,
      {
        id: `role-${Date.now()}`,
        title: newRoleTitle.trim(),
        skillsRequired: skills.length > 0 ? skills : ['General Development'],
        filled: false
      }
    ]);
    setNewRoleTitle('');
    setNewRoleSkills('');
  };

  const handleRemoveRole = (id: string) => {
    setOpenRoles(openRoles.filter(r => r.id !== id));
  };

  const handleAddMilestone = () => {
    if (!newMilestoneTitle.trim()) return;
    setMilestones([
      ...milestones,
      {
        id: `m-${Date.now()}`,
        title: newMilestoneTitle.trim(),
        description: 'Sprint deliverable target',
        completed: false
      }
    ]);
    setNewMilestoneTitle('');
  };

  const handleRemoveMilestone = (id: string) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  const handlePublish = () => {
    const requiredSkills = requiredSkillsInput.split(',').map(s => s.trim()).filter(Boolean);
    const newProj = createProject({
      title: title || 'Campus Collaborative Project',
      tagline: tagline || 'Student project on Skill2Project',
      description: description || 'Hands-on experiential learning project.',
      problemStatement: problemStatement || 'Addressing campus challenges through collaborative student innovation.',
      category,
      difficulty,
      maxTeamSize,
      requiredSkills: requiredSkills.length > 0 ? requiredSkills : ['React', 'Python'],
      openRoles,
      milestones,
      durationWeeks
    });

    navigate(`/projects/${newProj.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Step Indicator */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    step === s
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                      : step > s
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                <span className="hidden sm:inline text-xs font-semibold text-slate-700">
                  {s === 1 ? 'Details' : s === 2 ? 'Team & Roles' : s === 3 ? 'Milestones' : 'Review'}
                </span>
                {s < 4 && <div className="hidden sm:block w-12 h-0.5 bg-slate-200 mx-1" />}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Step 1 of 4</span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1">Project Identity & Purpose</h2>
                <p className="text-xs text-slate-500">Describe the core idea and what problem your team is tackling.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Project Title</label>
                <input
                  type="text"
                  placeholder="e.g. Campus Peer Tutoring Portal"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">One-line Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Connecting students for instant homework help and coding reviews"
                  value={tagline}
                  onChange={e => setTagline(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Domain Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="AI / ML">AI / ML</option>
                    <option value="Cloud / DevOps">Cloud / DevOps</option>
                    <option value="UI/UX">UI/UX Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Expected Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={e => setDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Beginner">Beginner Friendly</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced / Complex</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Problem Statement</label>
                <textarea
                  rows={2}
                  placeholder="What friction exists on campus that your project solves?"
                  value={problemStatement}
                  onChange={e => setProblemStatement(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  placeholder="Detailed project summary, key deliverables, and target user audience..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Step 2 of 4</span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1">Team Roles & Skill Requirements</h2>
                <p className="text-xs text-slate-500">Define what talents you need to complement your abilities.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Required Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. React, Tailwind CSS, Python, FastAPI"
                  value={requiredSkillsInput}
                  onChange={e => setRequiredSkillsInput(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Maximum Team Size</label>
                <input
                  type="number"
                  min={2}
                  max={6}
                  value={maxTeamSize}
                  onChange={e => setMaxTeamSize(Number(e.target.value))}
                  className="w-32 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Open Roles list */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-2">Open Roles to Recruit</label>
                <div className="space-y-2 mb-3">
                  {openRoles.map(role => (
                    <div
                      key={role.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-800">{role.title}</span>
                        <div className="flex gap-1 mt-1">
                          {role.skillsRequired.map(s => (
                            <span key={s} className="text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveRole(role.id)}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Role */}
                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Role title (e.g. DevOps Engineer)"
                    value={newRoleTitle}
                    onChange={e => setNewRoleTitle(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Skills (e.g. Docker, AWS)"
                    value={newRoleSkills}
                    onChange={e => setNewRoleSkills(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddRole}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold"
                  >
                    Add Role
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Step 3 of 4</span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1">Project Roadmap & Milestones</h2>
                <p className="text-xs text-slate-500">Break down the sprint targets so team members stay aligned.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated Duration (Weeks)</label>
                <input
                  type="number"
                  min={2}
                  max={12}
                  value={durationWeeks}
                  onChange={e => setDurationWeeks(Number(e.target.value))}
                  className="w-32 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Milestones</label>
                <div className="space-y-2 mb-3">
                  {milestones.map((m, idx) => (
                    <div
                      key={m.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-800">
                          {idx + 1}. {m.title}
                        </span>
                        <p className="text-[11px] text-slate-500 mt-0.5">{m.description}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveMilestone(m.id)}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="New milestone title (e.g. End-to-End API Integration)"
                    value={newMilestoneTitle}
                    onChange={e => setNewMilestoneTitle(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                  <button
                    type="button"
                    onClick={handleAddMilestone}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                  >
                    Add Milestone
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Step 4 of 4</span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1">Review & Publish</h2>
                <p className="text-xs text-slate-500">Review your project configuration before launching it to campus.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Title</span>
                  <p className="font-bold text-slate-900 text-sm">{title || 'Campus Collaborative Project'}</p>
                  <p className="text-slate-500">{tagline}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">Category & Level</span>
                    <p className="font-semibold text-slate-700">{category} • {difficulty}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">Duration & Team</span>
                    <p className="font-semibold text-slate-700">{durationWeeks} Weeks • Max {maxTeamSize} Members</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Open Roles ({openRoles.length})</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {openRoles.map(r => (
                      <span key={r.id} className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-semibold">
                        {r.title}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Milestones ({milestones.length})</span>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-600">
                    {milestones.map(m => (
                      <li key={m.id}>{m.title}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Wizard Navigation Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-5 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublish}
                className="px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-xs flex items-center gap-1.5 shadow-lg shadow-teal-500/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>Publish Project to Hub</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
