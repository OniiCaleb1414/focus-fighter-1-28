-- Add focus and creativity stats to character_stats
ALTER TABLE public.character_stats 
ADD COLUMN IF NOT EXISTS focus integer NOT NULL DEFAULT 1,
ADD COLUMN IF NOT EXISTS creativity integer NOT NULL DEFAULT 1;

-- Create items table for shop
CREATE TABLE IF NOT EXISTS public.items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  type text NOT NULL,
  rarity text NOT NULL,
  xp_cost integer NOT NULL,
  icon text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create user_items table to track purchased and equipped items
CREATE TABLE IF NOT EXISTS public.user_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  item_id uuid NOT NULL REFERENCES public.items(id) ON DELETE CASCADE,
  equipped boolean NOT NULL DEFAULT false,
  purchased_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, item_id)
);

-- Enable RLS
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for items (everyone can view)
CREATE POLICY "Items are viewable by everyone"
ON public.items
FOR SELECT
USING (true);

-- RLS Policies for user_items
CREATE POLICY "Users can view their own items"
ON public.user_items
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own items"
ON public.user_items
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own items"
ON public.user_items
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own items"
ON public.user_items
FOR DELETE
USING (auth.uid() = user_id);

-- Insert some default items
INSERT INTO public.items (name, type, rarity, xp_cost, icon) VALUES
('Wizard Hat', 'hat', 'rare', 100, '🎩'),
('Focus Glasses', 'accessory', 'common', 50, '👓'),
('Productivity Cape', 'outfit', 'epic', 200, '🦸'),
('Mountain Workspace', 'background', 'rare', 150, '🏔️'),
('Crown of Achievement', 'hat', 'epic', 250, '👑'),
('Energy Ring', 'accessory', 'rare', 120, '💍'),
('Scholar Robe', 'outfit', 'rare', 180, '🎓'),
('Beach Paradise', 'background', 'common', 80, '🏖️')
ON CONFLICT DO NOTHING;