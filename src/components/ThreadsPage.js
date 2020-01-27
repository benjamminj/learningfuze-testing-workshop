import fetch from 'isomorphic-unfetch'
import { ROOT_URL } from '../constants'
import { useState } from 'react'
import { GlobalStyles } from './GlobalStyles'
import { AddThreadForm } from './AddThreadForm'
import { ThreadPreview } from './ThreadPreview'
import { request } from '../utils/request'

/**
 * Renders a list of all threads in the app as preview cards.
 *
 * Additionally, allows you to add a thread.
 */
export const ThreadsPage = ({ threads: initialThreads }) => {
  const [threads, setThreads] = useState(initialThreads)
  return (
    <div>
      {threads.map(thread => (
        <ThreadPreview key={thread.id} {...thread} />
      ))}

      <div style={{ marginTop: '32px' }}>
        <AddThreadForm
          onSubmit={form => {
            request('/api/threads', {
              method: 'POST',
              body: JSON.stringify(form),
            }).then(thread =>
              setThreads(prevThreads => prevThreads.concat([thread]))
            )
          }}
        />
      </div>

      <GlobalStyles />
    </div>
  )
}

/**
 * `getInitialProps` is NextJS's way of handling fetching data on the server.
 *
 * For more on `getInitialProps`, check out [this link](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps)
 */
ThreadsPage.getInitialProps = async () => {
  const threads = await request('/api/threads')
  return { threads }
}
