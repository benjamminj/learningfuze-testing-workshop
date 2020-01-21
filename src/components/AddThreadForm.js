import { useState } from 'react'
import { Input } from './Input'
import { TextArea } from './TextArea'
import { Button } from './Button'

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
