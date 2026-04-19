# EzyConverter Supabase Authentication Setup Guide

## ✅ Completed Tasks

The following have been automatically set up:

- [x] Database schema created (`profiles` table with RLS)
- [x] Row Level Security (RLS) policies configured
- [x] Auth triggers configured (auto-creates profile on signup)
- [x] Supabase JS client installed and initialized
- [x] Environment variables configured (.env)
- [x] AuthContext created with session management
- [x] Auth UI components (LoginModal, PasswordLoginModal, PasswordSettings, UserMenu, ProGate)
- [x] Ad display logic (useAds hook)
- [x] App wrapped with AuthProvider
- [x] Magic Link authentication configured
- [x] Password management system configured

## 🚀 Authentication Flow

### User's First Login
1. User clicks "Sign In" → LoginModal opens
2. User enters their email
3. Supabase sends a **magic link** to their email
4. User clicks the link → automatically signed in
5. Automatically creates a profile in the database

### Setting a Password (Optional)
1. After logging in, user goes to Account Settings
2. Finds "Password Management" section
3. Sets a password (minimum 8 characters)
4. Password is securely stored with Supabase

### Subsequent Logins
Users can now choose:
- **Option A:** Click "Send magic link" → check email → click link (fast, no password needed)
- **Option B:** Click "Sign in with password" → enter email + password

## 📋 Manual Supabase Dashboard Configuration

### 1. Enable Email/Magic Link Authentication

**Location:** `Authentication > Providers > Email`

**Steps:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project (mgrevuutogmzhupyauhv)
3. Navigate to **Authentication** > **Providers**
4. Click on **Email**
5. Toggle **Enable Sign-up** to ON
6. Under "Confirm email", select option based on your preference:
   - **"Confirm email"** - recommended (user must confirm email before account is created)
   - **"Double confirm email"** - extra security
7. Keep other settings as default
8. **Click Save**

---

### 2. Enable Password Authentication

**Location:** `Authentication > Providers > Email`

**Steps:**
1. Same location as Email/Magic Link setup
2. Look for **"User signups"** section
3. Toggle **"Enable email confirmations"** as needed
4. Supabase will automatically support password auth when users set passwords

---

### 3. Configure Email Redirect URLs

**Location:** `Authentication > URL Configuration`

**Steps:**
1. Go to **Authentication** > **URL Configuration**
2. Under **Redirect URLs**, add:
   - `http://localhost:5173/` (for local development)
   - `http://localhost:5173/auth/callback` (for callback)
   - `https://yourdomain.com/` (for production)
   - `https://yourdomain.com/auth/callback` (for production callback)
3. Click **Save**

---

### 4. Configure Email Templates (Recommended)

**Location:** `Authentication > Email Templates`

**Customize these templates:**

#### Magic Link Email Template
- **Subject:** Default: "Confirm your signup"
- Customize to: "Your EzyConverter Login Link"
- Add your branding and instructions

**Default template includes:**
- Magic link button
- Confirmation link
- Expiry time (default: 24 hours)

#### Confirmation Email Template
- Sent when user confirms their email
- You can customize the message

**Steps to customize:**
1. Go to **Authentication** > **Email Templates**
2. Click on the template you want to edit
3. Click **Edit** (pencil icon)
4. Customize subject, body, and styling
5. Click **Save**

---

## 🔧 Development Setup

### Start the app locally:

```bash
npm run dev
```

The app will run at `http://localhost:5173`

### Test Magic Link Locally:

**Note:** Magic links only work if Supabase can send emails. For local testing without real emails, use a test account in Supabase dashboard.

**Testing Steps:**
1. Click "Sign In" in the navbar
2. Enter an email address
3. If using real email: Check your email inbox
4. If using Supabase test account: Check Supabase Auth dashboard > Users > check the magic link sent
5. Click the link → automatically signed in
6. Check the `profiles` table → new profile should be created

### Test Password Setting:

