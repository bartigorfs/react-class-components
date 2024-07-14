import React, { useState } from 'react'

function ThrowError() {
  const [throwError, setThrowError] = useState(false)

  const handleClick = () => {
    setThrowError(true)
  }

  if (throwError) {
    throw new Error("Yeah that's fits!")
  }

  return (
    <div>
      <p>Call for a mother of virus</p>
      <button onClick={handleClick}>Ok, throw me some numbers</button>
    </div>
  )
}

export default ThrowError
