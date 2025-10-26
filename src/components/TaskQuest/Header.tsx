
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Bell, Plus, LogOut, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [username, setUsername] = useState<string>('');
  const [stats, setStats] = useState({ level: 1, xp: 0, streak: 0 });

  useEffect(() => {
    if (user) {
      // Fetch user profile
      supabase
        .from('profiles')
        .select('username')
        .eq('user_id', user.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setUsername(data.username || 'Hero');
          }
        });

      // Fetch character stats
      supabase
        .from('character_stats')
        .select('level, xp')
        .eq('user_id', user.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setStats(prev => ({ ...prev, level: data.level, xp: data.xp }));
          }
        });
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed Out",
      description: "See you on your next quest!",
    });
  };
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/20 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Good morning, {username}! 🌟</h2>
            <p className="text-sm text-gray-600">Ready to conquer your tasks today?</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Stats */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{stats.streak}</div>
              <div className="text-xs text-gray-500">Streak</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{stats.xp}</div>
              <div className="text-xs text-gray-500">XP</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">{stats.level}</div>
              <div className="text-xs text-gray-500">Level</div>
            </div>
          </div>

          {/* Action buttons */}
          <Button className="quest-gradient text-white rounded-xl shadow-lg hover:shadow-xl transition-all">
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
          
          <Button variant="outline" size="sm" className="relative rounded-xl">
            <Bell className="h-4 w-4" />
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
              3
            </Badge>
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{username}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
