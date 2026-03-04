# Product Specification — React Vite TanStack Starter

> **Document Version:** 1.0  
> **Last Updated:** March 3, 2026  
> **Status:** Active  

---

## 1. Overview

### 1.1 Product Summary

**React Vite TanStack Starter** is a modern, production-ready React starter template designed to accelerate the development of full-stack web applications. It provides a pre-configured frontend architecture with authentication, routing, admin dashboard, user management, and a rich component library — enabling developers to focus on building business logic rather than setting up boilerplate.

### 1.2 Goals & Objectives

| # | Objective | Description |
|---|-----------|-------------|
| 1 | **Rapid Development** | Eliminate repetitive setup by providing a complete, pre-configured project skeleton |
| 2 | **Best Practices** | Enforce modern React patterns (hooks, context, lazy loading, code splitting) |
| 3 | **Type Safety** | Full TypeScript coverage across the entire codebase |
| 4 | **Scalability** | Modular architecture that scales from small projects to enterprise applications |
| 5 | **Developer Experience** | Fast HMR, automated linting, formatting, and git hooks for clean code |

### 1.3 Target Users

- Frontend developers building SPA/dashboard applications
- Teams needing a standardized React project template
- Developers transitioning to modern React tooling (Vite, TanStack Query, Tailwind v4)

---

## 2. Technology Stack

### 2.1 Core Technologies

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **UI Library** | React | 19.x | Component-based UI rendering |
| **Build Tool** | Vite | 7.x | Fast dev server & production bundler |
| **Language** | TypeScript | 5.x | Static type checking |
| **Server State** | TanStack Query | 5.x | Data fetching, caching, synchronization |
| **Routing** | React Router | 7.x | Client-side routing & navigation |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS framework |
| **UI Components** | Radix UI | Latest | Accessible, headless UI primitives |
| **HTTP Client** | Axios | 1.x | API communication |
| **Form Handling** | React Hook Form | 7.x | Performant form state management |
| **Validation** | Zod | 3.x | Schema-based form validation |

### 2.2 Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| **Biome** | 2.x | Fast linting & code formatting (replaces ESLint + Prettier) |
| **Husky** | 9.x | Git hooks for pre-commit quality checks |
| **lint-staged** | 16.x | Run linters only on staged files |
| **Vitest** | 4.x | Unit testing framework |
| **Testing Library** | Latest | Component testing utilities |

### 2.3 Additional Libraries

| Library | Purpose |
|---------|---------|
| `js-cookie` | Cookie-based token management |
| `next-themes` | Dark/light theme switching |
| `lucide-react` | Icon library |
| `class-variance-authority` | Component variant styling |
| `clsx` + `tailwind-merge` | Conditional class merging |
| `recharts` | Data visualization & charting |
| `sonner` | Toast notification system |
| `date-fns` | Date formatting utilities |
| `cmdk` | Command palette component |
| `embla-carousel-react` | Carousel/slider component |

---

## 3. Architecture

### 3.1 Project Structure

