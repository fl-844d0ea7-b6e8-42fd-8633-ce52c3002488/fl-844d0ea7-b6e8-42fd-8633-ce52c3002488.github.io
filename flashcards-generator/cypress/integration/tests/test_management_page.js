describe('The Manage Flashcards Tab', function () {
    it('Opens the Management Page', function () {
        cy.visit("/home/")

        cy.contains('Manage').click()

        cy.url().should('include', '/view')
    })

    it('Allows me to view all Flashcards', function () {
        cy.visit("/view/")

        cy.contains('Manage Flashcards').click()

        cy.get('form').within(() => {
            cy.contains('Submit')
                .click()
        })

        cy.wait(1000)

        cy.get('div[id="TestTopic-card-columns"]')
        cy.get('div[id="Testing-card-columns"]')
    })

    it('Allows me to view Flashcards by topic', function () {
        cy.visit("/view/")

        const searchTopic = 'TestTopic'
        cy.get('input[id="flashcardTopicsSearch"]')
            .click({
                force: true
            })
            .type(`${searchTopic} {enter}`)

        cy.contains('Submit')
            .click()

        cy.wait(1000)

        cy.get(`div[id="${searchTopic}-card-columns"]`).children().should('have.length', 3)
    })

    it('Allows me to view Flashcards by name', function () {
        cy.visit("/view/")

        const flashcardName = "Test"
        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .type(`${flashcardName}`)

            cy.contains('Submit')
                .click()
        })

        cy.wait(1000)

        cy.get('div[class="card-columns"]').children().should('have.length', 4)

    })

    it('Allows me to view Flashcards by term', function () {
        cy.visit("/view/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardTerm"]')
                .type("Testing")

            cy.contains('Submit')
                .click()
        })

        cy.wait(1000)

        cy.get('div[class="card-columns"]').children().should('have.length', 2)
    })

    it('Allows me to delete a Flashcard', function () {
        cy.visit("/view/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .type("Test")

            cy.contains('Submit')
                .click()
        })

        cy.wait(1000)

        cy.get('div[class="card-columns"]').children().should('have.length', 4)

        cy.get('div[class="card-columns"] div:first').within(() => {
            cy.get('svg[data-icon="trash"]').click()
        })

        cy.wait(1000)

        cy.get('div[class="card-columns"]').children().should('have.length', 3)
    })

    it('Allows me to edit a Flashcard', function () {
        cy.visit("/view/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .type("Test")

            cy.contains('Submit')
                .click()
        })

        cy.get('div[class="card-columns"] div:first').within(() => {
            cy.get('svg[data-icon="edit"]').click()
            cy.get('input[type="text"]')
                .clear()
                .type("A New Test String{enter}")

            cy.contains("A New Test String")
        })

        cy.get('div[class="card-columns"]').children()
    })

    it('Allows me view a flashcard with the colour associated to its topic', function () {
        cy.visit("/view/")

        cy.contains('Submit')
            .click()

        cy.wait(1000)

        cy.get('div[class="card-columns"]').first().within(() => {
            cy.get('div[class="card-header"]').first()
        })
    })

    it('Allows me search flashcards based on topic and name', function () {
        cy.visit("/view/")

        cy.get('input[id="flashcardTopicsSearch"]')
            .click({
                force: true
            })
            .type('TestTopic {enter}')

        cy.get('input[name="flashcardName"]')
            .click({ force: true })
            .type("2")

        cy.contains('Submit')
            .click()

        cy.wait(1000)

        cy.get('div[class="card-columns"]').children().should('have.length', 1)
    })

    it('Allows me search flashcards based on topic and term', function () {
        cy.visit("/view/")

        cy.get('input[id="flashcardTopicsSearch"]')
            .click({
                force: true
            })
            .type('TestTopic {enter}')

        cy.get('input[name="flashcardTerm"]')
            .click({ force: true })
            .type("testing{enter}")

        cy.contains('Submit')
            .click()

        cy.wait(1000)

        cy.get('div[class="card-columns"]').children().should('have.length', 1)
    })

    it('Allows me search flashcards based on name and term', function () {
        cy.visit("/view/")

        cy.get('input[name="flashcardName"]')
            .click({
                force: true
            })
            .type('Test {enter}')

        cy.get('input[name="flashcardTerm"]')
            .click({ force: true })
            .type("testing {enter}")

        cy.contains('Submit')
            .click()

        cy.wait(1000)

        cy.get('div[class="card-columns"]').children().should('have.length', 2)
    })
})

describe('The Manage Topics Tab', function () {
    it('Allows me to switch to the manage topics tab', function () {
        cy.visit("/view")

        cy.contains("Manage Topics")
            .click()
    })

    it('Allows me to view all topics', function () {
        cy.visit("/view")

        cy.contains("Manage Topics")
            .click()

        cy.get('form[id="topicsForm"]').within(() => {
            cy.contains('Submit')
                .click()
        })

        cy.wait(1000)

        cy.get('div[class="card-columns"]').children().should('have.length', 4)
    })
})

