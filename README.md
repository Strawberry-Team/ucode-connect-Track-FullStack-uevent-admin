<div align="center">
   <p align="center">
      <a href="https://ucode.world/en/" target="_blank">
         <img src="./public/ucode_it_academy_logo.svg" height="100px" alt="ucode_logo">
      </a>
   </p>

   <img src="./public/logo_black.png" width="200" />
   <h1 align="center">Univent</h1>

<p align="center">
   <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
   <img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white" alt="Node.js" />
   <img src="https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white" alt="NestJS" />
   <img src="https://img.shields.io/badge/AdminJS-FF6B6B?logo=admin&logoColor=white" alt="AdminJS" />
   <img src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=white" alt="Express" />
   <img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white" alt="MySQL" />
   <img src="https://img.shields.io/badge/Bcrypt-003087?logo=bcrypt&logoColor=white" alt="Bcrypt" />
   <img src="https://img.shields.io/badge/cookie_parser-000000?logo=cookiecutter&logoColor=white" alt="cookie-parser" />
   <img src="https://img.shields.io/badge/express_session-000000?logo=express&logoColor=white" alt="express-session" />
   <img src="https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white" alt="ESLint" />
   <img src="https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=black" alt="Prettier" />
</p>

   <h3>
      <p align="center">
         <sub><i>
            ucode connect uevent "Univent" is the project of ucode connect the Track FullStack programming bootcamp<br />
            lasting 5 weeks (March 31, 2025 - May 2, 2025),<br />where the NestJS with TypeScript and React with Next.js were used to develop the event ticketing service.<br /><br />
            The purpose: create an event ticketing service to unite people with the same interests<br />using the whole cycle of Challenge Based Learning framework with a team.
         </i></sub>
      </p>
   </h3>
</div>



