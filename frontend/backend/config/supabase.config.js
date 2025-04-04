// backend/config/supabase.config.js
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

// Note: Backend should use the SERVICE ROLE key, not the ANON key
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

module.exports = supabase;