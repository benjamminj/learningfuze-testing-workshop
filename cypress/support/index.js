// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Cypress.on('window:before:load', win => {
//   // win.fetch = null
// })

let polyfill

before(() => {
  cy.readFile('node_modules/whatwg-fetch/dist/fetch.umd.js').then(
    contents => (polyfill = contents)
  )

  Cypress.on('window:before:load', win => {
    delete win.fetch
    win.eval(polyfill)
  })
})
