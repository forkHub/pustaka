Great — here’s a **Vite‑specific, production‑ready guide** to publishing a library to **npm**.

This works for **TypeScript or JavaScript** and follows current best practices.

***

# Publish a Library to npm using **Vite**

## 1. Create a Vite library project

```bash
npm create vite@latest my-lib -- --template vanilla-ts
cd my-lib
npm install
```

You can also use:

*   `react-ts` for React libs
*   `vanilla` for plain JS

***

## 2. Configure Vite **library mode**

Edit **`vite.config.ts`**:

```ts
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "MyLib",
      fileName: (format) => `my-lib.${format}.js`
    },
    rollupOptions: {
      // External deps that should NOT be bundled
      external: [],
      output: {
        globals: {}
      }
    }
  }
});
```

✅ Vite will output:

    dist/
     ├─ my-lib.es.js
     ├─ my-lib.umd.js
     └─ style.css (if any)

***

## 3. Export your public API

Create **`src/index.ts`**:

```ts
export function greet(name: string) {
  return `Hello ${name}`;
}
```

✅ **Only export what users should access**

***

## 4. Configure `package.json`

Update **`package.json`**:

```json
{
  "name": "my-lib",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/my-lib.umd.js",
  "module": "./dist/my-lib.es.js",
  "exports": {
    ".": {
      "import": "./dist/my-lib.es.js",
      "require": "./dist/my-lib.umd.js"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "vite build",
    "prepublishOnly": "npm run build"
  }
}
```

✅ Why this matters:

*   Works in **ESM & CommonJS**
*   Ensures **tree‑shaking**
*   Avoids publishing source files

***

## 5. Generate TypeScript types (important ✅)

Install TypeScript if missing:

```bash
npm install -D typescript
```

Create **`tsconfig.json`**:

```json
{
  "compilerOptions": {
    "declaration": true,
    "emitDeclarationOnly": true,
    "outDir": "dist",
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

Add types build:

```json
"scripts": {
  "build": "vite build && tsc",
  "prepublishOnly": "npm run build"
}
```

Add to `package.json`:

```json
"types": "./dist/index.d.ts"
```

***

## 6. Login to npm

```bash
npm login
```

Check:

```bash
npm whoami
```

***

## 7. Test before publishing ✅

```bash
npm pack
```

Inspect:

```bash
tar -tf my-lib-1.0.0.tgz
```

✅ Ensure only `dist/` is included.

***

## 8. Publish to npm

### Public package

```bash
npm publish
```

### Scoped package

```bash
npm publish --access public
```

If name exists:

```json
"name": "@yourname/my-lib"
```

***

## 9. Verify usage

```bash
npm install my-lib
```

```ts
import { greet } from "my-lib";
```

***

## 10. Update & republish

```bash
npm version patch
npm publish
```

***

## Recommended extras ⭐

### `.npmignore` (optional)

If you don’t use `"files"`:

    src/
    node_modules/
    .env

### `README.md`

Auto‑shown on npm.

***

## Common Vite npm mistakes ❌

*   Forgetting `lib` mode
*   Publishing unbuilt code
*   Missing `exports`
*   Bundling peer dependencies
*   Not generating `.d.ts`

***

## Want this tailored?

I can give you:
✅ Vite + React library config  
✅ Vite + Tailwind component lib  
✅ Vite + Node utility lib  
✅ Dual ESM/CJS + peerDeps setup

Tell me what kind of library you’re publishing.
