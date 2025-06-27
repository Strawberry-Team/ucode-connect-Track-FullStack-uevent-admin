import { SessionOptions } from 'express-session';

export const getCookieSessionConfig = (): SessionOptions => ({
  resave: false, // Do not save session if it is not modified
  saveUninitialized: false, // Do not save new sessions without data
  secret: process.env.COOKIE_SECRET || 'fallback-secret-for-development',
  
  // Do not use any store - all data is stored in the client's cookies
  store: undefined,
  
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only on production
    httpOnly: true, // Cookies are not accessible through JavaScript (XSS protection)
    sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'strict', // CSRF protection
    domain: undefined, // Browser will determine the domain
    path: '/', // Cookies are accessible for the entire site
    maxAge: 24 * 60 * 60 * 1000, // 24 hours - session lifetime
    signed: true, // Signed cookies for integrity check
  },
  
  // Generator for unique session IDs
  genid: () => {
    return `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`;
  },
  
  // Name of the session cookie (must be unique)
  name: 'adminjs.session',
  
  // Do not update the cookie expiration time on each request (saves traffic)
  rolling: false,
  
  // Custom function to control when the session is considered "modified"
  // By default, express-session automatically manages this
}); 