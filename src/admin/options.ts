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

  const db = await new Adapter('mysql2', {
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '3306', 10)
  }).init();

  return {
    componentLoader,
    rootPath: '/admin',
    branding: {
      companyName: '[Admin] uevent',
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
};
