beforeEach(() => {
  // arranges
  cy.visit("/");
});

describe("Access to TESEUS", () => {
  it("ログインページに遷移する", () => {
    cy.url().should("eq", Cypress.config().baseUrl + "/login");
  });

  it("正当なユーザー名とパスワードでログインする", () => {
    // actions
    cy.getByTestId("username").type("pulsar");
    cy.getByTestId("password").type("neutronstar");
    cy.contains("Login").click();

    // asserts
    cy.url().should("eq", Cypress.config().baseUrl + "/status");
    cy.getByTestId("status").should("have.text", "Success to login.");
  });

  it("登録がないユーザー名でログインする", () => {
    // actions
    cy.getByTestId("username").type("magnetar");
    cy.getByTestId("password").type("neutronstar");
    cy.contains("Login").click();

    // asserts
    cy.url().should("eq", Cypress.config().baseUrl + "/status");
    cy.getByTestId("status").should(
      "have.text",
      "Incorrect username or password."
    );
  });

  it("不正なパスワードでログインする", () => {
    // actions
    cy.getByTestId("username").type("pulsar");
    cy.getByTestId("password").type("blackhole");
    cy.contains("Login").click();

    // asserts
    cy.url().should("eq", Cypress.config().baseUrl + "/status");
    cy.getByTestId("status").should(
      "have.text",
      "Incorrect username or password."
    );
  });
});
