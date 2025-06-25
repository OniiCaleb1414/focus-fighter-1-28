
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Coffee, 
  Moon, 
  Activity,
  Smile,
  AlertTriangle
} from 'lucide-react';

const wellBeingData = {
  calmMeter: 72,
  workLifeBalance: 65,
  restScore: 80,
  weeklyOvertime: 12,
  suggestedBreaks: 3,
  mindfulnessBadges: 5,
};

const mindfulnessTips = [
  {
    id: 1,
    icon: "🧘‍♀️",
    title: "5-Minute Meditation",
    description: "Take a quick meditation break to reset your focus",
    duration: "5 min",
  },
  {
    id: 2,
    icon: "🌱",
    title: "Breathing Exercise",
    description: "Practice deep breathing to reduce stress",
    duration: "3 min",
  },
  {
    id: 3,
    icon: "🚶‍♂️",
    title: "Mindful Walk",
    description: "Take a short walk to clear your mind",
    duration: "10 min",
  },
];

export const WellBeingTab = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Well-being Center</h1>
        <p className="text-gray-600">Balance productivity with self-care and mindfulness</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Well-being Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Calm Meter */}
          <Card className="quest-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-pink-500" />
                <span>Your Well-being Today</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-pink-50 rounded-xl">
                  <Smile className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-pink-600">{wellBeingData.calmMeter}%</div>
                  <div className="text-sm text-gray-600">Calm Meter</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Activity className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{wellBeingData.workLifeBalance}%</div>
                  <div className="text-sm text-gray-600">Work-Life Balance</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Moon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{wellBeingData.restScore}%</div>
                  <div className="text-sm text-gray-600">Rest Quality</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Work-Life Balance Insights */}
          <Card className="quest-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-orange-500" />
                <span>Balance Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Overwork Alert</p>
                  <p className="text-xs text-gray-600">
                    You've worked {wellBeingData.weeklyOvertime} extra hours this week. Consider taking a break!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Coffee className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-sm">Suggested Breaks</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">{wellBeingData.suggestedBreaks}</div>
                  <p className="text-xs text-gray-600">Recommended for today</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="h-4 w-4 text-purple-600" />
                    <span className="font-medium text-sm">Mindfulness Badges</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">{wellBeingData.mindfulnessBadges}</div>
                  <p className="text-xs text-gray-600">Earned this month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Tracking */}
          <Card className="quest-card border-0">
            <CardHeader>
              <CardTitle>Weekly Well-being Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Stress Management</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Work-Life Balance</span>
                    <span>{wellBeingData.workLifeBalance}%</span>
                  </div>
                  <Progress value={wellBeingData.workLifeBalance} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Mindfulness Practice</span>
                    <span>88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mindfulness Sidebar */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Mindfulness Corner</h2>
          
          <div className="space-y-3">
            {mindfulnessTips.map((tip) => (
              <Card key={tip.id} className="quest-card border-0 hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{tip.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1">{tip.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{tip.description}</p>
                      <Badge variant="outline" className="text-xs">
                        {tip.duration}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card className="quest-card border-0">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start rounded-xl" size="sm">
                <Coffee className="h-4 w-4 mr-2" />
                Take a Break
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-xl" size="sm">
                <Moon className="h-4 w-4 mr-2" />
                Set Rest Reminder
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-xl" size="sm">
                <Activity className="h-4 w-4 mr-2" />
                View Insights
              </Button>
            </CardContent>
          </Card>

          {/* Rest Achievements */}
          <Card className="quest-card border-0 bg-gradient-to-br from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-base flex items-center space-x-2">
                <Moon className="h-4 w-4 text-blue-600" />
                <span>Rest Rewards</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl mb-2">🌙</div>
                  <p className="text-sm font-medium">Well-Rested Warrior</p>
                  <p className="text-xs text-gray-600">Maintain good sleep habits for 7 days</p>
                  <Progress value={85} className="h-2 mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
