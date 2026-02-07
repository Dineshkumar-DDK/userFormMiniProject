import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import Index from './pages/Index'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Index />
    </>
  )
}

export default App
