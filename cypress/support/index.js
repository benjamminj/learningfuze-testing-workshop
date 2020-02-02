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

before(() => {
  // Cypress doesn't support watching the fetch API, so we need to polyfill out fetch with
  // XMLHttpRequest.
  let polyfill

  cy.readFile('node_modules/whatwg-fetch/dist/fetch.umd.js').then(
    contents => (polyfill = contents)
  )

  Cypress.on('window:before:load', win => {
    // Delete window.fetch so that all fetch requests go thru the polyfilled version
    delete win.fetch
    // Add the polyfill.
    win.eval(polyfill)
  })
})
