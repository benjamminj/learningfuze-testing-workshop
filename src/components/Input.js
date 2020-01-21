import { inputStyles, labelStyles } from '../styles'

export const Input = ({
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
      <label htmlFor={id} style={labelStyles}>
        {label}
      </label>
      <input
        {...props}
        type="text"
        style={inputStyles}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
