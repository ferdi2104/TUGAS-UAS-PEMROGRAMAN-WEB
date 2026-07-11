/**
 * Jalankan sekali untuk buat akun owner:
 *   node scripts/create-owner.js <password>
 *
 * Contoh:
 *   node scripts/create-owner.js ferdi2104
 */

const https = require('https');

const SUPABASE_URL = 'https://dwhbhucfylqgfbktynwt.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3aGJodWNmeWxxZ2Zia3R5bnd0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzI3MTMxNiwiZXhwIjoyMDk4ODQ3MzE2fQ.kDRgDoBbnBT6vVtQhmHLcSCGRJmy1GpG3vyU-DTFLyI';
const OWNER_EMAIL = 'ferdi2104@students.omb.ac.id';

const password = process.argv[2];
if (!password || password.length < 6) {
  console.error('Usage: node scripts/create-owner.js <password-min-6-chars>');
  process.exit(1);
}

const body = JSON.stringify({
  email: OWNER_EMAIL,
  password,
  email_confirm: true,
  user_metadata: { full_name: 'Owner', role: 'owner' },
});

const options = {
  hostname: 'dwhbhucfylqgfbktynwt.supabase.co',
  path: '/auth/v1/admin/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': SERVICE_ROLE_KEY,
    'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    'Content-Length': Buffer.byteLength(body),
  },
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const json = JSON.parse(data);
    if (res.statusCode === 200 || res.statusCode === 201) {
      console.log('Owner account created successfully!');
      console.log('Email:', OWNER_EMAIL);
      console.log('ID:', json.id);
      console.log('\nYou can now login at /login');
    } else if (json.msg?.includes('already') || json.error?.includes('already')) {
      console.log('Owner account already exists!');
      console.log('Email:', OWNER_EMAIL);
      console.log('You can login at /login');
    } else {
      console.error('Error:', json);
    }
  });
});

req.on('error', (e) => {
  console.error('Request failed:', e.message);
});

req.write(body);
req.end();