1. After signing in, go to **Account Settings** (from UserMenu dropdown)
2. Find **"Password Management"** section
3. Set a password (minimum 8 characters)
4. Sign out
5. Try signing back in with the same email and password

### Test Password Login (if set):

1. Click "Sign In"
2. If you see a "Sign in with password" option, click it
3. Enter email and password
4. Should sign in successfully

---

## 📱 Components & Usage

### Authentication Components:

**LoginModal** (`src/components/auth/LoginModal.tsx`)
- Magic link sign-in interface
- Shows Pro benefits
- Auto-closes after sending link

**PasswordLoginModal** (`src/components/auth/PasswordLoginModal.tsx`)
- Email + password sign-in
- Shows only if user has set a password

**PasswordSettings** (`src/components/auth/PasswordSettings.tsx`)
- Component to set or change password
- Can be placed in an Account Settings page
- Password validation (min 8 characters)

**UserMenu** (`src/components/auth/UserMenu.tsx`)
- Shows in navigation when user is logged in
- Displays user avatar and email
- Shows PRO badge if user is pro
- Dropdown with account options

**ProGate** (`src/components/auth/ProGate.tsx`)
- Wrapper to gate Pro-only features
- Shows upgrade prompt if not pro

### Hooks:

**useAuth** (`src/context/AuthContext.tsx`)
- `user` - current Supabase auth user
- `profile` - user's profile from database
- `isPro` - boolean indicating pro status
- `signInWithMagicLink(email)` - send magic link email
- `signInWithPassword(email, password)` - sign in with password
- `setPassword(password)` - set password for logged-in user
- `signOut()` - sign out
- `loading` - true while checking session

**useAds** (`src/hooks/useAds.tsx`)
- `showAds` - boolean, true if not logged in or free tier
- `<AdSlot />` - component to display ads

---

## 💳 Stripe Integration (Next Steps)

When ready to implement Pro tier payments:

1. Create Stripe account at https://stripe.com
2. Get Stripe publishable and secret keys
3. Create webhooks for subscription updates
4. Store Stripe customer ID in `profiles.stripe_customer_id`
5. Store subscription ID in `profiles.stripe_subscription_id`
6. Implement checkout flow using Stripe.js

---

## 🔐 Security Notes

- **Anon Key:** Used in client-side code (VITE_SUPABASE_ANON_KEY) - safe to expose
- **Service Role Key:** Should NEVER be in client code - keep server-side only
- **RLS Policies:** Users can only read/update their own profiles
- **Email Verification:** Users must confirm their email before account creation (recommended)
- **Password Security:** Supabase handles password hashing and security automatically
- **Magic Links:** Expire after 24 hours (default), one-time use only
- **Environment Variables:** Never commit .env file - it's in .gitignore

---

## ✨ Next Steps

1. **Enable Email Authentication**
   - Go to Supabase > Authentication > Providers > Email
   - Toggle "Enable Sign-up" ON
   - Save

2. **Configure Email Redirect URLs**
   - Add `http://localhost:5173/` for local testing
   - Add your production domain later

3. **Test Sign-In Flow**
   - Click "Sign In" button in the navbar
   - Enter your email
   - Check email for magic link
   - Click link to sign in
   - Verify profile was created

4. **Test Password Setting**
   - After signing in, add a password in Account Settings
   - Sign out and sign in with email/password

5. **Test Ad Display**
   - When logged in as free user: ads should show
   - When logged in as pro user: ads should be hidden
   - When not logged in: ads should show

6. **Implement Stripe** (when ready for Pro tier)
   - Set up Stripe account
   - Create checkout flow
   - Store subscription data in profiles table

---

## 📞 Support

For issues:
- [Supabase Docs - Email Auth](https://supabase.com/docs/guides/auth/auth-email)
- [Supabase Docs - Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)
- [Supabase Discord](https://discord.supabase.com)
- Check browser console for auth errors
- Verify credentials in .env match your project

---

**Setup Date:** April 19, 2026
**Project:** EzyConverter
**Authentication Type:** Magic Links + Optional Password
**Status:** Ready for Email Auth Configuration
