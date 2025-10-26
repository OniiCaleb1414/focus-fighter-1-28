
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CheckCircle, 
  Clock, 
  Target, 
  Trophy, 
  Zap,
  Plus,
  Calendar,
  Loader2
} from 'lucide-react';
import { TaskCard } from './TaskCard';
import { AchievementCard } from './AchievementCard';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  description?: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  completed: boolean;
  xp_value: number;
}

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
  const { user } = useAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'personal',
    priority: 'medium' as 'low' | 'medium' | 'high',
    xp_value: 10,
  });

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load tasks",
        variant: "destructive",
      });
    } else {
      setTasks((data || []).map(task => ({
        ...task,
        priority: task.priority as 'low' | 'medium' | 'high'
      })));
    }
    setLoading(false);
  };

  const createTask = async () => {
    if (!user || !newTask.title.trim()) {
      toast({
        title: "Validation Error",
        description: "Task title is required",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from('tasks').insert([
      {
        user_id: user.id,
        title: newTask.title.trim(),
        description: newTask.description.trim() || null,
        category: newTask.category,
        priority: newTask.priority,
        xp_value: newTask.xp_value,
        completed: false,
      },
    ]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Task Created",
        description: `You'll earn ${newTask.xp_value} XP when completed!`,
      });
      setShowNewTaskDialog(false);
      setNewTask({
        title: '',
        description: '',
        category: 'personal',
        priority: 'medium',
        xp_value: 10,
      });
      fetchTasks();
    }
  };

  const toggleTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newCompletedState = !task.completed;

    const { error } = await supabase
      .from('tasks')
      .update({ completed: newCompletedState })
      .eq('id', taskId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    } else {
      if (newCompletedState) {
        // Award XP
        const { data: stats } = await supabase
          .from('character_stats')
          .select('xp, level')
          .eq('user_id', user!.id)
          .single();

        if (stats) {
          const newXp = stats.xp + task.xp_value;
          const newLevel = Math.floor(newXp / 100) + 1;

          await supabase
            .from('character_stats')
            .update({ xp: newXp, level: newLevel })
            .eq('user_id', user!.id);

          toast({
            title: "Task Completed! 🎉",
            description: `+${task.xp_value} XP earned!`,
          });
        }
      }
      fetchTasks();
    }
  };
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const dailyProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <>
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
                    <p className="text-sm text-gray-600">Total XP</p>
                    <p className="text-lg font-bold text-purple-600">{tasks.reduce((sum, t) => t.completed ? sum + t.xp_value : sum, 0)}</p>
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
                <Button 
                  className="rounded-xl" 
                  size="sm"
                  onClick={() => setShowNewTaskDialog(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
              
              {tasks.length === 0 ? (
                <Card className="quest-card border-0 p-8 text-center">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
                  <p className="text-gray-600 mb-4">Create your first task to start your quest!</p>
                  <Button onClick={() => setShowNewTaskDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Task
                  </Button>
                </Card>
              ) : (
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <TaskCard 
                      key={task.id} 
                      task={{
                        id: task.id,
                        title: task.title,
                        category: task.category,
                        priority: task.priority,
                        dueDate: task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date',
                        completed: task.completed,
                        xp: task.xp_value,
                      }} 
                      onToggle={() => toggleTask(task.id)}
                    />
                  ))}
                </div>
              )}

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
                    <p className="text-xs text-gray-600">Consider tackling your high-priority tasks first while your energy is peak!</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium">🎯 Focus Time</p>
                    <p className="text-xs text-gray-600">Break down larger tasks into smaller, manageable chunks for better progress.</p>
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
        </>
      )}

      {/* New Task Dialog */}
      <Dialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Add a new task to your quest and earn XP when you complete it!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                placeholder="What needs to be done?"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Add more details..."
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newTask.category}
                  onValueChange={(value) => setNewTask({ ...newTask, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="learning">Learning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: 'low' | 'medium' | 'high') => setNewTask({ ...newTask, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="xp">XP Reward</Label>
              <Input
                id="xp"
                type="number"
                min="1"
                value={newTask.xp_value}
                onChange={(e) => setNewTask({ ...newTask, xp_value: parseInt(e.target.value) || 10 })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewTaskDialog(false)}>
              Cancel
            </Button>
            <Button onClick={createTask}>Create Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
