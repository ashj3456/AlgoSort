import React, { useState } from 'react'
import { counterContext} from './SortingV/context/context.js'
import Sortingv from './SortingV/Sortingv'

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <counterContext.Provider value={{ count, setCount }}>
        <Sortingv></Sortingv>
      </counterContext.Provider>
    </>
  )
}

export default App
