
import React from 'react';
import { Play, Heart, Share2, MoreHorizontal } from 'lucide-react';

export const ArtistProfile: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="relative h-80 bg-gradient-to-b from-purple-600 to-transparent rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-8 left-8">
          <h1 className="text-5xl font-bold text-white mb-2">benpstokerbeats</h1>
          <p className="text-white/80 text-lg">1,234 monthly listeners</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="bg-green-500 hover:bg-green-400 text-white p-4 rounded-full transition-colors">
          <Play size={24} fill="currentColor" />
        </button>
        <button className="text-white/70 hover:text-red-400 transition-colors">
          <Heart size={32} />
        </button>
        <button className="text-white/70 hover:text-white transition-colors">
          <Share2 size={24} />
        </button>
        <button className="text-white/70 hover:text-white transition-colors">
          <MoreHorizontal size={24} />
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Popular</h2>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center p-3 rounded-lg hover:bg-white/10 transition-colors group">
              <span className="text-white/50 text-sm w-8">{i}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium">Track {i}</h3>
                <p className="text-white/70 text-sm">benpstokerbeats</p>
              </div>
              <span className="text-white/50 text-sm">3:24</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
