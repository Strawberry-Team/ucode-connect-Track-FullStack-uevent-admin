import { DefaultAuthProvider } from 'adminjs';
import { HashingService } from '../hashing.service.js';
import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';

import componentLoader from './component-loader.js';

const hashingService = new HashingService();

const provider = new DefaultAuthProvider({
  componentLoader,
  authenticate: async ({ email, password }) => {
    console.log('🔐 Authentication attempt for:', email);
    let connection;
    try {
      connection = await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        port: parseInt(process.env.DATABASE_PORT, 10),
        ssl: process.env.NODE_ENV === 'production' ? {
          rejectUnauthorized: false,
          ca: process.env.DATABASE_CA 
            ? readFileSync(process.env.DATABASE_CA, 'utf8') 
            : undefined,
        } : undefined,
      });

      console.log('✅ Database connection established');

      const [rows] = await connection.execute(
        'SELECT id, email, password, first_name, last_name FROM users WHERE email = ? AND is_email_verified IS TRUE AND role = "admin" LIMIT 1',
        [email]
      );

      const user = rows[0];
      if (!user) {
        console.log('❌ User not found or not verified admin:', email);
        return null;
      }

      console.log('✅ User found:', { email: user.email, name: `${user.first_name} ${user.last_name}` });

      const isPasswordValid = await hashingService.compare(password, user.password);

      if (!isPasswordValid) {
        console.log('❌ Invalid password for user:', email);
        return null;
      }

      console.log('✅ Authentication successful for:', email);
      return {
        email: user.email,
        title: `${user.first_name} ${user.last_name}`.trim(),
      };
    } catch (error) {
      console.error('❌ Authentication error:', error);
      console.error('Database config:', {
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT,
        ssl: process.env.NODE_ENV === 'production'
      });
      return null;
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  },
});

export default provider;
