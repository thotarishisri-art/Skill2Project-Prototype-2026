export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface UserSkill {
  name: string;
  category: string;
  level: SkillLevel;
}

export interface DesiredSkill {
  name: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  roleTitle: string;
  college: string;
  department: string;
  year: string;
  bio: string;
  skillsKnown: UserSkill[];
  skillsWanted: DesiredSkill[];
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
  completedProjectsCount: number;
  endorsementsCount: number;
}

export interface ProjectRole {
  id: string;
  title: string;
  skillsRequired: string[];
  filled: boolean;
  assignedUserId?: string;
  assignedUserName?: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface PeerEndorsement {
  fromUserId: string;
  fromUserName: string;
  fromUserAvatar: string;
  toUserId: string;
  badge: string;
  comment: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problemStatement: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  teamSize: number;
  maxTeamSize: number;
  creatorId: string;
  creatorName: string;
  currentMembers: {
    userId: string;
    userName: string;
    avatar: string;
    role: string;
  }[];
  openRoles: ProjectRole[];
  milestones: ProjectMilestone[];
  durationWeeks: number;
  status: 'recruiting' | 'in_progress' | 'completed';
  requiredSkills: string[];
  githubUrl?: string;
  demoUrl?: string;
  figmaUrl?: string;
  announcements?: {
    id: string;
    authorName: string;
    avatar: string;
    content: string;
    timestamp: string;
  }[];
  skillsUsed?: string[];
  finalSummary?: string;
  peerEndorsements?: PeerEndorsement[];
}

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assigneeId: string;
  assigneeName: string;
  assigneeAvatar: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'Collaboration' | 'Milestone' | 'Skill' | 'Leadership';
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'match' | 'application' | 'accepted' | 'task' | 'badge' | 'completion';
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface Connection {
  id: string;
  userId: string;
  targetUserId: string;
  status: 'pending' | 'connected';
  initiatedBy: string;
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface Application {
  id: string;
  projectId: string;
  projectTitle: string;
  applicantId: string;
  applicantName: string;
  applicantAvatar: string;
  applicantCollege: string;
  roleTitle: string;
  pitch: string;
  learningGoals: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  connectionId: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}
