-- Schema for Birds & Bees Cafeto (Production PostgreSQL / Supabase Migration)
-- Used when transitioning from demo localStorage adapters to live full-stack services.

CREATE TABLE IF NOT EXISTS bookings (
  id VARCHAR(64) PRIMARY KEY,
  date DATE NOT NULL,
  time VARCHAR(16) NOT NULL,
  guests INTEGER NOT NULL CHECK (guests > 0 AND guests <= 12),
  seating VARCHAR(32) NOT NULL DEFAULT 'Garden',
  occasion VARCHAR(64) NOT NULL DEFAULT 'Just because',
  name VARCHAR(128) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  email VARCHAR(256) NOT NULL,
  notes TEXT,
  status VARCHAR(32) NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_date_time ON bookings (date, time, status);
CREATE INDEX IF NOT EXISTS idx_bookings_phone ON bookings (phone);

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(128) NOT NULL,
  email VARCHAR(256) NOT NULL,
  phone VARCHAR(32),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hire_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(128) NOT NULL,
  email VARCHAR(256) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  role VARCHAR(128) NOT NULL,
  experience TEXT NOT NULL,
  resume_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(256) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
