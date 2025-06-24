
import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Edit2, Settings } from 'lucide-react';

export const UserProfile: React.FC = () => {
  const { profile, updateProfile } = useUser();
  const { theme, setTheme } = useTheme();

  if (!profile) return null;

  const themes = [
    { value: 'system', label: 'System' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'ocean', label: 'Ocean' },
    { value: 'sunset', label: 'Sunset' },
    { value: 'emerald', label: 'Emerald' },
    { value: 'cosmic', label: 'Cosmic' },
  ];

  const handleThemeChange = async (newTheme: string) => {
    setTheme(newTheme as any);
    await updateProfile({ theme: newTheme });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {profile.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{profile.username}</h1>
            <p className="text-white/70">{profile.email}</p>
            <p className="text-white/50 text-sm mt-1">
              Member since {new Date(profile.created_at).toLocaleDateString()}
            </p>
          </div>
          <button className="ml-auto text-white/70 hover:text-white transition-colors">
            <Edit2 size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-white/70 text-sm">Playlists</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-white/70 text-sm">Following</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-white/70 text-sm">Followers</div>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
          <Settings size={20} className="mr-2" />
          Preferences
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">Theme</label>
            <select
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40"
            >
              {themes.map((themeOption) => (
                <option key={themeOption.value} value={themeOption.value} className="bg-black">
                  {themeOption.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
