import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });


if (!process.env.NEXT_PUBLIC_DATABASE_URL) {
  console.log('🔴 Cannot find database url');
}

export default {
  schema: './src/lib/supabase/schema.ts',
  out: './migrations',
  driver: 'pg',
  
  dbCredentials: {
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL || '',
    // host: 'localhost',       // Adresse de ton serveur PostgreSQL
    // port: "6543",              // Port (par défaut 5432)
    // user: 'postgres', // Nom d'utilisateur PostgreSQL
    // password: 'Mohamed.010621', // Mot de passe de l'utilisateur
    // database: 'postgres', // Nom de la base de données  
  },
} satisfies Config;