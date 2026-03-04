# Product Requirements Document (PRD)

## React Vite TanStack Starter — ET-Admin

> **Version:** 1.0  
> **Date:** March 3, 2026  
> **Status:** Active  
> **Prepared by:** Engineering Team  

---

## 1. Executive Summary

**React Vite TanStack Starter (ET-Admin)** is a production-ready React starter template designed to accelerate the development of full-stack web applications. It provides a pre-configured frontend architecture with authentication, routing, an admin dashboard, user management, and a rich component library — enabling developers to focus on building business logic rather than setting up boilerplate.

### 1.1 Core Goals

| # | Goal | Description |
|---|------|-------------|
| 1 | **Rapid Development** | Eliminate repetitive setup by providing a complete, pre-configured project skeleton |
| 2 | **Best Practices** | Enforce modern React patterns (TypeScript, hooks, TanStack Query, code splitting) |
| 3 | **Built-in Auth** | Offer authentication and protected admin routes with JWT token management |
| 4 | **Admin Dashboard** | Include a modular admin dashboard with user and role management (CRUD) |
| 5 | **Reusable Components** | Ship a Radix/Tailwind-based component library and theming system |

### 1.2 Target Users

- Frontend developers building SPA/dashboard applications
- Teams needing a standardized React project template
- Developers transitioning to modern React tooling (Vite, TanStack Query, Tailwind v4)

---

## 2. Technology Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **UI Library** | React | 19.x |
| **Build Tool** | Vite | 7.x |
| **Language** | TypeScript | 5.x |
| **Server State** | TanStack React Query | 5.x |
| **Routing** | React Router | 7.x |
| **Styling** | Tailwind CSS | 4.x |
| **UI Primitives** | Radix UI | Latest |
| **HTTP Client** | Axios | 1.x |
| **Form Handling** | React Hook Form | 7.x |
| **Validation** | Zod | 3.x |
| **Linter/Formatter** | Biome | 2.x |
| **Testing** | Vitest + Testing Library | 4.x |

---

## 3. Features & Requirements

### 3.1 User Login

**Description:** Allow users to sign in with email and password. Client-side validation is enforced and a successful login attaches a JWT token (stored in cookie) and redirects to the admin area.

**Entry Route:** `/login`

**Source Files:**
- `src/views/auth/login.tsx`
- `src/views/auth/components/LoginForm.tsx`
- `src/hooks/auth/useAuth.tsx`
- `src/lib/validations/auth.ts`

#### User Flows

| # | Flow | Expected Result |
|---|------|-----------------|
| 1 | Navigate to `/login` → Fill email → Fill password → Click "Sign in" | Redirect to `/admin/dashboard`, JWT token set in cookie |
| 2 | Navigate to `/login` → Fill invalid email format → Click "Sign in" | Validation error message for email field |
| 3 | Navigate to `/login` → Fill email → Fill wrong password → Click "Sign in" | Authentication error (inline or toast) |
| 4 | Authenticated user navigates to `/login` | GuestGuard redirects to `/admin` |

#### Validation Rules

| Field | Rule |
|-------|------|
| Email | Required, valid email format |
| Password | Required |

#### API Integration

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/login` | Authenticate user credentials |

#### Acceptance Criteria

- [ ] Login form renders with email, password inputs and "Sign in" button
- [ ] Client-side validation prevents submission with empty or malformed fields
- [ ] Successful login stores JWT token and user object in cookies
- [ ] Successful login redirects to `/admin/dashboard`
- [ ] Failed login (401) shows inline error message
- [ ] Validation errors (422) display per-field messages
- [ ] "Remember me" checkbox is functional
- [ ] "Forgot password?" link navigates to `/reset-password`
- [ ] Social login buttons (Google, GitHub) are displayed
- [ ] Password visibility toggle works correctly
- [ ] Loading state shows spinner on submit button

---

### 3.2 User Registration

**Description:** Create a new user account via a registration form with name, email, username, password, confirmation, and terms acceptance. Client-side validation enforced via Zod schemas.

**Entry Route:** `/register`

**Source Files:**
- `src/views/auth/register.tsx`
- `src/views/auth/components/RegisterForm.tsx`
- `src/hooks/auth/useAuth.tsx`
- `src/lib/validations/auth.ts`

#### User Flows

| # | Flow | Expected Result |
|---|------|-----------------|
| 1 | Navigate to `/register` → Fill all fields → Accept terms → Click "Create account" | Redirect to `/admin/dashboard` |
| 2 | Navigate to `/register` → Fill mismatched password confirmation → Click "Create account" | Validation error for password confirmation |
| 3 | Navigate to `/register` → Leave terms unchecked → Click "Create account" | Validation error for terms acceptance |
| 4 | Authenticated user navigates to `/register` | GuestGuard redirects to `/admin` |

#### Validation Rules

| Field | Rule |
|-------|------|
| Name | Required, minimum 2 characters |
| Email | Required, valid email format |
| Username | Optional, minimum 3 characters if provided |
| Password | Required, minimum 8 characters |
| Confirm Password | Required, must match password |
| Terms | Must be accepted |

#### API Integration

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/register` | Create new user account |

