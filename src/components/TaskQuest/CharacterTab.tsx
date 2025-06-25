
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Brain, 
  Palette, 
  Trophy,
  Star,
  ShoppingBag
} from 'lucide-react';

const characterStats = {
  level: 12,
  xp: 1247,
  nextLevelXp: 1500,
  energy: 85,
  focus: 72,
  creativity: 91,
};

const unlockedItems = [
  { id: 1, name: "Wizard Hat", type: "hat", rarity: "rare" },
  { id: 2, name: "Focus Glasses", type: "accessory", rarity: "common" },
  { id: 3, name: "Productivity Cape", type: "outfit", rarity: "epic" },
  { id: 4, name: "Mountain Workspace", type: "background", rarity: "rare" },
];

export const CharacterTab = () => {
  const xpProgress = (characterStats.xp / characterStats.nextLevelXp) * 100;

  return (
    <div className="space-y-6">
      {/* Character Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="quest-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>My Character</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              {/* Character Avatar Placeholder */}
              <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center animate-pulse-glow">
                <div className="text-4xl">🧙‍♂️</div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold">TaskMaster John</h3>
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  Level {characterStats.level} Achiever
                </Badge>
              </div>

              {/* XP Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Experience</span>
                  <span>{characterStats.xp} / {characterStats.nextLevelXp} XP</span>
                </div>
                <Progress value={xpProgress} className="h-3" />
                <p className="text-xs text-gray-500">
                  {characterStats.nextLevelXp - characterStats.xp} XP to next level
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Character Stats */}
        <Card className="quest-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-purple-500" />
              <span>Character Stats</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Energy</span>
                </div>
                <span className="text-sm font-bold text-yellow-600">{characterStats.energy}%</span>
              </div>
              <Progress value={characterStats.energy} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Focus</span>
                </div>
                <span className="text-sm font-bold text-blue-600">{characterStats.focus}%</span>
              </div>
              <Progress value={characterStats.focus} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Palette className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Creativity</span>
                </div>
                <span className="text-sm font-bold text-purple-600">{characterStats.creativity}%</span>
              </div>
              <Progress value={characterStats.creativity} className="h-2" />
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-gray-600 mb-2">💡 Boost your stats by completing different types of tasks!</p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center p-2 bg-yellow-50 rounded">
                  <div className="font-semibold">Work Tasks</div>
                  <div className="text-yellow-600">+Energy</div>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded">
                  <div className="font-semibold">Learning</div>
                  <div className="text-blue-600">+Focus</div>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded">
                  <div className="font-semibold">Creative</div>
                  <div className="text-purple-600">+Creativity</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Unlocked Items */}
      <Card className="quest-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-green-500" />
              <span>Unlocked Items</span>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl">
              Customize
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {unlockedItems.map((item) => (
              <div key={item.id} className="text-center p-4 bg-white/50 rounded-xl border border-white/30 hover:shadow-md transition-all">
                <div className="text-2xl mb-2">
                  {item.type === 'hat' && '🎩'}
                  {item.type === 'accessory' && '👓'}
                  {item.type === 'outfit' && '🦸'}
                  {item.type === 'background' && '🏔️'}
                </div>
                <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                <Badge 
                  variant="outline" 
                  className={
                    item.rarity === 'common' ? 'border-gray-300 text-gray-600' :
                    item.rarity === 'rare' ? 'border-blue-300 text-blue-600' :
                    'border-purple-300 text-purple-600'
                  }
                >
                  {item.rarity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
