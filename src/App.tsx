function TrackPlaying() {
  return (
    <div className="bg-red-500 rounded-lg p-1 flex flex-row gap-x-2 w-72">
      <div className="bg-green-500 w-16 h-full rounded-lg">
      </div>
      <div>
        <div className="text-xs">Now Playing:</div>
        <div className="text-xs">Track Name</div>
        <div className="text-xs">Track Author</div>
      </div>
    </div>
  )
}

function CentralControl() {
  return (
    <div className="flex flex-row gap-x-4 items-center">
      <div className="bg-red-500 w-12 h-12 rounded-full">
      </div>
      <div className="bg-red-500 w-16 h-16 rounded-full">
      </div>
    </div>
  )
}

function RightControl() {
  return (
    <div className="flex flex-row gap-x-4 items-center">
      <div className="bg-red-500 w-16 h-16 rounded-full">
      </div>
      <div className="bg-red-500 rounded-full py-2 px-4">
        Station XYZ
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="fixed bottom-0 left-0 cursor-pointer w-full bg-black/90 h-20 border-t border-neutral-700 flex flex-row justify-between px-3 py-1.5 hover:bg-black/80">
      <TrackPlaying />
      <CentralControl />
      <RightControl />
    </div>
  )
}

export default App
