import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const SUPABASE_URL = 'https://ujclsupanbflbbtbbuhc.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqY2xzdXBhbmJmbGJidGJidWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MjY0NzIsImV4cCI6MjA1MjUwMjQ3Mn0.T4TCx1HlVMJjo3Z-3YCmTF-ZHjnrrrL-rSz_Z-CckaI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});