describe('Authentication flow', () => {
  it('Open the login modal and sign in', () => {
    cy.visit('/')
    cy.fixture('login-form-data').then(({email, password}) => {
      cy.get('button[aria-label="open login modal"]').click()
      cy.get('input[name="email"]').type(email)
      cy.get('input[name="password"]').type(password)
      cy.get('form button[aria-label="login"]').click()
      cy.contains(/my photos/i).should('have.attr', 'href', '/profile/photos')
      cy.contains(/logout/i)
    })
  })
  it('Open the login modal and give invalid credentials (email)', () => {
    cy.visit('/')
    cy.fixture('invalid-login-form-data').then(({email, password}) => {
      cy.get('button[aria-label="open login modal"]').click()
      cy.get('input[name="email"]').type(email)
      cy.get('input[name="password"]').type(password)
      cy.get('form button[aria-label="login"]').click()
      cy.contains('The user with email')
    })
  })
  it('Open the login modal and give invalid credentials (password)', () => {
    cy.visit('/')
    cy.fixture('invalid-login-form-data').then(({password}) => {
      cy.get('button[aria-label="open login modal"]').click()
      cy.get('input[name="email"]').type('bpa@gmail.com')
      cy.get('input[name="password"]').type(password)
      cy.get('form button[aria-label="login"]').click()
      cy.contains(/wrong email or password/i)
    })
  })
  it ('Open the login modal and send form without credentials', () => {
    cy.visit('/')
    cy.get('button[aria-label="open login modal"]').click()
    cy.get('form button[aria-label="login"]').click()
    cy.contains('Email is required')
    cy.contains('Password is required')
    cy.get('input[name="email"]').should('have.attr', 'aria-invalid', 'true')
    cy.get('input[name="password"]').should('have.attr', 'aria-invalid', 'true')
  })
  it ('Open the login modal: signin and signout', () => {
    cy.visit('/')
    cy.get('button[aria-label="open login modal"]').click()
    cy.fixture('login-form-data').then(({email, password}) => {
      cy.get('input[name="email"]').type(email)
      cy.get('input[name="password"]').type(password)
      cy.get('form button[aria-label="login"]').click()
      cy.contains(/logout/i).click()
      cy.contains(/see you later/i)
    })
  })
})