import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Bell,
  CheckCircle2,
  Sparkles,
  Award,
  Layers,
  ArrowRight,
  Check,
  Trash2
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const {
    currentUser,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    unreadNotificationCount
  } = useApp();
  const navigate = useNavigate();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const userNotifications = notifications.filter(n => n.userId === currentUser.id);
  const filteredNotifications = userNotifications.filter(n => (filter === 'unread' ? !n.read : true));

  const getIcon = (type: string) => {
    switch (type) {
      case 'match':
        return <Sparkles className="w-5 h-5 text-purple-600" />;
      case 'badge':
        return <Award className="w-5 h-5 text-amber-600" />;
      case 'accepted':
      case 'completion':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      default:
        return <Layers className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Notification Center</h1>
            </div>
            <p className="text-xs text-slate-500">
              Stay in sync with incoming matches, team applications, and sprint updates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {unreadNotificationCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                Mark all read
              </button>
            )}

            <div className="flex rounded-xl bg-slate-100 p-1 text-xs">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  filter === 'all' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  filter === 'unread' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500'
                }`}
              >
                Unread ({unreadNotificationCount})
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No notifications to display.
            </div>
          ) : (
            filteredNotifications.map(item => (
              <div
                key={item.id}
                onClick={() => {
                  markNotificationRead(item.id);
                  if (item.link) navigate(item.link);
                }}
                className={`p-5 flex items-start justify-between gap-4 transition-colors cursor-pointer hover:bg-slate-50/80 ${
                  !item.read ? 'bg-blue-50/30' : ''
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-2xl bg-slate-100 flex-shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-slate-900">{item.title}</h3>
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.message}</p>
                    <span className="text-[10px] text-slate-400 mt-2 block">{item.timestamp}</span>
                  </div>
                </div>

                {item.link && (
                  <button className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 flex-shrink-0 mt-1">
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
