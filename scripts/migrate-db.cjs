const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
  connectionString: 'postgresql://postgres:D%40eng21042002@db.dwhbhucfylqgfbktynwt.supabase.co:6543/postgres',
  ssl: { rejectUnauthorized: false }
});

async function runSQL(filename) {
  const sql = fs.readFileSync(path.join(__dirname, '..', filename), 'utf8');
  console.log(`Running ${filename}...`);
  const statements = sql.split(';').filter(s => s.trim().length > 0);
  for (const stmt of statements) {
    try {
      await client.query(stmt);
    } catch (e) {
      if (!e.message.includes('already exists') && !e.message.includes('duplicate key') && !e.message.includes('DO NOTHING')) {
        console.log(`  Warning: ${e.message.substring(0, 100)}`);
      }
    }
  }
  console.log(`  Done: ${filename}`);
}

async function main() {
  try {
    await client.connect();
    console.log('Connected to database!');

    await runSQL('prisma/migrasi_cinema.sql');
    await runSQL('prisma/seed_cinema.sql');

    console.log('\nAll tables created and data seeded!');
    await client.end();
  } catch (e) {
    console.error('Failed:', e.message);
    process.exit(1);
  }
}

main();
