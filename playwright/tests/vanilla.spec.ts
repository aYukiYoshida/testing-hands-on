import { test, expect } from "@playwright/test";

test.describe("Vanilla Playwright Test", () => {
  test.describe("アプリケーション起動", () => {
    test("アプリケーションが開く", async ({ page, baseURL }) => {
      // actions
      await test.step("アプリケーションにアクセスする", async () => {
        await page.goto("/");
      });
      // asserts
      await test.step("ログインページに遷移する", async () => {
        await expect(page).toHaveURL(baseURL + "/login");
      });
    });
  });

  test.describe("ログイン", () => {
    test.beforeEach(async ({ page }) => {
      // arranges
      await page.goto("/");
    });

    test.describe("登録があるユーザの場合", () => {
      test.describe("正しいパスワードを入力した場合", () => {
        test("成功する", async ({ page, baseURL }) => {
          // actions
          await test.step("ユーザー名とパスワードを入力し、ログインボタンを押下する", async () => {
            await page
              .getByRole("textbox", { name: "username" })
              .fill("pulsar");
            await page
              .getByRole("textbox", { name: "password" })
              .fill("neutronstar");
            await page.getByRole("button", { name: "Login" }).click();
          });
          // asserts
          await test.step("ステータスページに遷移し、ログインに成功したメッセージが表示される", async () => {
            await expect(page).toHaveURL(baseURL + "/status");
            await expect(page.getByTestId("status")).toHaveText(
              "Success to login."
            );
          });
        });
      });

      test.describe("不正なパスワードを入力した場合", () => {
        test("失敗する", async ({ page, baseURL }) => {
          // actions
          await test.step("ユーザー名とパスワードを入力し、ログインボタンを押下する", async () => {
            await page
              .getByRole("textbox", { name: "username" })
              .fill("pulsar");
            await page
              .getByRole("textbox", { name: "password" })
              .fill("blackhole");
            await page.getByRole("button", { name: "Login" }).click();
          });
          // asserts
          await test.step("ステータスページに遷移し、ログインに失敗したメッセージが表示される", async () => {
            await expect(page).toHaveURL(baseURL + "/status");
            await expect(page.getByTestId("status")).toHaveText(
              "Incorrect username or password."
            );
          });
        });
      });
    });

    test.describe("登録がないユーザの場合", () => {
      test("失敗する", async ({ page, baseURL }) => {
        // actions
        await test.step("ユーザー名とパスワードを入力し、ログインボタンを押下する", async () => {
          await page
            .getByRole("textbox", { name: "username" })
            .fill("magnetar");
          await page
            .getByRole("textbox", { name: "password" })
            .fill("neutronstar");
          await page.getByRole("button", { name: "Login" }).click();
        });
        // asserts
        await test.step("ステータスページに遷移し、ログインに失敗したメッセージが表示される", async () => {
          await expect(page).toHaveURL(baseURL + "/status");
          await expect(page.getByTestId("status")).toHaveText(
            "Incorrect username or password."
          );
        });
      });
    });
  });
});
