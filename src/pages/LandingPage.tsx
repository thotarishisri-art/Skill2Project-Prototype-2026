import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Users,
  Compass,
  CheckCircle2,
  FolderGit2,
  Layers,
  Award,
  Zap,
  Star,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LandingPage: React.FC = () => {
  const { projects, switchUser } = useApp();
  const navigate = useNavigate();

  // Interactive Teaser State
  const [selectedSkill, setSelectedSkill] = useState('React');
  const [matchPreview, setMatchPreview] = useState({
    teammate: 'Priya Sharma',
    role: 'AI / Backend Specialist',
    theyTeach: 'Python & FastAPI',
    youTeach: 'React & Tailwind',
    score: '96%'
  });

  const handleSkillChange = (skill: string) => {
    setSelectedSkill(skill);
    if (skill === 'React') {
      setMatchPreview({
        teammate: 'Priya Sharma',
        role: 'AI / Backend Specialist',
        theyTeach: 'Python & FastAPI',
        youTeach: 'React & Tailwind',
        score: '96%'
      });
    } else if (skill === 'Figma') {
      setMatchPreview({
        teammate: 'Alex Rivera',
        role: 'Frontend Developer',
        theyTeach: 'React & TypeScript',
        youTeach: 'Figma & UI Systems',
        score: '94%'
      });
    } else if (skill === 'Flutter') {
      setMatchPreview({
        teammate: 'Riya Patel',
        role: 'Cloud Architect',
        theyTeach: 'Cloud & Spring Boot',
        youTeach: 'Flutter & Dart',
        score: '91%'
      });
    } else {
      setMatchPreview({
        teammate: 'Sam Chen',
        role: 'Product Designer',
        theyTeach: 'UI/UX & User Research',
        youTeach: 'Python & SQL',
        score: '89%'
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-400/15 via-indigo-400/20 to-purple-400/15 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Campus Venture Prototype — Tagline: Learn | Collaborate | Build</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Turn Your Skills Into{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Real Projects
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Skill2Project pairs college students with <strong>complementary skills</strong> so you can stop doing solo tutorials, form agile teams, build real software, and launch a verifiable student portfolio.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/auth"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 text-sm"
              >
                <span>Get Started (Demo Login)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all text-sm"
              >
                <Compass className="w-4 h-4 text-slate-500" />
                <span>Explore Projects</span>
              </Link>
            </div>

            {/* One-Click Demo Personas */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Quick Test Personas:</span>
              <button
                onClick={() => {
                  switchUser('user-alex');
                  navigate('/dashboard');
                }}
                className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-colors"
              >
                Alex (React Lead)
              </button>
              <button
                onClick={() => {
                  switchUser('user-priya');
                  navigate('/dashboard');
                }}
                className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 font-semibold hover:bg-purple-100 transition-colors"
              >
                Priya (AI/Python)
              </button>
              <button
                onClick={() => {
                  switchUser('user-sam');
                  navigate('/dashboard');
                }}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-semibold hover:bg-emerald-100 transition-colors"
              >
                Sam (UI/UX)
              </button>
            </div>
          </div>

          {/* Interactive Match Teaser Simulator Card */}
          <div className="mt-14 max-w-4xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-6 sm:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-100 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  Live Synergy Simulator
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">
                  See how Skill2Project finds your complementary co-builder
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pick a skill you know, and see the reciprocal peer match instant preview:
                </p>
              </div>

              {/* Selector Pills */}
              <div className="flex flex-wrap gap-2">
                {['React', 'Figma', 'Flutter', 'Python'].map(skill => (
                  <button
                    key={skill}
                    onClick={() => handleSkillChange(skill)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedSkill === skill
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    I know: {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Matched Card Teaser Display */}
            <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Left: Your Offering */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-center space-y-2">
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">Your Offering</span>
                <p className="text-base font-extrabold text-slate-800">{selectedSkill}</p>
                <div className="text-xs text-blue-600 font-medium">You teach & guide your team</div>
              </div>

              {/* Center: Reciprocal Badge */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 text-lg font-black mx-auto">
                  {matchPreview.score}
                </div>
                <div className="text-xs font-bold text-emerald-600 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> High Complementary Synergy
                </div>
                <div className="text-[11px] text-slate-500">
                  Direct knowledge exchange match
                </div>
              </div>

              {/* Right: Matched Peer */}
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 text-center space-y-2">
                <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">Matched Peer</span>
                <p className="text-base font-extrabold text-slate-800">{matchPreview.teammate}</p>
                <div className="text-xs text-purple-700 font-semibold">Teaches: {matchPreview.theyTeach}</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Ready to team up with <strong>{matchPreview.teammate}</strong> and start building?
              </span>
              <Link
                to="/matches"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 hover:underline"
              >
                <span>Launch Skill Matching Engine</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="border-y border-slate-200 bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">4,800+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Students Onboarded</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-blue-600">1,250+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Projects Built</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-purple-600">94%</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Complementary Match Rate</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600">100%</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Verified Proof of Work</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            The 4-Step Student Blueprint
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How Skill2Project Works
          </h2>
          <p className="text-sm text-slate-600">
            From picking what you know and want to learn to showcasing a shipped project on your portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm relative group hover:border-blue-400 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-4">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">1. Add Your Skills</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              List the skills you currently possess (e.g., React, Figma) and the skills you want to learn through hands-on practice.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm relative group hover:border-purple-400 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm mb-4">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">2. Find Your Match</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our synergy engine identifies peers with complementary knowledge who can teach you while learning from your strengths.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm relative group hover:border-indigo-400 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mb-4">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">3. Build Together</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Form squads, track progress on the integrated Kanban task board, hold sprint standups, and deploy real working prototypes.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm relative group hover:border-emerald-400 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4">
              04
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">4. Showcase Portfolio</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upon completion, graduate your project to your public portfolio with verified peer endorsements and unlock milestone badges.
            </p>
          </div>
        </div>
      </section>

      {/* Why Skill2Project Section */}
      <section id="why-skill2project" className="bg-slate-900 text-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              Why We Are Different
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Why College Students Love Skill2Project
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Solo side-projects are often abandoned. Team projects with the right peer synergy actually get shipped.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Escape Tutorial Hell</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Watching endless video tutorials doesn't teach you how to resolve merge conflicts, design schemas, or ship under deadlines. Real projects do.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Genuine Peer Collaboration</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Frontend devs don't need to struggle alone through database tuning, and backend devs don't need to struggle with UI layout. Everyone contributes their best.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Verifiable Proof of Work</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Recruiters crave real evidence. Every project on your Skill2Project portfolio includes commit links, live demos, and teammate endorsements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section id="featured-projects" className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Real Campus Initiatives
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Featured Active Projects
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Browse projects currently recruiting complementary teammates across colleges:
            </p>
          </div>

          <Link
            to="/projects"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 hover:underline"
          >
            <span>View all in Project Hub</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.slice(0, 3).map(proj => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-700">
                    {proj.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
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

                <h3 className="text-base font-bold text-slate-900 mb-1">{proj.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {proj.tagline || proj.description}
                </p>

                {/* Required Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.requiredSkills.slice(0, 4).map(skill => (
                    <span
                      key={skill}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {proj.currentMembers.map((m, i) => (
                      <img
                        key={i}
                        src={m.avatar}
                        alt={m.userName}
                        className="w-6 h-6 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500">
                    {proj.teamSize}/{proj.maxTeamSize} spots
                  </span>
                </div>

                <Link
                  to={`/projects/${proj.id}`}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  Details <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Build Something Extraordinary?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto">
            Join students from Stanford, MIT, Berkeley, and Georgia Tech who are learning practical skills through real peer teamwork.
          </p>
          <div className="pt-2">
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold bg-white text-indigo-700 hover:bg-slate-50 shadow-xl transition-all transform hover:-translate-y-0.5 text-sm"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
