# React Starter + Vite + TanStack

A modern React starter template built with Vite, TanStack Query, TypeScript, and Tailwind CSS. This template includes authentication, routing, state management, and a complete admin dashboard setup.

## 🚀 Tech Stack

- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **TypeScript** - Type safety
- **TanStack Query v5** - Server state management
- **React Router v7** - Client-side routing
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Axios** - HTTP client
- **Biome v2** - Fast linter and formatter
- **Husky v9** - Git hooks

## 📦 Installation

### Create New Project

```bash
npm create vite@7.1.3 react-starter -- --template react-ts
cd react-starter
```

### Install Core Dependencies

```bash
# HTTP Client & Utilities
npm install axios@1.8.4
npm install js-cookie@3.0.5
npm install -D @types/js-cookie@3.0.6

# Routing
npm install react-router@7.11.0

# Theming
npm install next-themes

# State Management
npm install @tanstack/react-query@5.90.16
```

### Setup Biome (Linter & Formatter)

```bash
# Install Biome
npm install --save-dev --save-exact @biomejs/biome
npx biome init

# Remove ESLint (optional)
npm uninstall eslint eslint-plugin-react-hooks eslint-plugin-react-refresh @typescript-eslint/parser @typescript-eslint/eslint-plugin @eslint/js globals typescript-eslint
```

Update `biome.json`:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.3.11/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "nursery": {
        "noUnresolvedImports": "off",
        "useExplicitType": "off",
        "useQwikValidLexicalScope": "off",
        "useSortedClasses": "off",
        "noTernary": "off"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "tab"
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "double"
    }
  }
}
```

### Setup Husky & Lint-Staged

```bash
npm install --save-dev husky lint-staged
npx husky init
```

Add to `package.json`:

```json
{
  "scripts": {
    "lint": "biome check --write ./src",
    "format": "biome format --write ./src",
    "prepare": "husky"
  },
  "lint-staged": {
    "src/**/*.{js,ts,jsx,tsx}": [
      "biome check --write --no-errors-on-unmatched"
    ]
  }
}
```

Update `.husky/pre-commit`:

```bash
npx lint-staged
```
### Setup Tailwind CSS v3

```bash
npm install -D tailwindcss@3.4.19 postcss@8.5.11 autoprefixer@10.4.22 @tailwindcss/vite@4.1.18
npx tailwindcss init -p
```

Update `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add to `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;


### Setup Tailwind CSS v4

```bash
npm install tailwindcss @tailwindcss/vite @tailwindcss/typography tw-animate-css
```

Add the Tailwind Vite plugin to `vite.config.ts`:

```typescript
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // ...
});
```

In Tailwind v4, there is **no `tailwind.config.ts`** or `postcss.config.js`. All configuration lives in `src/index.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  /* ... all theme tokens ... */

  --radius-lg: var(--radius);
  --font-sans: "Inter", system-ui, sans-serif;

  --animate-fade-in: fade-in 0.3s ease-out;

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
}

/* CSS variables for light/dark mode */
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  /* ... */
}

.dark {
  --background: 222 47% 6%;
  --foreground: 210 40% 98%;
  /* ... */
}

/* Custom utilities use @utility instead of @layer utilities */
@utility gradient-primary {
  background: linear-gradient(135deg, hsl(221 83% 53%) 0%, hsl(280 65% 60%) 100%);
}

@utility container {
  margin-inline: auto;
  padding-inline: 2rem;
  @media (width >= 1400px) {
    max-width: 1400px;
  }
}
```

### Setup Radix UI (shadcn/ui style)

Install Radix UI components as needed:

```bash
# Example: Install common components
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-avatar
npm install @radix-ui/react-label
npm install @radix-ui/react-slot
npm install class-variance-authority
npm install clsx tailwind-merge
npm install lucide-react
```

### How to Migrate Tailwind v3 to v4

```bash
# 1. Install v4 packages
npm install tailwindcss@latest @tailwindcss/vite@latest @tailwindcss/typography@latest

# 2. Replace tailwindcss-animate with tw-animate-css, remove PostCSS
npm install tw-animate-css && npm uninstall tailwindcss-animate autoprefixer postcss

# 3. Delete old config files (no longer needed in v4)
del postcss.config.js && del tailwind.config.ts

# 4. Verify build
npx vite build
```

Key changes:

- `@tailwind base/components/utilities` → `@import "tailwindcss"`
- `tailwind.config.ts` → `@theme inline { ... }` in `index.css`
- `@layer utilities { .my-util {} }` → `@utility my-util { ... }`
- `darkMode: ["class"]` → `@custom-variant dark (&:is(.dark *))`
- `tailwindcss-animate` → `tw-animate-css`


### 🧪 Testing Setup

#### 1. Install Testing Dependencies

```bash
npm install -D vitest @vitest/coverage-v8 jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

#### 2. Configure Vitest

Update `vite.config.ts` to include the test configuration:

