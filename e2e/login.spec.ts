import { expect, test } from "@playwright/test";

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("renders login form with all fields", async ({ page }) => {
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /don't have an account/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /forgot password/i }),
    ).toBeVisible();
  });

  test("shows validation error for empty fields", async ({ page }) => {
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(page.getByText("Invalid email address.")).toBeVisible();
    await expect(
      page.getByText("Password must be at least 6 characters."),
    ).toBeVisible();
  });

  test("shows error on invalid credentials", async ({ page }) => {
    await page.getByLabel("Email").fill("invalid@example.com");
    await page.getByLabel("Password").fill("wrongpass");
    await page.getByRole("button", { name: /sign in/i }).click();

    await expect(
      page.getByText(/(user not found|wrong password|login failed)/i),
    ).toBeVisible();
  });

  test("redirects on successful login", async ({ page }) => {
    const email = "admin@admin.com";
    const password = "admin123";

    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(password);
    await page.getByRole("button", { name: /sign in/i }).click();

    await expect(page).toHaveURL(/.*dashboard/);
  });
});
