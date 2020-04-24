describe('The Create Topics Tab', function () {
  it('Allows me to create a new topic', function () {
    cy.visit("/create/")

    cy.contains('Create Topics').click()

    cy.get('div[id="colourPicker"]').within(() => {
      cy.get('input:first')
        .click()
        .clear()
        .type('F1FD01')
    })


    cy.get('form').within(() => {
      cy.get('input[name="flashcardTopic"]')
        .type("NewTestTopic")
        .should('have.value', 'NewTestTopic')

      cy.get('button').last()
        .click()
    })

    cy.wait('@createTopic')

    cy.contains('Successfully added topic: NewTestTopic :)')
  })

  it('Allows me to create multiple new topics', function () {
    cy.visit("/create/")

    cy.wait('@listTopics')

    cy.contains('Create Topics').click()

    cy.get('div[id="colourPicker"]').within(() => {
      cy.get('input:first')
        .click()
        .clear()
        .type('FF0000')
    })

    cy.get('form').within(() => {
      cy.get('input[name="flashcardTopic"]')
        .type("TestTopic2")
        .should('have.value', 'TestTopic2')

      cy.get('button').last()
        .click()
    })

    cy.wait('@createTopic')

    cy.contains('Successfully added topic: TestTopic2 :)')

    cy.get('div[id="colourPicker"]').within(() => {
      cy.get('input:first')
        .click()
        .clear()
        .type('F000F')
    })

    cy.get('form').within(() => {
      cy.get('input[name="flashcardTopic"]')
        .type("TestTopic3")
        .should('have.value', 'TestTopic3')

      cy.get('button').last()
        .click()
    })

    cy.wait('@createTopic')

    cy.contains('Successfully added topic: TestTopic3 :)')
  })

  it('Does not allow me to leave the topic field blank', function () {
    cy.visit("/create/")

    cy.wait('@listTopics')

    cy.contains('Create Topics').click()

    cy.get('form').within(() => {
      cy.get('input[name="flashcardTopic"]')
        .click()
        .blur()

      cy.contains("Please enter a value for the topic name")
    })
  })

  it('Does not allow me to create a topic without a name', function () {
    cy.visit("/create/")

    cy.contains('Create Topics').click()

    cy.get('form').within(() => {
      cy.get('button').last()
        .click()
    })

    cy.contains("Please ensure all mandatory fields are filled")
  })
})
