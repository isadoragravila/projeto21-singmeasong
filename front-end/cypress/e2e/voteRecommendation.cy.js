const URL_FRONT = "http://localhost:3000";
const URL_BACK = "http://localhost:5000";

beforeEach(async () => {
  await cy.request('POST', `${URL_BACK}/e2e/reset`, {});
});

describe('Vote recommendation', () => {
  it('upvote: should increase score in 1', () => {
    cy.visit(URL_FRONT);

    cy.intercept('GET', `${URL_BACK}/recommendations`).as('getRecommendations');

    cy.createRecommendation(URL_BACK);

    cy.wait('@getRecommendations');

    cy.get("[data-cy=upvote]").click();

    cy.get("[data-cy=score]").should('contain', '1');
  });
  
  it('downvote: should decrease score in 1', () => {
    cy.visit(URL_FRONT);

    cy.intercept('GET', `${URL_BACK}/recommendations`).as('getRecommendations');

    cy.createRecommendation(URL_BACK);

    cy.wait('@getRecommendations');

    cy.get("[data-cy=downvote]").click();

    cy.get("[data-cy=score]").should('contain', '-1');
  });
});