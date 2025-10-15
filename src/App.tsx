import RadioPlayer from './components/RadioPlayer'
import { useState } from "react";

function App() {
  const [volume, setVolume] = useState({
    minVolume: 0,
    maxVolume: 100,
    currentVolume: 50,
    onVolume: (volumeValue) => {
      console.log(volumeValue)
      setVolume(prevVolume => ({...volume, currentVolume: volumeValue}))
    }
  })

  return (
    <div className="bg-black h-screen w-screen">
      <RadioPlayer
        volume={volume}
      />
    </div>
  )
}

export default App
