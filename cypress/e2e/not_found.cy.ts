describe("[Alma] Not found", () => {
  it("displays not found page", () => {
    cy.visit("http://localhost:5173/nowhere");

    cy.findByTestId("not-found-page").should("be.visible");
  });
});
