// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://boaxoztelkjjvqvlcsql.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvYXhvenRlbGtqanZxdmxjc3FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3OTQ5MTEsImV4cCI6MjA2NjM3MDkxMX0.Mr93qjSmXa-3ddB5shjTZvNSvZKUxyDtQ4-scThnjo4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);