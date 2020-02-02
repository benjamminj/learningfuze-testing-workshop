import React from 'react'
import Link from 'next/link'
import { sumValues } from '../utils/sumValues'

/**
 * Small style wrapper around this `p` tag.
 *
 * Typically when there's tiny components like this for another component I like
 * to leave them in the same file unless I start to see them being reused throughout
 * the app or unless I want to test them separately.
 */
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

/**
 * Renders a preview of the thread. Aggregates the reactions and comments into small
 * badges since this is just a preview.
 *
 * Clicking on the post will navigate you to the post profile.
 */
export const ThreadPreview = ({
  id,
  title,
  description,
  comments,
  reactions,
}) => {
  const reactionsCount = sumValues(Object.values(reactions))
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
        {/**
         * `Link` is NextJS's way of handling routing...`href` refers to the path
         * in the `pages` directory and `as` is the URL that you want to show.
         */}
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
