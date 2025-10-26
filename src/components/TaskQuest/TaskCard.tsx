
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar, Star } from 'lucide-react';

interface Task {
  id: string | number;
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  completed: boolean;
  xp: number;
}

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-red-100 text-red-800 border-red-200',
};

const categoryColors = {
  Work: 'bg-blue-100 text-blue-800',
  Health: 'bg-green-100 text-green-800',
  Learning: 'bg-purple-100 text-purple-800',
  Personal: 'bg-pink-100 text-pink-800',
};

export const TaskCard = ({ task, onToggle }: TaskCardProps) => {
  return (
    <Card className={cn(
      "quest-card border-0 transition-all duration-200 hover:shadow-lg",
      task.completed && "opacity-75 bg-green-50/50"
    )}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Checkbox
            checked={task.completed}
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className={cn(
                "font-medium text-sm",
                task.completed && "line-through text-gray-500"
              )}>
                {task.title}
              </h3>
              {task.completed && (
                <div className="animate-celebration">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge 
                variant="secondary" 
                className={categoryColors[task.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'}
              >
                {task.category}
              </Badge>
              <Badge 
                variant="outline" 
                className={cn("text-xs", priorityColors[task.priority])}
              >
                {task.priority}
              </Badge>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {task.dueDate}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm font-semibold text-blue-600">+{task.xp} XP</div>
            {task.completed && (
              <div className="text-xs text-green-600 font-medium">✨ Earned!</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
