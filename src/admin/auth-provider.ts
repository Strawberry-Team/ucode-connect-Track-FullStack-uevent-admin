import { DefaultAuthProvider } from 'adminjs';
import { HashingService } from '../hashing.service.js';
import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';

import componentLoader from './component-loader.js';

const hashingService = new HashingService();

const provider = new DefaultAuthProvider({
  componentLoader,
  authenticate: async ({ email, password }) => {
    let connection;
    try {
      connection = await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        port: parseInt(process.env.DATABASE_PORT, 10),
        ssl: process.env.DATABASE_HOST !== 'localhost' ? {
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
        console.error('❌ User not found or not verified admin:', email);
        return null;
      }

      const isPasswordValid = await hashingService.compare(password, user.password);

      if (!isPasswordValid) {
        console.error('❌ Invalid password for user:', email);
        return null;
      }

      return {
        email: user.email,
        title: `${user.first_name} ${user.last_name}`.trim(),
      };
    } catch (error) {
      console.error('❌ Authentication error:', error);
      return null;
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  },
});

export default provider;
