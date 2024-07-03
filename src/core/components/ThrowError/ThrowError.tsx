import React from 'react'

class ThrowError extends React.Component {
  state = { throwError: false }

  handleClick = () => {
    this.setState({ throwError: true })
  }

  render() {
    if (this.state.throwError) {
      throw new Error("Yeah that's fits!")
    }

    return (
      <div>
        <p>Call for a mother of virus</p>
        <button onClick={this.handleClick}>Ok, throw me some numbers</button>
      </div>
    )
  }
}

export default ThrowError