#### Acceptance Criteria

- [ ] Registration form renders all fields with proper labels
- [ ] Client-side validation via Zod prevents invalid submissions
- [ ] Password confirmation mismatch shows error message
- [ ] Terms acceptance is required before submission
- [ ] Successful registration redirects user to admin area
- [ ] API validation errors (422) display per-field messages
- [ ] Loading state shows spinner during submission
- [ ] Link to login page is visible for existing users

---

### 3.3 User Management (Admin)

**Description:** Admin users can list, create, update, and delete users from the admin user management screen. Operations use TanStack Query hooks and API endpoints for CRUD operations.

**Entry Route:** `/admin/users` (requires authentication)

**Source Files:**
- `src/views/admin/user-management/users/index.tsx`
- `src/views/admin/user-management/users/components/UserForm.tsx`
- `src/hooks/user/useUser.tsx`
- `src/lib/validations/user.ts`

#### User Flows

| # | Flow | Expected Result |
|---|------|-----------------|
| 1 | Navigate to `/admin/users` (authenticated) | AuthGuard allows access, user list displayed |
| 2 | Click "Add User" → Fill form → Submit | New user appears in user list |
| 3 | Click Edit on a user → Update fields → Submit | Updated user details in list |
| 4 | Click Delete on a user → Confirm deletion | User removed from list |
| 5 | Enter search query in search field | User list filters accordingly |
| 6 | Click "Add User" → Fill invalid email → Submit | Validation error for email |
| 7 | Navigate to `/admin/users` (unauthenticated) | Redirect to `/login` |

#### Data Model

```typescript
interface User {
  id: number;
  uid: string;
  name: string;
  email: string;
  username?: string;
  role_id: number;
  status: "active" | "inactive";
  created_at?: string;
  updated_at?: string;
}
```

#### Validation Rules (User Form)

| Field | Rule |
|-------|------|
| Name | Required, minimum 2 characters |
| Email | Required, valid email format |
| Username | Optional, minimum 3 characters if provided |
| Role | Required (positive integer) |
| Status | Required, must be "active" or "inactive" |
| Password | Required on create, optional on update, minimum 8 characters |
| Password Confirmation | Must match password when password is provided |

#### API Integration

| Method | Endpoint | Description | Hook |
|--------|----------|-------------|------|
| `GET` | `/api/users?search=&page=` | List users (paginated, searchable) | `useUsers()` |
| `GET` | `/api/users/:uid` | Get user by UID | `useUserById()` |
| `POST` | `/api/users` | Create new user | `useUserCreate()` |
| `PUT` | `/api/users/:uid` | Update user | `useUserUpdate()` |
| `DELETE` | `/api/users/:uid` | Delete user | `useUserDelete()` |

#### Acceptance Criteria

- [ ] User list displays with Name, Email, Role, Status columns
- [ ] Pagination controls work correctly
- [ ] Search/filter functionality narrows results
- [ ] "Add User" opens a form dialog/modal
- [ ] Form validates input before submission
- [ ] Successful CRUD operations show toast notifications
- [ ] TanStack Query cache invalidates and refetches after mutations
- [ ] Delete action requires confirmation
- [ ] Unauthenticated access redirects to login

---

### 3.4 Admin Dashboard

**Description:** Protected admin dashboard providing an overview and navigation to admin features (users, roles). Access is guarded by AuthGuard which redirects unauthenticated visitors to the login page.

