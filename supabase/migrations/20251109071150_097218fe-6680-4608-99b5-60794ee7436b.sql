-- Create ratings table
CREATE TABLE public.ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view ratings
CREATE POLICY "Anyone can view ratings" 
ON public.ratings 
FOR SELECT 
USING (true);

-- Allow anyone to insert ratings (no auth required for visitors)
CREATE POLICY "Anyone can insert ratings" 
ON public.ratings 
FOR INSERT 
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_ratings_created_at ON public.ratings(created_at DESC);