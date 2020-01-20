import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import { ROOT_URL } from '../constants'
import { useState } from 'react'
import { GlobalStyles } from './GlobalStyles'
import { AddThreadForm } from './AddThreadForm'

const Badge = ({ children, style }) => {
  return (
    <p
      style={{
        background: 'var(--neutral-050)',
        display: 'inline',
        padding: '4px',
        ...style,
      }}
    >
      {children}
    </p>
  )
}

const Thread = ({ id, title, description, comments, reactions }) => {
  const reactionsCount = Object.values(reactions).reduce(
    (sum, val) => val + sum,
    0
  )

  const commentsCount = comments.length

  return (
    <div
      style={{
        border: '2px solid var(--neutral-100)',
        marginTop: '8px',
        padding: '16px',
      }}
    >
      <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>
        <Link href="/[threadId]" as={`/${id}`}>
          <a>{title}</a>
        </Link>
      </h2>
      <p>{description}</p>

      <div style={{ display: 'flex' }}>
        <Badge>💬 {commentsCount}</Badge>
        <Badge style={{ marginLeft: '4px' }}>👍 {reactionsCount}</Badge>
      </div>
    </div>
  )
}

export const ThreadsPage = ({ threads: initialThreads }) => {
  const [threads, setThreads] = useState(initialThreads)
  return (
    <div style={{ padding: '16px' }}>
      {threads.map(thread => (
        <Thread key={thread.id} {...thread} />
      ))}

      <div style={{ marginTop: '32px' }}>
        <AddThreadForm
          onSubmit={form => {
            fetch('/api/threads', {
              method: 'POST',
              body: JSON.stringify(form),
            })
              .then(res => res.json())
              .then(thread =>
                setThreads(prevThreads => prevThreads.concat([thread]))
              )
          }}
        />
      </div>

      <GlobalStyles />
    </div>
  )
}

ThreadsPage.getInitialProps = async () => {
  const threads = await fetch(ROOT_URL + '/api/threads').then(res => res.json())
  return { threads }
}
