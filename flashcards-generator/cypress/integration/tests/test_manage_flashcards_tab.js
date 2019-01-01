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
            cy.wait('@deleteFlashcard')
        })

        cy.get('div[class="card-columns"]').children().should('have.length', 0)
    })

    it('Displays a modal when edit is selected for flashcard', function () {
        cy.visit("/manage/")


        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')

            cy.contains('Submit')
                .click()

        })

        cy.get('div[class="card-columns"] div:first').within(() => {
            cy.get('svg[data-icon="edit"]').click()
        })

        cy.get('[data-cy="editFlashcardModal"]')
    })

    it('Allows me to close the edit flashcard modal', function () {
        cy.visit("/manage/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')

            cy.contains('Submit')
                .click()

        })

        cy.get('div[class="card-columns"] div:first').within(() => {
            cy.get('svg[data-icon="edit"]').click()
        })

        cy.get('[data-cy="editFlashcardModal"]').within(() => {
            cy.get('[data-cy=closeEditFlashcardModal]')
                .click()
        })
    })

    it('Allows me to edit the definition of a Flashcard', function () {
        cy.visit("/manage/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')

            cy.contains('Submit')
                .click()

        })

        cy.get('div[class="card-columns"] div:first').within(() => {
            cy.get('svg[data-icon="edit"]').click()
        })

        cy.get('[data-cy=editFlashcardDefinition-formInput]')
            .dblclick()
            .clear()
            .type('New definition incoming')

        cy.get('[data-cy=saveEditFlashcardChanges]')
            .click()

        cy.wait('@updateFlashcard')
        cy.get('[data-cy=successAlert]')

    })

    it('Allows me to edit the name of a Flashcard', function () {
        cy.visit("/manage/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')

            cy.contains('Submit')
                .click()

        })

        cy.get('div[class="card-columns"] div:first').within(() => {
            cy.get('svg[data-icon="edit"]').click()
        })

        cy.get('[data-cy="editFlashcardModal"]').within(() => {
            cy.get('[data-cy=editFlashcardName-formInput]')
                .type('This is a totally new thing')

                cy.get('[data-cy=saveEditFlashcardChanges]')
                    .click()

                cy.wait('@updateFlashcard')
        })

        cy.get(['data-cy=successAlert'])
    })

    it.only('Allows me to edit the term of a Flashcard', function () {
        cy.visit("/manage/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')

            cy.contains('Submit')
                .click()

        })

        cy.get('div[class="card-columns"] div:first').within(() => {
            cy.get('svg[data-icon="edit"]').click()
        })

        cy.get('[data-cy="editFlashcardModal"]').within(() => {
            cy.get('[data-cy=editFlashcardTerm-formInput]')
                .clear()
                .type('This is a totally new thing')

                cy.get('[data-cy=saveEditFlashcardChanges]')
                    .click()

                cy.wait('@updateFlashcard')

                cy.get('[data-cy=successAlert]')
        })
    })

    it.only('Allows me to edit the term, definition, and name of a Flashcard', function () {
        cy.visit("/manage/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')

            cy.contains('Submit')
                .click()

        })

        cy.get('div[class="card-columns"] div:first').within(() => {
            cy.get('svg[data-icon="edit"]').click()
        })

        cy.get('[data-cy="editFlashcardModal"]').within(() => {
            cy.get('[data-cy=editFlashcardTerm-formInput]')
                .clear()
                .type('Im making a new change to term')
            cy.get('[data-cy=editFlashcardName-formInput]')
                .clear()
                .type('Im making a new change to name')
            cy.get('[data-cy=editFlashcardDefinition-formInput]')
                .clear()
                .type('Im making a new change to definition')

            cy.get('[data-cy=saveEditFlashcardChanges]')
                .click()

            cy.wait('@updateFlashcard')

            cy.get('[data-cy=successAlert]')
        })
    })

    it("Doesn't submit changes is no changes have been made", function () {
        cy.visit("/manage/")

        cy.get('form').within(() => {
            cy.get('input[name="flashcardName"]')

            cy.contains('Submit')
                .click()

        })

        cy.get('div[class="card-columns"] div:first').within(() => {
            cy.get('svg[data-icon="edit"]').click()
        })

        cy.get('[data-cy="editFlashcardModal"]').within(() => {
            cy.get('[data-cy=saveEditFlashcardChanges]')
                .click()

            cy.get('[data-cy=dangerAlert]')
        })
    })

    it('Allows me view a flashcard with the colour associated to its topic', function () {
        cy.visit("/manage/")

        cy.contains('Submit')
            .click()


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