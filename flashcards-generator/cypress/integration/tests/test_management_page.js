describe('The Manage Flashcard Page', function () {
    it('Opens the Manage Flashcards Page', function () {
        cy.visit("http://localhost:3000/home/")

        cy.contains('Manaaa').click()

        cy.url().should('include', '/view')
    })

    it('Allows me to view all Flashcards', function () {
        cy.visit("http://localhost:3000/view/")

        cy.get('form').within(() => {
            cy.contains('Submit')
                .click()
        })

        cy.get('div[class="card-columns"]').children()
    })

    it('Allows me to view Flashcards by topic', function () {
        cy.visit("http://localhost:3000/view/")

        cy.get('input[id="flashcardTopicsSearch"]')
            .click({
                force: true
            })
            .type('TestTopic {enter}')

        cy.contains('Submit')
            .click()

        cy.get('div[class="card-columns"]').children().should('have.length', 3)
    })

    it('Allows me to view Flashcards by name', function () {
        cy.visit("http://localhost:3000/view/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .type("Test")

            cy.contains('Submit')
                .click()
        })

        cy.get('div[class="card-columns"]').children().should('have.length', 4)
    })

    it('Allows me to view Flashcards by term', function () {
        cy.visit("http://localhost:3000/view/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardTerm"]')
                .type("Testing")

            cy.contains('Submit')
                .click()
        })

        cy.get('div[class="card-columns"]').children().should('have.length', 1)
    })

    it('Allows me to delete a Flashcard', function () {
        cy.visit("http://localhost:3000/view/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .type("Test")

            cy.contains('Submit')
                .click()
        })

        cy.get('div[class="card-columns"] div:first').within(() => {
            cy.get('svg[data-icon="trash"]').click()
        })

        cy.get('div[class="card-columns"]').children().should('have.length', 3)
    })

    it('Allows me to edit a Flashcard', function () {
        cy.visit("http://localhost:3000/view/")

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
        cy.visit("http://localhost:3000/view/")

        cy.contains('Submit')
            .click()

        cy.get('div[class="card-columns"]').first().within(() => {
            cy.get('div[class="card-header"]').first()
        })
    })
})

