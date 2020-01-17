import { useState } from 'react'

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
      <label htmlFor="user">user</label>
      <input
        id="user"
        name="user"
        value={user}
        onChange={ev => setUser(ev.target.value)}
      />

      <label htmlFor="content">content</label>
      <textarea
        id="content"
        name="content"
        value={content}
        onChange={ev => setContent(ev.target.value)}
      />

      <button type="submit">submit</button>
    </form>
  )
}
