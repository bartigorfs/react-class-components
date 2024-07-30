import { useState } from 'react'

export interface CheckboxProps {
  label?: string
  checked?: boolean
  onChange?: (value: boolean) => void
  onClick?: () => void
}

export default function Checkbox(props: CheckboxProps): JSX.Element {
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked((prev) => !prev)
    if (props.onChange) {
      props.onChange(!checked)
    }
  }

  return (
    <label>
      <input
        type='checkbox'
        checked={props.checked}
        onChange={handleChange}
        onClick={() => props.onClick}
      />
      {props.label}
    </label>
  )
}
