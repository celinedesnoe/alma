const api = Cypress.env("VITE_API_URL");

describe("[Alma] Payments", () => {
  it("displays payments list", () => {
    // As we have defined a React route "/payments", cypress intercepts first GET http://localhost:5173/payments
    // We need then to explicitly give the api url for "/payments" endpoint intercept
    cy.intercept("GET", `${api}/payments`).as("getPayments");

    cy.visit("/payments");

    cy.wait("@getPayments").then(({ response }) => {
      cy.findByRole("heading", { name: "Your payments" }).should("be.visible");
      cy.findByTestId("total-amount-left-to-pay").should("be.visible");

      console.log("response", response);
      cy.findAllByTestId("payment-card").should(
        "have.length",
        response.body.payments.length,
      );
      cy.findAllByTestId("payment-card")
        .first()
        .within(() => {
          cy.get("[data-testid='payment-amount']").should("be.visible");
          cy.findByRole("heading", {
            name: response.body.payments[0].merchant_display_name,
          }).should("be.visible");
        });
    });
  });

  it("redirects to payments list page when visiting /", () => {
    cy.intercept("GET", `${api}/payments`).as("getPayments");

    cy.visit("/");
    cy.url().should("include", "payments");
    cy.wait("@getPayments").its("response.statusCode").should("eq", 200);
  });

  it("displays payments details when clicking on a payment", () => {
    cy.intercept("GET", `${api}/payments`).as("getPayments");
    cy.intercept("GET", "/payment/*").as("getPaymentDetails");

    cy.visit("/payments");

    cy.wait("@getPayments").then(({ response }) => {
      const { id } = response.body.payments[0];

      cy.findAllByTestId("payment-card").first().click();

      cy.wait("@getPaymentDetails");

      cy.url().should("include", `payments/${id}`);
    });

    cy.findByTestId("payment-details-page").should("be.visible");
  });

  it("shows an error state when payments API fails", () => {
    cy.intercept("GET", `${api}/payments`, {
      statusCode: 500,
      body: {},
    }).as("getPaymentsError");

    cy.visit("/payments");
    cy.wait("@getPaymentsError");

    cy.findByTestId("error").should("be.visible");
  });
});
