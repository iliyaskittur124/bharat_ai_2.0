const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables (you might need dotenv in a real project)
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function runMigrations() {
  const migrationsDir = path.join(__dirname, '../supabase/migrations');
  
  try {
    const files = fs.readdirSync(migrationsDir).sort();
    
    for (const file of files) {
      if (file.endsWith('.sql')) {
        console.log(`Running migration: ${file}`);
        const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
        
        // Use the rpc function to execute raw SQL if it's enabled, or a direct postgres connection.
        // Note: Supabase JS client doesn't have a direct 'execute raw SQL' method for security reasons unless using an RPC.
        // For actual direct migrations, using the postgres driver (e.g. pg package) is recommended over supabase-js.
        // This is a placeholder showing the intent if an RPC 'exec_sql' was defined, or assuming we use `pg`.
        
        console.warn("Note: To run raw SQL directly, you should use the 'pg' module to connect directly to the database connection string, as Supabase JS client doesn't support executing arbitrary SQL for security reasons.");
        console.log(`SQL Content of ${file}:`);
        console.log(sql.substring(0, 100) + '...'); // Print first 100 chars
      }
    }
    console.log("Migrations check completed.");
  } catch (error) {
    console.error("Migration error:", error);
  }
}

runMigrations();
