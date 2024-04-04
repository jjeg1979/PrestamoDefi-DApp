import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AppLayout } from './components/ui/layouts'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AppLayout>
      <Home />
    </AppLayout>
  )
}

export default App
