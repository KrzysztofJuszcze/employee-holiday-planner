
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://loskktpqihwgvhxxzgcd.supabase.co', import.meta.env.VITE_SUPABASE_API_KEY);

export default supabase