describe('Register View page', () => {
  context('all resolution', () => {
    beforeEach(() => {
      cy.visit('/account/register')
    })

    it('should display register view content and have correct elements', () => {
      cy.get('[data-cy="register_banner"]').should('be.visible')
      cy.get('[data-cy="register_form"]').should('be.visible')
      cy.get('[data-cy="display_pwd"]').should('be.visible')
      cy.get('[data-cy="hide_pwd"]').should('not.exist')
      cy.get('[data-cy="display_pwd"]').click()
      cy.get('[data-cy="display_pwd"]').should('not.exist')
      cy.get('[data-cy="hide_pwd"]').should('be.visible')
      cy.get('[data-cy="create_user_btn"]').should('be.visible')
      cy.get('[data-cy="create_user_btn"]').should('exist')
    })
    it('should have a form with visible labels and with correct text and association', () => {
      cy.get('[data-cy="register_form"]').within(() => {
        cy.get('input[name="first-name"]').should('be.visible')
        cy.get('label[for="first-name"]').should('be.visible')
        cy.get('label[for="first-name"]').should('have.text', 'PRÉNOM')
        cy.get('label[for="first-name"]').should('have.attr', 'for', 'first-name')
        cy.get('label[for="first-name"]').click()
        cy.focused().should('have.id', 'first-name')

        cy.get('input[name="last-name"]').should('be.visible')
        cy.get('label[for="last-name"]').should('be.visible')
        cy.get('label[for="last-name"]').should('have.text', 'NOM')
        cy.get('label[for="last-name"]').should('have.attr', 'for', 'last-name')
        cy.get('label[for="last-name"]').click()
        cy.focused().should('have.id', 'last-name')

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
    it('should display password list with 5 required elements', () => {
      cy.get('[data-cy="register_form"]').within(() => {
        cy.get('[data-cy="pwd_list"]').find('li').should('have.length', 5)
        cy.get('[data-cy="pwd_list"]')
          .find('li')
          .eq(0)
          .should('include.text', 'au moins 12 caractères')
        cy.get('[data-cy="pwd_list"]')
          .find('li')
          .eq(1)
          .should('include.text', 'au moins 1 lettre en majuscule')
        cy.get('[data-cy="pwd_list"]')
          .find('li')
          .eq(2)
          .should('include.text', 'au moins 1 lettre en minuscule')
        cy.get('[data-cy="pwd_list"]').find('li').eq(3).should('include.text', 'au moins 1 chiffre')
        cy.get('[data-cy="pwd_list"]')
          .find('li')
          .eq(4)
          .should('include.text', 'au moins 1 caractère spécial')
      })
    })
    it('should display error message if the user enter a wrong format', () => {
      cy.get('input[name="email"]').type('wrongemailformat.fr')
      cy.get('input[name="email"]').blur()
      cy.get('[data-cy="email_error"]').should('be.visible')
      cy.get('[data-cy="email_error"]').should(
        'have.text',
        'Veuillez saisir une adresse email valide.'
      )
    })
    it('should display notification error after form submission if the user try to enter an email which already exist in DB', () => {
      cy.get('input[name="email"]').type('fake@email.fr')
      cy.get('input[name="password"]').type('f&keP8ssWordTèst')
      cy.get('[data-cy="create_user_btn"]').click()

      cy.get('input[name="email"]').clear().type('fake@email.fr')
      cy.get('[data-cy="create_user_btn"]').click()

      cy.get('[data-cy="email_error"]').should('be.visible')
      cy.get('[data-cy="email_error"]').should('have.text', 'Cette adresse email est déjà utilisée')
      cy.get('[data-cy="notification"]', { timeout: 10000 })
        .should('be.visible')
        .and('contain.text', 'Une erreur est survenue.')
    })
    it('should display notification success after form submission', () => {
      // Generate a unique email using Date.now() which ensures a unique timestamp for each test run
      const uniqueEmail = `test${Date.now()}@example.com`

      cy.get('input[name="email"]').type(uniqueEmail)
      cy.get('input[name="password"]').type('f&keP8ssWordTèst')
      cy.get('[data-cy="create_user_btn"]').click()

      cy.get('input[name="email"]').clear().type(uniqueEmail)

      cy.get('[data-cy="notification"]', { timeout: 10000 })
        .should('be.visible')
        .and('contain.text', 'Votre compte a bien été créé.')
    })
  })
})
