import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Validação básica para evitar erros silenciosos
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ Supabase Client: Chaves não detectadas no .env. Verifique sua configuração em .env ou .env.local.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
