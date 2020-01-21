import { labelStyles, inputStyles } from '../styles'

export const TextArea = ({
  label,
  name,
  id,
  value,
  onChange,
  style,
  ...props
}) => {
  return (
    <div style={style}>
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
