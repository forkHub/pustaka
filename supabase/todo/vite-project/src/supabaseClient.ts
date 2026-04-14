import { createClient } from "@supabase/supabase-js";

const VITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || `https://punaxsascwdlitkynfnd.supabase.co`;
const VITE_SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_eca4ZMXgyqczd05MOpTUkw_iOLMtdZp';

export const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY);
