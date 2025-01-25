import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

if (!process.env.NEXT_PUBLIC_DATABASE_URL) {
  console.log('🔴 Cannot find database URL');
} else {
  console.log('✅ Database URL loaded:', process.env.NEXT_PUBLIC_DATABASE_URL);
}