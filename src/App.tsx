function TrackPlaying() {
  return (
    <div className="bg-white/10 items-center min-w-80 rounded-lg p-1 flex flex-row gap-x-2 border border-white/10">
      <div className="w-14 h-14">
        <img
          className="h-full w-full rounded-md"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Louis_Armstrong%2C_by_Harry_Warnecke_and_Gus_Schoenbaechler%2C_1947.jpg/1920px-Louis_Armstrong%2C_by_Harry_Warnecke_and_Gus_Schoenbaechler%2C_1947.jpg"
        />
      </div>
      <div>
        <div className="text-[10px] font-bold text-white/40 uppercase line-clamp-1">Now Playing:</div>
        <div className="line-clamp-1 text-xs font-extrabold text-white hover:underline">I belive</div>
        <div className="line-clamp-1 text-xs font-medium text-white hover:underline">Louis Armstrong</div>
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
