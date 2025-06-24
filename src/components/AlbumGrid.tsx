
import React from 'react';
import { Play, Heart } from 'lucide-react';
import { useMusic } from '@/contexts/MusicContext';

interface Album {
  id: string;
  title: string;
  artist: string;
  cover: string;
  year: number;
  tracks: any[];
}

const albums: Album[] = [
  {
    id: 'alternate',
    title: 'Rainy Day Rainbow: Alternate Skies',
    artist: 'benpstokerbeats',
    cover: '/placeholder.svg',
    year: 2024,
    tracks: [
      { id: '1', title: 'Rainy Day Rainbow', artist: 'benpstokerbeats', album: 'Alternate Skies', duration: 180, src: '/audio/track1.wav', cover: '/placeholder.svg', isLossless: true },
      { id: '2', title: 'Cool Summer Nights', artist: 'benpstokerbeats', album: 'Alternate Skies', duration: 200, src: '/audio/track2.wav', cover: '/placeholder.svg', isLossless: true },
    ]
  },
  {
    id: 'original',
    title: 'Rainy Day Rainbow',
    artist: 'benpstokerbeats',
    cover: '/placeholder.svg',
    year: 2023,
    tracks: [
      { id: '3', title: 'Rainy Day Rainbow', artist: 'benpstokerbeats', album: 'Rainy Day Rainbow', duration: 180, src: '/audio/track3.wav', cover: '/placeholder.svg', isLossless: true },
    ]
  }
];

export const AlbumGrid: React.FC = () => {
  const { playTrack } = useMusic();

  const handlePlayAlbum = (album: Album) => {
    if (album.tracks.length > 0) {
      playTrack(album.tracks[0]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Welcome to benpstokerbeats
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          High-quality music streaming without ads. Experience lossless audio and discover amazing tracks.
        </p>
      </div>

      {/* Featured Albums */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Featured Albums</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <div
              key={album.id}
              className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="relative mb-4">
                <img
                  src={album.cover}
                  alt={album.title}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <button
                  onClick={() => handlePlayAlbum(album)}
                  className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-400 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                >
                  <Play size={24} fill="currentColor" />
                </button>
              </div>
              <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2">
                {album.title}
              </h3>
              <p className="text-white/70 text-sm mb-2">{album.artist}</p>
              <p className="text-white/50 text-xs">{album.year}</p>
              
              <div className="flex items-center justify-between mt-4">
                <button className="text-white/70 hover:text-red-400 transition-colors">
                  <Heart size={20} />
                </button>
                <span className="text-white/50 text-xs">{album.tracks.length} tracks</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Played */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Recently Played</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {albums.slice(0, 6).map((album) => (
            <div
              key={`recent-${album.id}`}
              className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              onClick={() => handlePlayAlbum(album)}
            >
              <img
                src={album.cover}
                alt={album.title}
                className="w-full aspect-square object-cover rounded-md mb-3"
              />
              <h4 className="text-white text-sm font-medium line-clamp-2 mb-1">
                {album.title}
              </h4>
              <p className="text-white/60 text-xs line-clamp-1">
                {album.artist}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
