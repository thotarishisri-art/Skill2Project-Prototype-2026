import type { User } from '../types';

export interface MatchResult {
  peer: User;
  compatibilityScore: number;
  youTeach: string[];
  peerTeaches: string[];
  synergyReason: string;
  isPerfectMatch: boolean;
}

export function calculateSkillMatch(currentUser: User, peer: User): MatchResult {
  // 1. Skills currentUser knows that peer wants to learn
  const peerWantedNames = peer.skillsWanted.map(s => s.name.toLowerCase());

  const youTeach = currentUser.skillsKnown
    .filter(known => peerWantedNames.some(wanted => wanted.includes(known.name.toLowerCase()) || known.name.toLowerCase().includes(wanted)))
    .map(s => s.name);

  // 2. Skills peer knows that currentUser wants to learn
  const currentUserWantedNames = currentUser.skillsWanted.map(s => s.name.toLowerCase());

  const peerTeaches = peer.skillsKnown
    .filter(known => currentUserWantedNames.some(wanted => wanted.includes(known.name.toLowerCase()) || known.name.toLowerCase().includes(wanted)))
    .map(s => s.name);

  // Base score calculation
  let score = 50;

  if (youTeach.length > 0 && peerTeaches.length > 0) {
    // True mutual reciprocal match!
    score = 85 + Math.min(13, (youTeach.length + peerTeaches.length) * 3);
  } else if (youTeach.length > 0 || peerTeaches.length > 0) {
    // One-sided knowledge transfer
    score = 68 + Math.min(12, (youTeach.length + peerTeaches.length) * 2);
  } else {
    // General category affinity fallback
    const sharedDepartments = currentUser.department.toLowerCase().includes('computer') && peer.department.toLowerCase().includes('data');
    score = sharedDepartments ? 62 : 55;
  }

  // Cap at 98% for realism
  const finalScore = Math.min(98, Math.max(45, score));
  const isPerfectMatch = finalScore >= 85;

  let synergyReason = '';
  if (youTeach.length > 0 && peerTeaches.length > 0) {
    synergyReason = `Reciprocal Skill Swap: You teach ${youTeach.slice(0, 2).join(' & ')} while ${peer.name.split(' ')[0]} mentors you in ${peerTeaches.slice(0, 2).join(' & ')}.`;
  } else if (youTeach.length > 0) {
    synergyReason = `High Mentorship Synergy: You can guide ${peer.name.split(' ')[0]} in ${youTeach.slice(0, 2).join(' & ')}.`;
  } else if (peerTeaches.length > 0) {
    synergyReason = `Skill Growth Match: ${peer.name.split(' ')[0]} can help you master ${peerTeaches.slice(0, 2).join(' & ')}.`;
  } else {
    synergyReason = `Complementary academic backgrounds in ${currentUser.department} and ${peer.department}.`;
  }

  return {
    peer,
    compatibilityScore: finalScore,
    youTeach: youTeach.length > 0 ? youTeach : ['Collaborative Coding', 'Peer Review'],
    peerTeaches: peerTeaches.length > 0 ? peerTeaches : peer.skillsKnown.slice(0, 2).map(s => s.name),
    synergyReason,
    isPerfectMatch
  };
}

export function getRankedMatches(currentUser: User, allUsers: User[]): MatchResult[] {
  return allUsers
    .filter(u => u.id !== currentUser.id)
    .map(peer => calculateSkillMatch(currentUser, peer))
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore);
}
