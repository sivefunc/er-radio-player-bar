import EternityRadioPlayer from './components/RadioPlayer'
import { useRef, useState } from "react";

function App() {
  const childRef = useRef();

  return (
    <div className="bg-red-500 h-screen w-screen">
      <div className="grid grid-cols-8 gap-4">
      </div>
      <EternityRadioPlayer ref={childRef} />
    </div>
  )
}

export default App
