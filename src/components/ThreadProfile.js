import fetch from 'isomorphic-unfetch'
import { ROOT_URL, emojis } from '../constants'
import Link from 'next/link'
import { AddCommentForm } from './AddCommentForm'
import { useState, useEffect } from 'react'
import { GlobalStyles } from './GlobalStyles'
import { Button } from './Button'

export const ThreadProfilePage = ({ thread }) => {
  const [comments, setComments] = useState(thread.comments)
  const [reactions, setReactions] = useState(thread.reactions)

  // TODO: debounce the effect to not swarm the API?
  useEffect(() => {
    const filteredReactions = {}
    for (let reaction in reactions) {
      const value = reactions[reaction]
      if (value > 0) filteredReactions[reaction] = value
    }

    fetch(`/api/threads/${thread.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        reactions: filteredReactions,
      }),
    })
  }, [reactions])

  return (
    <div>
      <Link href="/">
        <a>Back</a>
      </Link>

      <h1 style={{ margin: '60px 0 36px', fontSize: '2rem' }}>
        {thread.title}
      </h1>
      <p style={{ marginBottom: '32px' }}>{thread.content}</p>
      <div>
        {emojis.map(emoji => (
          <Button
            key={emoji}
            type="button"
            style={{
              padding: '8px',
              marginRight: '4px',
            }}
            onClick={() =>
              setReactions(prevReactions => ({
                ...prevReactions,
                [emoji]: (prevReactions[emoji] || 0) + 1,
              }))
            }
          >
            {emoji} {reactions[emoji] || 0}
          </Button>
        ))}
      </div>

      <h2 style={{ marginTop: '48px', fontSize: '1.5rem' }}>Comments</h2>
      <ul>
        {comments.map(comment => (
          <li
            key={comment.id}
            style={{
              listStyleType: 'none',
              border: '2px solid var(--neutral-200)',
              padding: '24px 16px',
              marginTop: '8px',
            }}
          >
            <h3>{comment.user}</h3>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>

      <h2 style={{ fontSize: '1.5rem', margin: '48px 0 24px' }}>
        Add a comment
      </h2>
      <AddCommentForm
        onSubmitForm={form =>
          fetch(`/api/threads/${thread.id}/comments`, {
            method: 'POST',
            body: JSON.stringify(form),
          })
            .then(res => res.json())
            .then(newComment => setComments(comments.concat([newComment])))
        }
      />

      <GlobalStyles />
    </div>
  )
}

ThreadProfilePage.getInitialProps = async ctx => {
  const { threadId } = ctx.query

  const thread = await fetch(ROOT_URL + `/api/threads/${threadId}`).then(res =>
    res.json()
  )

  return { thread }
}
