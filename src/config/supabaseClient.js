import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://jvnxtsprjixrhfrddtmf.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2bnh0c3Byaml4cmhmcmRkdG1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUwNTgwMjksImV4cCI6MTk2MDYzNDAyOX0.-lx0Ee7KoF0uTjAe-W7HLmcMx9C9G-ckl28FEYrdayY"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)