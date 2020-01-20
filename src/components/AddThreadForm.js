import { useState } from 'react'

const inputStyles = {
  width: '100%',
  border: '2px solid var(--neutral-100)',
}
const labelStyles = {
  display: 'block',
  fontSize: '1rem',
}
const Input = ({ label, name, id, value, onChange, ...props }) => {
  return (
    <div>
      <label htmlFor={id} style={labelStyles}>
        {label}
      </label>
      <input
        {...props}
        type="text"
        style={inputStyles}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

const TextArea = ({ label, name, id, value, onChange, ...props }) => {
  return (
    <div>
      <label style={labelStyles} htmlFor={id}>
        {label}
      </label>
      <textarea
        {...props}
        style={{ ...inputStyles, resize: 'vertical' }}
        id={id}
        name={name}
        value={value}
        rows={10}
        onChange={onChange}
      />
    </div>
  )
}

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
        />

        <TextArea
          id="threadContent"
          id="threadContent"
          value={content}
          name={'content'}
          label="Content"
          onChange={ev => setContent(ev.target.value)}
        />

        <button type="submit">Submit</button>
        <button type="button" onClick={() => setIsOpen(false)}>
          hide form
        </button>
      </form>
    )
  }

  return (
    <button type="button" onClick={() => setIsOpen(true)}>
      add a thread
    </button>
  )
}
