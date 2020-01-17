import fetch from 'isomorphic-unfetch'
import { ROOT_URL } from '../constants'
import Link from 'next/link'
import { AddCommentForm } from './AddCommentForm'

export const ThreadProfilePage = ({ thread }) => {
  return (
    <div>
      <Link href="/">
        <a>Back</a>
      </Link>

      <h1>{thread.title}</h1>
      <p>{thread.content}</p>
      <div>
        {Object.entries(thread.reactions)
          .filter(([, count]) => count)
          .map(([emoji, count]) => (
            <button key={emoji} type="button">
              {emoji} {count}
            </button>
          ))}
      </div>

      <ul>
        {thread.comments.map(comment => (
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
            .then(console.log)
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
