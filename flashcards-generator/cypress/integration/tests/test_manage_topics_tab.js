
describe('The Manage Topics Tab', function () {
  it('Allows me to switch to the manage topics tab', function () {
    cy.visit("/manage")

    cy.contains("Manage Topics")
      .click()
  })

  it('Allows me to view all topics', function () {
    cy.visit("/manage")

    cy.wait('@listTopics')

    cy.contains("Manage Topics")
      .click()

    cy.get('form[id="topicsForm"]').within(() => {
      cy.contains('Submit')
        .click()
    })

    cy.wait('@listTopics')

    cy.get('div[class="card-columns"]').children().should('have.length', 2)
  })
})

