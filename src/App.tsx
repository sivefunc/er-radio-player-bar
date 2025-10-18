import EternityRadioPlayer from './components/RadioPlayer'
import { useState } from "react";

function App() {
  return (
    <div className="bg-black h-screen w-screen">
      <div className="bg-red-500 w-16 h-16">
      </div>
      <EternityRadioPlayer />
    </div>
  )
}

export default App
