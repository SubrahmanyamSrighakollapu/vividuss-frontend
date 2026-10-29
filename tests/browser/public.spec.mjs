import { test, expect } from "@playwright/test";
const api = process.env.BROWSER_API_URL || "http://127.0.0.1:5105/api";

test("published Puck home and subpage render with responsive typography", async ({ page }, info) => {
  test.skip(process.env.CLERK_STAGING_CONFIGURED !== "1", "Valid Clerk staging configuration is required for document navigation");
  const errors = [];
  page.on("pageerror", error => { errors.push(error.message); });
  await page.goto("/m15-puck");
  const heading = page.getByRole("heading", { name: "Welcome to the Puck fixture", exact: true });
  await expect(heading).toBeVisible();
  await expect(heading).toHaveCSS("font-size", info.project.name === "mobile" ? "24px" : "42px");
  await expect(page).toHaveTitle("Puck fixture");
  await expect(page.getByText("Shared Puck renderer acceptance fixture", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto("/m15-puck/about");
  await expect(page.getByRole("heading", { name: "About the Puck fixture", exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});
test("legacy publication remains readable", async ({ page }) => {
  test.skip(process.env.CLERK_STAGING_CONFIGURED !== "1", "Valid Clerk staging configuration is required for document navigation");
  await page.goto("/m15-legacy");
  await expect(page.getByRole("heading", { name: "Legacy café — preserved", exact: true })).toBeVisible();
});
test("SSR-protected editor redirects anonymous visitors", async ({ page }) => {
  test.skip(process.env.CLERK_STAGING_CONFIGURED !== "1", "Valid Clerk staging configuration is required for document navigation");
  await page.goto("/builder/m15-browser-site");
  await expect(page).toHaveURL(/\/sign-in/);
});
test("live backend rejects missing/invalid credentials before upload parsing and enforces CORS", async ({ request }) => {
  expect((await request.post(api + "/websites/m15-browser-site/publish")).status()).toBe(401);
  expect((await request.post(api + "/websites/m15-browser-site/publish", { headers: { Authorization: "Bearer invalid" } })).status()).toBe(401);
  expect((await request.get(api + "/categories/admin")).status()).toBe(401);
  expect((await request.post(api + "/media/upload", { headers: { "Content-Type": "multipart/form-data" }, data: "invalid multipart" })).status()).toBe(401);
  expect((await request.get(api + "/health", { headers: { Origin: "https://unapproved.example" } })).status()).toBe(403);
  const allowed = await request.fetch(api + "/health", { method: "OPTIONS", headers: { Origin: "http://127.0.0.1:3105", "Access-Control-Request-Method": "GET" } });
  expect(allowed.headers()["access-control-allow-origin"]).toBe("http://127.0.0.1:3105");
});
