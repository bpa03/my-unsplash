describe('Search flow', () => {
  it('Enter a search query and should show a list of results', () => {
    const query = 'fc barcelona'

    cy.visit('/')
    cy.get('input[aria-label="search photos"]').type(query)
    cy.get('#searchbox').submit()
    cy.location('pathname').should('eq', `/photos/search`)
    cy.get('figure[aria-label="unsplash photo"]').get('button[aria-label="Download photo"]').get('img')
  })
  it('Visit search page with query search param', () => {
    const query = 'fc barcelona'

    cy.visit(`/photos/search?query=${query}`)
    cy.get('input[aria-label="search photos"]').should('have.value', query)
    cy.get('figure[aria-label="unsplash photo"]').get('button[aria-label="Download photo"]').get('img')
  })
})