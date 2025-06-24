
import React, { useState } from 'react';
import { Menu, X, Home, Search, Heart, Music, User, Settings, Plus, LogOut } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { SearchBar } from './SearchBar';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onSearch: (query: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { profile, signOut } = useUser();

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'playlists', label: 'Your Library', icon: Music },
    { id: 'liked', label: 'Liked Songs', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-black/20 backdrop-blur-xl border-r border-white/20 z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              benpstokerbeats
            </h1>
            <p className="text-white/70 text-sm">
              {profile ? `${getGreeting()}, ${profile.username}` : 'High-quality music, no ads'}
            </p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <SearchBar onSearch={onSearch} onFocus={() => onViewChange('search')} />
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all
                  ${currentView === item.id 
                    ? 'bg-white/20 text-white border border-white/30' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Create Playlist */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all">
              <Plus size={20} />
              <span className="font-medium">Create Playlist</span>
            </button>
          </div>

          {/* Sign Out */}
          <div className="mt-4">
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              <LogOut size={20} />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-white/50 text-xs text-center">
              © 2024 benpstokerbeats<br />
              Contact: benpstokerbeats@icloud.com
            </p>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
