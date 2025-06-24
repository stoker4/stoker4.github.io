
import React from 'react';
import { Plus, Music, Play } from 'lucide-react';

export const PlaylistView: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <Music size={64} className="text-white/50 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">Your Library</h2>
        <p className="text-white/70 mb-8">Create playlists to organize your favorite music</p>
        
        <button className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-colors flex items-center space-x-2 mx-auto">
          <Plus size={20} />
          <span>Create your first playlist</span>
        </button>
      </div>
    </div>
  );
};
