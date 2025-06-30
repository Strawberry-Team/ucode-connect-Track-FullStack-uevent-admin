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
    ttl: 24 * 60 * 60, // 24 hours
    retries: 5,
    logFn: process.env.NODE_ENV === 'development' ? console.log : () => {},
  }),
  
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
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

// 🔒 SECURE PRODUCTION CONFIGURATION
export const getSecureSessionConfig = (): SessionOptions => ({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET || 'fallback-secret-for-development',
  
  // Use FileStore for persistent session storage
  store: new sessionFileStore({
    path: './sessions',
    ttl: 24 * 60 * 60, // 24 hours
    retries: 3,
    logFn: () => {}, // No logging in production
  }),
  
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true, // Prevent XSS attacks
    sameSite: 'strict', // Strong CSRF protection
    path: '/',
    maxAge: 8 * 60 * 60 * 1000, // 8 hours (shorter session)
    signed: true, // Sign cookies for additional security
  },
  
  name: 'adminjs.session',
  rolling: true, // Extend session on activity
});

// 🛡️ GRADUALLY IMPROVED SECURITY CONFIGURATION
export const getImprovedSessionConfig = (): SessionOptions => ({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET || 'fallback-secret-for-development',
  
  // Use MemoryStore but with better security settings
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true, // Prevent JavaScript access (XSS protection)
    sameSite: 'lax', // Good balance between security and usability
    path: '/',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    signed: false, // Keep signed false for now
  },
  
  name: 'adminjs.session',
  rolling: true,
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