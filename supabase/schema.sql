-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Travel itinerary requests table
CREATE TABLE public.itinerary_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  destination TEXT NOT NULL,
  duration_days INT NOT NULL,
  preferences TEXT,
  delivery_email TEXT NOT NULL,
  status TEXT DEFAULT 'Pending Review' CHECK (status IN ('Pending Review', 'Approved', 'Itinerary Sent')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row-Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itinerary_requests ENABLE ROW LEVEL SECURITY;

-- Policies: Users view and submit their own entries
CREATE POLICY "Users view own requests" ON public.itinerary_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own requests" ON public.itinerary_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Admins have full access across all user entries
CREATE POLICY "Admins full access" ON public.itinerary_requests FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);
