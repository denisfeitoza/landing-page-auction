import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://twpsbpdbnsqoqxjgpoik.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3cHNicGRibnNxb3F4amdwb2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1MjExNjQsImV4cCI6MjA4ODA5NzE2NH0.63VtRIObZ92E7G5ke2NW5iTsN2aw-rowKwUwsr8TgKA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
