/// <reference types="cypress" />
describe('FrontPage spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/chartpage');
  });

  it('Renders footer correctly', () => {
    cy.contains(
      'This project is developed by students for Nordic Trustee, for the course TDT4290 at Norwegian University of Science and Technology.',
    );
  });
  it('Renders Header correctly', () => {
    cy.contains('ESG factor');
  });
});
