/// <reference types="cypress" />

import { ClickAwayListener } from '@material-ui/core';

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

// NaceRegionCards
describe('NaceRegionCards tests', () => {
  // Arrange
  beforeEach(() => {
    cy.visit('http://localhost:3000/chartpage');
  });

  it('Can add new NaceCard', () => {
    // Act
    cy.get('.add-nacecard-button').click();
    // Asses
    cy.contains('Austria').first();
    cy.get('.naceCardContainer').children().should('have.length', 3);
  });

  it('Can delete NaceCard', () => {
    // Act
    cy.get('.add-nacecard-button').click();
    cy.get('.deleteNaceCard').first().click();

    // Asses
    cy.get('.naceCardContainer').children().should('have.length', 2);
  });
  it('Can change Region', () => {
    // Act
    cy.get('.country-select').type('Belgium{enter}');
    // Asses
    cy.url().should(
      'include',
      'http://localhost:3000/chartpage/2,1/emissionPerYear/2015/2018/1',
    );
    cy.contains('Belgium');
  });
  it('Can change Nace', () => {
    // Act
    cy.get('.NaceSelect').type('loggin{enter}');
    // Asses
    cy.url().should(
      'include',
      'http://localhost:3000/chartpage/1,3/emissionPerYear/2015/2018/1',
    );
    cy.contains('Forestry and logging');
  });
  it('Can duplicate NaceCard', () => {
    // Act
    cy.get('.country-select').type('Belgium{enter}');
    // Act
    cy.get('.add-nacecard-button').click();

    // Asses
    cy.url().should(
      'include',
      'http://localhost:3000/chartpage/2,1;2,1/emissionPerYear/2015/2018/1',
    );
    // Asses
    cy.get('.naceCardContainer').children().should('have.length', 3);
    cy.contains('Belgium');
  });
});