**Entry Route:** `/admin/dashboard` (requires authentication)

**Source Files:**
- `src/views/admin/dashboard/index.tsx`
- `src/components/layout/AdminLayout.tsx`

#### User Flows

| # | Flow | Expected Result |
|---|------|-----------------|
| 1 | Navigate to `/admin/dashboard` (authenticated) | See dashboard overview and statistics |
| 2 | Click sidebar link to "Users" | Navigate to `/admin/users` |
| 3 | Navigate to `/admin/dashboard` (unauthenticated) | Redirect to `/login` |
| 4 | Navigate to `/admin` | Auto-redirect to `/admin/dashboard` |

#### Acceptance Criteria

- [ ] Dashboard page renders with statistics/overview widgets
- [ ] Responsive sidebar navigation collapses on mobile
- [ ] Sidebar contains links to Dashboard, Users, Roles sections
- [ ] User profile dropdown shows user name and logout action
- [ ] Logout clears cookies and redirects to `/login`
- [ ] Theme toggle in admin area works correctly

---

### 3.5 Public Pages & Navigation

**Description:** Public-facing landing and informational pages (home, features, pricing, agenda, about, contact) with a public navigation bar and links to authentication pages.

#### Route Map

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with hero section |
| `/features` | Features | Product features showcase |
| `/pricing` | Pricing | Pricing plans comparison |
| `/agenda` | Agenda | Blog/agenda listing |
| `/agenda/:id` | Agenda Detail | Individual blog/agenda post |
| `/about` | About | About page |
| `/contact` | Contact | Contact form page |
| `*` | 404 | Not Found page |

#### User Flows

| # | Flow | Expected Result |
|---|------|-----------------|
| 1 | Navigate to `/` | Landing page with hero, navbar, and CTA buttons |
| 2 | Click "Sign in" in navbar | Navigate to `/login` |
| 3 | Click "Get Started" | Navigate to `/register` |
| 4 | Navigate to `/non-existent-route` | See 404 Not Found page |
| 5 | Click navigation links (Features, Pricing, etc.) | Navigate to respective pages |

#### Acceptance Criteria

- [ ] Public navbar renders with Home, Features, Pricing, Agenda, About, Contact links
- [ ] "Sign in" and "Get Started" buttons are visible and functional
- [ ] All public pages load correctly with content
- [ ] 404 page displays for unknown routes
- [ ] Public pages are accessible without authentication

---

### 3.6 Theming (Dark/Light Mode)

**Description:** Client-side theme toggle using `next-themes`. Theme preference is persisted in `localStorage` and affects CSS variables across the app.

**Source Files:**
- `src/components/ThemeProvider.tsx`
- `src/components/ThemeToggle.tsx`
- `src/hooks/useTheme.tsx`
- `src/index.css`

#### User Flows

| # | Flow | Expected Result |
|---|------|-----------------|
| 1 | Click Theme Toggle | UI switches between dark and light mode |
| 2 | Toggle theme → Reload page | Previously selected theme is persisted |
| 3 | Default state (no preference set) | Light theme is used as default |

#### Acceptance Criteria

- [ ] Theme toggle button is visible on all pages
- [ ] Toggling theme applies dark/light CSS variables globally
- [ ] Theme preference persists across page reloads (localStorage)
- [ ] Default theme is "light"
- [ ] All components correctly respond to theme changes

---

## 4. Route Guards

| Guard | Behavior | Applied To |
|-------|----------|------------|
| `AuthGuard` | Checks for JWT token in cookies; redirects unauthenticated users to `/login` | All `/admin/*` routes |
| `GuestGuard` | Redirects authenticated users to `/admin` | `/login`, `/register`, `/reset-password` |

---

## 5. API Configuration

### 5.1 HTTP Client

```typescript
// Base URL from environment variable
const Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // default: http://localhost:3000/
});

// Automatic JWT token injection
Api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 5.2 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:3000/` | Backend API base URL |

### 5.3 Full API Endpoint Summary

| Module | Method | Endpoint | Description |
|--------|--------|----------|-------------|
| Auth | `POST` | `/api/login` | User login |
| Auth | `POST` | `/api/register` | User registration |
| Users | `GET` | `/api/users` | List users (paginated) |
| Users | `GET` | `/api/users/:uid` | Get user details |
| Users | `POST` | `/api/users` | Create user |
| Users | `PUT` | `/api/users/:uid` | Update user |
| Users | `DELETE` | `/api/users/:uid` | Delete user |

