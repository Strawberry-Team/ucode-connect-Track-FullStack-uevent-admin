import { SessionOptions } from 'express-session';

export const getExpressSessionConfig = (): SessionOptions => ({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET || 'fallback-secret-for-development',
  
  // Use standard memory store - AdminJS itself manages cookies
  // store: not specified, so the standard MemoryStore is used
  
  cookie: {
    // secure only for production and HTTPS
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    // sameSite 'lax' for both environments for better compatibility
    sameSite: 'lax',
    path: '/',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    signed: false, // Disable signed cookies to avoid conflicts
  },
  
  name: 'adminjs.session',
  rolling: true, // Continue session on activity
});

// Alternative configuration for cases where the main one doesn't work
export const getAlternativeSessionConfig = (): SessionOptions => ({
  resave: true,
  saveUninitialized: true,
  secret: process.env.COOKIE_SECRET || 'fallback-secret-for-development',
  
  cookie: {
    secure: false, // Disable secure for testing
    httpOnly: false, // Allow JS access for testing
    sameSite: false, // Least restrictive settings
    path: '/',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    signed: false, // Signed cookies for security
  },
  
  name: 'adminjs.session',
  rolling: true,
}); 