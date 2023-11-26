describe('Home flow', () => {
  it ('User can search photos', () => {
    cy.visit('/')
    cy.get('#searchbox input[type="text"]').type('Real Madrid FC')
    cy.get('#searchbox').submit()
    cy.location('pathname').should('eq', '/photos/search')
  })
  it ('User can\'t enter to the profile page if is not logged', () => {
    cy.visit('/profile/photos')
    cy.location('pathname').should('eq', '/photos')
  })
  it ('Save photo form should show form and apply validations', () => {
    cy.fixture('login-form-data').then(({email, password}) => {
      cy.login(email, password)
      cy.visit('/')
      cy.get('button[aria-label="save photo"]').first().click()
      cy.get('form#save-photo-form button').click()
      cy.contains(/Description is required/i)
    })
  })
  it ('User can open save photo form and save the phote', () => {
    cy.fixture('login-form-data').then(({email, password}) => {
      cy.login(email, password)
      cy.visit('/')
      cy.get('button[aria-label="save photo"]').first().click()
      cy.get('input[name="description"]').type('Super photo description')
      cy.get('form#save-photo-form button').click()
      cy.contains(/photo saved/i)
    })
  })
  it ('User can open save photo form modal and close this', () => {
    cy.fixture('login-form-data').then(({email, password}) => {
      cy.login(email, password)
      cy.visit('/')
      cy.get('button[aria-label="save photo"]').first().click()
      cy.get('body').click(0, 0)
    })
  })
})
