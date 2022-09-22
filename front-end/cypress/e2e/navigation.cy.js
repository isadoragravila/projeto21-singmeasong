const URL_FRONT = "http://localhost:3000";
const URL_BACK = "http://localhost:5000";

beforeEach(async () => {
  await cy.request('POST', `${URL_BACK}/e2e/reset`, {});
});

describe('Navigate between pages', () => {
  it('should navigate to top page successfully', () => {
    cy.visit(URL_FRONT);

    cy.createRecommendation(URL_BACK);

    cy.intercept('GET', `${URL_BACK}/recommendations/top/10`).as('getTopRecommendations');

    cy.get("[data-cy=top]").click();

    cy.wait('@getTopRecommendations');

    cy.url().should('equal', `${URL_FRONT}/top`)
  });

  it('should navigate to random page successfully', () => {
    cy.visit(URL_FRONT);

    cy.createRecommendation(URL_BACK);

    cy.intercept('GET', `${URL_BACK}/recommendations/random`).as('getRandomRecommendations');

    cy.get("[data-cy=random]").click();

    cy.wait('@getRandomRecommendations');

    cy.url().should('equal', `${URL_FRONT}/random`)
  });

  it('should navigate to home page successfully', () => {
    cy.visit(URL_FRONT);

    cy.createRecommendation(URL_BACK);

    cy.intercept('GET', `${URL_BACK}/recommendations`).as('getRecommendations');

    cy.get("[data-cy=home]").click();

    cy.wait('@getRecommendations');

    cy.url().should('equal', `${URL_FRONT}/`)
  });
});

