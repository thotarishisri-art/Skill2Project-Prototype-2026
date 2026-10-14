import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Compass,
  FolderGit2,
  Users2,
  Award,
  Bell,
  Menu,
  X,
  UserCheck,
  RotateCcw,
  User as UserIcon,
  Briefcase,
  Layers,
  ChevronDown,
  Check
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    allUsers,
    switchUser,
    unreadNotificationCount,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    resetDemoData
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isPublicPage = location.pathname === '/' || location.pathname === '/auth';

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: Layers },
    { name: 'Skill Matching', path: '/matches', icon: Sparkles, badge: 'Synergy' },
    { name: 'Project Hub', path: '/projects', icon: Compass },
    { name: 'Workspace', path: '/workspace/proj-campus-events', icon: FolderGit2 },
    { name: 'Connections', path: '/connections', icon: Users2 },
    { name: 'Portfolio', path: '/portfolio', icon: Briefcase },
    { name: 'Badges', path: '/badges', icon: Award }
  ];

  const userNotifications = notifications.filter(n => n.userId === currentUser.id).slice(0, 5);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Demo Helper Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wide uppercase text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
              Demo Prototype
            </span>
            <span className="hidden sm:inline text-blue-100">
              Active Persona: <strong className="text-white font-semibold">{currentUser.name}</strong> ({currentUser.roleTitle})
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Persona Switcher Quick Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPersonaDropdownOpen(!personaDropdownOpen)}
                className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white font-medium px-2.5 py-0.5 rounded-lg text-xs transition-colors"
                title="Switch demo student persona"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Switch Persona</span>
                <ChevronDown className="w-3 h-3 opacity-80" />
              </button>

              {personaDropdownOpen && (
                <div
                  className="absolute right-0 mt-1 w-64 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setPersonaDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Student Persona
                  </div>
                  {allUsers.map(user => (
                    <button
                      key={user.id}
                      onClick={() => switchUser(user.id)}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                        user.id === currentUser.id ? 'bg-blue-50/70 text-blue-700 font-semibold' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                        <div>
                          <div className="text-xs leading-none">{user.name}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5 leading-none">{user.department.split('&')[0]}</div>
                        </div>
                      </div>
                      {user.id === currentUser.id && <Check className="w-4 h-4 text-blue-600" />}
                    </button>
                  ))}
                  <div className="border-t border-slate-100 mt-1 pt-1 px-2">
                    <button
                      onClick={resetDemoData}
                      className="w-full flex items-center gap-2 text-[11px] text-slate-500 hover:text-red-600 px-2 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset Demo Data
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={resetDemoData}
              className="text-white/80 hover:text-white flex items-center gap-1 text-[11px] transition-colors"
              title="Reset sample data"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden md:inline">Reset Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <Link to={isPublicPage ? '/' : '/dashboard'} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                  Skill2Project
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/60 px-1.5 py-0.2 rounded-md">
                  Venture
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide hidden sm:block">
                Learn <span className="text-blue-500">|</span> Collaborate <span className="text-purple-500">|</span> Build
              </p>
            </div>
          </Link>

          {/* Navigation Items (Authenticated) */}
          {!isPublicPage ? (
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => {
                const isActive = location.pathname === link.path || (link.path !== '/dashboard' && location.pathname.startsWith(link.path));
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[9px] bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          ) : (
            <div className="hidden md:flex items-center gap-6">
              <a href="#how-it-works" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                How It Works
              </a>
              <a href="#why-skill2project" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                Why Us
              </a>
              <a href="#featured-projects" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                Projects
              </a>
            </div>
          )}

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {isPublicPage ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/auth"
                  className="text-xs font-semibold text-slate-700 hover:text-blue-600 px-3 py-2 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth"
                  className="text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-4 py-2 rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-102"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <>
                {/* Notification Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setNotifDropdownOpen(!notifDropdownOpen);
                      setUserMenuOpen(false);
                    }}
                    className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                    aria-label="View notifications"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadNotificationCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                        {unreadNotificationCount}
                      </span>
                    )}
                  </button>

                  {notifDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                        <div>
                          <h3 className="font-bold text-sm text-slate-900">Notifications</h3>
                          <p className="text-[11px] text-slate-500">{unreadNotificationCount} unread updates</p>
                        </div>
                        {unreadNotificationCount > 0 && (
                          <button
                            onClick={markAllNotificationsRead}
                            className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>

                      <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                        {userNotifications.length === 0 ? (
                          <div className="p-6 text-center text-slate-400 text-xs">
                            No notifications yet! Start matching and building.
                          </div>
                        ) : (
                          userNotifications.map(n => (
                            <div
                              key={n.id}
                              onClick={() => {
                                markNotificationRead(n.id);
                                if (n.link) navigate(n.link);
                                setNotifDropdownOpen(false);
                              }}
                              className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${
                                !n.read ? 'bg-blue-50/40' : ''
                              }`}
                            >
                              <div
                                className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                                  !n.read ? 'bg-blue-600' : 'bg-transparent'
                                }`}
                              />
                              <div className="flex-1">
                                <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                                <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                                  {n.message}
                                </p>
                                <span className="text-[10px] text-slate-400 mt-1 block">{n.timestamp}</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="pt-2 px-4 border-t border-slate-100 text-center">
                        <Link
                          to="/notifications"
                          onClick={() => setNotifDropdownOpen(false)}
                          className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                        >
                          View all notifications →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setUserMenuOpen(!userMenuOpen);
                      setNotifDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 p-1 pl-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-100 transition-all"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-lg object-cover ring-1 ring-blue-500/20"
                    />
                    <div className="text-left hidden sm:block pr-1">
                      <p className="text-xs font-bold text-slate-800 leading-tight">{currentUser.name}</p>
                      <p className="text-[10px] text-slate-500 leading-tight">
                        {currentUser.college.split(' ')[0]}
                      </p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
                  </button>

                  {userMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <UserIcon className="w-4 h-4 text-slate-400" />
                        My Profile
                      </Link>

                      <Link
                        to="/profile/edit"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Layers className="w-4 h-4 text-slate-400" />
                        Edit Profile & Skills
                      </Link>

                      <Link
                        to="/portfolio"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Briefcase className="w-4 h-4 text-slate-400" />
                        Public Portfolio
                      </Link>

                      <Link
                        to="/badges"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Award className="w-4 h-4 text-slate-400" />
                        Achievements & Badges
                      </Link>

                      <div className="border-t border-slate-100 my-1" />

                      <button
                        onClick={() => {
                          navigate('/auth');
                        }}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <RotateCcw className="w-4 h-4 text-red-500" />
                        Switch / Sign Out
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && !isPublicPage && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map(link => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-slate-500" />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
