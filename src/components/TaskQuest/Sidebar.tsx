
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Home, 
  User, 
  Users, 
  Heart, 
  Calendar,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'text-blue-600' },
  { id: 'character', label: 'My Character', icon: User, color: 'text-purple-600' },
  { id: 'groups', label: 'Groups', icon: Users, color: 'text-green-600' },
  { id: 'wellbeing', label: 'Well-being', icon: Heart, color: 'text-pink-600' },
  { id: 'calendar', label: 'Calendar', icon: Calendar, color: 'text-orange-600' },
];

export const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }: SidebarProps) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ username: string; avatar_url: string | null } | null>(null);
  const [stats, setStats] = useState<{ level: number; xp: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const [profileData, statsData] = await Promise.all([
          supabase
            .from('profiles')
            .select('username, avatar_url')
            .eq('user_id', user.id)
            .single(),
          supabase
            .from('character_stats')
            .select('level, xp')
            .eq('user_id', user.id)
            .single()
        ]);

        if (profileData.data) setProfile(profileData.data);
        if (statsData.data) setStats(statsData.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-white/90 backdrop-blur-md shadow-2xl transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 quest-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TQ</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaskQuest
              </h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false); // Close sidebar on mobile after selection
                  }}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200",
                    isActive 
                      ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-200/50 shadow-sm" 
                      : "hover:bg-white/50 hover:shadow-sm"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? item.color : "text-gray-500"
                  )} />
                  <span className={cn(
                    "font-medium transition-colors",
                    isActive ? "text-gray-900" : "text-gray-600"
                  )}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/20">
            <div className="quest-card p-4 rounded-xl">
              {loading ? (
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    {profile?.avatar_url ? (
                      <img 
                        src={profile.avatar_url} 
                        alt={profile.username || 'User'} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-sm">
                        {profile?.username ? getInitials(profile.username) : 'U'}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm truncate">
                      {profile?.username || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      Level {stats?.level || 1} Achiever
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
