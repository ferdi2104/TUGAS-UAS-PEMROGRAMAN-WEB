const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://dwhbhucfylqgfbktynwt.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3aGJodWNmeWxxZ2Zia3R5bnd0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzI3MTMxNiwiZXhwIjoyMDk4ODQ3MzE2fQ.kDRgDoBbnBT6vVtQhmHLcSCGRJmy1GpG3vyU-DTFLyI';

const supabase = createClient(supabaseUrl, serviceKey);

async function main() {
  // Check if movies table exists
  const { data: checkData, error: checkError } = await supabase.from('movies').select('id').limit(1);
  
  if (checkError && checkError.message.includes('relation') && checkError.message.includes('does not exist')) {
    console.log('Tables do not exist. Creating via Supabase Management API...');
    
    // Try the Supabase Management API SQL endpoint
    const sql = fs.readFileSync(path.join(__dirname, '..', 'prisma', 'migrasi_cinema.sql'), 'utf8');
    const seedSql = fs.readFileSync(path.join(__dirname, '..', 'prisma', 'seed_cinema.sql'), 'utf8');
    const fullSql = sql + '\n' + seedSql;
    
    // Execute via fetch to the Supabase Management API
    const response = await fetch(`https://api.supabase.com/v1/projects/dwhbhucfylqgfbktynwt/database/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceKey}`,
        'apikey': serviceKey,
      },
      body: JSON.stringify({ query: fullSql })
    });
    
    console.log('Management API response:', response.status);
    const text = await response.text();
    console.log(text.substring(0, 1000));
    return;
  }
  
  if (checkError) {
    console.log('Error checking table:', checkError.message);
    // Try to create by inserting via REST API (won't work but let's try)
    console.log('Trying alternative approach...');
  } else {
    console.log('Movies table exists! Checking data count...');
    const { count } = await supabase.from('movies').select('*', { count: 'exact', head: true });
    console.log('Movie count:', count);
    
    if (count === 0) {
      console.log('Seeding data...');
      const seedRes = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
        },
        body: JSON.stringify({ sql_text: fs.readFileSync(path.join(__dirname, '..', 'prisma', 'seed_cinema.sql'), 'utf8') })
      });
      console.log('Seed response:', seedRes.status, await seedRes.text().then(t => t.substring(0, 300)));
    }
  }
}

main().catch(e => {
  console.error('Fatal:', e.message);
  process.exit(1);
});
