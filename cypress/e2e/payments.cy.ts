describe("[Alma] Payments", () => {
  it("displays payments list", () => {
    cy.intercept("GET", "**/localhost:3001/payments").as("getPayments");

    cy.visit("http://localhost:5173/payments");
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
    cy.intercept("GET", "**/payments").as("getPayments");

    cy.visit("http://localhost:5173/");
    cy.url().should("include", "payments");
    cy.wait("@getPayments").its("response.statusCode").should("eq", 200);
  });

  it("shows an error state when payments API fails", () => {
    cy.intercept("GET", "**/payments", {
      statusCode: 500,
      body: {},
    }).as("getPaymentsError");

    cy.visit("http://localhost:5173/");
    cy.wait("@getPaymentsError");

    cy.findByTestId("error").should("be.visible");
  });

  it("displays payments details when clicking on a payment", () => {
    cy.intercept("GET", "**/payments").as("getPayments");
    cy.intercept("GET", "**/payment/*").as("getPaymentDetails");

    cy.visit("http://localhost:5173/");
    cy.url().should("include", "payments");
    cy.wait("@getPayments");

    cy.findAllByTestId("payment-card").first().click();

    cy.wait("@getPaymentDetails").its("response.statusCode").should("eq", 200);

    cy.url().should("match", /\/payments\/.+/);

    cy.findByTestId("payment-details-page").should("be.visible");
    cy.findByTestId("payment-details-header").should("be.visible");
    cy.findByTestId("payment-plan").should("be.visible");
  });
});
