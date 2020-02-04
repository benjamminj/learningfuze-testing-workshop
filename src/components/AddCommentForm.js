import React, { useState } from 'react'
import { Input } from './Input'
import { TextArea } from './TextArea'
import { Button } from './Button'

/**
 * Allows a user to add a comment to a thread.
 *
 * Right now this form just uses the built-in HTML validation for form elements.
 *
 * ⭐️ Bonus points: make the form show an error message below each form field that
 * is not populated when the user tries to submit the form.
 */
export const AddCommentForm = ({ onSubmitForm }) => {
  const [user, setUser] = useState('')
  const [content, setContent] = useState('')

  return (
    <form
      onSubmit={ev => {
        ev.preventDefault()

        if (!user || !content) return

        onSubmitForm({ user, content })

        // reset the form
        setUser('')
        setContent('')
      }}
    >
      <Input
        id="user"
        name="user"
        label="User"
        value={user}
        onChange={ev => setUser(ev.target.value)}
        required
      />

      <TextArea
        id="content"
        name="content"
        value={content}
        label="Content"
        onChange={ev => setContent(ev.target.value)}
        required
      />

      <Button
        style={{ background: 'var(--neutral-600)', color: 'var(--white)' }}
        type="submit"
      >
        Submit
      </Button>
    </form>
  )
}
