import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getRankedMatches } from '../services/matching';
import {
  Sparkles,
  Search,
  Users2,
  Send,
  CheckCircle2,
  X
} from 'lucide-react';
import type { User } from '../types';

export const SkillMatchingPage: React.FC = () => {
  const { currentUser, allUsers, projects, connectWithUser, connections, showToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [minScore, setMinScore] = useState<number>(0);
  const [selectedPeerForInvite, setSelectedPeerForInvite] = useState<User | null>(null);
  const [inviteProjectId, setInviteProjectId] = useState<string>('');

  // Calculate all matches
  const matches = getRankedMatches(currentUser, allUsers);

  // User's owned or leading projects
  const myLeadingProjects = projects.filter(
    p => p.creatorId === currentUser.id || p.currentMembers.some(m => m.userId === currentUser.id)
  );

  // Filter matches
  const filteredMatches = matches.filter(({ peer, compatibilityScore, youTeach, peerTeaches }) => {
    const matchesSearch =
      peer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      peer.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
      peer.skillsKnown.some(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      peerTeaches.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesScore = compatibilityScore >= minScore;
    return matchesSearch && matchesScore;
  });

  const isConnected = (targetId: string) => {
    return connections.some(
      c =>
        (c.userId === currentUser.id && c.targetUserId === targetId && c.status === 'connected') ||
        (c.userId === targetId && c.targetUserId === currentUser.id && c.status === 'connected')
    );
  };

  const handleSendInvite = () => {
    if (!selectedPeerForInvite || !inviteProjectId) return;
    const project = projects.find(p => p.id === inviteProjectId);
    showToast(
      'Invitation Dispatched!',
      `Sent formal team invite to ${selectedPeerForInvite.name} for "${project?.title || 'Project'}".`
    );
    setSelectedPeerForInvite(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Banner */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Reciprocal Skill Matchmaker</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Complementary Student Builders
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
                We analyze your offered skills (<strong>{currentUser.skillsKnown.map(s => s.name).join(', ')}</strong>) and your learning targets (<strong>{currentUser.skillsWanted.map(s => s.name).join(', ')}</strong>) to find reciprocal matches.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by skill, name, college..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50/50 w-52 sm:w-64"
                />
              </div>

              <select
                value={minScore}
                onChange={e => setMinScore(Number(e.target.value))}
                className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 focus:outline-none"
              >
                <option value={0}>All Compatibility</option>
                <option value={80}>High Synergy (80%+)</option>
                <option value={90}>Perfect Synergy (90%+)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Match Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map(({ peer, compatibilityScore, youTeach, peerTeaches, synergyReason, isPerfectMatch }) => {
            const connected = isConnected(peer.id);

            return (
              <div
                key={peer.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-purple-300 transition-all duration-200 p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={peer.avatar}
                        alt={peer.name}
                        className="w-13 h-13 rounded-2xl object-cover ring-2 ring-purple-500/20 shadow-xs"
                      />
                      <div>
                        <h3 className="text-base font-bold text-slate-900 leading-tight">{peer.name}</h3>
                        <p className="text-xs text-slate-500 font-medium">{peer.roleTitle}</p>
                        <p className="text-[11px] text-slate-400">{peer.college}</p>
                      </div>
                    </div>

                    {/* Compatibility Badge */}
                    <div
                      className={`px-3 py-1.5 rounded-2xl text-center shadow-xs ${
                        isPerfectMatch
                          ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      <span className="block text-sm font-black leading-none">{compatibilityScore}%</span>
                      <span className="text-[9px] font-bold uppercase tracking-tight">Synergy</span>
                    </div>
                  </div>

                  {/* Why Match Works (The Core Feature Callout) */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-50/70 via-indigo-50/50 to-blue-50/70 border border-purple-100/80 mb-4 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>Why This Match Works:</span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="flex items-start gap-1.5">
                        <span className="font-bold text-blue-700 whitespace-nowrap">You teach:</span>
                        <span className="text-slate-700 font-medium">{youTeach.join(', ')}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="font-bold text-purple-700 whitespace-nowrap">
                          {peer.name.split(' ')[0]} teaches:
                        </span>
                        <span className="text-slate-700 font-medium">{peerTeaches.join(', ')}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 italic pt-1 border-t border-purple-100/60 leading-relaxed">
                      "{synergyReason}"
                    </p>
                  </div>

                  {/* Skills Grid */}
                  <div className="space-y-3 mb-4 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Skills Known
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {peer.skillsKnown.map(s => (
                          <span
                            key={s.name}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                          >
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Skills Learning
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {peer.skillsWanted.map(s => (
                          <span
                            key={s.name}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-100"
                          >
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => connectWithUser(peer.id)}
                    disabled={connected}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      connected
                        ? 'bg-slate-100 text-slate-500 cursor-default'
                        : 'bg-white border border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {connected ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Connected</span>
                      </>
                    ) : (
                      <>
                        <Users2 className="w-3.5 h-3.5" />
                        <span>Connect</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setSelectedPeerForInvite(peer);
                      if (myLeadingProjects.length > 0) {
                        setInviteProjectId(myLeadingProjects[0].id);
                      }
                    }}
                    className="py-2 px-3 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Invite</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Invite to Project Modal */}
        {selectedPeerForInvite && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-base text-slate-900">
                  Invite {selectedPeerForInvite.name} to Team
                </h3>
                <button
                  onClick={() => setSelectedPeerForInvite(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Choose one of your active projects to send a formal co-builder invitation to {selectedPeerForInvite.name}.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Select Project</label>
                {myLeadingProjects.length === 0 ? (
                  <p className="text-xs text-red-500">
                    You don't have any created projects yet. Create a project first!
                  </p>
                ) : (
                  <select
                    value={inviteProjectId}
                    onChange={e => setInviteProjectId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-white"
                  >
                    {myLeadingProjects.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.category})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => setSelectedPeerForInvite(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendInvite}
                  disabled={myLeadingProjects.length === 0}
                  className="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-md transition-all disabled:opacity-50"
                >
                  Dispatch Invitation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
