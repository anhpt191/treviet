const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://xdyruzfaabjwtxjtbfso.supabase.co';
const supabaseKey = 'sb_publishable_WOy4S5465_sFNfJLs4wKWA_9fnf-08m';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Testing connection to Supabase...');
  try {
    const { data, error } = await supabase.from('site_content').select('id').limit(1);
    if (error) {
      console.error('Connection failed:', error.message);
      if (error.message.includes('Invalid API key') || error.message.includes('JWT')) {
        console.error('The provided Anon Key seems to be invalid or in an incorrect format.');
      }
    } else {
      console.log('Successfully connected to Supabase!');
      console.log('Data sample:', data);
    }
  } catch (err) {
    console.error('An unexpected error occurred:', err.message);
  }
}

testConnection();
