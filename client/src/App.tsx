import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Body from './components/Body'
import Login from './components/Login'

function App() {

  const code = new URLSearchParams(window.location.search).get("code")

  return (
    <div className="App">
      { code ? <Body code={code} /> : <Login/> }
    </div>
  )
}

export default App
