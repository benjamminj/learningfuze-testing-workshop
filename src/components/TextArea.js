import { labelStyles, inputStyles } from '../styles'

/**
 * TextArea component. Only allows you to resize the textarea _vertically_.
 *
 * The label is attached / required to encourage accessible inputs by default.
 */
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
