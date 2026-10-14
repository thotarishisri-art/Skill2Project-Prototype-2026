import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Project,
  Task,
  Badge,
  Notification,
  Connection,
  Application,
  ChatMessage,
  TaskStatus,
  UserSkill,
  DesiredSkill
} from '../types';
import { StorageService } from '../services/storage';

interface ToastInfo {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'badge';
}

interface AppContextType {
  currentUser: User;
  allUsers: User[];
  projects: Project[];
  tasks: Task[];
  badges: Badge[];
  notifications: Notification[];
  connections: Connection[];
  applications: Application[];
  chats: ChatMessage[];
  unreadNotificationCount: number;
  activeToast: ToastInfo | null;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'badge') => void;
  hideToast: () => void;
  switchUser: (userId: string) => void;
  updateProfile: (updated: Partial<User>) => void;
  updateUserSkills: (skillsKnown: UserSkill[], skillsWanted: DesiredSkill[]) => void;
  createProject: (projectData: Partial<Project>) => Project;
  applyToProject: (projectId: string, roleTitle: string, pitch: string, learningGoals: string) => void;
  acceptApplication: (applicationId: string) => void;
  declineApplication: (applicationId: string) => void;
  addTask: (taskData: Omit<Task, 'id' | 'createdAt'>) => void;
  moveTask: (taskId: string, status: TaskStatus) => void;
  deleteTask: (taskId: string) => void;
  completeProject: (
    projectId: string,
    summary: string,
    githubUrl: string,
    demoUrl: string,
    skillsUsed: string[],
    endorsementBadge?: string,
    endorsementComment?: string
  ) => void;
  connectWithUser: (targetUserId: string) => void;
  sendChatMessage: (targetUserId: string, text: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize storage once
  useEffect(() => {
    StorageService.init();
  }, []);

  const [currentUser, setCurrentUserState] = useState<User>(() => {
    StorageService.init();
    return StorageService.getCurrentUser();
  });

  const [allUsers, setAllUsers] = useState<User[]>(() => StorageService.getUsers());
  const [projects, setProjects] = useState<Project[]>(() => StorageService.getProjects());
  const [tasks, setTasks] = useState<Task[]>(() => StorageService.getTasks());
  const [badges, setBadges] = useState<Badge[]>(() => StorageService.getBadges());
  const [notifications, setNotifications] = useState<Notification[]>(() => StorageService.getNotifications());
  const [connections, setConnections] = useState<Connection[]>(() => StorageService.getConnections());
  const [applications, setApplications] = useState<Application[]>(() => StorageService.getApplications());
  const [chats, setChats] = useState<ChatMessage[]>(() => StorageService.getChats());
  const [activeToast, setActiveToast] = useState<ToastInfo | null>(null);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'badge' = 'success') => {
    setActiveToast({
      id: Date.now().toString(),
      title,
      message,
      type
    });
    setTimeout(() => {
      setActiveToast(null);
    }, 4500);
  };

  const hideToast = () => setActiveToast(null);

  const reloadAll = () => {
    setAllUsers(StorageService.getUsers());
    setCurrentUserState(StorageService.getCurrentUser());
    setProjects(StorageService.getProjects());
    setTasks(StorageService.getTasks());
    setBadges(StorageService.getBadges());
    setNotifications(StorageService.getNotifications());
    setConnections(StorageService.getConnections());
    setApplications(StorageService.getApplications());
    setChats(StorageService.getChats());
  };

  const switchUser = (userId: string) => {
    StorageService.setCurrentUserId(userId);
    const user = StorageService.getUserById(userId);
    if (user) {
      setCurrentUserState(user);
      showToast('Switched Persona', `Now viewing Skill2Project as ${user.name} (${user.roleTitle})`, 'info');
    }
  };

  const updateProfile = (updatedData: Partial<User>) => {
    const updatedUser = { ...currentUser, ...updatedData };
    StorageService.updateUser(updatedUser);
    setCurrentUserState(updatedUser);
    setAllUsers(StorageService.getUsers());
    showToast('Profile Updated', 'Your student profile information has been saved.');
  };

  const updateUserSkills = (skillsKnown: UserSkill[], skillsWanted: DesiredSkill[]) => {
    const updatedUser = { ...currentUser, skillsKnown, skillsWanted };
    StorageService.updateUser(updatedUser);
    setCurrentUserState(updatedUser);
    setAllUsers(StorageService.getUsers());
    showToast('Skills Saved', 'Your skill preferences have been updated for smart matching.');
  };

  const createProject = (projectData: Partial<Project>): Project => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: projectData.title || 'Untitled Project',
      tagline: projectData.tagline || 'Student collaborative project',
      description: projectData.description || '',
      problemStatement: projectData.problemStatement || '',
      category: projectData.category || 'Web Development',
      difficulty: projectData.difficulty || 'Intermediate',
      teamSize: 1,
      maxTeamSize: projectData.maxTeamSize || 4,
      creatorId: currentUser.id,
      creatorName: currentUser.name,
      currentMembers: [
        {
          userId: currentUser.id,
          userName: currentUser.name,
          avatar: currentUser.avatar,
          role: 'Project Creator'
        }
      ],
      openRoles: projectData.openRoles || [],
      milestones: projectData.milestones || [
        { id: 'm-1', title: 'System Architecture & Setup', description: 'Initial kick-off', completed: false }
      ],
      durationWeeks: projectData.durationWeeks || 6,
      status: 'recruiting',
      requiredSkills: projectData.requiredSkills || [],
      githubUrl: projectData.githubUrl || '',
      demoUrl: projectData.demoUrl || '',
      figmaUrl: projectData.figmaUrl || '',
      announcements: [
        {
          id: `ann-${Date.now()}`,
          authorName: currentUser.name,
          avatar: currentUser.avatar,
          content: `Project created! Let's recruit great student teammates and build together.`,
          timestamp: 'Just now'
        }
      ]
    };

    StorageService.addProject(newProj);
    setProjects(StorageService.getProjects());

    // Trigger badge progress: Project Starter
    StorageService.unlockBadge('badge-project-starter');
    setBadges(StorageService.getBadges());

    // Dispatch notification
    const notif: Notification = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      title: 'Project Published! 🚀',
      message: `"${newProj.title}" is now open for students to discover and apply.`,
      type: 'badge',
      read: false,
      timestamp: 'Just now',
      link: `/projects/${newProj.id}`
    };
    StorageService.addNotification(notif);
    setNotifications(StorageService.getNotifications());

    showToast('Project Created!', `"${newProj.title}" is now live in the Project Hub.`, 'success');
    return newProj;
  };

  const applyToProject = (projectId: string, roleTitle: string, pitch: string, learningGoals: string) => {
    const project = StorageService.getProjectById(projectId);
    if (!project) return;

    const newApp: Application = {
      id: `app-${Date.now()}`,
      projectId,
      projectTitle: project.title,
      applicantId: currentUser.id,
      applicantName: currentUser.name,
      applicantAvatar: currentUser.avatar,
      applicantCollege: currentUser.college,
      roleTitle,
      pitch,
      learningGoals,
      status: 'pending',
      createdAt: 'Today'
    };

    StorageService.addApplication(newApp);
    setApplications(StorageService.getApplications());

    // Notify project creator
    const notif: Notification = {
      id: `notif-${Date.now()}`,
      userId: project.creatorId,
      title: 'New Team Application! 📩',
      message: `${currentUser.name} applied for "${roleTitle}" in "${project.title}".`,
      type: 'application',
      read: false,
      timestamp: 'Just now',
      link: `/projects/${projectId}`
    };
    StorageService.addNotification(notif);
    setNotifications(StorageService.getNotifications());

    showToast('Application Submitted!', `Your pitch for "${roleTitle}" was sent to ${project.creatorName}.`);
  };

  const acceptApplication = (applicationId: string) => {
    const app = StorageService.getApplications().find(a => a.id === applicationId);
    if (!app) return;

    StorageService.updateApplicationStatus(applicationId, 'accepted');

    // Add applicant to project members
    const project = StorageService.getProjectById(app.projectId);
    if (project) {
      const alreadyMember = project.currentMembers.some(m => m.userId === app.applicantId);
      if (!alreadyMember) {
        const updatedMembers = [
          ...project.currentMembers,
          {
            userId: app.applicantId,
            userName: app.applicantName,
            avatar: app.applicantAvatar,
            role: app.roleTitle
          }
        ];
        // Mark role filled
        const updatedOpenRoles = project.openRoles.map(r =>
          r.title === app.roleTitle ? { ...r, filled: true, assignedUserId: app.applicantId, assignedUserName: app.applicantName } : r
        );

        const updatedProject: Project = {
          ...project,
          currentMembers: updatedMembers,
          openRoles: updatedOpenRoles,
          teamSize: updatedMembers.length,
          status: 'in_progress'
        };
        StorageService.updateProject(updatedProject);
      }
    }

    // Auto-connect students
    StorageService.addConnection({
      id: `conn-${Date.now()}`,
      userId: currentUser.id,
      targetUserId: app.applicantId,
      status: 'connected',
      initiatedBy: currentUser.id,
      lastMessage: `Welcome to the team!`,
      lastMessageTime: 'Just now'
    });

    // Notify applicant
    StorageService.addNotification({
      id: `notif-${Date.now()}`,
      userId: app.applicantId,
      title: 'Application Accepted! 🎉',
      message: `You are now a team member of "${app.projectTitle}". Let's start building!`,
      type: 'accepted',
      read: false,
      timestamp: 'Just now',
      link: `/workspace/${app.projectId}`
    });

    reloadAll();
    showToast('Teammate Accepted!', `${app.applicantName} has joined "${app.projectTitle}".`);
  };

  const declineApplication = (applicationId: string) => {
    StorageService.updateApplicationStatus(applicationId, 'declined');
    setApplications(StorageService.getApplications());
    showToast('Application Declined', 'The application was declined.', 'info');
  };

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    StorageService.addTask(newTask);
    setTasks(StorageService.getTasks());

    // Notify assignee if not current user
    if (newTask.assigneeId !== currentUser.id) {
      StorageService.addNotification({
        id: `notif-${Date.now()}`,
        userId: newTask.assigneeId,
        title: 'New Task Assigned 📌',
        message: `${currentUser.name} assigned you: "${newTask.title}"`,
        type: 'task',
        read: false,
        timestamp: 'Just now',
        link: `/workspace/${newTask.projectId}/tasks`
      });
      setNotifications(StorageService.getNotifications());
    }

    showToast('Task Created', `"${newTask.title}" added to Kanban board.`);
  };

  const moveTask = (taskId: string, status: TaskStatus) => {
    StorageService.updateTaskStatus(taskId, status);
    setTasks(StorageService.getTasks());

    if (status === 'completed') {
      StorageService.incrementBadgeProgress('badge-sprint-finisher', 1);
      setBadges(StorageService.getBadges());
      showToast('Task Completed! 🎯', 'Great progress! Task moved to Completed.');
    }
  };

  const deleteTask = (taskId: string) => {
    StorageService.deleteTask(taskId);
    setTasks(StorageService.getTasks());
    showToast('Task Deleted', 'The task has been removed.');
  };

  const completeProject = (
    projectId: string,
    summary: string,
    githubUrl: string,
    demoUrl: string,
    skillsUsed: string[],
    endorsementBadge?: string,
    endorsementComment?: string
  ) => {
    const project = StorageService.getProjectById(projectId);
    if (!project) return;

    const endorsements = project.peerEndorsements ? [...project.peerEndorsements] : [];
    if (endorsementBadge && endorsementComment) {
      // Find other members
      const otherMembers = project.currentMembers.filter(m => m.userId !== currentUser.id);
      otherMembers.forEach(m => {
        endorsements.push({
          fromUserId: currentUser.id,
          fromUserName: currentUser.name,
          fromUserAvatar: currentUser.avatar,
          toUserId: m.userId,
          badge: endorsementBadge,
          comment: endorsementComment,
          createdAt: 'Just now'
        });
      });
    }

    const updatedProject: Project = {
      ...project,
      status: 'completed',
      finalSummary: summary || 'Successfully completed sprint milestones and shipped live prototype.',
      githubUrl: githubUrl || project.githubUrl,
      demoUrl: demoUrl || project.demoUrl,
      skillsUsed: skillsUsed.length > 0 ? skillsUsed : project.requiredSkills,
      peerEndorsements: endorsements,
      milestones: project.milestones.map(m => ({ ...m, completed: true }))
    };

    StorageService.updateProject(updatedProject);

    // Update user stats
    const updatedUser = {
      ...currentUser,
      completedProjectsCount: currentUser.completedProjectsCount + 1,
      endorsementsCount: currentUser.endorsementsCount + (endorsementBadge ? 1 : 0)
    };
    StorageService.updateUser(updatedUser);

    // Unlock badges
    StorageService.unlockBadge('badge-team-player');
    StorageService.unlockBadge('badge-project-finisher');
    StorageService.unlockBadge('badge-skill-exchanger');

    // Notify all team members
    project.currentMembers.forEach(member => {
      StorageService.addNotification({
        id: `notif-${Date.now()}-${member.userId}`,
        userId: member.userId,
        title: 'Project Completed & Added to Portfolio! 🏆',
        message: `"${project.title}" has graduated! Check your public portfolio for verified proof-of-work.`,
        type: 'completion',
        read: false,
        timestamp: 'Just now',
        link: '/portfolio'
      });
    });

    reloadAll();
    showToast('Project Completed! 🏆', `"${project.title}" added to your portfolio! Badges unlocked!`, 'badge');
  };

  const connectWithUser = (targetUserId: string) => {
    const target = StorageService.getUserById(targetUserId);
    if (!target) return;

    StorageService.addConnection({
      id: `conn-${Date.now()}`,
      userId: currentUser.id,
      targetUserId,
      status: 'connected',
      initiatedBy: currentUser.id,
      lastMessage: 'Connected on Skill2Project',
      lastMessageTime: 'Just now'
    });

    // Unlock First Connection badge
    StorageService.unlockBadge('badge-first-connection');

    // Notify target
    StorageService.addNotification({
      id: `notif-${Date.now()}`,
      userId: targetUserId,
      title: 'New Peer Connection! 🤝',
      message: `${currentUser.name} connected with you. You can now chat and team up!`,
      type: 'accepted',
      read: false,
      timestamp: 'Just now',
      link: '/connections'
    });

    reloadAll();
    showToast('Connected!', `You are now connected with ${target.name}.`, 'success');
  };

  const sendChatMessage = (targetUserId: string, text: string) => {
    const connectionsList = StorageService.getConnections();
    const conn = connectionsList.find(
      c =>
        (c.userId === currentUser.id && c.targetUserId === targetUserId) ||
        (c.userId === targetUserId && c.targetUserId === currentUser.id)
    );

    const connectionId = conn ? conn.id : `conn-${Date.now()}`;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      connectionId,
      senderId: currentUser.id,
      receiverId: targetUserId,
      text,
      timestamp: 'Just now'
    };

    StorageService.addChatMessage(newMsg);
    setChats(StorageService.getChats());

    // Update connection last message
    if (conn) {
      const updatedConns = connectionsList.map(c =>
        c.id === conn.id ? { ...c, lastMessage: text, lastMessageTime: 'Just now' } : c
      );
      localStorage.setItem('s2p_connections', JSON.stringify(updatedConns));
      setConnections(updatedConns);
    }
  };

  const markNotificationRead = (id: string) => {
    StorageService.markNotificationAsRead(id);
    setNotifications(StorageService.getNotifications());
  };

  const markAllNotificationsRead = () => {
    StorageService.markAllNotificationsAsRead();
    setNotifications(StorageService.getNotifications());
    showToast('Notifications Cleared', 'All notifications marked as read.');
  };

  const resetDemoData = () => {
    StorageService.resetAll();
    reloadAll();
    showToast('Data Reset', 'All demo data restored to initial state.');
  };

  const unreadNotificationCount = notifications.filter(n => n.userId === currentUser.id && !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        allUsers,
        projects,
        tasks,
        badges,
        notifications,
        connections,
        applications,
        chats,
        unreadNotificationCount,
        activeToast,
        showToast,
        hideToast,
        switchUser,
        updateProfile,
        updateUserSkills,
        createProject,
        applyToProject,
        acceptApplication,
        declineApplication,
        addTask,
        moveTask,
        deleteTask,
        completeProject,
        connectWithUser,
        sendChatMessage,
        markNotificationRead,
        markAllNotificationsRead,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
