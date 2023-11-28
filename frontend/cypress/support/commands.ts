/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

Cypress.env('ACCESS_TOKEN', '410e2a987e943feb53b66a35999aa0898da2ffa2b7617504bddfde46fbc7850dae270fbe5412f9919906a6197b0586f2a64bfef9ad990954228bf7ad1a73feec')
Cypress.env('MOCKED_USER_ID', 'fe20724eaa89a7c5d7d5efcf0645bf7e')
Cypress.env('MOCKED_EXPIE_SESSION_TIME', '3000-01-01T00:00:00.000Z')
Cypress.env('MOCKED_SESSION_TOKEN', 'e2e50b396bc59fa8c19d9976d4a9c8273225d10eca106007a806548e8c55e0b3')

Cypress.Commands.add('login', () => {
  cy.intercept('/api/auth/session', {
    body: {
      user: {
        name: 'John',
        lastname: 'Doe',
        access: Cypress.env('ACCESS_TOKEN'),
        id: Cypress.env('MOCKED_USER_ID')
      },
      expires: Cypress.env('MOCKED_EXPIRE_SESSION_TIME')
    }
  }).as('session')
  cy.setCookie('next-auth.session-token', Cypress.env('MOCKED_SESSION_TOKEN'))
})