```
react-vite-tanstack-starter/
├── public/                      # Static assets
├── src/
│   ├── assets/                  # Project assets (images, fonts)
│   ├── components/
│   │   ├── auth/                # Auth-specific components (AuthBranding)
│   │   ├── layout/              # Layout components
│   │   │   ├── AdminLayout.tsx  # Admin sidebar + navbar layout
│   │   │   ├── PublicNavbar.tsx  # Public pages navigation bar
│   │   │   └── Footer.tsx       # Public pages footer
│   │   ├── ui/                  # 49 reusable UI components (shadcn/ui style)
│   │   ├── NavLink.tsx          # Navigation link component
│   │   ├── SidebarMenu.tsx      # Sidebar menu component
│   │   ├── ThemeProvider.tsx    # Theme context provider
│   │   └── ThemeToggle.tsx      # Dark/light mode switcher
│   ├── context/
│   │   └── AuthContext.tsx      # Authentication state context
│   ├── guards/
│   │   ├── AuthGuard.tsx        # Protected route guard → redirects to /login
│   │   └── GuestGuard.tsx       # Guest-only guard → redirects to /admin
│   ├── hooks/
│   │   ├── auth/useAuth.tsx     # Login, register, logout, user hooks
│   │   ├── role/                # Role management hooks
│   │   ├── user/useUser.tsx     # User CRUD hooks
│   │   ├── useDebounced.tsx     # Debounce utility hook
│   │   ├── useIsMobile.tsx      # Responsive breakpoint detection
│   │   ├── useTheme.tsx         # Theme management hook
│   │   └── useToast.ts          # Toast notification hook
│   ├── lib/
│   │   ├── validations/
│   │   │   ├── auth.ts          # Login & register validation schemas
│   │   │   └── user.ts          # User form validation schemas
│   │   └── utils.ts             # cn() utility (clsx + tailwind-merge)
│   ├── services/
│   │   └── api.ts               # Axios instance with JWT interceptor
│   ├── views/
│   │   ├── admin/
│   │   │   ├── dashboard/       # Admin dashboard page
│   │   │   └── user-management/ # User & role CRUD pages
│   │   ├── auth/
│   │   │   ├── components/      # Login & register form components
│   │   │   ├── login.tsx        # Login page
│   │   │   ├── register.tsx     # Register page
│   │   │   └── reset-password.tsx # Reset password page
│   │   ├── home/                # Landing/home page
│   │   ├── About.tsx            # About page
│   │   ├── Agenda.tsx           # Agenda/blog listing page
│   │   ├── AgendaDetail.tsx     # Agenda/blog detail page
│   │   ├── Contact.tsx          # Contact page
│   │   ├── Features.tsx         # Features page
│   │   ├── Pricing.tsx          # Pricing page
│   │   └── NotFound.tsx         # 404 page
│   ├── routes/
│   │   └── index.tsx            # Route configuration
│   ├── test/
│   │   └── setup.ts             # Vitest + Testing Library setup
│   ├── index.css                # Tailwind v4 CSS-first config & design tokens
│   ├── App.tsx                  # Root component
│   ├── main.tsx                 # Application entry point
│   └── vite-env.d.ts            # Vite type declarations
├── .env                         # Environment variables
├── biome.json                   # Biome linter/formatter config
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration + Vitest setup
└── package.json                 # Dependencies & scripts
```

### 3.2 Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      Browser                             │
│  ┌─────────────────────────────────────────────────────┐ │
│  │                  React Router v7                     │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │ │
│  │  │  Public   │  │  Auth    │  │  Admin (Guarded) │  │ │
│  │  │  Routes   │  │  Routes  │  │  Routes          │  │ │
│  │  │  ────     │  │  ────    │  │  ────            │  │ │
│  │  │  /        │  │  /login  │  │  /admin/dashboard│  │ │
│  │  │  /about   │  │  /register│ │  /admin/users    │  │ │
│  │  │  /pricing │  │  /reset  │  │  /admin/roles    │  │ │
│  │  │  /agenda  │  │          │  │                  │  │ │
│  │  │  /contact │  │          │  │                  │  │ │
│  │  │  /features│  │          │  │                  │  │ │
│  │  └──────────┘  └──────────┘  └──────────────────┘  │ │
│  └─────────────────────────────────────────────────────┘ │
│                          │                               │
│  ┌───────────────────────▼─────────────────────────────┐ │
│  │              TanStack Query (Cache)                  │ │
│  │   queryKey: ["users"]  queryKey: ["roles"]  ...     │ │
│  └───────────────────────┬─────────────────────────────┘ │
│                          │                               │
│  ┌───────────────────────▼─────────────────────────────┐ │
│  │         Axios HTTP Client (with JWT interceptor)     │ │
│  └───────────────────────┬─────────────────────────────┘ │
└──────────────────────────┼───────────────────────────────┘
                           │
                   ┌───────▼───────┐
                   │  Backend API  │
                   │  (External)   │
                   └───────────────┘
```

---

## 4. Features

### 4.1 Authentication System

| Feature | Description |
|---------|-------------|
| **Login** | Email + password login with "Remember me" option |
| **Register** | Full registration with name, email, username, password, and terms acceptance |
| **Reset Password** | Password recovery flow |
| **JWT Token Management** | Tokens stored in cookies via `js-cookie` |
| **Auth Context** | Global auth state via React Context API |
| **Auto-Interceptor** | Axios automatically attaches `Bearer` token to all API requests |
| **Route Guards** | `AuthGuard` (protected) and `GuestGuard` (public-only) components |

#### 4.1.1 Authentication Flow

```
User visits protected route
       │
       ▼
  AuthGuard checks
  Cookies.get("token")
       │
   ┌───┴───┐
   │       │
 Token   No Token
 exists    │
   │       ▼
   │   Redirect to
   │   /login
   ▼
 Render protected
 content
