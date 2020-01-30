import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Input } from '../Input'

describe('<Input />', () => {
  test('should render the input with a label', () => {
    const helpers = render(
      <Input label="Test" id="test" value="test" onChange={() => {}} />
    )

    expect(helpers.getByLabelText('Test')).toBeInTheDocument()
  })

  test('should render the input with a label', () => {
    const onChange = jest.fn()
    const { getByLabelText } = render(
      <Input label="Test" id="test" value="test" onChange={onChange} />
    )

    fireEvent.change(getByLabelText('Test'), {
      bubbles: true,
      target: { value: 'testz' },
    })

    expect(onChange).toHaveBeenCalled()
  })
})
