describe("[Alma] Not found", () => {
  it("displays not found page", () => {
    cy.visit("/nowhere");

    cy.findByTestId("not-found-page").should("be.visible");
  });
});
