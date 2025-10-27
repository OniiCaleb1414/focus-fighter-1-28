import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Zap, 
  Brain, 
  Palette, 
  Trophy,
  Star,
  ShoppingBag,
  Upload,
  Plus
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export const CharacterTab = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [userItems, setUserItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [upgradingStats, setUpgradingStats] = useState(false);

  const XP_PER_STAT_LEVEL = 50;
  const nextLevelXp = stats?.level ? stats.level * 100 : 100;
  const xpProgress = stats ? (stats.xp / nextLevelXp) * 100 : 0;

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      const [statsData, profileData, itemsData, userItemsData] = await Promise.all([
        supabase.from('character_stats').select('*').eq('user_id', user.id).single(),
        supabase.from('profiles').select('*').eq('user_id', user.id).single(),
        supabase.from('items').select('*'),
        supabase.from('user_items').select('*, items(*)').eq('user_id', user.id)
      ]);

      if (statsData.data) setStats(statsData.data);
      if (profileData.data) setProfile(profileData.data);
      if (itemsData.data) setItems(itemsData.data);
      if (userItemsData.data) setUserItems(userItemsData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load character data');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    try {
      // For now, we'll use a data URL. In production, upload to storage
      const reader = new FileReader();
      reader.onloadend = async () => {
        const { error } = await supabase
          .from('profiles')
          .update({ avatar_url: reader.result as string })
          .eq('user_id', user.id);

        if (error) throw error;
        
        toast.success('Avatar updated!');
        fetchUserData();
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error updating avatar:', error);
      toast.error('Failed to update avatar');
    }
  };

  const handleStatUpgrade = async (statName: string, currentValue: number) => {
    if (!user || !stats) return;
    
    if (stats.xp < XP_PER_STAT_LEVEL) {
      toast.error(`Not enough XP! Need ${XP_PER_STAT_LEVEL} XP`);
      return;
    }

    setUpgradingStats(true);
    try {
      const { error } = await supabase
        .from('character_stats')
        .update({
          [statName]: currentValue + 1,
          xp: stats.xp - XP_PER_STAT_LEVEL
        })
        .eq('user_id', user.id);

      if (error) throw error;
      
      toast.success(`${statName.charAt(0).toUpperCase() + statName.slice(1)} increased!`);
      fetchUserData();
    } catch (error) {
      console.error('Error upgrading stat:', error);
      toast.error('Failed to upgrade stat');
    } finally {
      setUpgradingStats(false);
    }
  };

  const handlePurchaseItem = async (item: any) => {
    if (!user || !stats) return;

    if (stats.xp < item.xp_cost) {
      toast.error(`Not enough XP! Need ${item.xp_cost} XP`);
      return;
    }

    try {
      const [{ error: itemError }, { error: statsError }] = await Promise.all([
        supabase.from('user_items').insert({ user_id: user.id, item_id: item.id }),
        supabase.from('character_stats').update({ xp: stats.xp - item.xp_cost }).eq('user_id', user.id)
      ]);

      if (itemError || statsError) throw itemError || statsError;
      
      toast.success(`Purchased ${item.name}!`);
      fetchUserData();
    } catch (error: any) {
      if (error.code === '23505') {
        toast.error('You already own this item!');
      } else {
        console.error('Error purchasing item:', error);
        toast.error('Failed to purchase item');
      }
    }
  };

  const handleEquipItem = async (userItemId: string, equipped: boolean) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_items')
        .update({ equipped: !equipped })
        .eq('id', userItemId);

      if (error) throw error;
      
      toast.success(equipped ? 'Item unequipped' : 'Item equipped');
      fetchUserData();
    } catch (error) {
      console.error('Error toggling item:', error);
      toast.error('Failed to update item');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

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
              {/* Character Avatar - Clickable */}
              <div className="relative mx-auto w-32 h-32 group">
                <label htmlFor="avatar-upload" className="cursor-pointer block">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center animate-pulse-glow overflow-hidden">
                    {profile?.avatar_url ? (
                      <img 
                        src={profile.avatar_url} 
                        alt="Character" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-4xl">🧙‍♂️</div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
              
              <div>
                <h3 className="text-xl font-bold">{profile?.username || 'Adventurer'}</h3>
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  Level {stats?.level || 1} Achiever
                </Badge>
              </div>

              {/* XP Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Experience</span>
                  <span>{stats?.xp || 0} / {nextLevelXp} XP</span>
                </div>
                <Progress value={xpProgress} className="h-3" />
                <p className="text-xs text-gray-500">
                  {nextLevelXp - (stats?.xp || 0)} XP to next level
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Character Stats - Upgradable */}
        <Card className="quest-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-purple-500" />
                <span>Character Stats</span>
              </div>
              <span className="text-sm font-normal text-gray-500">
                {stats?.xp || 0} XP available
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Energy Stat */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Energy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-yellow-600">Level {stats?.energy || 1}</span>
                  <Button 
                    size="sm" 
                    onClick={() => handleStatUpgrade('energy', stats?.energy || 1)}
                    disabled={upgradingStats || (stats?.xp || 0) < XP_PER_STAT_LEVEL}
                    className="h-6 w-6 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-gray-500">Cost: {XP_PER_STAT_LEVEL} XP</p>
            </div>

            {/* Focus Stat */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Focus</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-blue-600">Level {stats?.focus || 1}</span>
                  <Button 
                    size="sm" 
                    onClick={() => handleStatUpgrade('focus', stats?.focus || 1)}
                    disabled={upgradingStats || (stats?.xp || 0) < XP_PER_STAT_LEVEL}
                    className="h-6 w-6 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-gray-500">Cost: {XP_PER_STAT_LEVEL} XP</p>
            </div>

            {/* Creativity Stat */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Palette className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Creativity</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-purple-600">Level {stats?.creativity || 1}</span>
                  <Button 
                    size="sm" 
                    onClick={() => handleStatUpgrade('creativity', stats?.creativity || 1)}
                    disabled={upgradingStats || (stats?.xp || 0) < XP_PER_STAT_LEVEL}
                    className="h-6 w-6 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-gray-500">Cost: {XP_PER_STAT_LEVEL} XP</p>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-gray-600">💡 Complete tasks to earn XP and upgrade your stats!</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Item Shop & Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shop */}
        <Card className="quest-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-green-500" />
              <span>Item Shop</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {items.map((item) => {
                const isPurchased = userItems.some(ui => ui.item_id === item.id);
                return (
                  <div 
                    key={item.id} 
                    className="text-center p-3 bg-white/50 rounded-xl border border-white/30 hover:shadow-md transition-all"
                  >
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                    <Badge 
                      variant="outline" 
                      className={
                        item.rarity === 'common' ? 'border-gray-300 text-gray-600 mb-2' :
                        item.rarity === 'rare' ? 'border-blue-300 text-blue-600 mb-2' :
                        'border-purple-300 text-purple-600 mb-2'
                      }
                    >
                      {item.rarity}
                    </Badge>
                    <Button
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => handlePurchaseItem(item)}
                      disabled={isPurchased || (stats?.xp || 0) < item.xp_cost}
                    >
                      {isPurchased ? 'Owned' : `${item.xp_cost} XP`}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* My Items */}
        <Card className="quest-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>My Items</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userItems.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No items yet. Buy some from the shop!</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {userItems.map((userItem) => (
                  <div 
                    key={userItem.id} 
                    className={`text-center p-3 rounded-xl border transition-all ${
                      userItem.equipped 
                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-400 shadow-md' 
                        : 'bg-white/50 border-white/30 hover:shadow-md'
                    }`}
                  >
                    <div className="text-3xl mb-2">{userItem.items.icon}</div>
                    <h4 className="font-medium text-sm mb-1">{userItem.items.name}</h4>
                    <Button
                      size="sm"
                      variant={userItem.equipped ? "default" : "outline"}
                      className="w-full mt-2"
                      onClick={() => handleEquipItem(userItem.id, userItem.equipped)}
                    >
                      {userItem.equipped ? 'Equipped' : 'Equip'}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
