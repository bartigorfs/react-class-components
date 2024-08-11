import { useEffect, useState } from 'react'
import styles from './Checkbox.module.css'

export interface CheckboxProps {
  label?: string
  checked?: boolean
  onChange?: (value: boolean) => void
  onClick?: () => void
  value: boolean
}

export default function Checkbox(props: CheckboxProps): JSX.Element {
  const [checked, setChecked] = useState(props.value)

  const handleChange = () => {
    setChecked((prev) => !prev)
    if (props.onChange) {
      props.onChange(!checked)
    }
  }

  useEffect(() => {
    setChecked(props.value)
  }, [props.value])

  return (
    <label className={styles.container}>
      <input type='checkbox' checked={checked} onChange={handleChange} onClick={props.onClick} />
      <span className={styles.checkmark}></span>
      {props.label}
    </label>
  )
}
