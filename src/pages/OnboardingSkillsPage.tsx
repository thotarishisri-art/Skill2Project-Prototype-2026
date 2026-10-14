import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SKILL_CATEGORIES } from '../data/mockData';
import type { UserSkill, DesiredSkill, SkillLevel } from '../types';
import { Sparkles, ArrowRight, Plus, Trash2, BookOpen, GraduationCap } from 'lucide-react';

export const OnboardingSkillsPage: React.FC = () => {
  const { currentUser, updateUserSkills } = useApp();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState(SKILL_CATEGORIES[0].name);
  const [skillsKnown, setSkillsKnown] = useState<UserSkill[]>(currentUser.skillsKnown || []);
  const [skillsWanted, setSkillsWanted] = useState<DesiredSkill[]>(currentUser.skillsWanted || []);
  const [customSkillName, setCustomSkillName] = useState('');
  const [targetSection, setTargetSection] = useState<'known' | 'wanted'>('known');

  const handleToggleKnown = (skillName: string, category: string) => {
    const exists = skillsKnown.find(s => s.name === skillName);
    if (exists) {
      setSkillsKnown(skillsKnown.filter(s => s.name !== skillName));
    } else {
      setSkillsKnown([...skillsKnown, { name: skillName, category, level: 'Intermediate' }]);
    }
  };

  const handleToggleWanted = (skillName: string, category: string) => {
    const exists = skillsWanted.find(s => s.name === skillName);
    if (exists) {
      setSkillsWanted(skillsWanted.filter(s => s.name !== skillName));
    } else {
      setSkillsWanted([...skillsWanted, { name: skillName, category, priority: 'High' }]);
    }
  };

  const updateKnownLevel = (skillName: string, level: SkillLevel) => {
    setSkillsKnown(skillsKnown.map(s => (s.name === skillName ? { ...s, level } : s)));
  };

  const updateWantedPriority = (skillName: string, priority: 'High' | 'Medium' | 'Low') => {
    setSkillsWanted(skillsWanted.map(s => (s.name === skillName ? { ...s, priority } : s)));
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkillName.trim()) return;

    if (targetSection === 'known') {
      if (!skillsKnown.some(s => s.name.toLowerCase() === customSkillName.toLowerCase())) {
        setSkillsKnown([...skillsKnown, { name: customSkillName.trim(), category: activeCategory, level: 'Intermediate' }]);
      }
    } else {
      if (!skillsWanted.some(s => s.name.toLowerCase() === customSkillName.toLowerCase())) {
        setSkillsWanted([...skillsWanted, { name: customSkillName.trim(), category: activeCategory, priority: 'High' }]);
      }
    }
    setCustomSkillName('');
  };

  const handleSaveAndContinue = () => {
    updateUserSkills(skillsKnown, skillsWanted);
    navigate('/dashboard');
  };

  const currentCategorySkills = SKILL_CATEGORIES.find(c => c.name === activeCategory)?.skills || [];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart Onboarding</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Define What You Offer & What You Want to Learn
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Skill2Project uses this exact blueprint to pair you with high-synergy student builders.
          </p>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {SKILL_CATEGORIES.map(cat => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.name
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Available Skills in Current Category */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Skills in <span className="text-blue-600">{activeCategory}</span>
              </h3>
              <p className="text-[11px] text-slate-400">Click to add to your skills or learning wishlist:</p>
            </div>

            {/* Custom input */}
            <form onSubmit={handleAddCustom} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add custom skill..."
                value={customSkillName}
                onChange={e => setCustomSkillName(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={targetSection}
                onChange={e => setTargetSection(e.target.value as any)}
                className="px-2 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
              >
                <option value="known">I Know</option>
                <option value="wanted">I Want to Learn</option>
              </select>
              <button
                type="submit"
                className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {currentCategorySkills.map(skill => {
              const isKnown = skillsKnown.some(s => s.name === skill);
              const isWanted = skillsWanted.some(s => s.name === skill);

              return (
                <div key={skill} className="flex items-center rounded-xl border border-slate-200 bg-slate-50 overflow-hidden text-xs">
                  <span className="px-3 py-1.5 font-semibold text-slate-700 bg-white">{skill}</span>
                  <button
                    onClick={() => handleToggleKnown(skill, activeCategory)}
                    className={`px-2.5 py-1.5 font-bold transition-colors ${
                      isKnown ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-blue-600'
                    }`}
                    title="Add to Skills I Know"
                  >
                    {isKnown ? '✓ Known' : '+ Know'}
                  </button>
                  <button
                    onClick={() => handleToggleWanted(skill, activeCategory)}
                    className={`px-2.5 py-1.5 font-bold transition-colors border-l border-slate-200 ${
                      isWanted ? 'bg-purple-600 text-white' : 'hover:bg-purple-50 text-purple-600'
                    }`}
                    title="Add to Skills I Want to Learn"
                  >
                    {isWanted ? '✓ Want' : '+ Want'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Two Columns: Skills I Know vs Skills I Want to Learn */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Skills I Know */}
          <div className="bg-white rounded-2xl border border-blue-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Skills I Know ({skillsKnown.length})</h3>
                <p className="text-[11px] text-slate-500">Skills you can contribute and mentor peers in</p>
              </div>
            </div>

            {skillsKnown.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                No skills selected yet. Click '+ Know' from the pills above.
              </div>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {skillsKnown.map(skill => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-800">{skill.name}</p>
                      <p className="text-[10px] text-slate-400">{skill.category}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={skill.level}
                        onChange={e => updateKnownLevel(skill.name, e.target.value as SkillLevel)}
                        className="text-[11px] font-semibold bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-700"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>

                      <button
                        onClick={() => handleToggleKnown(skill.name, skill.category)}
                        className="text-slate-400 hover:text-red-500 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Skills I Want to Learn */}
          <div className="bg-white rounded-2xl border border-purple-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Skills I Want to Learn ({skillsWanted.length})</h3>
                <p className="text-[11px] text-slate-500">Skills you wish to build hands-on with a peer</p>
              </div>
            </div>

            {skillsWanted.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                No learning goals selected yet. Click '+ Want' from the pills above.
              </div>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {skillsWanted.map(skill => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-800">{skill.name}</p>
                      <p className="text-[10px] text-slate-400">{skill.category}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={skill.priority}
                        onChange={e => updateWantedPriority(skill.name, e.target.value as any)}
                        className="text-[11px] font-semibold bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-700"
                      >
                        <option value="High">High Priority</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>

                      <button
                        onClick={() => handleToggleWanted(skill.name, skill.category)}
                        className="text-slate-400 hover:text-red-500 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Save & Continue Bar */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
          <div className="text-xs text-slate-500">
            Selected: <strong className="text-blue-600">{skillsKnown.length} known</strong> &{' '}
            <strong className="text-purple-600">{skillsWanted.length} target skills</strong>.
          </div>
          <button
            onClick={handleSaveAndContinue}
            className="px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 text-xs flex items-center gap-2 transition-all"
          >
            <span>Save & Go to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
