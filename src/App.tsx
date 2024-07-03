import React from 'react'

import './App.css'
import viteLogo from '../public/vite.svg'
import reactLogo from './assets/react.svg'

class App extends React.Component {
  state = {
    count: 0,
  }

  handleCountUpdate = () => {
    this.setState({
      count: this.state.count + 1,
    })
  }

  render(): React.ReactNode {
    return (
      <>
        <div>
          <a href='https://vitejs.dev' target='_blank'>
            <img src={viteLogo} className='logo' alt='Vite logo' />
          </a>
          <a href='https://react.dev' target='_blank'>
            <img src={reactLogo} className='logo react' alt='React logo' />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className='card'>
          <button onClick={this.handleCountUpdate}>count is {this.state.count}</button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
      </>
    )
  }
}

export default App
