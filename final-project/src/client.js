import { createClient } from '@supabase/supabase-js'

const URL = 'https://cyxroptkjrlrukutklsu.supabase.co';
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5eHJvcHRranJscnVrdXRrbHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5MTI2OTMsImV4cCI6MjAyOTQ4ODY5M30.x0IqNA4NuEVWLk_vFGkJaUPWSJJz1KvleV64cGVO1Oo";

export const supabase = createClient(URL, API_KEY);
