# React Starter + Vite + TanStack

A modern React starter template built with Vite, TanStack Query, TypeScript, and Tailwind CSS. This template includes authentication, routing, state management, and a complete admin dashboard setup.

## 🚀 Tech Stack

- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **TypeScript** - Type safety
- **TanStack Query v5** - Server state management
- **React Router v7** - Client-side routing
- **Tailwind CSS v3** - Utility-first CSS framework
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

### Setup Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer @tailwindcss/vite
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
npm install tailwindcss@latest @tailwindcss/vite@latest @tailwindcss/typography@latest
npm install tw-animate-css && npm uninstall tailwindcss-animate autoprefixer postcss
del postcss.config.js && del tailwind.config.ts

npx vite build


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
│   ├── layout/          # Layout components (AdminLayout, etc.)
│   ├── ui/              # Reusable UI components
│   └── ThemeToggle.tsx  # Theme switcher
├── context/
│   └── AuthContext.tsx  # Authentication context
├── hooks/
│   ├── auth/            # Authentication hooks
│   ├── user/            # User management hooks
│   └── useToast.tsx     # Toast notifications
├── services/
│   └── api.ts           # Axios instance & API config
├── views/
│   ├── admin/           # Admin dashboard pages
│   ├── auth/            # Authentication pages
│   └── home/            # Public pages
├── routes/
│   └── index.tsx        # Route configuration
├── App.tsx              # Root component
└── main.tsx             # Entry point
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

Update your Tailwind config or CSS variables for custom theming.

### Components

All UI components are in `src/components/ui/` and can be customized as needed.

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React + Vite + TanStack
