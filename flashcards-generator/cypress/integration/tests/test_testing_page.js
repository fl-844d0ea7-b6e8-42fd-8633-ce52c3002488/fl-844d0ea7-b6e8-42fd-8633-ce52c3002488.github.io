describe('Basic functionality of the Test Flashcard Page', function () {
    it('Opens the Test Flashcards Page', function () {
        cy.visit("http://localhost:3000/test/")

        cy.contains('Test').click()

        cy.url().should('include', '/test')
    })

    it('Allows me to view all Flashcards', function () {
        cy.visit("http://localhost:3000/test/")

        cy.get('form').within(() => {
            cy.contains('Submit')
                .click()
        })

        cy.get('div[class="card-deck"]').children()
    })

    it('Allows me to view Flashcards by topic', function () {
        cy.visit("http://localhost:3000/test/")

        cy.get('form').within(() => {
            cy.get('input[id="flashcardTopicsSearch"]')
                .type("Test", { force: true })

            cy.contains('Submit')
                .click()
        })

        cy.get('div[class="card-deck"]').children()
    })

    it('Allows me to view Flashcards by name', function () {
        cy.visit("http://localhost:3000/test/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .type("Test", { force: true })

            cy.contains('Submit')
                .click()
        })

        cy.get('div[class="card-deck"]').children().should('have.length', 3)
    })

    it('Allows me to toggle between test options', function () {
        cy.visit("http://localhost:3000/test/")

        cy.contains("Test Manually").click()

        cy.get('div[role="group"]').within(() => {
            cy.get('label:first').should('have.class', 'active')
        })

        cy.contains("Mark answers automagically").click()

        cy.get('div[role="group"]').within(() => {
            cy.get('label:last').should('have.class', 'active')
        })
    })
})


describe('Manual testing functionality of the Test Flashcard Page', function () {
    it('Hides definitions when Test Manually otion is selected', function() {
        cy.visit("http://localhost:3000/test/")

        cy.contains("Test Manually").click()

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .type("Test")

            cy.contains('Submit')
                .click()
        })

        cy.get('div[class="card-deck"]:first').within(() => {
            cy.get('p[class="card-text"]').should('be.empty')
        })
    })

    it('Shows a definition when definition area is clicked', function() {
        cy.visit("http://localhost:3000/test/")

        cy.contains("Test Manually").click()

        cy.get('form').within(() => {
            cy.get('input[id="flashcardTopicsSearch"]')
                .type("Test", { force: true })

            cy.contains('Submit')
                .click()
        })

        cy.get('div[class="card-deck"]:first').within(() => {
            cy.get('div[class="card-body"]:first').click()
            cy.get('div[class="card-body"]:first').within(() => {
                cy.get('p[class="card-text"]').should('not.be.empty')
            })
        })
    })
})