import fetch from 'isomorphic-unfetch'
import { ROOT_URL, emojis } from '../constants'
import Link from 'next/link'
import { AddCommentForm } from './AddCommentForm'
import { useState, useEffect } from 'react'

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

      <h1>{thread.title}</h1>
      <p>{thread.content}</p>
      <div>
        {emojis.map(emoji => (
          <button
            key={emoji}
            type="button"
            onClick={() =>
              setReactions(prevReactions => ({
                ...prevReactions,
                [emoji]: (prevReactions[emoji] || 0) + 1,
              }))
            }
          >
            {emoji} {reactions[emoji] || 0}
          </button>
        ))}
      </div>

      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            {comment.user}: {comment.content}
          </li>
        ))}
      </ul>

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
