import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Checkbox from './Checkbox'
import { describe, it, expect, vi } from 'vitest'

describe('Checkbox', () => {
  it('should render the checkbox with a label', () => {
    render(<Checkbox label='Test Label' />)
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
  })

  it('should be unchecked by default', () => {
    render(<Checkbox />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('should call onChange with the correct value when checked', () => {
    const onChange = vi.fn()
    render(<Checkbox onChange={onChange} />)
    const checkbox = screen.getByRole('checkbox')

    // Simulate checking the checkbox
    fireEvent.click(checkbox)
    expect(onChange).toHaveBeenCalledWith(true)

    // Simulate unchecking the checkbox
    fireEvent.click(checkbox)
    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('should apply the checked state from props', () => {
    render(<Checkbox value={true} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('should call onClick if provided', () => {
    const onClick = vi.fn()
    render(<Checkbox onClick={onClick} />)
    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
