
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

    cy.get('div[class="card-columns"]').children().should('have.length', 4)
  })

  it('Allows me to view topics by name', function () {
    cy.visit("/manage")

    cy.wait('@listTopics')

    cy.contains("Manage Topics")
      .click()

    cy.get('form[id="topicsForm"]').within(() => {
      cy.get('[data-cy=topicName-formInput]')
        .type('DeleteMe')
        .blur
      cy.contains('Submit')
        .click()
    })

    cy.wait('@listTopicsByName')

    cy.get('div[class="card-columns"]').children().should('have.length', 1)
  })

  it('Does not allow me to delete a topic with flashcards associated to it', function () {
    cy.visit("/manage")

    cy.wait('@listTopics')

    cy.contains("Manage Topics")
      .click()

    cy.get('form[id="topicsForm"]').within(() => {
      cy.contains('Submit')
        .click()
    })

    cy.wait('@listTopics')

    cy.get('div[class="card-columns"]').first().within(() => {
      cy.get("svg[data-icon='trash']").last().click()
    })

    cy.get('[data-cy=dangerAlert')
    // cy.get('div[class="card-columns"]').children().should('have.length', 1)
  })

  it('Allows me to delete a topic without any flashcards related to it', function () {
    cy.visit("/manage")

    cy.wait('@listTopics')

    cy.contains("Manage Topics")
      .click()

    cy.get('form[id="topicsForm"]').within(() => {
      cy.get('[data-cy=topicName-formInput]')
        .type('DeleteMe')

      cy.contains('Submit')
        .click()
    })

    cy.wait('@listTopicsByName')

    cy.get('div[class="card-columns"]').first().within(() => {
      cy.get("svg[data-icon='trash']").first().click()
    })

    cy.get('[data-cy=successAlert]')
    // cy.get('div[class="card-columns"]').children().should('have.length', 2)
  })
})

