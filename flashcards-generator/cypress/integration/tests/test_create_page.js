describe('The Create Flashcards/Topic page', function () {
    it('Allows me to switch between topic and flashcard tabs', function() {
        cy.visit(`/create/`)

        cy.get('nav').within(() => {
            cy.contains('Create Topics').click()
            cy.contains('Create Flashcards').click()
        })
    })
})

describe('The Create Topics Tab', function() {
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
                .type("TestTopic")
                .should('have.value', 'TestTopic')

            cy.get('button').last()
                .click()
        })

        cy.contains('Successfully added topic: TestTopic :)')
    })

    it('Allows me to create multiple new topics', function () {
        cy.visit("/create/")

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

        cy.contains('Successfully added topic: TestTopic3 :)')
    })

    it('Does not allow me to create topics with the same name', function () {
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
                .type("TestTopic2")
                .should('have.value', 'TestTopic2')

            cy.get('button').last()
                .click()
        })

        cy.contains('That topic already exists apparently')
    })

    it('Does not allow me to leave the topic field blank', function () {
        cy.visit("/create/").as('getTopics')

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

describe('The Create Flashcard Tab', function () {
    before(() => {
        cy.log("Adding test topics into db")
        cy.exec("npm run setup-topics")
    })

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
        cy.server()
        cy.route('GET', '**/api/listTopics').as('listTopics')

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
        cy.server()
        cy.route('GET', '**/api/listTopics').as('listTopics')

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

            cy.contains("Flashcard TestFlashcard successfully added - feel free to add more!")
        })
    })

    it('Does not allow me to create a new Flashcard with the same name', function () {
        cy.server()
        cy.route('GET', '**/api/listTopics').as('listTopics')

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
            .click({ force: true })
                .type("TestTopic {enter}")
            cy.contains('TestTopic')

            cy.get('textarea[name="flashcardDefinition"]')
                .type("TestDefinition")
                .should('have.value', 'TestDefinition')

            cy.contains('Submit')
                .click()

            cy.contains("Sorry! You've already got a flashcard with that name")
        })
    })

    it('Allows me create multiple new Flashcards in succession', function () {
        cy.server()
        cy.route('GET', '**/api/listTopics').as('listTopics')

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
        cy.server()
        cy.route('GET', '**/api/listTopics').as('listTopics')

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
                .type("TestingTerm")
                .should('have.value', 'TestingTerm')

            cy.wait('@listTopics')

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

        cy.contains('Please enter a value for the flashcard term')
    })

    it('Warns me when if the definition field is empty', function () {
        cy.visit("/create/")

        cy.get('form').within(() => {
            cy.get('textarea[name="flashcardDefinition"]')
                .click()
                .blur()
        })

        cy.contains('Please enter a value for the flashcard definition')
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

        cy.contains('There are invalid fields - please check your data is correct')
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
        cy.contains('There are invalid fields - please check your data is correct')
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
        cy.contains('There are invalid fields - please check your data is correct')
    })
})
