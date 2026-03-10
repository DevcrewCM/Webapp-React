import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListaPeliculas from './Components/ListaPeliculas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ListaPeliculas></ListaPeliculas>
    </>
  )
}

export default App
