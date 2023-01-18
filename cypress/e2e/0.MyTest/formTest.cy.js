import firstData from "../../../src/firstData";
import price from "../../../src/Component/price";
import { pizzaSauce, pizzaIngredients } from "../../../src/Component/FormDiv2";
import { pizzaSize } from "../../../src/Component/FormDiv1";

const testSupplier = firstData[2].name;
const testName = "Hakan AKSOY";
const testSize = pizzaSize[3];
const testSauce = pizzaSauce[4];
const testIngredient = [
  pizzaIngredients[0],
  pizzaIngredients[1],
  pizzaIngredients[2],
  pizzaIngredients[3],
];
const testGluten = "gluten";
const testNote = "Zil çalışmıyor";
const testQuantity = 3;

const testPrice =
  (price[testSize] +
    price[testSauce] +
    price.ingredients * testIngredient.length) *
  price[testGluten] *
  testQuantity;

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

  it("Order Click Working (supplier click)", () => {
    cy.get(`[data-cy="${testSupplier}"]`)
      .click()
      .get('[data-cy="order-fix-exp"]')
      .contains("Build your own pizza");
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

  it("Next and Previous Button Working Properly", () => {
    cy.get('[data-cy="order-link"]')
      .click()
      .get('[data-cy="previous-page"]')
      .click()
      .get('[data-cy="previous-page"]')
      .click()
      .url()
      .should("eq", "http://localhost:3000/order")
      .get('[data-cy="next-page"]')
      .click()
      .url()
      .should("eq", "http://localhost:3000/order/1")
      .get('[data-cy="previous-page"]')
      .click()
      .url()
      .should("eq", "http://localhost:3000/order/1")
      .get('[data-cy="next-page"]')
      .click()
      .url()
      .should("eq", "http://localhost:3000/order/2")
      .get('[data-cy="previous-page"]')
      .click()
      .url()
      .should("eq", "http://localhost:3000/order/1")
      .get('[data-cy="previous-page"]')
      .url()
      .get('[data-cy="previous-page"]')
      .url()
      .should("eq", "http://localhost:3000/order/1")
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .url()
      .should("eq", "http://localhost:3000/order/3")
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .url()
      .should("eq", "http://localhost:3000/order/3");
  });

  it("Order Form Name Input Test", () => {
    cy.get('[data-cy="order-link"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="name-input"]')
      .click()
      .type(testName)
      .should("have.value", testName);
  });

  it("Order Form Size Droplist Test", () => {
    cy.get('[data-cy="order-link"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="select-input"]')
      .select(testSize)
      .should("have.value", testSize);
  });

  it("Order Form Radio Button Test", () => {
    cy.get('[data-cy="order-link"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get(`[data-cy=${testSauce}]`)
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
      .get(`[data-cy=${testIngredient[0]}]`)
      .check()
      .should("be.checked")
      .get(`[data-cy=${testIngredient[1]}]`)
      .check()
      .should("be.checked")
      .get(`[data-cy=${testIngredient[2]}]`)
      .check()
      .should("be.checked")
      .get(`[data-cy=${testIngredient[3]}]`)
      .check()
      .should("be.checked")
      .get('[data-cy="next-page"]')
      .click()
      .get(`[data-cy=${testGluten}]`)
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
      .type(testNote)
      .should("have.value", testNote);
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
      .type(testQuantity)
      .should("have.value", testQuantity);
  });

  it("Error Message Working Properly Test and Check Previous Button Disabled During Error Message Occuring ", () => {
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
      .should("be.disabled")
      .get('[data-cy="name-input"]')
      .click()
      .clear()
      .type(testName)
      .get('[data-cy="select-input"]')
      .select(testSize)
      .get('[data-cy="next-page"]')
      .click()
      .get(`[data-cy=${testIngredient[0]}]`)
      .check()
      .get(`[data-cy=${testIngredient[1]}]`)
      .check()
      .get(`[data-cy=${testIngredient[2]}]`)
      .check()
      .get('[data-cy="error"]')
      .should("have.css", "display", "block")
      .get('[data-cy="next-page"]')
      .should("be.disabled")
      .get(`[data-cy=${testIngredient[3]}]`)
      .check()
      .get('[data-cy="next-page"]')
      .click();
  });

  it("Price Calculation Test", () => {
    cy.get('[data-cy="order-link"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="select-input"]')
      .select(testSize)
      .get('[data-cy="next-page"]')
      .click()
      .get(`[data-cy=${testSauce}]`)
      .check()
      .get(`[data-cy=${testIngredient[0]}]`)
      .check()
      .get(`[data-cy=${testIngredient[1]}]`)
      .check()
      .get(`[data-cy=${testIngredient[2]}]`)
      .check()
      .get(`[data-cy=${testIngredient[3]}]`)
      .check()
      .get('[data-cy="next-page"]')
      .click()
      .get(`[data-cy=${testGluten}]`)
      .check()
      .get('[data-cy="quantity-input"]')
      .click()
      .clear()
      .type(testQuantity)
      .get('[data-cy="submit"]')
      .contains(`$ ${testPrice}`);
  });

  it("Submit Button Working Properly(not submit and submit)", () => {
    cy.get('[data-cy="order-link"]')
      .click()
      .get('[data-cy="next-page"]')
      .click()
      .get('[data-cy="name-input"]')
      .click()
      .type("h")
      .visit("http://localhost:3000/order/3")
      .get('[data-cy="submit"]')
      .should("be.disabled")
      .get('[data-cy="previous-page"]')
      .click()
      .get('[data-cy="previous-page"]')
      .click()
      .get('[data-cy="name-input"]')
      .click()
      .clear()
      .type(testName)
      .visit("http://localhost:3000/order/3")
      .get('[data-cy="submit"]')
      .should("be.disabled")
      .get('[data-cy="previous-page"]')
      .click()
      .get('[data-cy="previous-page"]')
      .click()
      .get('[data-cy="select-input"]')
      .select(testSize)
      .should("have.value", testSize)
      .visit("http://localhost:3000/order/3")
      .get('[data-cy="submit"]')
      .should("be.disabled")
      .get('[data-cy="previous-page"]')
      .click()
      .get(`[data-cy=${testSauce}]`)
      .check()
      .visit("http://localhost:3000/order/3")
      .get('[data-cy="submit"]')
      .should("be.disabled")
      .get('[data-cy="previous-page"]')
      .click()
      .get(`[data-cy=${testIngredient[0]}]`)
      .check()
      .get(`[data-cy=${testIngredient[1]}]`)
      .check()
      .get(`[data-cy=${testIngredient[2]}]`)
      .check()
      .visit("http://localhost:3000/order/3")
      .get('[data-cy="submit"]')
      .should("be.disabled")
      .get('[data-cy="previous-page"]')
      .click()
      .get('[data-cy="previous-page"]')
      .click()
      .get('[data-cy="name-input"]')
      .click()
      .clear()
      .type(testName)
      .get('[data-cy="select-input"]')
      .select(testSize)
      .get('[data-cy="next-page"]')
      .click()
      .get(`[data-cy=${testIngredient[0]}]`)
      .check()
      .get(`[data-cy=${testIngredient[1]}]`)
      .check()
      .get(`[data-cy=${testIngredient[2]}]`)
      .check()
      .get(`[data-cy=${testIngredient[3]}]`)
      .check()
      .get('[data-cy="next-page"]')
      .click()
      .get(`[data-cy=${testGluten}]`)
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
      .type(testQuantity)
      .get('[data-cy="note-input"]')
      .click()
      .type(testNote)
      .get('[data-cy="submit"]')
      .should("not.be.disabled")
      .click()
      .get('[data-cy="register"]')
      .should("have.css", "display", "block")
      .wait(4500)
      .url()
      .should("eq", "http://localhost:3000/");
  });
});