```

#### 4.1.2 Validation Rules

**Login Schema:**
- Email: required, valid email format
- Password: required

**Register Schema:**
- Name: minimum 2 characters
- Email: required, valid email format
- Username: optional, minimum 3 characters if provided
- Password: minimum 8 characters
- Confirm Password: must match password
- Terms: must be accepted

### 4.2 Admin Dashboard

| Feature | Description |
|---------|-------------|
| **Responsive Sidebar** | Collapsible sidebar navigation with mobile support |
| **Dashboard Page** | Overview/statistics page (extensible) |
| **User Management** | Full CRUD for users |
| **Role Management** | Role listing and management |
| **Theme Toggle** | Dark/light mode switcher (persisted) |
| **User Profile Dropdown** | Profile menu with logout action |

### 4.3 User Management (CRUD)

#### Data Model

```typescript
interface User {
  id: number;
  uid: string;           // Unique identifier for API operations
  name: string;
  email: string;
  username?: string;
  role_id: number;
  status: "active" | "inactive";
  created_at?: string;
  updated_at?: string;
}
```

#### API Endpoints

| Method | Endpoint | Description | Hook |
|--------|----------|-------------|------|
| `GET` | `/api/users?search=&page=` | List users (paginated, searchable) | `useUsers()` |
| `GET` | `/api/users/:uid` | Get user by UID | `useUserById()` |
| `POST` | `/api/users` | Create new user | `useUserCreate()` |
| `PUT` | `/api/users/:uid` | Update user | `useUserUpdate()` |
| `DELETE` | `/api/users/:uid` | Delete user | `useUserDelete()` |

#### Validation Rules (User Form)

- **Name:** minimum 2 characters
- **Email:** required, valid email format
- **Username:** optional, minimum 3 characters if provided
- **Role:** required (positive integer)
- **Status:** must be "active" or "inactive"
- **Password:** minimum 8 characters (required on create, optional on update)
- **Password Confirmation:** must match password when password is provided

### 4.4 Public Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Landing page with hero section |
| **Features** | `/features` | Product features showcase |
| **Pricing** | `/pricing` | Pricing plans comparison |
| **Agenda** | `/agenda` | Blog/agenda listing |
| **Agenda Detail** | `/agenda/:id` | Individual agenda/blog post |
| **About** | `/about` | About page |
| **Contact** | `/contact` | Contact form page |
| **404** | `*` | Not found page |

### 4.5 UI Component Library

The project includes **49 pre-built UI components** based on Radix UI primitives, styled with Tailwind CSS and `class-variance-authority`:

<details>
<summary><strong>Click to expand full component list</strong></summary>

| Component | File |
|-----------|------|
| Accordion | `accordion.tsx` |
| Alert | `alert.tsx` |
| Alert Dialog | `alert-dialog.tsx` |
| Aspect Ratio | `aspect-ratio.tsx` |
| Avatar | `avatar.tsx` |
| Badge | `badge.tsx` |
| Breadcrumb | `breadcrumb.tsx` |
| Button | `button.tsx` |
| Calendar | `calendar.tsx` |
| Card | `card.tsx` |
| Carousel | `carousel.tsx` |
| Chart | `chart.tsx` |
| Checkbox | `checkbox.tsx` |
| Collapsible | `collapsible.tsx` |
| Command | `command.tsx` |
| Context Menu | `context-menu.tsx` |
| Dialog | `dialog.tsx` |
| Drawer | `drawer.tsx` |
| Dropdown Menu | `dropdown-menu.tsx` |
| Form | `form.tsx` |
| Hover Card | `hover-card.tsx` |
| Input | `input.tsx` |
| Input OTP | `input-otp.tsx` |
| Label | `label.tsx` |
| Menubar | `menubar.tsx` |
| Navigation Menu | `navigation-menu.tsx` |
| Pagination | `pagination.tsx` |
| Popover | `popover.tsx` |
| Progress | `progress.tsx` |
| Radio Group | `radio-group.tsx` |
| Resizable | `resizable.tsx` |
| Scroll Area | `scroll-area.tsx` |
| Select | `select.tsx` |
| Separator | `separator.tsx` |
| Sheet | `sheet.tsx` |
| Sidebar | `sidebar.tsx` |
| Skeleton | `skeleton.tsx` |
| Slider | `slider.tsx` |
| Sonner | `sonner.tsx` |
| Switch | `switch.tsx` |
| Table | `table.tsx` |
| Tabs | `tabs.tsx` |
| Textarea | `textarea.tsx` |
| Toast | `toast.tsx` |
| Toaster | `toaster.tsx` |
| Toggle | `toggle.tsx` |
| Toggle Group | `toggle-group.tsx` |
| Tooltip | `tooltip.tsx` |
| Use Toast | `use-toast.ts` |

</details>

### 4.6 Theming System

- **Dark/Light Mode**: Toggle between themes using `next-themes` provider
- **CSS Variables**: Design tokens defined as CSS custom properties in `index.css`
- **Tailwind v4 CSS-first Config**: All theme configuration lives in CSS (no `tailwind.config.ts`)
- **Custom Variant**: Dark mode activated via `@custom-variant dark (&:is(.dark *))`
- **Design Tokens**: Colors, radii, fonts, and animations defined in `@theme inline` block

---

## 5. Routing Specification

### 5.1 Route Map

```
/                        → Home (Public)
/features                → Features (Public)
/pricing                 → Pricing (Public)
/agenda                  → Agenda Listing (Public)
/agenda/:id              → Agenda Detail (Public)
/about                   → About (Public)
/contact                 → Contact (Public)
/login                   → Login (GuestGuard)
/register                → Register (GuestGuard)
/reset-password          → Reset Password (GuestGuard)
/admin                   → Redirect to /admin/dashboard (AuthGuard)
/admin/dashboard         → Dashboard (AuthGuard + AdminLayout)
/admin/users             → User Management (AuthGuard + AdminLayout)
/admin/roles             → Role Management (AuthGuard + AdminLayout)
*                        → 404 Not Found
```

### 5.2 Route Guards

| Guard | Behavior | Applied To |
|-------|----------|------------|
| `AuthGuard` | Redirects unauthenticated users to `/login` | All `/admin/*` routes |
| `GuestGuard` | Redirects authenticated users to `/admin` | `/login`, `/register`, `/reset-password` |

### 5.3 Code Splitting

All page components use `React.lazy()` with `Suspense` for automatic code splitting. A loading spinner is shown during chunk loading.

---

## 6. API Integration

### 6.1 HTTP Client Configuration

```typescript
// Base URL configured via environment variable
const Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

### 6.2 API Endpoints Summary

| Module | Method | Endpoint | Description |
|--------|--------|----------|-------------|
| Auth | `POST` | `/api/login` | User login |
| Auth | `POST` | `/api/register` | User registration |
| Users | `GET` | `/api/users` | List users (paginated) |
| Users | `GET` | `/api/users/:uid` | Get user details |
| Users | `POST` | `/api/users` | Create user |
| Users | `PUT` | `/api/users/:uid` | Update user |
| Users | `DELETE` | `/api/users/:uid` | Delete user |

### 6.3 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:3000/` | Backend API base URL |

---

## 7. State Management

### 7.1 Server State — TanStack Query

All server data (users, roles, etc.) is managed via TanStack Query hooks:

- **Automatic Caching**: Query results are cached by `queryKey`
- **Background Refetching**: Stale data is automatically refreshed
- **Optimistic Updates**: Mutations can optimistically update the cache
- **Pagination Support**: Built-in support for paginated queries

### 7.2 Client State — React Context

| Context | Purpose |
|---------|---------|
| `AuthContext` | Authentication state (`isAuthenticated`, `setIsAuthenticated`) |
| `ThemeContext` | Theme preference (dark/light via `next-themes`) |

### 7.3 Cookie State

| Cookie | Purpose |
|--------|---------|
| `token` | JWT authentication token |
| `user` | Serialized user object (JSON) |

---

## 8. Design System

### 8.1 Typography

- **Primary Font**: Inter (Google Fonts)
- **Fallback**: system-ui, sans-serif

### 8.2 Color Palette (CSS Variables)

| Token | Usage |
|-------|-------|
| `--background` / `--foreground` | Base page colors |
| `--primary` / `--primary-foreground` | Primary action colors |
| `--secondary` / `--secondary-foreground` | Secondary element colors |
| `--muted` / `--muted-foreground` | Muted/disabled colors |
| `--accent` / `--accent-foreground` | Accent/highlight colors |
| `--destructive` / `--destructive-foreground` | Error/danger colors |
| `--card` / `--card-foreground` | Card component colors |
| `--popover` / `--popover-foreground` | Popover component colors |
| `--border` | Border color |
| `--input` | Input field border color |
| `--ring` | Focus ring color |
| `--sidebar-*` | Sidebar-specific colors |
| `--chart-1` through `--chart-5` | Chart/data visualization colors |

### 8.3 Custom Utilities

| Utility | Description |
|---------|-------------|
| `gradient-primary` | Primary gradient background (blue → purple, 135deg) |
| `container` | Centered container with responsive max-width (1400px) |

### 8.4 Animations

| Animation | Description |
|-----------|-------------|
| `fade-in` | Fade in with upward slide (0.3s ease-out) |
| `tw-animate-css` | Additional animation utilities via `tw-animate-css` package |

---

## 9. Testing

### 9.1 Testing Stack

| Tool | Purpose |
|------|---------|
| **Vitest** | Test runner & assertion library |
| **@testing-library/react** | Component rendering & querying |
| **@testing-library/jest-dom** | Custom DOM matchers |
| **@testing-library/user-event** | User interaction simulation |
| **@vitest/coverage-v8** | Code coverage reporting |
| **jsdom** | Browser environment simulation |

### 9.2 Test Configuration

- **Environment**: jsdom
- **Setup File**: `src/test/setup.ts`
- **Coverage Provider**: V8
- **Coverage Scope**: `src/**/*.{ts,tsx}` (excludes `main.tsx`, `vite-env.d.ts`, and test files)

### 9.3 Test Commands

```bash
npm run test              # Run all unit tests
npm run test:coverage     # Run tests with V8 coverage report
```

---

## 10. Build & Deployment

### 10.1 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | TypeScript compilation + production build |
| `npm run build:dev` | Development mode build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Lint & auto-fix with Biome |
| `npm run format` | Format code with Biome |
| `npm run test` | Run unit tests |
| `npm run test:coverage` | Run tests with coverage |
| `npm run doctor` | Run `react-doctor` diagnostics |

### 10.2 Build Output

- **Output Directory**: `dist/`
- **Build Tool**: Vite (Rollup-based)
- **Code Splitting**: Automatic via React.lazy() + dynamic imports

### 10.3 Code Quality Pipeline

```
Developer commits code
       │
       ▼
  Husky pre-commit hook
       │
       ▼
  lint-staged runs Biome
  on staged .js/.ts/.jsx/.tsx files
       │
       ▼
  Code is auto-fixed & committed