---

## 6. Non-Functional Requirements

### 6.1 Performance

- **Lazy Loading:** All page components use `React.lazy()` with `Suspense` for code splitting
- **Chunk Splitting:** Automatic per-route chunks via Vite/Rollup
- **HMR:** Hot Module Replacement for instant dev feedback
- **Optimized Builds:** Tree-shaking and minification in production

### 6.2 Accessibility

- **Radix UI:** All interactive components built on accessible primitives
- **Semantic HTML:** Proper headings, landmarks, and ARIA attributes
- **Keyboard Navigation:** Full keyboard support via Radix UI

### 6.3 Responsiveness

- **Mobile Detection:** `useIsMobile` hook for adaptive layouts
- **Responsive Sidebar:** Collapsible sidebar for mobile viewports
- **Tailwind Responsive:** Full utility-based responsive design

### 6.4 Security

- JWT tokens stored in cookies
- Route protection via AuthGuard/GuestGuard
- Client-side input validation via Zod schemas
- Automatic token injection via Axios interceptor

---

## 7. Design System

### 7.1 Typography

- **Primary Font:** Inter (Google Fonts)
- **Fallback:** system-ui, sans-serif

### 7.2 Color Tokens (CSS Variables)

| Token | Usage |
|-------|-------|
| `--background` / `--foreground` | Base page colors |
| `--primary` / `--primary-foreground` | Primary action colors |
| `--secondary` / `--secondary-foreground` | Secondary element colors |
| `--muted` / `--muted-foreground` | Muted/disabled colors |
| `--accent` / `--accent-foreground` | Accent/highlight colors |
| `--destructive` / `--destructive-foreground` | Error/danger colors |
| `--card` / `--card-foreground` | Card component colors |
| `--border` | Border color |
| `--ring` | Focus ring color |
| `--sidebar-*` | Sidebar-specific colors |
| `--chart-1` to `--chart-5` | Data visualization colors |

### 7.3 Component Library

49 pre-built UI components based on Radix UI primitives, including: Accordion, Alert, Alert Dialog, Avatar, Badge, Button, Calendar, Card, Carousel, Checkbox, Command, Dialog, Drawer, Dropdown Menu, Form, Input, Label, Pagination, Popover, Progress, Radio Group, Scroll Area, Select, Separator, Sidebar, Skeleton, Slider, Switch, Table, Tabs, Textarea, Toast, Toggle, Tooltip, and more.

---

## 8. Testing

### 8.1 Stack

| Tool | Purpose |
|------|---------|
| Vitest | Test runner & assertions |
| @testing-library/react | Component rendering & querying |
| @testing-library/jest-dom | Custom DOM matchers |
| @testing-library/user-event | User interaction simulation |
| @vitest/coverage-v8 | Code coverage |
| jsdom | Browser environment simulation |

### 8.2 Commands

```bash
npm run test              # Run all unit tests
npm run test:coverage     # Run tests with V8 coverage report
```

---

## 9. Build & Deployment

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | TypeScript compile + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Lint & auto-fix with Biome |
| `npm run format` | Format code with Biome |
| `npm run test` | Run unit tests |
| `npm run test:coverage` | Run tests with coverage |

---

## 10. Future Roadmap

| Priority | Feature | Description |
|----------|---------|-------------|
| 🟢 High | Role-Based Access Control (RBAC) | Restrict admin features based on user roles |
| 🟢 High | API Error Handling | Global error boundary & toast notifications for API failures |
| 🟡 Medium | Internationalization (i18n) | Multi-language support |
| 🟡 Medium | PWA Support | Service worker & offline capability |
| 🟡 Medium | E2E Testing | Playwright/Cypress integration |
| 🔵 Low | Storybook | Component documentation & visual testing |
| 🔵 Low | CI/CD Pipeline | GitHub Actions for automated testing & deployment |
| 🔵 Low | Docker Support | Containerized development & deployment |

---

*This document defines the product requirements for the React Vite TanStack Starter project and should be kept in sync with the codebase as it evolves.*
