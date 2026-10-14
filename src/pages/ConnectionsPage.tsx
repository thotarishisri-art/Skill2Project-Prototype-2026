import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users2,
  MessageSquare,
  Search,
  UserCheck,
  Send,
  X,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { User } from '../types';

export const ConnectionsPage: React.FC = () => {
  const {
    currentUser,
    allUsers,
    connections,
    chats,
    connectWithUser,
    sendChatMessage
  } = useApp();

  const [activeChatUserId, setActiveChatUserId] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Active connections for currentUser
  const connectedUserIds = connections
    .filter(
      c =>
        (c.userId === currentUser.id || c.targetUserId === currentUser.id) &&
        c.status === 'connected'
    )
    .map(c => (c.userId === currentUser.id ? c.targetUserId : c.userId));

  const myConnectedUsers = allUsers.filter(u => connectedUserIds.includes(u.id));

  // Suggested peers (not connected yet)
  const suggestedUsers = allUsers.filter(
    u => u.id !== currentUser.id && !connectedUserIds.includes(u.id)
  );

  const activeChatUser = allUsers.find(u => u.id === activeChatUserId);

  // Filter messages between currentUser and activeChatUser
  const currentMessages = chats.filter(
    m =>
      (m.senderId === currentUser.id && m.receiverId === activeChatUserId) ||
      (m.senderId === activeChatUserId && m.receiverId === currentUser.id)
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeChatUserId) return;
    sendChatMessage(activeChatUserId, chatInput.trim());
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Banner */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Users2 className="w-3.5 h-3.5" />
              <span>Campus Peer Network</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Student Connections & Chat
            </h1>
            <p className="text-xs text-slate-500">
              Directly communicate with your project co-builders and study partners.
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search peers by name or skill..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 w-64"
            />
          </div>
        </div>

        {/* 2 Columns: Connected peers vs Suggested */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: My Connections */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                Connected Peers ({myConnectedUsers.length})
              </h2>
              <span className="text-xs text-slate-400">Click to launch instant messaging</span>
            </div>

            {myConnectedUsers.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 text-xs text-slate-400">
                You haven't connected with any peers yet. Click 'Connect' on suggested peers below!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myConnectedUsers.map(peer => {
                  const conn = connections.find(
                    c =>
                      (c.userId === currentUser.id && c.targetUserId === peer.id) ||
                      (c.userId === peer.id && c.targetUserId === currentUser.id)
                  );

                  return (
                    <div
                      key={peer.id}
                      className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 p-5 shadow-xs transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={peer.avatar}
                          alt={peer.name}
                          className="w-12 h-12 rounded-2xl object-cover ring-2 ring-blue-500/10"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-bold text-slate-900 truncate">{peer.name}</h3>
                          <p className="text-xs text-blue-600 font-semibold truncate">{peer.roleTitle}</p>
                          <p className="text-[11px] text-slate-400">{peer.college.split(' ')[0]}</p>
                        </div>
                      </div>

                      {conn?.lastMessage && (
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 line-clamp-1 italic">
                          "{conn.lastMessage}"
                        </div>
                      )}

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Connected
                        </span>

                        <button
                          onClick={() => setActiveChatUserId(peer.id)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-1.5 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Chat</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right 1 Col: Suggested Students */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              Suggested Students ({suggestedUsers.length})
            </h2>

            <div className="space-y-3">
              {suggestedUsers.map(peer => (
                <div
                  key={peer.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={peer.avatar}
                      alt={peer.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 truncate">{peer.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{peer.roleTitle.split('&')[0]}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => connectWithUser(peer.id)}
                    className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl font-bold text-xs flex-shrink-0 transition-colors"
                  >
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Messaging Flyout Drawer */}
        {activeChatUser && (
          <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <img
                  src={activeChatUser.avatar}
                  alt={activeChatUser.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-xs text-slate-900">{activeChatUser.name}</h3>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online on campus
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveChatUserId(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/30">
              {currentMessages.length === 0 ? (
                <div className="text-center text-xs text-slate-400 py-10">
                  Say hi to {activeChatUser.name.split(' ')[0]} and kick off your project collaboration!
                </div>
              ) : (
                currentMessages.map(msg => {
                  const isMe = msg.senderId === currentUser.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                          isMe
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
