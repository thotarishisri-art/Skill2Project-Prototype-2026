import { User, Project, Task, Badge, Notification, Connection, Application, ChatMessage, SkillCategory } from '../types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Web Development',
    skills: ['React', 'Node.js', 'Tailwind CSS', 'TypeScript', 'Next.js', 'HTML/CSS', 'Express.js', 'Vue.js']
  },
  {
    name: 'Mobile Development',
    skills: ['Flutter', 'Dart', 'React Native', 'Kotlin', 'Swift', 'Android Studio']
  },
  {
    name: 'AI / ML',
    skills: ['Python', 'FastAPI', 'AI/ML', 'PyTorch', 'TensorFlow', 'Computer Vision', 'LangChain', 'NLP']
  },
  {
    name: 'Data',
    skills: ['SQL', 'PostgreSQL', 'MongoDB', 'Data Analysis', 'Pandas', 'Power BI']
  },
  {
    name: 'Cloud / DevOps',
    skills: ['Cloud', 'Firebase', 'AWS', 'Docker', 'CI/CD', 'Linux', 'Kubernetes']
  },
  {
    name: 'UI/UX',
    skills: ['UI/UX', 'Figma', 'Graphic Design', 'Design Systems', 'User Research', 'Wireframing']
  },
  {
    name: 'Business',
    skills: ['Product Management', 'Public Speaking', 'Agile/Scrum', 'Pitch Deck Design', 'Market Research']
  },
  {
    name: 'Marketing',
    skills: ['Marketing', 'Video Editing', 'Social Media', 'Content Writing', 'SEO']
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'user-alex',
    name: 'Alex Rivera',
    email: 'alex@stanford.edu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    roleTitle: 'Frontend Developer & UI Enthusiast',
    college: 'Stanford University',
    department: 'Computer Science',
    year: '3rd Year',
    bio: 'Passionate about crafting pixel-perfect, accessible web apps with React & Tailwind. Looking to team up with backend devs to level up my full-stack skills and build real SaaS products.',
    skillsKnown: [
      { name: 'React', category: 'Web Development', level: 'Advanced' },
      { name: 'Tailwind CSS', category: 'Web Development', level: 'Advanced' },
      { name: 'TypeScript', category: 'Web Development', level: 'Intermediate' },
      { name: 'HTML/CSS', category: 'Web Development', level: 'Advanced' }
    ],
    skillsWanted: [
      { name: 'Node.js', category: 'Web Development', priority: 'High' },
      { name: 'Backend', category: 'Web Development', priority: 'High' },
      { name: 'SQL', category: 'Data', priority: 'Medium' }
    ],
    githubUrl: 'https://github.com/alexrivera-dev',
    linkedinUrl: 'https://linkedin.com/in/alexrivera-cs',
    portfolioUrl: 'https://alexrivera.dev',
    completedProjectsCount: 2,
    endorsementsCount: 8
  },
  {
    id: 'user-priya',
    name: 'Priya Sharma',
    email: 'priya@state.edu',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    roleTitle: 'AI/ML & Backend Specialist',
    college: 'State Tech Institute',
    department: 'Artificial Intelligence & Data',
    year: '3rd Year',
    bio: 'Heavy Python user building scalable APIs with FastAPI and machine learning pipelines. Eager to master modern frontend tools like React so I can build complete, beautiful interfaces for my AI models.',
    skillsKnown: [
      { name: 'Python', category: 'AI / ML', level: 'Advanced' },
      { name: 'FastAPI', category: 'AI / ML', level: 'Advanced' },
      { name: 'AI/ML', category: 'AI / ML', level: 'Advanced' },
      { name: 'SQL', category: 'Data', level: 'Intermediate' }
    ],
    skillsWanted: [
      { name: 'React', category: 'Web Development', priority: 'High' },
      { name: 'UI/UX', category: 'UI/UX', priority: 'Medium' }
    ],
    githubUrl: 'https://github.com/priyasharma-ai',
    linkedinUrl: 'https://linkedin.com/in/priya-sharma-tech',
    portfolioUrl: 'https://priyasharma.ai',
    completedProjectsCount: 3,
    endorsementsCount: 12
  },
  {
    id: 'user-sam',
    name: 'Sam Chen',
    email: 'sam@berkeley.edu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    roleTitle: 'Product & UI/UX Designer',
    college: 'UC Berkeley',
    department: 'Human-Computer Interaction',
    year: '2nd Year',
    bio: 'Obsessed with micro-interactions, clean design systems, and user empathy in Figma. Want to learn frontend coding so my designs translate seamlessly into code.',
    skillsKnown: [
      { name: 'Figma', category: 'UI/UX', level: 'Advanced' },
      { name: 'UI/UX', category: 'UI/UX', level: 'Advanced' },
      { name: 'Graphic Design', category: 'UI/UX', level: 'Intermediate' }
    ],
    skillsWanted: [
      { name: 'Frontend', category: 'Web Development', priority: 'High' },
      { name: 'Design Systems', category: 'UI/UX', priority: 'High' },
      { name: 'React', category: 'Web Development', priority: 'Medium' }
    ],
    githubUrl: 'https://github.com/samchendesign',
    linkedinUrl: 'https://linkedin.com/in/samchendesign',
    portfolioUrl: 'https://samchen.design',
    completedProjectsCount: 1,
    endorsementsCount: 6
  },
  {
    id: 'user-marcus',
    name: 'Marcus Vance',
    email: 'marcus@gatech.edu',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    roleTitle: 'Cross-Platform Mobile Engineer',
    college: 'Georgia Tech',
    department: 'Software Engineering',
    year: '4th Year',
    bio: 'Building smooth 60fps mobile experiences using Flutter & Dart. Currently seeking cloud and DevOps teammates to deploy scalable backend microservices.',
    skillsKnown: [
      { name: 'Flutter', category: 'Mobile Development', level: 'Advanced' },
      { name: 'Dart', category: 'Mobile Development', level: 'Advanced' },
      { name: 'Firebase', category: 'Cloud / DevOps', level: 'Intermediate' }
    ],
    skillsWanted: [
      { name: 'Cloud', category: 'Cloud / DevOps', priority: 'High' },
      { name: 'Docker', category: 'Cloud / DevOps', priority: 'Medium' },
      { name: 'Node.js', category: 'Web Development', priority: 'Medium' }
    ],
    githubUrl: 'https://github.com/marcusvance-dev',
    linkedinUrl: 'https://linkedin.com/in/marcus-vance-flutter',
    portfolioUrl: 'https://marcusvance.app',
    completedProjectsCount: 4,
    endorsementsCount: 15
  },
  {
    id: 'user-riya',
    name: 'Riya Patel',
    email: 'riya@mit.edu',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    roleTitle: 'Enterprise & Cloud Backend Developer',
    college: 'MIT',
    department: 'Computer Science & Eng',
    year: '3rd Year',
    bio: 'Java and Spring Boot practitioner with strong distributed database expertise. Transitioning into product leadership and agile squad building.',
    skillsKnown: [
      { name: 'Java', category: 'Web Development', level: 'Advanced' },
      { name: 'Spring Boot', category: 'Web Development', level: 'Advanced' },
      { name: 'SQL', category: 'Data', level: 'Advanced' },
      { name: 'Cloud', category: 'Cloud / DevOps', level: 'Intermediate' }
    ],
    skillsWanted: [
      { name: 'Product Management', category: 'Business', priority: 'High' },
      { name: 'UI/UX', category: 'UI/UX', priority: 'Medium' }
    ],
    githubUrl: 'https://github.com/riyapatel-cloud',
    linkedinUrl: 'https://linkedin.com/in/riyapatel-swe',
    portfolioUrl: 'https://riyapatel.tech',
    completedProjectsCount: 2,
    endorsementsCount: 9
  },
  {
    id: 'user-rahul',
    name: 'Rahul Verma',
    email: 'rahul@nyu.edu',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    roleTitle: 'Systems & Cyber Security Analyst',
    college: 'New York University',
    department: 'Information Systems',
    year: '3rd Year',
    bio: 'Cybersecurity fanatic, API security tester, and Python scripting specialist. Looking to learn mobile development to build secure student utility apps.',
    skillsKnown: [
      { name: 'Python', category: 'AI / ML', level: 'Advanced' },
      { name: 'SQL', category: 'Data', level: 'Intermediate' },
      { name: 'Cloud', category: 'Cloud / DevOps', level: 'Intermediate' }
    ],
    skillsWanted: [
      { name: 'Flutter', category: 'Mobile Development', priority: 'High' },
      { name: 'Mobile Development', category: 'Mobile Development', priority: 'High' }
    ],
    githubUrl: 'https://github.com/rahulverma-sec',
    linkedinUrl: 'https://linkedin.com/in/rahul-verma-sys',
    portfolioUrl: 'https://rahulverma.dev',
    completedProjectsCount: 1,
    endorsementsCount: 5
  },
  {
    id: 'user-ananya',
    name: 'Ananya Gupta',
    email: 'ananya@cmu.edu',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    roleTitle: 'Full-Stack Developer & Pitch Strategist',
    college: 'Carnegie Mellon University',
    department: 'Business & Tech',
    year: '4th Year',
    bio: 'Blending software engineering with student venture acceleration. Building React web applications while delivering compelling startup pitches.',
    skillsKnown: [
      { name: 'React', category: 'Web Development', level: 'Advanced' },
      { name: 'Public Speaking', category: 'Business', level: 'Advanced' },
      { name: 'Marketing', category: 'Marketing', level: 'Intermediate' }
    ],
    skillsWanted: [
      { name: 'AI/ML', category: 'AI / ML', priority: 'High' },
      { name: 'Data', category: 'Data', priority: 'Medium' }
    ],
    githubUrl: 'https://github.com/ananyag-cmu',
    linkedinUrl: 'https://linkedin.com/in/ananyagupta-ventures',
    portfolioUrl: 'https://ananyagupta.com',
    completedProjectsCount: 3,
    endorsementsCount: 11
  },
  {
    id: 'user-sneha',
    name: 'Sneha Kulkarni',
    email: 'sneha@utexas.edu',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    roleTitle: 'Data Storyteller & Media Creator',
    college: 'UT Austin',
    department: 'Data Science & Media',
    year: '2nd Year',
    bio: 'Transforming complex datasets into visual narratives. Combining Python, SQL, and motion design to explain tech products clearly.',
    skillsKnown: [
      { name: 'SQL', category: 'Data', level: 'Advanced' },
      { name: 'Python', category: 'AI / ML', level: 'Intermediate' },
      { name: 'Video Editing', category: 'Marketing', level: 'Advanced' }
    ],
    skillsWanted: [
      { name: 'Node.js', category: 'Web Development', priority: 'High' },
      { name: 'Web Development', category: 'Web Development', priority: 'High' }
    ],
    githubUrl: 'https://github.com/snehak-data',
    linkedinUrl: 'https://linkedin.com/in/sneha-kulkarni-data',
    portfolioUrl: 'https://snehakulkarni.me',
    completedProjectsCount: 2,
    endorsementsCount: 7
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-campus-events',
    title: 'Campus Event Management App',
    tagline: 'All-in-one ticketing, RSVP, and discovery hub for college clubs and student fests',
    description: 'A modern web and mobile platform for university organizations to manage student events, issue cryptographic QR passes, send real-time campus notifications, and gather post-event student ratings.',
    problemStatement: 'Campus clubs currently use fragmented tools (Google Forms, Instagram DMs, paper tickets) leading to chaotic check-ins, forgotten deadlines, and zero aggregated attendance analytics.',
    category: 'Web Development',
    difficulty: 'Intermediate',
    teamSize: 2,
    maxTeamSize: 4,
    creatorId: 'user-alex',
    creatorName: 'Alex Rivera',
    currentMembers: [
      {
        userId: 'user-alex',
        userName: 'Alex Rivera',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        role: 'Frontend Lead & Project Creator'
      },
      {
        userId: 'user-sam',
        userName: 'Sam Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        role: 'UI/UX Designer'
      }
    ],
    openRoles: [
      {
        id: 'role-1',
        title: 'Backend Engineer',
        skillsRequired: ['Python', 'FastAPI', 'SQL'],
        filled: false
      },
      {
        id: 'role-2',
        title: 'DevOps / Cloud Deployer',
        skillsRequired: ['Cloud', 'Docker'],
        filled: false
      }
    ],
    milestones: [
      { id: 'm-1', title: 'System Architecture & Wireframes', description: 'Finalize Figma design system and ERD diagram', completed: true },
      { id: 'm-2', title: 'Authentication & Event Feed API', description: 'Campus email JWT auth and public events catalogue', completed: true },
      { id: 'm-3', title: 'QR Pass Generator & Scanner', description: 'One-time scan validation for fast check-in queueing', completed: false },
      { id: 'm-4', title: 'Deployment & User Testing with 3 Clubs', description: 'Live beta release on custom domain', completed: false }
    ],
    durationWeeks: 6,
    status: 'in_progress',
    requiredSkills: ['React', 'Python', 'FastAPI', 'Figma', 'SQL'],
    githubUrl: 'https://github.com/skill2project/campus-event-hub',
    demoUrl: 'https://campus-events-demo.vercel.app',
    figmaUrl: 'https://figma.com/@skill2project/campus-events',
    announcements: [
      {
        id: 'ann-1',
        authorName: 'Alex Rivera',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        content: 'Welcome team! Sprint 2 is underway. We have completed the event feed UI and are connecting the FastAPI endpoints this week.',
        timestamp: '2 hours ago'
      }
    ],
    skillsUsed: ['React', 'Tailwind CSS', 'TypeScript', 'FastAPI', 'Figma'],
    peerEndorsements: []
  },
  {
    id: 'proj-expense-tracker',
    title: 'Student Expense Tracker & Splitter',
    tagline: 'Effortless roommate bill splitting, grocery budgeting, and campus dining tracker',
    description: 'Designed specifically for college dorms and student apartments. Automatically categorizes shared receipts using OCR, syncs balances in real-time, and integrates zero-fee student payment deep links.',
    problemStatement: 'Roommates constantly argue over groceries, Wi-Fi bills, and utilities. Existing apps charge fees, require phone numbers, or lack flexible recurring dorm expenses.',
    category: 'Mobile Development',
    difficulty: 'Beginner',
    teamSize: 2,
    maxTeamSize: 3,
    creatorId: 'user-marcus',
    creatorName: 'Marcus Vance',
    currentMembers: [
      {
        userId: 'user-marcus',
        userName: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
        role: 'Mobile Lead'
      },
      {
        userId: 'user-sam',
        userName: 'Sam Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        role: 'UI/UX Designer'
      }
    ],
    openRoles: [
      {
        id: 'role-exp-1',
        title: 'Backend & Cloud Engineer',
        skillsRequired: ['Firebase', 'Cloud', 'SQL'],
        filled: false
      }
    ],
    milestones: [
      { id: 'm-exp-1', title: 'Flutter Screens & Offline Sync', description: 'Local SQLite cache and clean material navigation', completed: true },
      { id: 'm-exp-2', title: 'Real-time Group Balances', description: 'Multi-currency algorithm and automated receipt split', completed: true },
      { id: 'm-exp-3', title: 'Export & Notification Alerts', description: 'Push notification for monthly rent dues', completed: false }
    ],
    durationWeeks: 4,
    status: 'in_progress',
    requiredSkills: ['Flutter', 'Dart', 'Firebase', 'Figma'],
    githubUrl: 'https://github.com/skill2project/student-split',
    figmaUrl: 'https://figma.com/@skill2project/dorm-split',
    skillsUsed: ['Flutter', 'Dart', 'Firebase']
  },
  {
    id: 'proj-ai-study-assistant',
    title: 'AI Study Assistant & Note Summarizer',
    tagline: 'Upload lecture slides or audio and get interactive flashcards and quiz simulations',
    description: 'Transforms multi-hour university lecture PDFs and audio recordings into digestible markdown cheat sheets, concept maps, and smart spaced-repetition flashcards using LLM orchestration.',
    problemStatement: 'College students spend over 60% of study time re-transcribing slides rather than active recall and solving practice exam problems.',
    category: 'AI / ML',
    difficulty: 'Advanced',
    teamSize: 1,
    maxTeamSize: 3,
    creatorId: 'user-priya',
    creatorName: 'Priya Sharma',
    currentMembers: [
      {
        userId: 'user-priya',
        userName: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
        role: 'AI / Backend Lead'
      }
    ],
    openRoles: [
      {
        id: 'role-ai-1',
        title: 'Frontend React Engineer',
        skillsRequired: ['React', 'Tailwind CSS', 'TypeScript'],
        filled: false
      },
      {
        id: 'role-ai-2',
        title: 'UI/UX Interactive Designer',
        skillsRequired: ['Figma', 'UI/UX'],
        filled: false
      }
    ],
    milestones: [
      { id: 'm-ai-1', title: 'RAG Pipeline & Embeddings', description: 'PDF text extraction and vector chunking with LangChain', completed: true },
      { id: 'm-ai-2', title: 'Flashcard API & Quiz Engine', description: 'FastAPI endpoints for question-generation', completed: false },
      { id: 'm-ai-3', title: 'Interactive Web Dashboard', description: 'React markdown viewer with study streak tracker', completed: false }
    ],
    durationWeeks: 8,
    status: 'recruiting',
    requiredSkills: ['Python', 'FastAPI', 'AI/ML', 'React'],
    githubUrl: 'https://github.com/skill2project/ai-study-assistant',
    skillsUsed: ['Python', 'FastAPI', 'AI/ML']
  },
  {
    id: 'proj-lost-and-found',
    title: 'College Lost & Found Portal',
    tagline: 'Image-recognition enabled campus repository for lost student IDs, keys, and devices',
    description: 'A trusted student-verified community board where found items can be photographed, auto-tagged with visual AI, and safely returned via dean/library pickup spots.',
    problemStatement: 'Lost student property is scattered across dozens of unmoderated WhatsApp chats, unofficial Reddit threads, and departmental front desks.',
    category: 'Web Development',
    difficulty: 'Beginner',
    teamSize: 1,
    maxTeamSize: 3,
    creatorId: 'user-rahul',
    creatorName: 'Rahul Verma',
    currentMembers: [
      {
        userId: 'user-rahul',
        userName: 'Rahul Verma',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
        role: 'Backend & Security Lead'
      }
    ],
    openRoles: [
      {
        id: 'role-lost-1',
        title: 'Frontend Developer',
        skillsRequired: ['React', 'Tailwind CSS'],
        filled: false
      },
      {
        id: 'role-lost-2',
        title: 'UI Designer',
        skillsRequired: ['Figma', 'UI/UX'],
        filled: false
      }
    ],
    milestones: [
      { id: 'm-lf-1', title: 'Database schema & Item categories', description: 'Define secure user claim verification protocol', completed: true },
      { id: 'm-lf-2', title: 'Image Upload & Feed UI', description: 'Tagging and campus location filters', completed: false }
    ],
    durationWeeks: 4,
    status: 'recruiting',
    requiredSkills: ['Python', 'React', 'SQL', 'UI/UX'],
    githubUrl: 'https://github.com/skill2project/campus-lost-found'
  },
  {
    id: 'proj-smart-attendance',
    title: 'Smart Attendance System with QR & Geo',
    tagline: 'Frictionless, proxy-proof lecture attendance with geo-fenced dynamic QR codes',
    description: 'Replaces slow paper sign-in sheets with rolling 5-second dynamic QR codes projected in class that validate student Wi-Fi BSSID and GPS proximity before logging attendance.',
    problemStatement: 'Professors waste 10-15 minutes of every 50-minute college lecture calling roll, while proxies and forged signatures corrupt course participation grading.',
    category: 'Cloud / DevOps',
    difficulty: 'Intermediate',
    teamSize: 3,
    maxTeamSize: 3,
    creatorId: 'user-riya',
    creatorName: 'Riya Patel',
    currentMembers: [
      {
        userId: 'user-riya',
        userName: 'Riya Patel',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
        role: 'Cloud Architect'
      },
      {
        userId: 'user-alex',
        userName: 'Alex Rivera',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        role: 'Frontend Engineer'
      },
      {
        userId: 'user-rahul',
        userName: 'Rahul Verma',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
        role: 'Security Engineer'
      }
    ],
    openRoles: [],
    milestones: [
      { id: 'm-att-1', title: 'Dynamic QR Token Generation', description: 'Rotating cryptographically signed payload', completed: true },
      { id: 'm-att-2', title: 'Geo-fence verification logic', description: 'GPS & Campus Wi-Fi subnet check', completed: true },
      { id: 'm-att-3', title: 'Instructor Analytics Dashboard', description: 'Weekly attendance report and automated risk alerts', completed: true }
    ],
    durationWeeks: 6,
    status: 'completed',
    requiredSkills: ['Java', 'Spring Boot', 'React', 'Cloud', 'SQL'],
    githubUrl: 'https://github.com/skill2project/smart-attendance-system',
    demoUrl: 'https://smart-attendance.demo.college',
    skillsUsed: ['Java', 'Spring Boot', 'React', 'Cloud', 'SQL'],
    finalSummary: 'Successfully piloted across 4 Computer Science classes with 220+ enrolled students. Reduced roll call duration from 12 minutes to under 45 seconds.',
    peerEndorsements: [
      {
        fromUserId: 'user-riya',
        fromUserName: 'Riya Patel',
        fromUserAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
        toUserId: 'user-alex',
        badge: 'Fast Debugger',
        comment: 'Alex built the live scanner UI in less than a week with stellar responsiveness on mobile screens!',
        createdAt: '2 weeks ago'
      }
    ]
  },
  {
    id: 'proj-skill-marketplace',
    title: 'Student Skill Marketplace',
    tagline: 'Peer-to-peer tutoring, code review, and portfolio exchange platform',
    description: 'A micro-mentorship exchange where students trade hours of tutoring (e.g., Python tutoring in exchange for design reviews) using a zero-dollar karma credit system.',
    problemStatement: 'Students often cannot afford expensive private tutors or professional bootcamps, yet campus has thousands of knowledgeable peers eager to barter knowledge.',
    category: 'Web Development',
    difficulty: 'Intermediate',
    teamSize: 3,
    maxTeamSize: 3,
    creatorId: 'user-ananya',
    creatorName: 'Ananya Gupta',
    currentMembers: [
      {
        userId: 'user-ananya',
        userName: 'Ananya Gupta',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
        role: 'Product Lead & Developer'
      },
      {
        userId: 'user-alex',
        userName: 'Alex Rivera',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        role: 'Frontend Engineer'
      },
      {
        userId: 'user-sam',
        userName: 'Sam Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        role: 'UI/UX Designer'
      }
    ],
    openRoles: [],
    milestones: [
      { id: 'm-mkt-1', title: 'Karma Credit Ledger', description: 'Double-entry ledger for peer teaching hours', completed: true },
      { id: 'm-mkt-2', title: 'Video Call Booking Calendar', description: 'Schedule review sessions with Google Meet link', completed: true },
      { id: 'm-mkt-3', title: 'Reputation & Review Badges', description: 'Peer rating system with verified proof of help', completed: true }
    ],
    durationWeeks: 6,
    status: 'completed',
    requiredSkills: ['React', 'Node.js', 'Figma', 'Public Speaking'],
    githubUrl: 'https://github.com/skill2project/student-marketplace',
    demoUrl: 'https://skill-swap.demo.app',
    skillsUsed: ['React', 'Tailwind CSS', 'Figma', 'Node.js'],
    finalSummary: 'Launched as an official pilot during Hackathon 2026. 140 students exchanged over 320 hours of peer tutoring across 18 academic subjects.',
    peerEndorsements: [
      {
        fromUserId: 'user-ananya',
        fromUserName: 'Ananya Gupta',
        fromUserAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
        toUserId: 'user-alex',
        badge: 'Team Synergist',
        comment: 'Brilliant collaboration! Alex ensured our UI was sleek, accessible, and ready ahead of pitch deadline.',
        createdAt: '1 month ago'
      }
    ]
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    projectId: 'proj-campus-events',
    title: 'Setup Authentication & JWT Middleware',
    description: 'Implement token-based auth with refresh token rotation and campus email domain restriction.',
    assigneeId: 'user-alex',
    assigneeName: 'Alex Rivera',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    priority: 'High',
    status: 'completed',
    dueDate: 'Oct 10, 2026',
    createdAt: '2026-10-01'
  },
  {
    id: 'task-2',
    projectId: 'proj-campus-events',
    title: 'Design Responsive Event Discovery Grid',
    description: 'Build modern filter tags (Fest, Workshop, Hackathon) and search input with responsive cards.',
    assigneeId: 'user-alex',
    assigneeName: 'Alex Rivera',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    priority: 'Medium',
    status: 'in_progress',
    dueDate: 'Oct 14, 2026',
    createdAt: '2026-10-02'
  },
  {
    id: 'task-3',
    projectId: 'proj-campus-events',
    title: 'Implement QR Code Ticket Generation Service',
    description: 'Generate dynamic cryptographic QR codes for ticket validation at door check-in.',
    assigneeId: 'user-sam',
    assigneeName: 'Sam Chen',
    assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    priority: 'High',
    status: 'todo',
    dueDate: 'Oct 18, 2026',
    createdAt: '2026-10-03'
  },
  {
    id: 'task-4',
    projectId: 'proj-campus-events',
    title: 'Design Empty States & Ticket Download Modal',
    description: 'Ensure smooth modal popup with one-click Apple/Google Wallet or PDF ticket download.',
    assigneeId: 'user-sam',
    assigneeName: 'Sam Chen',
    assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    priority: 'Low',
    status: 'review',
    dueDate: 'Oct 16, 2026',
    createdAt: '2026-10-03'
  },
  {
    id: 'task-5',
    projectId: 'proj-campus-events',
    title: 'Setup Database Schema for RSVP & Waitlist',
    description: 'Design PostgreSQL relational schema for club managers, event dates, and ticket queues.',
    assigneeId: 'user-alex',
    assigneeName: 'Alex Rivera',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    priority: 'High',
    status: 'completed',
    dueDate: 'Oct 08, 2026',
    createdAt: '2026-10-01'
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-first-connection',
    title: 'First Connection',
    description: 'Connected with your first peer collaborator on campus.',
    iconName: 'Users',
    category: 'Collaboration',
    unlocked: true,
    unlockedAt: 'Oct 02, 2026',
    progress: 1,
    maxProgress: 1
  },
  {
    id: 'badge-project-starter',
    title: 'Project Starter',
    description: 'Initiated a brand new student project and defined open roles.',
    iconName: 'Rocket',
    category: 'Leadership',
    unlocked: true,
    unlockedAt: 'Oct 03, 2026',
    progress: 1,
    maxProgress: 1
  },
  {
    id: 'badge-team-player',
    title: 'Team Player',
    description: 'Actively collaborated with peers and closed milestone deliverables.',
    iconName: 'Handshake',
    category: 'Collaboration',
    unlocked: true,
    unlockedAt: 'Sep 28, 2026',
    progress: 3,
    maxProgress: 3
  },
  {
    id: 'badge-skill-exchanger',
    title: 'Skill Exchanger',
    description: 'Completed a project where you taught a skill and mastered a new one.',
    iconName: 'Repeat',
    category: 'Skill',
    unlocked: true,
    unlockedAt: 'Sep 29, 2026',
    progress: 1,
    maxProgress: 1
  },
  {
    id: 'badge-sprint-finisher',
    title: 'Sprint Finisher',
    description: 'Completed 5 Kanban tasks ahead of schedule without blocking blockers.',
    iconName: 'Zap',
    category: 'Milestone',
    unlocked: false,
    progress: 3,
    maxProgress: 5
  },
  {
    id: 'badge-project-finisher',
    title: 'Project Finisher',
    description: 'Successfully took a project from kickoff to finished public portfolio piece.',
    iconName: 'Award',
    category: 'Milestone',
    unlocked: false,
    progress: 2,
    maxProgress: 3
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-alex',
    title: '94% Synergy Match Found! 🎉',
    message: 'Priya Sharma knows Python & FastAPI and wants to learn React. Perfect fit for Campus Event Hub!',
    type: 'match',
    read: false,
    timestamp: '15 mins ago',
    link: '/matches'
  },
  {
    id: 'notif-2',
    userId: 'user-alex',
    title: 'New Project Application 📝',
    message: 'Sam Chen applied for UI/UX Designer in "Campus Event Management App".',
    type: 'application',
    read: true,
    timestamp: '2 hours ago',
    link: '/projects/proj-campus-events'
  },
  {
    id: 'notif-3',
    userId: 'user-alex',
    title: 'Badge Unlocked! 🏅',
    message: 'You earned the "Team Player" badge for completing milestones with collaborators.',
    type: 'badge',
    read: true,
    timestamp: '1 day ago',
    link: '/badges'
  }
];

