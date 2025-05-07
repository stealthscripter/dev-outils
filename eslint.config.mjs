import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Enable Next.js recommended rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    // Optional: Add custom rules or overrides here
    rules: {
      // Example: Adjust or disable no-unused-vars if needed
      "@typescript-eslint/no-unused-vars": "warn", // or "off" if you want to disable it
      "@typescript-eslint/no-explicit-any": "off"

    },
  },
];