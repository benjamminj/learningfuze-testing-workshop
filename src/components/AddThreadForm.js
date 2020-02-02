import React, { useState } from 'react'
import { Input } from './Input'
import { TextArea } from './TextArea'
import { Button } from './Button'

/**
 * Adds a thread to the list of threads.
 *
 * Has two main states—hidden and visible. When hidden, the only thing in the DOM
 * is a prompt to show the form. When visible, the entire form is rendered to the DOM.
 *
 * Right now the form leverages the built-in HTML validation for forms to make both
 * fields required.
 *
 * ⭐️ Bonus points: make the form show some error text under each field that is
 * not populated when the user tries to submit the form.
 */
export const AddThreadForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  if (isOpen) {
    return (
      <form
        onSubmit={ev => {
          ev.preventDefault()
          onSubmit({ title, content })

          // Reset the form
          setTitle('')
          setContent('')

          // Close the form
          setIsOpen(false)
        }}
      >
        <Input
          id="threadTitle"
          name="title"
          value={title}
          label="Title"
          onChange={ev => setTitle(ev.target.value)}
          required
        />

        <TextArea
          style={{ margin: '16px 0' }}
          id="threadContent"
          id="threadContent"
          value={content}
          name={'content'}
          label="Content"
          onChange={ev => setContent(ev.target.value)}
          required
        />

        <Button
          type="submit"
          style={{
            background: 'var(--neutral-600)',
            color: 'var(--white)',
            marginRight: '8px',
          }}
        >
          Submit
        </Button>

        <Button onClick={() => setIsOpen(false)}>Hide form</Button>
      </form>
    )
  }

  return <Button onClick={() => setIsOpen(true)}>Add a thread</Button>
}
