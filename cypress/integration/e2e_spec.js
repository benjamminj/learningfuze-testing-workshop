describe('threads list & profile', () => {
  it('should allow viewing a thread profile from the list', () => {
    // 1. First we would hit the "/" url to see the whole "threads list" page.
    cy.server()
    cy.visit('/')

    // 2. Then we would click the "Add a thread" button to display the form.
    cy.contains('Add a thread').click()

    // randomize the title a little
    const title = `Test threadzzzzz ${Date.now().toString()}`

    // 3. We'd fill the form out with our new thread and submit the form.
    cy.contains('Title').click()
    cy.focused().type(title)

    cy.contains('Content').click()
    cy.focused().type(
      'This is the test thread content written by our e2e test 😎'
    )

    cy.route('POST', '/api/threads').as('createThread')
    // 4. We should see the form rendered to the list.
    cy.contains('Submit').click()

    // 5. We'll click the thread to view its profile.
    cy.wait('@createThread')

    cy.get('a')
      .contains(title)
      .then($anchor => {
        const href = $anchor.attr('href')
        cy.wrap(href).as('threadId')
      })

    cy.get('a')
      .contains(title)
      .click()

    cy.get('@threadId').then(id => {
      cy.url().should('include', id)
      cy.route('PATCH', `/api/threads${id}`).as('patchThread')
    })

    // 6. On the thread profile we'll do a few reactions, and add a comment.
    let count = 0
    cy.wrap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      .each(() => {
        cy.contains('🔥').click()
        cy.wait('@patchThread').then($call => {
          count++
        })
      })
      .then(() => {
        expect(count).to.equal(10)
      })

    cy.contains('User').click()
    cy.focused().type('benjamminj')

    cy.contains('Content').click()
    cy.focused().type('This is comment content')

    cy.get('@threadId').then(id => {
      cy.route('POST', `/api/threads/${id}/comments`).as('postComment')
    })

    cy.contains('Submit').click()

    cy.wait('@postComment')

    cy.contains('benjamminj').should('exist')
    cy.contains('This is comment content').should('exist')
  })
})
