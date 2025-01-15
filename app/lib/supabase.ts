import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yfpsfygcarexqwprubzk.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcHNmeWdjYXJleHF3cHJ1YnprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3NTU2ODQsImV4cCI6MjA0NzMzMTY4NH0.q2RAR0O4M7jRNCioPhqMLyN2-pcy3qqIC0i1tsj_Pak";

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;
