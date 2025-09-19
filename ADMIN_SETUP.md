# Admin Dashboard Setup Guide

This guide will help you set up the admin dashboard for the CiptaTech landing page.

## Prerequisites

-   Node.js 18+ and pnpm installed
-   Google OAuth credentials

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create OAuth 2.0 Client IDs
5. Add authorized redirect URIs:
    - `http://localhost:3000/api/auth/callback/google` (for development)
    - `https://yourdomain.com/api/auth/callback/google` (for production)
6. Copy the Client ID and Client Secret to your `.env` file

### 4. Database Setup

```bash
# Generate Prisma client
pnpm db:generate

# Push schema to database
pnpm db:push

# Seed the database with admin user
pnpm db:seed
```

### 5. Start Development Server

```bash
pnpm dev
```

## Admin Access

### Default Admin Account

After running the seed script, you'll have a default admin account:

-   **Email**: admin@ciptatech.com
-   **Password**: admin123

### Google OAuth Login

1. Navigate to `http://localhost:3000/admin/login`
2. Click "Continue with Google"
3. Sign in with your Google account
4. If it's your first time, you'll be created as a regular user
5. An existing admin needs to promote you to admin role

## Features

### User Management

-   **Create Users**: Add new team members with profile pictures
-   **Edit Users**: Update user information, roles, and social links
-   **Delete Users**: Soft delete users (preserves data)
-   **Reset Passwords**: Set new passwords for users
-   **Role Management**: Assign ADMIN or USER roles

### Profile Management

-   **Profile Pictures**: Upload with drag & drop support
-   **Social Links**: LinkedIn, Twitter, GitHub, Website
-   **Position Tracking**: CEO, CTO, Developer, etc.

### Security Features

-   **Google OAuth**: Secure authentication
-   **Role-based Access**: Only admins can access dashboard
-   **Soft Delete**: Deleted users can't sign in but data is preserved
-   **Session Management**: Database-backed sessions

## File Structure

```
app/
├── (admin)/                 # Admin route group
│   ├── layout.tsx          # Admin layout with sidebar
│   ├── page.tsx            # Dashboard overview
│   ├── login/              # Login page
│   ├── users/              # User management
│   └── settings/           # Admin settings
├── api/auth/               # NextAuth.js API routes
components/
├── admin/                  # Admin-specific components
│   ├── admin-sidebar.tsx   # Navigation sidebar
│   ├── users-table.tsx     # User data table
│   ├── user-form.tsx       # Reusable user form
│   ├── create-user-dialog.tsx
│   ├── edit-user-dialog.tsx
│   └── reset-password-dialog.tsx
lib/
├── auth.ts                 # NextAuth.js configuration
├── prisma.ts              # Prisma client
├── actions/               # Server actions
│   └── user-actions.ts    # User CRUD operations
└── validations/           # Zod schemas
    └── user.ts            # User validation schemas
prisma/
└── schema.prisma          # Database schema
scripts/
└── seed.ts                # Database seeder
```

## Database Schema

### User Model

```prisma
model User {
  id          String   @id @default(cuid())
  email       String   @unique
  name        String
  phone       String?
  profile     String?
  role        Role     @default(USER)
  position    String?
  socialLinks Json?
  password    String?
  deletedAt   DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Available Scripts

-   `pnpm dev` - Start development server
-   `pnpm build` - Build for production
-   `pnpm db:push` - Push schema changes to database
-   `pnpm db:generate` - Generate Prisma client
-   `pnpm db:seed` - Seed database with initial data
-   `pnpm db:test` - Test database connection and show current data

## Troubleshooting

### Common Issues

1. **Google OAuth not working**: Check your redirect URIs in Google Console
2. **Database errors**: Run `pnpm db:push` to sync schema
3. **Permission denied**: Ensure you're logged in as an admin user
4. **File upload issues**: Check file size limits and supported formats

### Support

For issues or questions, please check the console logs and ensure all environment variables are properly set.
