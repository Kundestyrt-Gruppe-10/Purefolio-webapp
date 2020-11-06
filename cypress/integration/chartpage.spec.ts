/// <reference types="cypress" />
describe('/Chartpage base layout test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/chartpage');
  });

  it('Renders footer correctly', () => {
    cy.contains(
      'This project is developed by students for Nordic Trustee, for the course TDT4290 at Norwegian University of Science and Technology.',
    );
  });
  it('Can find ESG Factor text in Header', () => {
    cy.contains('ESG factor');
  });
});

// FrontPage Url
describe('/ChartPage URL ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/chartpage');
  });
  it('Redirects to default chartpage when incomplete url given', () => {
    cy.url().should('include', 'chartpage/1,1/emissionPerYear/2015/2018/1');
  });

  it('Gives 404 if naceregionString contains characters', () => {
    cy.visit('http://localhost:3000/chartpage/a,1/emissionPerYear/2015/2018/1');
    cy.url().should('include', '/404');
  });
});
