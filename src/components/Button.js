export const Button = ({ children, style, type = 'button', ...props }) => {
  return (
    <button
      type={type}
      {...props}
      style={{
        padding: '16px',
        border: 'none',
        backgroundColor: 'var(--neutral-100)',
        color: 'var(--black)',
        fontWeight: 'bold',
        ...style,
      }}
    >
      {children}
    </button>
  )
}
