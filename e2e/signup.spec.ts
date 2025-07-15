import { expect, test } from "@playwright/test";

test.describe("Signup Page", () => {
  test("should sign up with matching passwords", async ({ page }) => {
    await page.goto("/signup");

    const email = `testuser+${Date.now()}@example.com`;

    await page.getByLabel("Email address").fill(email);
    await page.getByLabel("Password").fill("TestPassword123");
    await page.getByLabel("Confirm Password").fill("TestPassword123");

    await page.getByRole("button", { name: "Signup" }).click();

    await expect(page).toHaveURL(/.*login/);
  });

  test("should show error when passwords do not match", async ({ page }) => {
    await page.goto("/signup");

    await page.getByLabel("Email address").fill("testmismatch@example.com");
    await page.getByLabel("Password").fill("password1");
    await page.getByLabel("Confirm Password").fill("password2");

    await page.getByRole("button", { name: "Signup" }).click();

    await expect(page.getByText("Passwords do not match")).toBeVisible();
  });
});
