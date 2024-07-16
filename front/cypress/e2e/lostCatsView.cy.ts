// https://on.cypress.io/api

describe('Lost Cats View page', () => {
  context('all resolution', () => {
    beforeEach(() => {
      cy.visit('/lost/cats')
    })

    it('should display lost cats view content and have correct elements', () => {
      cy.get('[data-cy="lostcatsview_main_title"]').should('be.visible')
      cy.get('[data-cy="lost_pet_card"]')
        .first()
        .within(() => {
          cy.get('[data-cy="lost_pet_img"]').should('be.visible')
          cy.get('[data-cy="lost_pet_name"]').should('be.visible')
          cy.get('[data-cy="lost_pet_list"]').find('li').should('have.length', 4)
          cy.get('[data-cy="lost_pet_list"]').find('li').eq(0).should('include.text', 'Sexe:')
          cy.get('[data-cy="lost_pet_list"]').find('li').eq(1).should('include.text', 'Couleur:')
          cy.get('[data-cy="lost_pet_list"]').find('li').eq(2).should('include.text', 'Race:')
          cy.get('[data-cy="lost_pet_list"]')
            .find('li')
            .eq(3)
            .should('include.text', 'Département de disparition:')
        })
      cy.get('[data-cy="lost_pet_description"]').should('be.visible')
    })
  })
})
