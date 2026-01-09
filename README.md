# React Starter + Vite + Tanstack

# Create App
npm create vite@7.1.3 frontend-react-ts -- --template react-ts

# Instalasi Dependensi
npm install axios@1.8.4
npm install js-cookie@3.0.5
npm install -D @types/js-cookie@3.0.6
npm install react-router@7.11.0
npm install next-themes

# setup tanstack
npm install @tanstack/react-query@5.90.16

# setup biome & husky
npm install --save-dev --save-exact @biomejs/biome
npx biome init
`
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "nursery": {
        "useTailwindAttributes": "warn"
      }
    }
  }
}
`
npm uninstall eslint eslint-plugin-react-hooks eslint-plugin-react-refresh @typescript-eslint/parser @typescript-eslint/eslint-plugin

npm install --save-dev husky lint-staged
npx husky init
`
"lint-staged": {
  "src/**/*.{js,ts,jsx,tsx}": [
    "biome check --write --no-errors-on-unmatched"
  ]
}
`
Update .husky/pre-commit -> npx lint-staged 
`
    "lint": "biome check --write ./src",
    "format": "biome format --write ./src",
    "prepare": "husky"
`
npm uninstall @eslint/js globals typescript-eslint

# setup tailwindcss
npm install -D tailwindcss postcss autoprefixer @tailwindcss/vite
npx tailwindcss init -p

# setup radix UI
