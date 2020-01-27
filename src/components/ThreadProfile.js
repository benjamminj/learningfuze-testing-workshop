import fetch from 'isomorphic-unfetch'
import { ROOT_URL, emojis } from '../constants'
import Link from 'next/link'
import { AddCommentForm } from './AddCommentForm'
import { useState, useEffect } from 'react'
import { GlobalStyles } from './GlobalStyles'
import { Button } from './Button'
import { request } from '../utils/request'

/**
 * Renders the profile for an individual post.
 *
 * Each post displays the comments and reactions for that post, allowing you to
 * interact with both.
 */
export const ThreadProfilePage = ({ thread }) => {
  const [comments, setComments] = useState(thread.comments)
  const [reactions, setReactions] = useState(thread.reactions)

  // ⭐️ Bonus points: use a debounced effect to make sure that we're not sending
  // more requests to the API than we need to.
  //
  // With the debounced effect it should only fire 1 `useEffect` after you stop clicking
  // the reaction buttons. That effect would have the final state of the reactions and
  // send up a single request containing the sum of all your actions.
  //
  // For more on debounce, check out [this link](https://davidwalsh.name/javascript-debounce-function).
  // For an example of a debounced useEffect, check out [this link](https://usehooks.com/useDebounce/)
  useEffect(() => {
    const filteredReactions = {}
    for (let reaction in reactions) {
      const value = reactions[reaction]
      if (value > 0) filteredReactions[reaction] = value
    }

    request(`/api/threads/${thread.id}`, {
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
          request(`/api/threads/${thread.id}/comments`, {
            method: 'POST',
            body: JSON.stringify(form),
          }).then(newComment => setComments(comments.concat([newComment])))
        }
      />

      <GlobalStyles />
    </div>
  )
}

/**
 * `getInitialProps` is NextJS's way to handle fetching data on server.
 *
 * Right now this function will just crash the page if there's a
 * problem fetching the thread. For example, if you try to go
 * http://localhost:3000/this-will-break you'll get an error.
 *
 * ⭐️ Bonus points: add error handling so that this page either renders a 404 page
 * (saying something like this post couldn't be found) or redirects you to the
 * ThreadsPage (http://localhost:3000) when there's an error finding the post.
 *
 * For more on `getInitialProps`, check out [this link](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps)
 */
ThreadProfilePage.getInitialProps = async ctx => {
  const { threadId } = ctx.query

  const thread = await request(`/api/threads/${threadId}`)

  return { thread }
}
