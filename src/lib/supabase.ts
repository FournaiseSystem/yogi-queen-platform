import { createClient } from '@supabase/supabase-js'

// On récupère les clés qu'on a mises dans .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// On crée la connexion unique pour toute l'app
export const supabase = createClient(supabaseUrl, supabaseAnonKey)