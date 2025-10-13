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
      <div className="px-5 py-2 border border-white/50 rounded-full flex justify-center items-center hover:cursor-pointer hover:bg-neutral-50/10">
        <svg
          className="fill-current w-6 h-6 text-white font-medium"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path
            d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320Z"
          />
        </svg>
      </div>
      <div className="flex justify-between items-center border border-white/50 hover:cursor-pointer hover:bg-neutral-50/10 rounded-full text-sm text-white font-medium py-2 px-4 gap-x-2">
        JAZZ-24/7
        <svg
          className="fill-current w-6 h-6 text-white/50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path
            d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"
          />
        </svg>
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
