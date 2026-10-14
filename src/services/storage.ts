import type {
  User,
  Project,
  Task,
  Badge,
  Notification,
  Connection,
  Application,
  ChatMessage,
  TaskStatus
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_PROJECTS,
  INITIAL_TASKS,
  INITIAL_BADGES,
  INITIAL_NOTIFICATIONS,
  INITIAL_CONNECTIONS,
  INITIAL_APPLICATIONS,
  INITIAL_CHATS
} from '../data/mockData';

const STORAGE_KEYS = {
  USERS: 's2p_users',
  CURRENT_USER_ID: 's2p_current_user_id',
  PROJECTS: 's2p_projects',
  TASKS: 's2p_tasks',
  BADGES: 's2p_badges',
  NOTIFICATIONS: 's2p_notifications',
  CONNECTIONS: 's2p_connections',
  APPLICATIONS: 's2p_applications',
  CHATS: 's2p_chats'
};

// Safe JSON parser
function safeGet<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Failed to parse ${key} from localStorage`, e);
    return defaultValue;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to set ${key} in localStorage`, e);
  }
}

export const StorageService = {
  // Initialize storage if empty
  init(): void {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      safeSet(STORAGE_KEYS.USERS, INITIAL_USERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID)) {
      safeSet(STORAGE_KEYS.CURRENT_USER_ID, 'user-alex');
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
      safeSet(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.TASKS)) {
      safeSet(STORAGE_KEYS.TASKS, INITIAL_TASKS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.BADGES)) {
      safeSet(STORAGE_KEYS.BADGES, INITIAL_BADGES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      safeSet(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CONNECTIONS)) {
      safeSet(STORAGE_KEYS.CONNECTIONS, INITIAL_CONNECTIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
      safeSet(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CHATS)) {
      safeSet(STORAGE_KEYS.CHATS, INITIAL_CHATS);
    }
  },

  // Users
  getUsers(): User[] {
    return safeGet<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
  },

  getUserById(id: string): User | undefined {
    return this.getUsers().find(u => u.id === id);
  },

  getCurrentUserId(): string {
    return safeGet<string>(STORAGE_KEYS.CURRENT_USER_ID, 'user-alex');
  },

  getCurrentUser(): User {
    const currentId = this.getCurrentUserId();
    const user = this.getUserById(currentId);
    return user || INITIAL_USERS[0];
  },

  setCurrentUserId(id: string): void {
    safeSet(STORAGE_KEYS.CURRENT_USER_ID, id);
  },

  updateUser(updated: User): void {
    const users = this.getUsers().map(u => (u.id === updated.id ? updated : u));
    safeSet(STORAGE_KEYS.USERS, users);
  },

  addUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    safeSet(STORAGE_KEYS.USERS, users);
  },

  // Projects
  getProjects(): Project[] {
    return safeGet<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  },

  getProjectById(id: string): Project | undefined {
    return this.getProjects().find(p => p.id === id);
  },

  addProject(project: Project): void {
    const projects = this.getProjects();
    projects.unshift(project);
    safeSet(STORAGE_KEYS.PROJECTS, projects);
  },

  updateProject(updated: Project): void {
    const projects = this.getProjects().map(p => (p.id === updated.id ? updated : p));
    safeSet(STORAGE_KEYS.PROJECTS, projects);
  },

  // Tasks
  getTasks(): Task[] {
    return safeGet<Task[]>(STORAGE_KEYS.TASKS, INITIAL_TASKS);
  },

  getTasksByProject(projectId: string): Task[] {
    return this.getTasks().filter(t => t.projectId === projectId);
  },

  addTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    safeSet(STORAGE_KEYS.TASKS, tasks);
  },

  updateTaskStatus(taskId: string, status: TaskStatus): void {
    const tasks = this.getTasks().map(t => (t.id === taskId ? { ...t, status } : t));
    safeSet(STORAGE_KEYS.TASKS, tasks);
  },

  deleteTask(taskId: string): void {
    const tasks = this.getTasks().filter(t => t.id !== taskId);
    safeSet(STORAGE_KEYS.TASKS, tasks);
  },

  // Badges
  getBadges(): Badge[] {
    return safeGet<Badge[]>(STORAGE_KEYS.BADGES, INITIAL_BADGES);
  },

  unlockBadge(badgeId: string): void {
    const badges = this.getBadges().map(b => {
      if (b.id === badgeId) {
        return {
          ...b,
          unlocked: true,
          unlockedAt: 'Just now',
          progress: b.maxProgress
        };
      }
      return b;
    });
    safeSet(STORAGE_KEYS.BADGES, badges);
  },

  incrementBadgeProgress(badgeId: string, amount: number = 1): void {
    const badges = this.getBadges().map(b => {
      if (b.id === badgeId && !b.unlocked) {
        const newProgress = Math.min(b.maxProgress, b.progress + amount);
        const unlocked = newProgress >= b.maxProgress;
        return {
          ...b,
          progress: newProgress,
          unlocked,
          unlockedAt: unlocked ? 'Just now' : b.unlockedAt
        };
      }
      return b;
    });
    safeSet(STORAGE_KEYS.BADGES, badges);
  },

  // Notifications
  getNotifications(): Notification[] {
    return safeGet<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  },

  addNotification(notification: Notification): void {
    const notifs = this.getNotifications();
    notifs.unshift(notification);
    safeSet(STORAGE_KEYS.NOTIFICATIONS, notifs);
  },

  markNotificationAsRead(id: string): void {
    const notifs = this.getNotifications().map(n => (n.id === id ? { ...n, read: true } : n));
    safeSet(STORAGE_KEYS.NOTIFICATIONS, notifs);
  },

  markAllNotificationsAsRead(): void {
    const notifs = this.getNotifications().map(n => ({ ...n, read: true }));
    safeSet(STORAGE_KEYS.NOTIFICATIONS, notifs);
  },

  // Connections
  getConnections(): Connection[] {
    return safeGet<Connection[]>(STORAGE_KEYS.CONNECTIONS, INITIAL_CONNECTIONS);
  },

  addConnection(conn: Connection): void {
    const connections = this.getConnections();
    const existing = connections.find(
      c =>
        (c.userId === conn.userId && c.targetUserId === conn.targetUserId) ||
        (c.userId === conn.targetUserId && c.targetUserId === conn.userId)
    );
    if (!existing) {
      connections.push(conn);
      safeSet(STORAGE_KEYS.CONNECTIONS, connections);
    }
  },

  updateConnectionStatus(id: string, status: 'pending' | 'connected'): void {
    const conns = this.getConnections().map(c => (c.id === id ? { ...c, status } : c));
    safeSet(STORAGE_KEYS.CONNECTIONS, conns);
  },

  // Applications
  getApplications(): Application[] {
    return safeGet<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  },

  addApplication(app: Application): void {
    const apps = this.getApplications();
    apps.unshift(app);
    safeSet(STORAGE_KEYS.APPLICATIONS, apps);
  },

  updateApplicationStatus(id: string, status: 'accepted' | 'declined'): void {
    const apps = this.getApplications().map(a => (a.id === id ? { ...a, status } : a));
    safeSet(STORAGE_KEYS.APPLICATIONS, apps);
  },

  // Chat messages
  getChats(): ChatMessage[] {
    return safeGet<ChatMessage[]>(STORAGE_KEYS.CHATS, INITIAL_CHATS);
  },

  addChatMessage(msg: ChatMessage): void {
    const chats = this.getChats();
    chats.push(msg);
    safeSet(STORAGE_KEYS.CHATS, chats);
  },

  // Reset demo storage
  resetAll(): void {
    safeSet(STORAGE_KEYS.USERS, INITIAL_USERS);
    safeSet(STORAGE_KEYS.CURRENT_USER_ID, 'user-alex');
    safeSet(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    safeSet(STORAGE_KEYS.TASKS, INITIAL_TASKS);
    safeSet(STORAGE_KEYS.BADGES, INITIAL_BADGES);
    safeSet(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    safeSet(STORAGE_KEYS.CONNECTIONS, INITIAL_CONNECTIONS);
    safeSet(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    safeSet(STORAGE_KEYS.CHATS, INITIAL_CHATS);
  }
};
