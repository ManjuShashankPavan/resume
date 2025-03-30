// frontend/src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// Debugging - verify environment variables
console.log('[Supabase] Config:', {
  url: process.env.REACT_APP_SUPABASE_URL,
  key: process.env.REACT_APP_SUPABASE_ANON_KEY // Changed to match your .env
});

// Initialize with error fallback
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY; // Updated variable name

if (!supabaseUrl || !supabaseKey) {
  // Create error element if initialization fails
  const errorEl = document.createElement('div');
  errorEl.style.cssText = `
    padding: 20px; 
    color: red; 
    font-family: sans-serif;
    max-width: 500px;
    margin: 50px auto;
  `;
  errorEl.innerHTML = `
    <h2>Configuration Error</h2>
    <p>Missing Supabase credentials</p>
    <p>Check:</p>
    <ul>
      <li>.env file exists in project root</li>
      <li>Variables start with REACT_APP_</li>
      <li>Server was restarted after changes</li>
    </ul>
    <p>Current values:</p>
    <pre>REACT_APP_SUPABASE_URL=${supabaseUrl || 'undefined'}</pre>
    <pre>REACT_APP_SUPABASE_ANON_KEY=${supabaseKey ? '***redacted***' : 'undefined'}</pre>
  `;
  document.body.appendChild(errorEl);
  throw new Error('Supabase configuration failed');
}

export const supabase = createClient(supabaseUrl, supabaseKey);