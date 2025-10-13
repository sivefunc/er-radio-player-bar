function App() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#00080b] h-20 border-t-4 border-neutral-700 flex flex-row justify-between px-3 py-1.5">
      <div className="bg-red-500 rounded-lg p-1 flex flex-row gap-x-2 w-72">
        <div className="bg-green-500 w-16 h-full rounded-lg">
        </div>
        <div>
          <div className="text-xs">Now Playing:</div>
          <div className="text-xs">Track Name</div>
          <div className="text-xs">Track Author</div>
        </div>
      </div>
      <div className="flex flex-row gap-x-4 items-center">
        <div className="bg-red-500 w-12 h-12 rounded-full">
        </div>
        <div className="bg-red-500 w-16 h-16 rounded-full">
        </div>
      </div>
      <div className="flex flex-row gap-x-4 items-center">
        <div className="bg-red-500 w-16 h-16 rounded-full">
        </div>
        <div className="bg-red-500 rounded-full py-2 px-4">
          Station XYZ
        </div>
      </div>
    </div>
  )
}

export default App
