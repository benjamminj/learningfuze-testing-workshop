import { useState } from 'react'
import { Input } from './Input'
import { TextArea } from './TextArea'
import { Button } from './Button'

export const AddCommentForm = ({ onSubmitForm }) => {
  const [user, setUser] = useState('')
  const [content, setContent] = useState('')

  return (
    <form
      onSubmit={ev => {
        ev.preventDefault()
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
        submit
      </Button>
    </form>
  )
}
