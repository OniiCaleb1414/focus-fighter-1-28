
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Trophy, 
  MessageCircle, 
  Plus,
  Crown,
  Target
} from 'lucide-react';

const myGroups = [
  {
    id: 1,
    name: "Design Team Sprint",
    members: 8,
    progress: 78,
    role: "member",
    totalTasks: 25,
    completedTasks: 19,
  },
  {
    id: 2,
    name: "Fitness Accountability",
    members: 12,
    progress: 45,
    role: "admin",
    totalTasks: 20,
    completedTasks: 9,
  },
];

const leaderboard = [
  { rank: 1, name: "Sarah Chen", points: 1250, avatar: "👩‍💼" },
  { rank: 2, name: "You", points: 1247, avatar: "🧙‍♂️" },
  { rank: 3, name: "Mike Ross", points: 1180, avatar: "👨‍💻" },
  { rank: 4, name: "Lisa Park", points: 1100, avatar: "👩‍🎨" },
  { rank: 5, name: "Tom Wilson", points: 980, avatar: "👨‍🔬" },
];

export const GroupsTab = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Groups</h1>
          <p className="text-gray-600">Collaborate and compete with your teams</p>
        </div>
        <Button className="quest-gradient text-white rounded-xl">
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Groups */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Active Groups</h2>
          
          <div className="space-y-4">
            {myGroups.map((group) => (
              <Card key={group.id} className="quest-card border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      <span className="text-lg">{group.name}</span>
                      {group.role === 'admin' && (
                        <Crown className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <Badge variant="outline">
                      {group.members} members
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Group Progress</span>
                      <span>{group.completedTasks}/{group.totalTasks} tasks</span>
                    </div>
                    <Progress value={group.progress} className="h-3" />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                      <Target className="h-4 w-4 mr-2" />
                      View Tasks
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Group Challenges */}
          <Card className="quest-card border-0 border-l-4 border-l-orange-500">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-orange-500" />
                <span>Weekly Challenge</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">🏃‍♂️ Productivity Sprint</h3>
                  <Badge className="bg-orange-100 text-orange-800">5 days left</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Complete 20 tasks as a team to unlock exclusive group rewards!
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>16/20 tasks</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Leaderboard</h2>
          
          <Card className="quest-card border-0">
            <CardHeader>
              <CardTitle className="text-base">This Week's Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div 
                    key={user.rank} 
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                      user.name === 'You' 
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  >
                    <div className={`text-lg font-bold ${
                      user.rank === 1 ? 'text-yellow-600' :
                      user.rank === 2 ? 'text-gray-500' :
                      user.rank === 3 ? 'text-orange-600' :
                      'text-gray-400'
                    }`}>
                      #{user.rank}
                    </div>
                    <div className="text-2xl">{user.avatar}</div>
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${
                        user.name === 'You' ? 'text-blue-600' : ''
                      }`}>
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.points} points</p>
                    </div>
                    {user.rank === 1 && (
                      <Trophy className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Join Group */}
          <Card className="quest-card border-0">
            <CardHeader>
              <CardTitle className="text-base">Discover Groups</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start rounded-xl" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Browse Public Groups
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-xl" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Join with Code
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
