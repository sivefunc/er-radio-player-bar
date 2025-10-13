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
        <div className="line-clamp-1 text-sm font-extrabold text-white hover:underline">I belive</div>
        <div className="line-clamp-1 text-xs font-medium text-white hover:underline">Louis Armstrong</div>
      </div>
    </div>
  )
}

function CentralControl() {
  return (
    <div className="flex flex-row gap-x-4 items-center">
      <div className="w-10 h-10 rounded-full flex items-center justify-center border border-white/50">
        <svg
          className="fill-current w-6 h-6 text-white font-medium"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path
            d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"
          />
        </svg>
      </div>
      <div className="bg-red-500 w-16 h-16 rounded-full flex justify-center items-center hover:brightness-125">
        <svg
          className="fill-current w-10 h-10 text-black"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path
            d="M320-200v-560l440 280-440 280Z"
          />
        </svg>
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
