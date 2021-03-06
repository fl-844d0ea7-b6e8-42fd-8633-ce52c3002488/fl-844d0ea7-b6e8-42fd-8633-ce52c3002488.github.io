// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
beforeEach(() => {
  cy.log("Adding test flashcards into db")
  cy.exec("npm run teardown")
  cy.exec("npm run setup-flashcards")

  cy.log('Setting up server and route listeners')
  cy.server()
  cy.route('**/api/listTopics').as('listTopics')
  cy.route('POST', '**/api/listFlashcards').as('listFlashcards')
  cy.route('DELETE', '**/api/delete/*').as('delete')
  cy.route('POST', '/api/createTopic').as("createTopic")
  cy.route('GET', '/api/listTopicsByName/*').as('listTopicsByName')
  cy.route('POST', '/api/updateTopic/*').as('updateTopic')
  cy.route('POST', '/api/createFlashcard').as('createFlashcard')
  cy.route('POST', '/api/updateFlashcard/*').as('updateFlashcard')
  cy.route('DELETE', '/api/deleteFlashcard/*').as('deleteFlashcard')
})