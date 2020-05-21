describe('The Create Flashcards/Topic page', function () {
    it('Allows me to switch between topic and flashcard tabs', function() {
        cy.visit(`/create/`)

        cy.get('nav').within(() => {
            cy.contains('Create Topics').click()
            cy.contains('Create Flashcards').click()
        })
    })
})

describe.only('The Create Flashcard Tab', function () {
    it('Allows me input a name for a flashcard', function () {
        cy.visit("/create/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .type("TestFlashcard")
                .should('have.value', 'TestFlashcard')
        })
    })

    it('Allows me to input a term for a flashcard', function () {
        cy.visit("/create/")

        cy.get('form').within(() => {

            cy.get('input[name="flashcardTerm"]')
                .type("TestTerm")
                .should('have.value', 'TestTerm')
        })
    })

    it('Allows me to select a topic for a flashcard', () => {
        cy.visit("/create/")

        cy.get('form').within(() => {

            cy.wait('@listTopics')

            cy.get('input[id="flashcardTopicsSearch"]')
                .click({ force: true })
                .type('TestTopic {enter}')
            })

            cy.contains('TestTopic')
    })

    it('Allows me create a new Flashcard', function () {
        cy.visit("/create/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .type("TestFlashcard")
                .should('have.value', 'TestFlashcard')

            cy.get('input[name="flashcardTerm"]')
                .type("TestTerm")
                .should('have.value', 'TestTerm')

            cy.wait('@listTopics')

            cy.get('input[id="flashcardTopicsSearch"]')
                .click({ force: true})
                .type('TestTopic {enter}')

            cy.contains('TestTopic')

            cy.contains('Tort')
                .click()

            cy.get('textarea[name="flashcardDefinition"]')
                .type("TestDefinition")
                .should('have.value', 'TestDefinition')

            cy.contains('Submit')
                .click()

            cy.wait("@createFlashcard")
            cy.get("[data-cy=successAlert]")
        })
    })

    it('Allows me create multiple new Flashcards in succession', function () {
        cy.visit("/create/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .type("TestFlashcard2")
                .should('have.value', 'TestFlashcard2')

            cy.get('input[name="flashcardTerm"]')
                .type("TestTerm")
                .should('have.value', 'TestTerm')

            cy.wait('@listTopics')

            cy.get('input[id="flashcardTopicsSearch"]')
                .click({ force: true})
                .type("TestTopic {enter}")
            cy.contains('TestTopic')

            cy.get('textarea[name="flashcardDefinition"]')
                .type("TestDefinition")
                .should('have.value', 'TestDefinition')

            cy.contains('Submit')
                .click()

            cy.wait("@createFlashcard")
            cy.get("[data-cy=successAlert]")
        })

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .type("TestFlashcard3")
                .should('have.value', 'TestFlashcard3')

            cy.get('input[name="flashcardTerm"]')
                .type("Testing Term")
                .should('have.value', 'Testing Term')

            cy.get('input[id="flashcardTopicsSearch"]')
                .click({ force: true})
                .type("TestTopic {enter}")

            cy.get('textarea[name="flashcardDefinition"]')
                .click({ force: true })
                .type("TestDefinition")
                .should('have.value', 'TestDefinition')

            cy.contains('Submit')
                .click()

            cy.wait("@createFlashcard")
            cy.get("[data-cy=successAlert]")
        })
    })

    it('Allows me to create a topic and then a flashcard related to it', function () {
        cy.visit("/create/")

        cy.contains('Create Topics').click()

        cy.get('div[id="colourPicker"]').within(() => {
            cy.get('input:first')
                .click()
                .clear()
                .type('00FF00')
        })

        cy.get('form').within(() => {
            cy.get('input[name="flashcardTopic"]')
                .type("NewestTestTopic")
                .should('have.value', 'NewestTestTopic')

            cy.get('button').last()
                .click()
        })

        cy.wait("@createTopic")

        cy.contains('Successfully added topic: NewestTestTopic :)')

        cy.contains('Create Flashcards').click()

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .type("TestingFlashcard")
                .should('have.value', 'TestingFlashcard')

            cy.get('input[name="flashcardTerm"]')
                .type("TestingTerm")
                .should('have.value', 'TestingTerm')

            cy.wait('@listTopics')
            cy.wait('@listTopics')

            cy.get('input[id="flashcardTopicsSearch"]')
                .click({
                    force: true
                })
                .type('Testing {enter}')

            cy.get('textarea[name="flashcardDefinition"]')
                .type("TestDefinition")
                .should('have.value', 'TestDefinition')

            cy.contains('Submit')
                .click()

            cy.wait("@createFlashcard")
            cy.get("[data-cy=successAlert]")
        })
    })

    it('Warns me when if the name field is empty', function () {
        cy.visit("/create/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .click()
                .blur()
        })

        cy.contains('Please enter a value for the flashcard name')
    })

    it('Warns me when if the term field is empty', function () {
        cy.visit("/create/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardTerm"]')
                .click()
                .blur()
        })

        cy.get('[data-cy="formInvalid"]')
    })

    it('Warns me when if the definition field is empty', function () {
        cy.visit("/create/")

        cy.get('form').within(() => {
            cy.get('textarea[name="flashcardDefinition"]')
                .click()
                .blur()
        })

        cy.get('[data-cy="formInvalid"]')
    })

    it('Does not allow me to create a flashcard without a definition', function () {
        cy.visit("/create/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .click()
                .type("creationtest")

            cy.get('input[name="flashcardTerm"]')
                .click()
                .type("createtest")

            cy.get('input[id="flashcardTopicsSearch"]')
                .click({
                    force: true
                })
                .type('Testing {enter}')

            cy.get('textarea[name="flashcardDefinition"]')
                .click()
                .blur()

            cy.contains('Submit')
                .click()
        })

        cy.get('[data-cy="formInvalid"]')
    })

    it('Does not allow me to create a flashcard without a term', function () {
        cy.visit("/create/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .click()
                .type("creationtest")

            cy.get('input[name="flashcardTerm"]')
                .click()
                .blur()

            cy.get('input[id="flashcardTopicsSearch"]')
                .click({
                    force: true
                })
                .type('Testing {enter}')

            cy.get('textarea[name="flashcardDefinition"]')
                .click()
                .type("Testingstuff")

            cy.contains('Submit')
                .click()
        })
        cy.get('[data-cy="formInvalid"]')
    })

    it('Does not allow me to create a flashcard without a name', function () {
        cy.visit("/create/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .click()
                .blur()

            cy.get('input[name="flashcardTerm"]')
                .click()
                .type("termtest")

            cy.get('input[id="flashcardTopicsSearch"]')
                .click({
                    force: true
                })
                .type('Testing {enter}')

            cy.get('textarea[name="flashcardDefinition"]')
                .click()
                .type("Testingstuff")

            cy.contains('Submit')
                .click()
        })
        cy.get('[data-cy="formInvalid"]')
    })
})
