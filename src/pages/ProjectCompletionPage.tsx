import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  Award,
  Sparkles,
  ExternalLink,
  Heart,
  Star
} from 'lucide-react';
import { GithubIcon } from '../components/common/BrandIcons';

export const ProjectCompletionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, currentUser, completeProject } = useApp();

  const projectId = id || 'proj-campus-events';
  const project = projects.find(p => p.id === projectId) || projects[0];

  const [summary, setSummary] = useState(
    'Successfully built and launched the sprint MVP! Delivered full mobile responsiveness, validated auth tokens, and verified door check-in scan latency under 300ms.'
  );
  const [githubUrl, setGithubUrl] = useState(project.githubUrl || 'https://github.com/skill2project/campus-event-hub');
  const [demoUrl, setDemoUrl] = useState(project.demoUrl || 'https://campus-events-demo.vercel.app');
  const [skillsUsedInput, setSkillsUsedInput] = useState(
    project.requiredSkills.join(', ') || 'React, Tailwind CSS, TypeScript, FastAPI'
  );
  const [selectedBadge, setSelectedBadge] = useState('Team Synergist');
  const [peerComment, setPeerComment] = useState(
    'Incredible teamwork throughout the sprint! Seamless API integration and rapid UI iterations.'
  );

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }

    const skillsUsed = skillsUsedInput.split(',').map(s => s.trim()).filter(Boolean);

    completeProject(
      project.id,
      summary,
      githubUrl,
      demoUrl,
      skillsUsed,
      selectedBadge,
      peerComment
    );

    // Redirect to Portfolio to see the result
    setTimeout(() => {
      navigate('/portfolio');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-teal-500/20 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto text-white shadow-inner">
            <Award className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Graduate Project to Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto">
            Completing <strong className="text-white">"{project.title}"</strong> marks it as verified proof-of-work on each team member's public portfolio and unlocks milestone achievements!
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleFinish} className="space-y-6 text-xs">
            {/* Project Summary */}
            <div>
              <label className="block font-bold text-slate-800 mb-1 text-sm">
                Sprint Summary & Retrospective
              </label>
              <p className="text-slate-500 text-[11px] mb-2">
                What did the squad build? What technical milestones and challenges were conquered?
              </p>
              <textarea
                rows={3}
                required
                value={summary}
                onChange={e => setSummary(e.target.value)}
                className="w-full p-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">GitHub Repository Link</label>
                <div className="relative">
                  <GithubIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="url"
                    required
                    value={githubUrl}
                    onChange={e => setGithubUrl(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Live Demo / Preview URL</label>
                <div className="relative">
                  <ExternalLink className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="url"
                    required
                    value={demoUrl}
                    onChange={e => setDemoUrl(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Skills Utilized */}
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Technologies & Skills Utilized (comma separated)
              </label>
              <input
                type="text"
                required
                value={skillsUsedInput}
                onChange={e => setSkillsUsedInput(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Peer Endorsements Section */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                <h3 className="font-bold text-slate-900 text-sm">Mutual Peer Endorsement</h3>
              </div>
              <p className="text-slate-500 text-[11px]">
                Award your co-builders a verified endorsement badge to vouch for their teamwork on their portfolios:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  'Team Synergist',
                  'Fast Debugger',
                  'Rock-solid Architect',
                  'Design Perfectionist'
                ].map(badge => (
                  <button
                    key={badge}
                    type="button"
                    onClick={() => setSelectedBadge(badge)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      selectedBadge === badge
                        ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold ring-2 ring-amber-300'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold'
                    }`}
                  >
                    <Star className={`w-4 h-4 mx-auto mb-1 ${selectedBadge === badge ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
                    <span className="text-[10px] block leading-tight">{badge}</span>
                  </button>
                ))}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Endorsement Testimonial</label>
                <textarea
                  rows={2}
                  value={peerComment}
                  onChange={e => setPeerComment(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                to={`/workspace/${project.id}`}
                className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Back to Workspace
              </Link>

              <button
                type="submit"
                className="px-6 py-3 font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl shadow-lg shadow-teal-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 text-xs"
              >
                <Sparkles className="w-4 h-4" />
                <span>Publish to Portfolio & Unlock Badges</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
