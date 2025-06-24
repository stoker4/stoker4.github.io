
import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Heart, MoreHorizontal } from 'lucide-react';
import { useMusic } from '@/contexts/MusicContext';

export const MusicPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    repeat,
    shuffle,
    togglePlay,
    nextTrack,
    previousTrack,
    setVolume,
    seekTo,
    toggleRepeat,
    toggleShuffle
  } = useMusic();

  const [showVolume, setShowVolume] = useState(false);

  if (!currentTrack) {
    return null;
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    seekTo(percent * duration);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-xl border-t border-white/20 p-4 z-50">
      <div className="max-w-screen-2xl mx-auto">
        {/* Progress Bar */}
        <div
          className="w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer group"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-green-500 rounded-full relative group-hover:bg-green-400 transition-colors"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* Track Info */}
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <h4 className="text-white font-medium truncate text-sm md:text-base">
                {currentTrack.title}
              </h4>
              <p className="text-white/70 text-xs md:text-sm truncate">
                {currentTrack.artist}
              </p>
            </div>
            <button className="text-white/70 hover:text-red-400 transition-colors hidden md:block">
              <Heart size={20} />
            </button>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleShuffle}
                className={`transition-colors ${shuffle ? 'text-green-400' : 'text-white/70 hover:text-white'}`}
              >
                <Shuffle size={18} />
              </button>
              <button
                onClick={previousTrack}
                className="text-white/70 hover:text-white transition-colors"
              >
                <SkipBack size={20} />
              </button>
              <button
                onClick={togglePlay}
                className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
              </button>
              <button
                onClick={nextTrack}
                className="text-white/70 hover:text-white transition-colors"
              >
                <SkipForward size={20} />
              </button>
              <button
                onClick={toggleRepeat}
                className={`transition-colors ${repeat !== 'none' ? 'text-green-400' : 'text-white/70 hover:text-white'}`}
              >
                <Repeat size={18} />
                {repeat === 'one' && (
                  <span className="absolute -mt-2 -ml-1 text-xs">1</span>
                )}
              </button>
            </div>
            
            {/* Time Display */}
            <div className="flex items-center space-x-2 text-xs text-white/70">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume & More */}
          <div className="flex items-center space-x-4 flex-1 justify-end">
            <div className="relative">
              <button
                onMouseEnter={() => setShowVolume(true)}
                onMouseLeave={() => setShowVolume(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <Volume2 size={20} />
              </button>
              {showVolume && (
                <div
                  className="absolute bottom-full right-0 mb-2 p-2 bg-black/50 backdrop-blur-md rounded-lg"
                  onMouseEnter={() => setShowVolume(true)}
                  onMouseLeave={() => setShowVolume(false)}
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20 accent-green-500"
                  />
                </div>
              )}
            </div>
            <button className="text-white/70 hover:text-white transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
