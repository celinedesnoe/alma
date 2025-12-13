describe("[Alma] Not found", () => {
  it("displays forbidden page", () => {
    cy.visit("/403");

    cy.findByTestId("forbidden-page").should("be.visible");
  });
});
