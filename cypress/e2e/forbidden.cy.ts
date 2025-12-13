describe("[Alma] Not found", () => {
  it("displays forbidden page", () => {
    cy.visit("http://localhost:5173/403");

    cy.findByTestId("forbidden-page").should("be.visible");
  });
});