```

---

## 11. Non-Functional Requirements

### 11.1 Performance

- **Lazy Loading**: All page components are lazy-loaded for optimal initial bundle size
- **Code Splitting**: Automatic chunk generation per route
- **HMR**: Hot Module Replacement for instant development feedback
- **Optimized Builds**: Vite production builds with tree-shaking and minification

### 11.2 Accessibility

- **Radix UI**: All interactive components are built on accessible Radix primitives
- **Semantic HTML**: Proper use of headings, landmarks, and ARIA attributes
- **Keyboard Navigation**: Full keyboard support via Radix UI

### 11.3 Responsiveness

- **Mobile Detection**: `useIsMobile` hook for adaptive layouts
- **Responsive Sidebar**: Collapsible sidebar for mobile viewports
- **Tailwind Responsive**: Full utility-based responsive design

### 11.4 Security

- **Token Storage**: JWT tokens stored in cookies (configurable expiry)
- **Route Protection**: Authentication guards prevent unauthorized access
- **Input Validation**: Zod schemas validate all user input client-side
- **API Interceptor**: Automatic token injection on every request

---

## 12. Future Enhancements (Roadmap)

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

## 13. Glossary

| Term | Definition |
|------|------------|
| **SPA** | Single Page Application |
| **JWT** | JSON Web Token — standard for secure token-based authentication |
| **HMR** | Hot Module Replacement — instant code updates without full page reload |
| **CRUD** | Create, Read, Update, Delete — standard data operations |
| **TanStack Query** | (formerly React Query) library for server state management |
| **Radix UI** | Headless, accessible UI component primitives |
| **Zod** | TypeScript-first schema validation library |
| **Biome** | Fast, opinionated linter and formatter (Rust-based) |
| **UID** | Unique Identifier — used for user API operations |

---

*This document is auto-generated based on the current codebase and should be updated as the project evolves.*
