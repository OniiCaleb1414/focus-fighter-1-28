
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Bell, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
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
            <h2 className="text-xl font-semibold text-gray-900">Good morning, John! 🌟</h2>
            <p className="text-sm text-gray-600">Ready to conquer your tasks today?</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Stats */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">47</div>
              <div className="text-xs text-gray-500">Streak</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">1,247</div>
              <div className="text-xs text-gray-500">XP</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">12</div>
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
        </div>
      </div>
    </header>
  );
};
