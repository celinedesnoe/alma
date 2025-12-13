describe("[Alma] Payment Details", () => {
  it("displays payments details when visiting /payments/<id>", () => {
    cy.intercept("GET", "**/payment/*").as("getPaymentDetails");

    cy.visit(
      "http://localhost:5173/payments/payment_121IopV7OU4kX5pMradVJfGAQzSJz7MGy2",
    );

    cy.wait("@getPaymentDetails").its("response.statusCode").should("eq", 200);

    cy.url().should("match", /\/payments\/.+/);

    cy.findByTestId("payment-details-page").should("be.visible");
    cy.findByTestId("payment-details-header").should("be.visible");
    cy.findByTestId("payment-plan").should("be.visible");
  });

  it("toggles between in progress and history installment on payment details page", () => {
    cy.intercept("GET", "**/payment/*").as("getPaymentDetails");

    cy.visit(
      "http://localhost:5173/payments/payment_121IopV7OU4kX5pMradVJfGAQzSJz7MGy2",
    );

    cy.findByTestId("payment-plan").should("be.visible");

    // We consider mock data do not to change and have at least 1 installment which is not paid
    // If they will change, we would intercept the request and override the response with fixture
    cy.findAllByTestId("installment").then((items) => {
      const inProgressCount = items.length;
      expect(inProgressCount).to.be.greaterThan(0);
    });

    cy.findByRole("button", { name: /history/i }).click();

    // We consider whether there are paid installments or not
    cy.findByTestId("payment-plan-tab-content")
      .findByTestId("installment")
      .then((items) => {
        if (items.length === 0) {
          cy.findByTestId("empty-payment-plan")
            .should("be.visible")
            .and("contain.text", "No installments");
        } else {
          cy.findAllByTestId("installment-state").each(($badge) => {
            cy.wrap($badge).should("contain.text", "PAID");
          });
        }
      });
  });

  it("shows an error state when payments API fails", () => {
    cy.intercept("GET", "**/payment/*", {
      statusCode: 500,
      body: {},
    }).as("getPaymentsError");

    cy.visit(
      "http://localhost:5173/payments/payment_121IopV7OU4kX5pMradVJfGAQzSJz7MGy3",
    );
    cy.wait("@getPaymentsError");

    cy.findByTestId("error").should("be.visible");
  });
});
