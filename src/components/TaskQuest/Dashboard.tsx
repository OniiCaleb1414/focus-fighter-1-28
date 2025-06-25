
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  Target, 
  Trophy, 
  Zap,
  Plus,
  Calendar
} from 'lucide-react';
import { TaskCard } from './TaskCard';
import { AchievementCard } from './AchievementCard';

const mockTasks = [
  {
    id: 1,
    title: "Complete project proposal",
    category: "Work",
    priority: "high",
    dueDate: "Today",
    completed: false,
    xp: 50,
  },
  {
    id: 2,
    title: "30-minute workout",
    category: "Health",
    priority: "medium",
    dueDate: "Today",
    completed: true,
    xp: 30,
  },
  {
    id: 3,
    title: "Read 20 pages",
    category: "Learning",
    priority: "low",
    dueDate: "Tomorrow",
    completed: false,
    xp: 25,
  },
];

const mockAchievements = [
  {
    id: 1,
    title: "7-Day Streak",
    description: "Complete tasks for 7 consecutive days",
    icon: "🔥",
    unlocked: true,
    progress: 100,
  },
  {
    id: 2,
    title: "Task Master",
    description: "Complete 100 tasks",
    icon: "🏆",
    unlocked: false,
    progress: 87,
  },
  {
    id: 3,
    title: "Early Bird",
    description: "Complete morning tasks 5 times",
    icon: "🐦",
    unlocked: false,
    progress: 60,
  },
];

export const Dashboard = () => {
  const [tasks, setTasks] = useState(mockTasks);
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const dailyProgress = (completedTasks / totalTasks) * 100;

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="quest-card p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Today's Quest</h1>
            <p className="text-gray-600">You're doing great! Keep up the momentum.</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{completedTasks}/{totalTasks}</div>
            <div className="text-sm text-gray-500">Tasks completed</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Daily Progress</span>
            <span>{Math.round(dailyProgress)}%</span>
          </div>
          <Progress value={dailyProgress} className="h-3 bg-gray-200" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="quest-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Today's Goal</p>
                <p className="text-lg font-bold">{completedTasks}/{totalTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="quest-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-lg font-bold text-green-600">{completedTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="quest-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-lg font-bold text-orange-600">{totalTasks - completedTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="quest-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Energy</p>
                <p className="text-lg font-bold text-purple-600">85%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Today's Tasks</h2>
            <Button className="rounded-xl" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
          
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onToggle={() => toggleTask(task.id)}
              />
            ))}
          </div>

          {/* AI Suggestions */}
          <Card className="quest-card border-0 border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base">
                <Zap className="h-5 w-5 text-blue-600" />
                <span>AI Suggestions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium">☀️ Morning Boost</p>
                <p className="text-xs text-gray-600">Consider tackling your high-priority work tasks first while your energy is peak!</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium">🎯 Focus Time</p>
                <p className="text-xs text-gray-600">You have a 2-hour gap this afternoon - perfect for deep work on your project proposal.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Sidebar */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Achievements</h2>
          
          <div className="space-y-3">
            {mockAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>

          {/* Quick Actions */}
          <Card className="quest-card border-0">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start rounded-xl" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Sync Calendar
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-xl" size="sm">
                <Trophy className="h-4 w-4 mr-2" />
                View All Achievements
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
