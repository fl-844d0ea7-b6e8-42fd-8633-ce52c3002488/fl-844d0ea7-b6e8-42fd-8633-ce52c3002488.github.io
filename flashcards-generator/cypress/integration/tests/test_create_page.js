describe('The Create Flashcards/Topic page', function () {
    before(() => {
        cy.log("Deleting test entries")
        cy.exec("npm run teardown")
    })

    it('Allows me to switch between topic and flashcard tabs', function() {
        cy.visit("http://localhost:3000/create/")

        cy.get('nav').within(() => {
            cy.contains('Create Topics').click()
            cy.contains('Create Flashcards').click()
        })
    })
})

describe('The Create Topics Tab', function() {
    it('Allows me to create a new topic', function () {
        cy.visit("http://localhost:3000/create/")

        cy.contains('Create Topics').click()

        cy.get('div[id="colourPicker"]').within(() => {
            cy.get('input:first')
                .click()
                .clear()
                .type('F1FD01')
        })

        cy.get('form').within(() => {
            cy.get('input[name="flashcardTopic"]')
                .type("TestTopic")
                .should('have.value', 'TestTopic')

            cy.get('button').last()
                .click()
        })

        cy.contains('Successfully added topic: TestTopic :)')
    })

    it('Allows me to create multiple new topics', function () {
        cy.visit("http://localhost:3000/create/")

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

        cy.contains('Successfully added topic: TestTopic2 :)')
    })

    it('Does not allow me to create topics with the same name', function () {
        cy.visit("http://localhost:3000/create/")

        cy.contains('Create Topics').click()

        cy.get('div[id="colourPicker"]').within(() => {
            cy.get('input:first')
                .click()
                .clear()
                .type('00FF00')
        })

        cy.get('form').within(() => {
            cy.get('input[name="flashcardTopic"]')
                .type("TestTopic2")
                .should('have.value', 'TestTopic2')

            cy.get('button').last()
                .click()
        })

        cy.contains('That topic already exists apparently')
    })
})

describe('The Create Flashcard Tab', function () {
    it('Allows me create a new Flashcard', function () {
        cy.visit("http://localhost:3000/create/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .type("TestFlashcard")
                .should('have.value', 'TestFlashcard')

            cy.get('input[name="flashcardTerm"]')
                .type("TestTerm")
                .should('have.value', 'TestTerm')

            cy.get('input[id="flashcardTopicsSearch"]')
                .click({ force: true})
                .type('TestTopic {enter}')

            cy.contains('Tort')
                .click()

            cy.get('textarea[name="flashcardDefinition"]')
                .type("TestDefinition")
                .should('have.value', 'TestDefinition')

            cy.contains('Submit')
                .click()

            cy.contains("Flashcard TestFlashcard successfully added - feel free to add more!")
        })
    })

    it('Does not allow me to create a new Flashcard with the same name', function () {
        cy.visit("http://localhost:3000/create/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .type("TestFlashcard")
                .should('have.value', 'TestFlashcard')

            cy.get('input[name="flashcardTerm"]')
                .type("TestTerm")
                .should('have.value', 'TestTerm')

            cy.get('input[id="flashcardTopicsSearch"]')
            .click({ force: true })
                .type("TestTopic {enter}")

            cy.get('textarea[name="flashcardDefinition"]')
                .type("TestDefinition")
                .should('have.value', 'TestDefinition')

            cy.contains('Submit')
                .click()

            cy.contains("Sorry! You've already got a flashcard with that name")
        })
    })

    it('Allows me create multiple new Flashcards in succession', function () {
        cy.visit("http://localhost:3000/create/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .type("TestFlashcard2")
                .should('have.value', 'TestFlashcard2')

            cy.get('input[name="flashcardTerm"]')
                .type("TestTerm")
                .should('have.value', 'TestTerm')

            cy.get('input[id="flashcardTopicsSearch"]')
                .click({ force: true})
                .type("TestTopic {enter}")

            cy.get('textarea[name="flashcardDefinition"]')
                .type("TestDefinition")
                .should('have.value', 'TestDefinition')

            cy.contains('Submit')
                .click()

            cy.contains("Flashcard TestFlashcard2 successfully added - feel free to add more!")
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

            cy.contains("Flashcard TestFlashcard3 successfully added - feel free to add more!")
        })
    })

    it('Allows me to create a topic and then a flashcard related to it', function () {
        cy.visit("http://localhost:3000/create/")

        cy.contains('Create Topics').click()

        cy.get('div[id="colourPicker"]').within(() => {
            cy.get('input:first')
                .click()
                .clear()
                .type('00FF00')
        })

        cy.get('form').within(() => {
            cy.get('input[name="flashcardTopic"]')
                .type("Testing")
                .should('have.value', 'Testing')

            cy.get('button').last()
                .click()
        })

        cy.contains('Successfully added topic: Testing :)')

        cy.contains('Create Flashcards').click()

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .type("TestingFlashcard")
                .should('have.value', 'TestingFlashcard')

            cy.get('input[name="flashcardTerm"]')
                .type("TestTerm")
                .should('have.value', 'TestTerm')

            cy.get('input[id="flashcardTopicsSearch"]')
                .click({
                    force: true
                })
                .type('Testing {enter}')

            cy.contains('Testing')

            cy.get('textarea[name="flashcardDefinition"]')
                .type("TestDefinition")
                .should('have.value', 'TestDefinition')

            cy.contains('Submit')
                .click()

            cy.contains("Flashcard TestingFlashcard successfully added - feel free to add more!")
        })
    })

    it('Does not allow me to leave the name field empty', function () {
        cy.visit("http://localhost:3000/create/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .click()
                .blur()
        })

        cy.contains('Please enter a value for the flashcard name')
    })

    it('Does not allow me to leave the term field empty', function () {
        cy.visit("http://localhost:3000/create/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardTerm"]')
                .click()
                .blur()
        })

        cy.contains('Please enter a value for the flashcard term')
    })

    it('Does not allow me to leave the definition field empty', function () {
        cy.visit("http://localhost:3000/create/")

        cy.get('form').within(() => {
            cy.get('textarea[name="flashcardDefinition"]')
                .click()
                .blur()
        })

        cy.contains('Please enter a value for the flashcard definition')
    })
})