export const INITIAL_CONNECTIONS: Connection[] = [
  {
    id: 'conn-1',
    userId: 'user-alex',
    targetUserId: 'user-sam',
    status: 'connected',
    initiatedBy: 'user-alex',
    lastMessage: 'Awesome, the wireframes look super crisp!',
    lastMessageTime: '10:30 AM'
  },
  {
    id: 'conn-2',
    userId: 'user-alex',
    targetUserId: 'user-ananya',
    status: 'connected',
    initiatedBy: 'user-ananya',
    lastMessage: 'Let’s sync tomorrow after the lecture.',
    lastMessageTime: 'Yesterday'
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    projectId: 'proj-campus-events',
    projectTitle: 'Campus Event Management App',
    applicantId: 'user-priya',
    applicantName: 'Priya Sharma',
    applicantAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    applicantCollege: 'State Tech Institute',
    roleTitle: 'Backend Engineer',
    pitch: 'I have built FastAPI production microservices and would love to handle the QR validation backend while learning React from Alex.',
    learningGoals: 'Master React component state, Tailwind styling, and fullstack API wiring.',
    status: 'pending',
    createdAt: '2026-10-06'
  }
];

export const INITIAL_CHATS: ChatMessage[] = [
  {
    id: 'msg-1',
    connectionId: 'conn-1',
    senderId: 'user-alex',
    receiverId: 'user-sam',
    text: 'Hey Sam! Checked out the new event card designs in Figma, loving the gradient borders!',
    timestamp: '10:15 AM'
  },
  {
    id: 'msg-2',
    connectionId: 'conn-1',
    senderId: 'user-sam',
    receiverId: 'user-alex',
    text: 'Awesome, glad you like them! Let me know if you need any SVGs exported for the frontend.',
    timestamp: '10:28 AM'
  },
  {
    id: 'msg-3',
    connectionId: 'conn-1',
    senderId: 'user-alex',
    receiverId: 'user-sam',
    text: 'Awesome, the wireframes look super crisp!',
    timestamp: '10:30 AM'
  }
];
