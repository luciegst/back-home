// https://on.cypress.io/api

describe('HomeView page', () => {
  context('desktop resolution', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.viewport(1024, 720)
    })

    it('should display the navigation bar and have correct elements', () => {
      cy.get('[data-cy="nav"]').should('be.visible')
      cy.get('[data-cy="home_link"]').should('have.attr', 'href', '/')
      cy.get('[data-cy="go_ad_page_btn"]').should('exist')
      cy.get('[data-cy="mobile_menu_btn"]').should('not.exist')
      cy.get('[data-cy="desktop_logo"]').should('exist')
      cy.get('[data-cy="mobile_logo"]').should('not.exist')
      cy.get('[data-cy="desktop_pen_icon"]').should('exist')
      cy.get('[data-cy="nav"]').within(() => {
        cy.contains('Chats perdus').should('have.attr', 'href', '/lost/cats')
        cy.contains('Chiens perdus').should('have.attr', 'href', '/lost/dogs')
      })
    })

    it('nav should navigate to correct pages', () => {
      cy.get('[data-cy="home_link"]').click()
      cy.url().should('include', '/')
      cy.get('[data-cy="go_ad_page_btn"]').click()
      cy.url().should('include', '/write/add')
      cy.get('nav').contains('Chats perdus').click()
      cy.url().should('include', '/lost/cats')
      cy.get('nav').contains('Chiens perdus').click()
      cy.url().should('include', '/lost/dogs')
    })
  })

  context('mobile resolution', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.viewport(520, 720)
    })

    it('should display the navigation bar and have correct elements', () => {
      cy.get('[data-cy="nav"]').should('be.visible')
      cy.get('[data-cy="home_link"]').should('have.attr', 'href', '/')
      cy.get('[data-cy="go_ad_page_btn"] img').should('not.exist')
      cy.get('[data-cy="mobile_menu_btn"]').should('exist')
      cy.get('[data-cy="desktop_submenu"]').should('not.exist')
      cy.get('[data-cy="desktop_logo"]').should('not.exist')
      cy.get('[data-cy="mobile_logo"]').should('exist')
      cy.get('[data-cy="desktop_pen_icon"]').should('not.exist')
    })

    it('nav should navigate to correct pages', () => {
      cy.get('[data-cy="home_link"]').click()
      cy.url().should('include', '/')
      cy.get('[data-cy="go_ad_page_btn"]').click()
      cy.url().should('include', '/write/add')
      cy.get('[data-cy="mobile_menu_btn"]').click()
      cy.get('[data-cy="mobile_menu_dropdown"]').should('exist')
      cy.get('[data-cy="link_dogs_mobile"]').contains('Chiens perdus').click()
      cy.url().should('include', '/lost/dogs')
      cy.get('[data-cy="mobile_menu_btn"]').click()
      cy.get('[data-cy="mobile_menu_dropdown"]').should('exist')
      cy.get('[data-cy="link_cats_mobile"]').contains('Chats perdus').click()
      cy.url().should('include', '/lost/cats')
    })
  })

  context('all resolution', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('should display home view content and have correct elements', () => {
      cy.get('[data-cy="homeview_main_title"]').should('be.visible')
      cy.get('[data-cy="homeview_subtitle"]').should('be.visible')
      cy.get('[data-cy="homeview_grid_content"]').each(($el, index) => {
        const anchor = $el.find('a')
        const button = $el.find('button')
        const img = $el.find('img')
        cy.wrap(anchor).should('have.attr', 'href')
        cy.wrap(button).should('exist')
        cy.wrap(img).should('exist')

        const expectedLinks = ['/lost/cats', '/lost/dogs']
        cy.wrap(anchor).should('have.attr', 'href', expectedLinks[index])
        cy.wrap(button).should('have.attr', 'data-url', expectedLinks[index])
      })
    })
  })
})
