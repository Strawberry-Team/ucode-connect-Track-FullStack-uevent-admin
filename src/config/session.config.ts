import { SessionOptions } from 'express-session';
import session from 'express-session';
import FileStore from 'session-file-store';

// Create FileStore for persistent session storage
const sessionFileStore = FileStore(session);

export const getExpressSessionConfig = (): SessionOptions => ({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET || 'fallback-secret-for-development',
  
  // Use FileStore for session storage
  store: new sessionFileStore({
    path: './sessions',
    ttl: 24 * 60 * 60, // 24 години в секундах
    retries: 5,
    logFn: process.env.NODE_ENV === 'development' ? console.log : () => {},
  }),
  
  cookie: {
    // Disable secure even for production for diagnostics
    secure: false,
    httpOnly: true,
    // Use 'lax' instead of 'none' because 'none' requires secure: true
    sameSite: 'lax',
    path: '/',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    signed: false,
  },
  
  name: 'adminjs.session',
  rolling: true,
});

// Alternative configuration with minimal settings
export const getSimpleSessionConfig = (): SessionOptions => ({
  resave: true,
  saveUninitialized: true,
  secret: process.env.COOKIE_SECRET || 'fallback-secret-for-development',
  
  // No external store - use MemoryStore
  
  cookie: {
    secure: false,
    httpOnly: false,
    sameSite: false,
    path: '/',
    maxAge: 24 * 60 * 60 * 1000,
    signed: false,
  },
  
  name: 'adminjs.session',
  rolling: false,
});

// Configuration using cookie-session instead of express-session
export const getCookieSessionConfig = () => ({
  name: 'adminjs.session',
  keys: [process.env.COOKIE_SECRET || 'fallback-secret-for-development'],
  maxAge: 24 * 60 * 60 * 1000,
  secure: false,
  httpOnly: false,
  sameSite: 'lax',
}); 