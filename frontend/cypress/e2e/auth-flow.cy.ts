describe('Authentication flow', () => {
  it('User can open the login modal view the form', () => {
    cy.visit('/')
    cy.fixture('login-form-data').then(({email, password}) => {
      cy.get('button[aria-label="open login modal"]').click()
      cy.get('input[name="email"]').type(email)
      cy.get('input[name="password"]').type(password)
      cy.get('form button[aria-label="login"]').should('be.visible')
    })
  })
  it ('User can open the login modal and can\'t send form without credentials', () => {
    cy.visit('/')
    cy.get('button[aria-label="open login modal"]').click()
    cy.get('form button[aria-label="login"]').click()
    cy.contains('Email is required')
    cy.contains('Password is required')
    cy.get('input[name="email"]').should('have.attr', 'aria-invalid', 'true')
    cy.get('input[name="password"]').should('have.attr', 'aria-invalid', 'true')
  })
})