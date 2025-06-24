
import React from 'react';
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { useMusic } from '@/contexts/MusicContext';

interface SearchResultsProps {
  query: string;
}

// Mock search results - in a real app, this would come from an API
const mockResults = [
  { id: '1', title: 'Rainy Day Rainbow', artist: 'benpstokerbeats', album: 'Alternate Skies', duration: 180, src: '/audio/track1.wav', cover: '/placeholder.svg', isLossless: true },
  { id: '2', title: 'Cool Summer Nights', artist: 'benpstokerbeats', album: 'Alternate Skies', duration: 200, src: '/audio/track2.wav', cover: '/placeholder.svg', isLossless: true },
  { id: '3', title: 'Sunny City Day', artist: 'benpstokerbeats', album: 'Rainy Day Rainbow', duration: 190, src: '/audio/track3.wav', cover: '/placeholder.svg', isLossless: true },
];

export const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const { playTrack } = useMusic();

  const filteredResults = mockResults.filter(track =>
    track.title.toLowerCase().includes(query.toLowerCase()) ||
    track.artist.toLowerCase().includes(query.toLowerCase()) ||
    track.album.toLowerCase().includes(query.toLowerCase())
  );

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!query) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">Search for music</h2>
        <p className="text-white/70">Find your favorite songs, artists, and albums</p>
      </div>
    );
  }

  if (filteredResults.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">No results found</h2>
        <p className="text-white/70">Try searching for something else</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">
        Search results for "{query}"
      </h2>

      <div className="space-y-2">
        {filteredResults.map((track, index) => (
          <div
            key={track.id}
            className="group flex items-center p-3 rounded-lg hover:bg-white/10 transition-all duration-200"
          >
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <span className="text-white/50 text-sm w-6 text-center group-hover:hidden">
                {index + 1}
              </span>
              <button
                onClick={() => playTrack(track)}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 flex items-center justify-center"
              >
                <Play size={16} fill="currentColor" />
              </button>
              
              <img
                src={track.cover}
                alt={track.title}
                className="w-12 h-12 rounded object-cover"
              />
              
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-medium truncate">{track.title}</h3>
                <p className="text-white/70 text-sm truncate">{track.artist}</p>
              </div>
            </div>

            <div className="hidden md:block text-white/70 text-sm min-w-0 flex-1 px-4">
              <span className="truncate">{track.album}</span>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-white/70 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                <Heart size={16} />
              </button>
              <span className="text-white/50 text-sm">
                {formatDuration(track.duration)}
              </span>
              {track.isLossless && (
                <span className="text-green-400 text-xs font-semibold">LOSSLESS</span>
              )}
              <button className="text-white/70 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
