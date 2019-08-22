describe("Player actions", () => {
  before(() => {
    cy.visit("/");
  });

  it("clicks to add 2 playersr and checks that inputs are visible", () => {
    cy.get("#addPlayer").click();
    cy.get("#player0Name").should("exist");
    cy.get("#player0Score").should("exist");
    cy.get("#addPlayer").click();
    cy.get("#player1Name").should("exist");
    cy.get("#player1Score").should("exist");
  });
  it("adds scores for 3 rounds and one player is dismissed", () => {
    cy.get("#player0Score").type("5");
    cy.get(".player0 .addScore").click();
    cy.get("#player1Score").type("0");
    cy.get(".player1 .addScore").click();
    cy.get("#player0Score").type("5");
    cy.get(".player0 .addScore").click();
    cy.get("#player1Score").type("0");
    cy.get(".player1 .addScore").click();
    cy.get("#player0Score").type("5");
    cy.get(".player0 .addScore").click();
    cy.get("#player1Score").type("0");
    cy.get(".player1 .addScore").click();
    cy.get(".player1").should("contain", "User should be dismissed");
  });
});
