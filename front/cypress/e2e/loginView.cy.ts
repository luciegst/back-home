// https://on.cypress.io/api

describe('Login page', () => {
  context('all resolution', () => {
    beforeEach(() => {
      cy.visit('/account/login')
    })

    it('should display login view content and have correct elements', () => {
      cy.get('[data-cy="login_banner"]').should('be.visible')
      cy.get('[data-cy="login_form"]').should('be.visible')
      cy.get('[data-cy="display_pwd"]').should('be.visible')
      cy.get('[data-cy="hide_pwd"]').should('not.exist')
      cy.get('[data-cy="display_pwd"]').click()
      cy.get('[data-cy="display_pwd"]').should('not.exist')
      cy.get('[data-cy="hide_pwd"]').should('be.visible')
      cy.get('[data-cy="login_btn"]').should('be.visible')
      cy.get('[data-cy="login_btn"]').should('exist')
    })
    it('should have a form with visible labels and with correct text and association', () => {
      cy.get('[data-cy="login_form"]').within(() => {
        cy.get('input[name="email"]').should('be.visible')
        cy.get('label[for="email"]').should('be.visible')
        cy.get('label[for="email"]').should('have.text', 'COURRIEL')
        cy.get('label[for="email"]').should('have.attr', 'for', 'email')
        cy.get('label[for="email"]').click()
        cy.focused().should('have.id', 'email')

        cy.get('input[name="password"]').should('be.visible')
        cy.get('label[for="password"]').should('be.visible')
        cy.get('label[for="password"]').should('have.text', 'MOT DE PASSE')
        cy.get('label[for="password"]').should('have.attr', 'for', 'password')
        cy.get('label[for="password"]').click()
        cy.focused().should('have.id', 'password')
      })
    })
    it('should display notification and message error after form submission if the user try to enter an email which does not exist in DB', () => {
      cy.get('input[name="email"]').type('fake@email.fr')
      cy.get('input[name="password"]').type('f&keP8ssWordTèst')
      cy.get('[data-cy="login_btn"]').click()

      cy.get('input[name="email"]').clear().type('fake@email.fr')
      cy.get('[data-cy="login_btn"]').click()
      // Intercept the Axios request and mock the response with a properly structured error object
      cy.intercept('POST', '/api/user/login', {
        statusCode: 401,
        body: {
          error: {
            code: 'user_not_found',
            message: 'User not found'
          }
        }
      }).as('postLogin')
      cy.wait('@postLogin')

      cy.get('[data-cy="login_email_error"]').should('be.visible')
      cy.get('[data-cy="login_email_error"]').should(
        'contain.text',
        'Pas de compte associé à cette adresse email. Veuillez créer votre compte.'
      )
      cy.get('[data-cy="notification"]', { timeout: 10000 })
        .should('be.visible')
        .and('contain.text', 'Une erreur est survenue.')
    })
    it('should display notification and message error after form submission if the user password does not exist in DB', () => {
      const uniqueEmail = `test${Date.now()}@example.com`

      cy.get('input[name="email"]').type(uniqueEmail)
      cy.get('input[name="password"]').type('fkkP8ssWordTèst')
      cy.get('[data-cy="login_btn"]').click()

      // Intercept the Axios request and mock the response with a properly structured error object
      cy.intercept('POST', '/api/user/login', {
        statusCode: 401,
        body: {
          error: {
            code: 'wrong_password',
            message: 'Wrong password'
          }
        }
      }).as('postLogin')
      cy.wait('@postLogin')

      cy.get('[data-cy="login_pwd_error"]').should('be.visible')
      cy.get('[data-cy="login_pwd_error"]').should('contain.text', 'Erreur de mot de passe.')
      cy.get('[data-cy="notification"]', { timeout: 10000 })
        .should('be.visible')
        .and('contain.text', 'Une erreur est survenue.')
    })
    it('should redirect to home after form submission and if login is a success', () => {
      // Generate a unique email using Date.now() which ensures a unique timestamp for each test run
      const uniqueEmail = `test${Date.now()}@example.com`

      cy.get('input[name="email"]').type(uniqueEmail)
      cy.get('input[name="password"]').type('f&keP8ssWordTèst')
      cy.get('[data-cy="login_btn"]').click()

      cy.intercept('POST', '/api/user/login', {
        statusCode: 200
      }).as('postLogin')
      cy.wait('@postLogin')

      cy.get('input[name="email"]').clear()

      cy.url().should('include', '/')
    })
  })
})
