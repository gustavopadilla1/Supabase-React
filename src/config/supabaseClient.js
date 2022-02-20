import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://tznfbtacjepmkanfoqeq.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6bmZidGFjamVwbWthbmZvcWVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUzODczNTgsImV4cCI6MTk2MDk2MzM1OH0.AZFXhUnMAFArF65s4O3QZcXoexPbRDZ5jv6ysTrMuSQ"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)