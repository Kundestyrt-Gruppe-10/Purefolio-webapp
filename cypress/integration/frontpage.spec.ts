/// <reference types="cypress" />
describe('FrontPage spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Renders frontpage correctly', () => {
    cy.contains('PureFolio');
  });
});