```typescript
export default defineConfig({
  // ... existing config
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/main.tsx", "src/vite-env.d.ts", "src/test/**"],
      // thresholds: {
      //   lines: 98,
      //   functions: 98,
      //   branches: 98,
      //   statements: 98,
      // },
    },
  },
})
```

#### 3. Create Test Setup

Create `src/test/setup.ts` to extend Vitest with Testing Library matchers:

```typescript
import "@testing-library/jest-dom/vitest";
```

#### 4. Add Test Scripts

Add these to your `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── auth/                # Auth-related components (AuthBranding)
│   ├── layout/              # Layout components
│   │   ├── AdminLayout.tsx  # Admin sidebar + navbar layout
│   │   ├── PublicNavbar.tsx  # Public pages navigation bar
│   │   └── Footer.tsx       # Public pages footer
│   ├── ui/                  # Reusable UI components (shadcn/ui)
│   ├── NavLink.tsx          # Navigation link component
│   ├── SidebarMenu.tsx      # Sidebar menu component
│   ├── ThemeProvider.tsx     # Theme context provider
│   └── ThemeToggle.tsx      # Dark/Light mode switcher
├── context/
│   └── AuthContext.tsx      # Authentication context & provider
├── guards/
│   ├── AuthGuard.tsx        # Protected route guard (redirects to /login)
│   └── GuestGuard.tsx       # Guest-only guard (redirects to /admin)
├── hooks/
│   ├── auth/                # Authentication hooks (useAuth, useLogin)
│   ├── role/                # Role management hooks
│   ├── user/                # User management hooks
│   ├── useDebounced.tsx     # Debounce hook
│   ├── useIsMobile.tsx      # Responsive breakpoint hook
│   ├── useTheme.tsx         # Theme hook
│   └── useToast.ts          # Toast notifications hook
├── lib/
│   ├── validations/         # Zod validation schemas
│   │   ├── auth.ts          # Login/Register schemas
│   │   └── user.ts          # User management schemas
│   └── utils.ts             # cn() utility (clsx + tailwind-merge)
├── services/
│   └── api.ts               # Axios instance & API config
├── views/
│   ├── admin/
│   │   ├── dashboard/       # Admin dashboard page
│   │   └── user-management/ # Users & roles CRUD pages
│   ├── auth/
│   │   ├── components/      # Auth form components (LoginForm, RegisterForm)
│   │   ├── login.tsx         # Login page
│   │   ├── register.tsx      # Register page
│   │   └── reset-password.tsx # Reset password page
│   ├── home/                # Home/landing page
│   ├── About.tsx            # About page
│   ├── Agenda.tsx           # Agenda/blog listing page
│   ├── AgendaDetail.tsx     # Agenda/blog detail page
│   ├── Contact.tsx          # Contact page
│   ├── Features.tsx         # Features page
│   ├── Pricing.tsx          # Pricing page
│   └── NotFound.tsx         # 404 page
├── routes/
│   └── index.tsx            # Route configuration
├── test/
│   └── setup.ts             # Vitest setup with Testing Library
├── index.css                # Tailwind v4 CSS-first config & design tokens
├── App.tsx                  # Root component
├── main.tsx                 # Entry point
└── vite-env.d.ts            # Vite type declarations
```

## 🎯 Features

### ✅ Authentication

- Login/Register/Reset Password pages
- Protected routes with authentication guards
- JWT token management with cookies
- Auth context for global state

### ✅ User Management

- CRUD operations for users
- Password & confirmation password fields
- Field-level validation with error display
- Toast notifications for success/error states
- Optimistic updates with TanStack Query

### ✅ Admin Dashboard

- Responsive sidebar navigation
- Dark/Light theme toggle
- User profile dropdown
- Protected admin routes

### ✅ Form Validation

- Client-side validation
- Server-side error handling
- Per-field error display
- Password confirmation matching

### ✅ Developer Experience

- TypeScript for type safety
- Biome for fast linting & formatting
- Husky for pre-commit hooks
- Hot Module Replacement (HMR)

## 🚦 Available Scripts

```bash
# Development
npm run dev              # Start dev server

# Build
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Lint and fix code
npm run format           # Format code

# Testing
npm run test             # Run unit tests
npm run test:coverage    # Run tests with coverage report
```

## 🔧 Configuration

### API Configuration

Update `src/services/api.ts` with your API base URL:

```typescript
const Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

## 📝 Usage Examples

### Creating a New Page

1. Create component in `src/views/`
2. Add route in `src/routes/index.tsx`
3. Add navigation link in `AdminLayout.tsx`

### Adding a New API Hook

```typescript
// src/hooks/example/useExample.tsx
import { useQuery } from "@tanstack/react-query";
import Api from "@/services/api";

export const useExample = () =>
  useQuery({
    queryKey: ["example"],
    queryFn: () => Api.get("/api/example").then((res) => res.data),
  });
```

## 🎨 Customization

### Theme Colors

Update CSS variables in `src/index.css` (`:root` for light mode, `.dark` for dark mode) and their corresponding `--color-*` tokens in the `@theme inline` block.

### Components

All UI components are in `src/components/ui/` and can be customized as needed.

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React + Vite + TanStack