# 📑 Table of Contents
- [🗓️ About "Univent" Platform](#-about-univent-platform)
- [🧑‍💻 Team](#-team)
- [🗓 About "Univent" Admin Panel](#-about-univent-admin-panel)
- [🎯 Features and Functionality](#-features-and-functionality)
  - [🔐 Authentication & Authorization](#-authentication--authorization)
  - [👥 User Management](#-user-management)
  - [🎪 Event Management](#-event-management)
  - [🗄️ Database Management](#️-database-management)
  - [🛡️ Security Features](#️-security-features)
  - [🖥️ Administrative Interface](#️-administrative-interface)
  - [📱 Session Management](#-session-management)
  - [🔧 CORS Configuration](#-cors-configuration)
- [⚙️ Requirements and Dependencies](#️-requirements-and-dependencies)
- [🚀 How to Run the Solution](#-how-to-run-the-solution)
- [👤 Admin Credentials](#-admin-credentials)



# 🗓️ About "Univent" Platform
<b>Univent</b> is a platform for creating, attending and managing events! 

Organise events with interactive maps, buy tickets, use promo codes and receive notifications. 

A user-friendly profile for everyone - from organisers to guests.

Here is a [link](https://docs.google.com/presentation/d/1sdtH8O495crk_I2gUyWO1z9XUWx4i6cH/edit?usp=sharing&ouid=109902939512595211399&rtpof=true&sd=true) to the presentation file.</p>

![Description](https://github.com/user-attachments/assets/bbef933a-aff0-4612-a0fa-c3734263a027)
![Desktop View](https://github.com/user-attachments/assets/8a7ca803-97f9-4dc4-a509-0609296614ac)
![Tablet View](https://github.com/user-attachments/assets/cd5f8352-8896-4a96-8488-c747902ff0c7)
![Mobile and Tablet View](https://github.com/user-attachments/assets/cbd9ebe4-e325-4fed-9b36-4b0ec51e1ff6)



# 🧑‍💻 Team
<div>
    <table width="100%" border="0" cellpadding="1" align="center">  
        <tr>
            <td align="center">
                <a href="https://github.com/InessaRepeshko">
                    <img src="https://avatars.githubusercontent.com/u/80609514?v=4?s=100" width="150px;" alt="Inessa Repeshko"/><br />
                    <sub><b>Inessa Repeshko</b></sub>
                </a><br />
            </td>
            <td align="center">
                <a href="https://github.com/laskevych">
                    <img src="https://avatars.githubusercontent.com/u/29709878?v=4?s=100" width="150px;" alt="Andrew Laskevych"/><br />
                    <sub><b>Andrew Laskevych</b></sub>
                </a><br />
            </td>
        </tr>
    </table>
</div><br />



# 🗓 About "Univent" Admin Panel
The Univent Admin Panel is a secure, web-based administrative interface built with NestJS and AdminJS to manage the Univent event platform. It provides administrators with tools to manage users, companies, events, payments, and other data.

The admin panel connects directly to the MySQL database, offering CRUD operations through an intuitive AdminJS interface. Key features include admin-only authentication with email verification, secure session management using file-based storage, and comprehensive security headers for protection against common web vulnerabilities.





# 🎯 Features and Functionality
**Univent Admin Panel** provides the following administrative capabilities:

### 🔐 Authentication & Authorization
- Secure admin authentication with email and password validation
- Role-based access control (admin users only with verified email)
- Password hashing using bcrypt for secure credential storage
- Session-based authentication with AdminJS integration
- Database-driven user authentication against MySQL users table

### 👥 User Management
- View and manage user accounts through AdminJS interface
- User profile information display (email, first_name, last_name, role)
- Email verification status monitoring (is_email_verified field)
- User creation timestamps tracking (created_at, updated_at)
- Sensitive data protection (passwords and profile pictures hidden from interface)
- Read-only view for timestamp fields

### 🎪 Event Management
- **Event Formats**: Management of event format types (id, title)
- **Event Themes**: Administration of event theme categories (id, title)
- CRUD operations for event formats and themes
- Read-only timestamp tracking for event-related data

### 🗄️ Database Management
- Direct MySQL database connection using `@adminjs/sql` adapter
- Database migration tracking through `_prisma_migrations` table (read-only)
- SSL/TLS connection support for remote database access
- Connection timeout configuration (60 seconds)
- Automatic fallback configuration if database connection fails

### 🛡️ Security Features
- Security headers middleware implementation:
  - X-Frame-Options: SAMEORIGIN (clickjacking prevention)
  - X-Content-Type-Options: nosniff (MIME type sniffing protection)
  - X-XSS-Protection: 1; mode=block (XSS protection)
  - Referrer-Policy: strict-origin-when-cross-origin
  - Content Security Policy (basic implementation)
- Secure cookie configuration with httpOnly and sameSite
- Environment-based security configuration
- Cookie parser integration with secret key

### 🖥️ Administrative Interface
- AdminJS-powered web interface at `/admin` route
- Custom branding with Univent logos and company name
- Responsive interface with built-in CRUD operations
- Custom resource configuration for each database table
- Automated redirect from root path to admin panel
- Static file serving for public assets (logos, favicon)

### 📱 Session Management
- File-based session storage using `session-file-store`
- Memory-based sessions for development environment
- Configurable session timeout (24 hours)
- Session rolling on activity
- Secure session configuration:
  - HttpOnly cookies
  - SameSite protection
  - Environment-specific secure flag
- Automatic sessions directory creation in production

### 🔧 CORS Configuration
- Environment-specific allowed origins
- Comprehensive headers support
- Cookie credentials enabled
- Multiple HTTP methods support (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `OPTIONS`)



# ⚙️ Requirements and Dependencies
Before starting, ensure the required technologies are installed.

- **Node.JS** >= v18.0
- **NPM** >= v8.0
- **MySQL** >= 8.0
- **TypeScript** >= v5.0



# 🚀 How to Run the Solution
1. Run the ["Univent" Backend](https://github.com/Strawberry-Team/ucode-connect-Track-FullStack-uevent-Univent-backend) project.
2. Clone this repository and move to the project directory:
   ```bash
   git clone <repository-url> univent-admin
   cd univent-admin
   ```
3. Install all dependencies:
   ```bash
   npm install
   ```
4. Configure the environment file:
   - Locate the `.env.development.example` file in the root of the project.
   - Rename `.env.development.example` to `.env.development`. 
   - Open `.env.development` and add your data in the appropriate fields:
      ```env
      DATABASE_HOST=localhost
      DATABASE_PORT=3306
      DATABASE_USER=your_db_user
      DATABASE_PASSWORD=your_db_password
      DATABASE_NAME=univent
      
      # Admin credentials
      ADMIN_EMAIL=admin@univent.com
      ADMIN_PASSWORD=Password123!$
      
      # Security
      COOKIE_SECRET=your_cookie_secret_key
      ```
5. Build the project:
   ```bash
   npm run build
   ```
6. Start the development server:
   ```bash
   npm run start:dev
   ```
7. Access the admin panel at [http://localhost:8000/admin](http://localhost:8000/admin).


# 👤 Admin Credentials

Default admin credentials for testing:
**Email:**
```text
admin@univent.com
```
**Password:**
```text
Password123!$
```

---

© Inessa Repeshko. 2025