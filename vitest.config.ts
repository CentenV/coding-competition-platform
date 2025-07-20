import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    projects: [
      "app/*/vitest.config.ts",
      "lib/*/vitest.config.ts",
      "services/*/vitest.config.ts"
    ],
    coverage: {
      exclude: ["**/*.js"],
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./.coverage"
    }
  }
})
