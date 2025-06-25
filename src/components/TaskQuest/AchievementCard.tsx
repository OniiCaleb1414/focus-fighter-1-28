
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
}

interface AchievementCardProps {
  achievement: Achievement;
}

export const AchievementCard = ({ achievement }: AchievementCardProps) => {
  return (
    <Card className={cn(
      "quest-card border-0 transition-all duration-200",
      achievement.unlocked 
        ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 animate-pulse-glow" 
        : "hover:shadow-md"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className={cn(
            "text-2xl transition-all duration-200",
            achievement.unlocked ? "animate-bounce-slow" : "grayscale opacity-50"
          )}>
            {achievement.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold text-sm">{achievement.title}</h4>
              {achievement.unlocked && (
                <Badge className="bg-yellow-500 text-white text-xs">
                  Unlocked!
                </Badge>
              )}
            </div>
            
            <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium">{achievement.progress}%</span>
              </div>
              <Progress 
                value={achievement.progress} 
                className={cn(
                  "h-2",
                  achievement.unlocked && "bg-gradient-to-r from-yellow-400 to-orange-400"
                )}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
