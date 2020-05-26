describe('The Manage Flashcards Tab', function () {
    it('Opens the Management Page', function () {
        cy.visit("/home/")

        cy.contains('Manage').click()

        cy.url().should('include', '/manage')
    })

    it('Allows me to view mutiple groups of Flashcards', function () {
        cy.visit("/manage/")

        cy.contains('Manage Flashcards').click()

        cy.get('form').within(() => {
            cy.contains('Submit')
                .click()
        })

        cy.wait('@listFlashcards')

        cy.get('[data-cy=flashcardsList]')
    })

    it('Allows me to view Flashcards by topic', function () {
        cy.visit("/manage/")

        cy.wait('@listTopics')

        cy.get('input[id="flashcardTopicsSearch"]')
            .click({
                force: true
            })
            .type(`TestTopic{enter}`)

        cy.contains('Submit')
            .click()

        cy.wait('@listFlashcards')

        cy.get('[data-cy=flashcardsList]')
    })

    it('Allows me to view Flashcards by name', function () {
        cy.visit("/manage/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .type('TestFlashcardName')

            cy.contains('Submit')
                .click()
        })

        cy.wait("@listFlashcards")

        cy.get('div[class="card-columns"]').children().should('have.length', 1)

    })

    it('Allows me to view Flashcards by term', function () {
        cy.visit("/manage/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardTerm"]')
                .type("TestFlashcardTerm")

            cy.contains('Submit')
                .click()
        })

        cy.wait("@listFlashcards")

        cy.get('div[class="card-columns"]').children().should('have.length', 1)
    })

    it('Allows me to delete a Flashcard', function () {
        cy.visit("/manage/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .type("TestFlashcardName")

            cy.contains('Submit')
                .click()
        })

        cy.wait("@listFlashcards")

        cy.get('div[class="card-columns"]').children().should('have.length', 1)

        cy.get('div[class="card-columns"] div:first').within(() => {
            cy.get('svg[data-icon="trash"]').click()
        })

        cy.wait('@delete')

        cy.get('div[class="card-columns"]').children().should('have.length', 0)
    })

    it.only('Allows me to edit a Flashcard', function () {
        cy.visit("/manage/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')
                .type("TestingFlashcardName")

            cy.contains('Submit')
                .click()
        })

        cy.wait('@listFlashcards')

        cy.get('div[class="card-columns"] div:first').within(() => {
            cy.get('svg[data-icon="edit"]').click()
            cy.get('input[type="text"]')
                .clear()
                .type("A New Test String{enter}")

                cy.wait('@updateFlashcard')

            cy.contains("A New Test String")
        })

        cy.get('div[class="card-columns"]').children()
    })

    it('Allows me view a flashcard with the colour associated to its topic', function () {
        cy.visit("/manage/")

        cy.contains('Submit')
            .click()

        cy.wait("@listFlashcards")

        cy.get('div[class="card-columns"]').first().within(() => {
            cy.get('div[class="card-header"]').first()
        })
    })

    it('Allows me search flashcards based on topic and name', function () {
        cy.log('Adding test data into db')
        cy.exec('npm run teardown')
        cy.exec('npm run setup-flashcards')

        cy.visit("/manage/")

        cy.wait('@listTopics')

        cy.get('input[id="flashcardTopicsSearch"]')
            .click({
                force: true
            })
            .type('TestTopic{enter}')

        cy.get('input[name="flashcardName"]')
            .click({ force: true })
            .type("TestFlashcardName")

        cy.contains('Submit')
            .click()

        cy.wait("@listFlashcards")

        cy.get('div[class="card-columns"]').children().should('have.length', 1)
    })

    it('Allows me search flashcards based on topic and term', function () {
        cy.visit("/manage/")

        cy.get('input[id="flashcardTopicsSearch"]')
            .click({
                force: true
            })
            .type('TestTopic{enter}')

        cy.get('input[name="flashcardTerm"]')
            .click({ force: true })
            .type("Testing{enter}")

        cy.contains('Submit')
            .click()

        cy.wait("@listFlashcards")

        cy.get('div[class="card-columns"]').children().should('have.length', 1)
    })

    it('Allows me search flashcards based on name and term', function () {
        cy.visit("/manage/")

        cy.get('input[name="flashcardName"]')
            .click({
                force: true
            })
            .type('Test{enter}')

        cy.get('input[name="flashcardTerm"]')
            .click({ force: true })
            .type("Testing{enter}")

        cy.contains('Submit')
            .click()

        cy.wait("@listFlashcards")

        cy.get('div[class="card-columns"]').children().should('have.length', 1)
    })
})