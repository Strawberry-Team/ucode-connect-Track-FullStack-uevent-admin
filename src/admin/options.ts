import { AdminJSOptions } from 'adminjs';
import componentLoader from './component-loader.js';
import { Adapter, Database, Resource } from '@adminjs/sql';
import 'dotenv/config';

/**
 * Returns AdminJSOptions after initializing SQL adapter for MySQL
 */
export const getAdminOptions = async (): Promise<AdminJSOptions> => {
  // @ts-ignore
  const AdminJS = (await import('adminjs')).default;
  AdminJS.registerAdapter({ Database, Resource });

  try {
    const db = await new Adapter('mysql2', {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '3306', 10),
      ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false, // для TiDB Cloud
      } : undefined,
      connectTimeout: 60000,
    }).init();

    return {
      componentLoader,
      rootPath: '/admin',
      branding: {
        companyName: `[Admin] ${process.env.APP_NAME}`,
        favicon: `${process.env.FRONTEND_URL}/favicon.ico`,  
      },
      resources: [
        {
          resource: db.table('users'),
          options: {
            listProperties: [
              'id',
              'email',
              'first_name',
              'last_name',
              'role',
              'is_email_verified',
              'updated_at',
              'created_at',
            ],
            properties: {
              password: {
                type: 'password',
                isVisible: { edit: false, show: false, list: false, filter: false },
                isDisabled: true,
                isEditable: false,
              },
              profile_picture_name: {
                isVisible: { edit: false, show: false, list: false, filter: false },
                isDisabled: true,
                isEditable: false,
              },
              updated_at: {
                isVisible: { edit: false, show: true, list: false, filter: false },
                isDisabled: true,
                isEditable: false,
              },
              created_at: {
                isVisible: { edit: false, show: true, list: false, filter: false },
                isDisabled: true,
                isEditable: false,
              },
            },
          },
        },
        {
          resource: db.table('event_formats'),
          options: {
            listProperties: [
              'id',
              'title',
            ],
            properties: {
              id: {
                isVisible: { edit: false, show: true, list: false, filter: false },
              },
              updated_at: {
                isVisible: { edit: false, show: true, list: false, filter: false },
                isDisabled: true,
                isEditable: false,
              },
              created_at: {
                isVisible: { edit: false, show: true, list: false, filter: false },
                isDisabled: true,
                isEditable: false,
              },
            },
          },
        },
        {
          resource: db.table('event_themes'),
          options: {
            listProperties: [
              'id',
              'title',
            ],
            properties: {
              id: {
                isVisible: { edit: false, show: true, list: false, filter: false },
              },
              updated_at: {
                isVisible: { edit: false, show: true, list: false, filter: false },
                isDisabled: true,
                isEditable: false,
              },
              created_at: {
                isVisible: { edit: false, show: true, list: false, filter: false },
                isDisabled: true,
                isEditable: false,
              },
            },
          },
        },
        {
          resource: db.table('_prisma_migrations'),
          options: {
            listProperties: ['migration_name'],
            showProperties: ['migration_name'],
            filterProperties: [],
            editProperties: [],
            actions: {
              new: { isAccessible: false },
              edit: { isAccessible: false },
              delete: { isAccessible: false },
              bulkDelete: { isAccessible: false },
            },
            properties: {
              migration_name: {
                isVisible: { list: true, show: true, edit: false, filter: false },
                isDisabled: true,
                isEditable: false,
              },
            },
          },
        }
      ],
      databases: [db],
    };
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('\n🔧 To fix this issue:');
    console.log('1. Install MySQL/MariaDB locally');
    console.log('2. Create database "univent_dev"');
    console.log('3. Update .env.development with correct database credentials');
    console.log('4. Or run without database for now\n');
    
    // Return minimal config without database
    return {
      componentLoader,
      rootPath: '/admin',
      branding: {
        companyName: `[Admin] ${process.env.APP_NAME || 'Univent'}`,
        favicon: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/favicon.ico`,  
      },
      resources: [],
      databases: [],
    };
  }
};
