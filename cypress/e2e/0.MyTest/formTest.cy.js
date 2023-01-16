import firstData from "../../../src/firstData";

describe("Form Validation Test", () => {
  beforeEach(() => cy.visit("http://localhost:3000/"));

  it("Home Click Validation", () => {
    cy.get('[data-cy="home-link"]')
      .click()
      .get(`[data-cy=${firstData[4].name}]`)
      .contains(`${firstData[4].delivery}`);
  });

  it("Order Click Validation", () => {
    cy.get('[data-cy="order-link"]')
      .click()
      .get('[data-cy="order-fix-exp"]')
      .contains("Build your own pizza");
  });

  it("Help Click Validation", () => {
    cy.get('[data-cy="help-link"]')
      .click()
      .get('[data-cy="help-fix-sen"]')
      .contains("Haber");
  });

  it("Submit Button Disabled as Default", () => {
    cy.get('[data-cy="order-link"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="submit"]')
      .should("be.disabled");
  });

  it("Order Form Name Input Test", () => {
    cy.get('[data-cy="order-link"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="name-input"]')
      .click()
      .type("Hakan AKSOY")
      .should("have.value", "Hakan AKSOY");
  });

  it("Order Form Size Droplist Test", () => {
    cy.get('[data-cy="order-link"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="select-input"]')
      .select("Large")
      .should("have.value", "Large");
  });

  it("Order Form Radio Button Test", () => {
    cy.get('[data-cy="order-link"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="alfredo"]')
      .check()
      .should("be.checked");
  });

  it("Order Form Checkbox Test", () => {
    cy.get('[data-cy="order-link"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="pepperoni"]')
      .check()
      .should("be.checked")
      .get('[data-cy="bacon"]')
      .check()
      .should("be.checked")
      .get('[data-cy="ham"]')
      .check()
      .should("be.checked")
      .get('[data-cy="meatballs"]')
      .check()
      .should("be.checked")
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="gluten"]')
      .check()
      .should("be.checked");
  });

  it("Order Form Note Input Test", () => {
    cy.get('[data-cy="order-link"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="note-input"]')
      .click()
      .type("Zil çalışmıyor")
      .should("have.value", "Zil çalışmıyor");
  });

  it("Order Form Quantity Test", () => {
    cy.get('[data-cy="order-link"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="quantity-input"]')
      .click()
      .clear()
      .type("3")
      .should("have.value", "3");
  });

  it("Error Message Working Properly Test", () => {
    cy.get('[data-cy="order-link"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="name-input"]')
      .click()
      .type("H")
      .get('[data-cy="error"]')
      .should("have.css", "display", "block")
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="pepperoni"]')
      .check()
      .get('[data-cy="bacon"]')
      .check()
      .get('[data-cy="ham"]')
      .check()
      .get('[data-cy="error"]')
      .should("have.css", "display", "block");
  });

  it("Price Calculation Test", () => {
    cy.get('[data-cy="order-link"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="select-input"]')
      .select("Large")
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="alfredo"]')
      .check()
      .get('[data-cy="pepperoni"]')
      .check()
      .get('[data-cy="bacon"]')
      .check()
      .get('[data-cy="ham"]')
      .check()
      .get('[data-cy="meatballs"]')
      .check()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="gluten"]')
      .check()
      .get('[data-cy="quantity-input"]')
      .click()
      .clear()
      .type("2")
      .get('[data-cy="submit"]')
      .contains("$ 270");
  });

  it("Submit Button Working Properly(not submit and submit)", () => {
    cy.get('[data-cy="order-link"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="name-input"]')
      .click()
      .type("h")
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="submit"]')
      .should("be.disabled")
      .get('[data-cy="previous-page"]')
      .click()
      .get('[data-cy="previous-page"]')
      .click()
      .get('[data-cy="name-input"]')
      .click()
      .clear()
      .type("Hakan AKSOY")
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="submit"]')
      .should("be.disabled")
      .get('[data-cy="previous-page"]')
      .click()
      .get('[data-cy="previous-page"]')
      .click()
      .get('[data-cy="select-input"]')
      .select("Large")
      .should("have.value", "Large")
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="submit"]')
      .should("be.disabled")
      .get('[data-cy="previous-page"]')
      .click()
      .get('[data-cy="alfredo"]')
      .check()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="submit"]')
      .should("be.disabled")
      .get('[data-cy="previous-page"]')
      .click()
      .get('[data-cy="pepperoni"]')
      .check()
      .get('[data-cy="bacon"]')
      .check()
      .get('[data-cy="ham"]')
      .check()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="submit"]')
      .should("be.disabled")
      .get('[data-cy="previous-page"]')
      .click()
      .get('[data-cy="meatballs"]')
      .check()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="gluten"]')
      .check()
      .get('[data-cy="quantity-input"]')
      .click()
      .clear()
      .type("0")
      .get('[data-cy="submit"]')
      .should("be.disabled")
      .get('[data-cy="quantity-input"]')
      .click()
      .clear()
      .type("1")
      .get('[data-cy="submit"]')
      .should("not.be.disabled")
      .click()
      .get('[data-cy="register"]')
      .should("have.css", "display", "block");
  });
});
