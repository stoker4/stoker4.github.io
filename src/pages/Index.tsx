
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { MusicPlayer } from '@/components/MusicPlayer';
import { AlbumGrid } from '@/components/AlbumGrid';
import { SearchResults } from '@/components/SearchResults';
import { PlaylistView } from '@/components/PlaylistView';
import { ArtistProfile } from '@/components/ArtistProfile';
import { UserProfile } from '@/components/UserProfile';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { MusicProvider } from '@/contexts/MusicContext';
import { UserProvider, useUser } from '@/contexts/UserContext';

const Index = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <MusicProvider>
          <AppContent />
        </MusicProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

const AppContent = () => {
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoggedIn, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate('/auth');
    }
  }, [isLoggedIn, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background elements for glass effect */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="flex min-h-screen relative">
        <Sidebar 
          currentView={currentView} 
          onViewChange={setCurrentView}
          onSearch={setSearchQuery}
        />
        
        <main className="flex-1 ml-0 lg:ml-80 p-4 lg:p-8 pb-32">
          <div className="max-w-7xl mx-auto">
            {currentView === 'home' && <AlbumGrid />}
            {currentView === 'search' && <SearchResults query={searchQuery} />}
            {currentView === 'playlists' && <PlaylistView />}
            {currentView === 'artist' && <ArtistProfile />}
            {currentView === 'profile' && <UserProfile />}
          </div>
        </main>
        
        <MusicPlayer />
      </div>
    </div>
  );
};

export default Index;
