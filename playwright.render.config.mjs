import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/rendering", workers: 1, retries: 0,
  reporter: [["list"], ["json", { outputFile: "test-results/rendering-results.json" }]],
  use: { channel: "chrome", screenshot: "only-on-failure", trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { viewport: { width: 1280, height: 900 } } },
    { name: "tablet", use: { viewport: { width: 820, height: 1180 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 } } },
  ],
});
