import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/common/Toast';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { OnboardingSkillsPage } from './pages/OnboardingSkillsPage';
import { DashboardPage } from './pages/DashboardPage';
import { SkillMatchingPage } from './pages/SkillMatchingPage';
import { ProjectHubPage } from './pages/ProjectHubPage';
import { CreateProjectPage } from './pages/CreateProjectPage';
import { ProjectDetailsPage } from './pages/ProjectDetailsPage';
import { TeamWorkspacePage } from './pages/TeamWorkspacePage';
import { WorkspaceTasksPage } from './pages/WorkspaceTasksPage';
import { ProjectCompletionPage } from './pages/ProjectCompletionPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { BadgesPage } from './pages/BadgesPage';
import { ConnectionsPage } from './pages/ConnectionsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { ProfileEditPage } from './pages/ProfileEditPage';

export function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />

              {/* Onboarding */}
              <Route path="/onboarding/skills" element={<OnboardingSkillsPage />} />

              {/* Main App */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/matches" element={<SkillMatchingPage />} />
              <Route path="/projects" element={<ProjectHubPage />} />
              <Route path="/projects/create" element={<CreateProjectPage />} />
              <Route path="/projects/:id" element={<ProjectDetailsPage />} />
              <Route path="/workspace/:id" element={<TeamWorkspacePage />} />
              <Route path="/workspace/:id/tasks" element={<WorkspaceTasksPage />} />
              <Route path="/workspace/:id/complete" element={<ProjectCompletionPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/badges" element={<BadgesPage />} />
              <Route path="/connections" element={<ConnectionsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/edit" element={<ProfileEditPage />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <Toast />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
