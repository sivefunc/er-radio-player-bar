import { useState, useEffect, useContext } from "react";
import { StationProvider, StationContext } from "./context/station";
import { PlayerProvider, PlayerContext } from "./context/player";

import {
  FaCommentSms,
  FaFacebookF,
  FaPlay,
  FaSpinner,
  FaStop,
} from "react-icons/fa6";

const PLAYER_ICONS = {
  PLAY: <FaPlay className="h-6 w-6" />,
  STOP: <FaStop className="h-6 w-6" />,
  SPINNER: <FaSpinner className="h-6 w-6 animate-spin" />,
};

function TrackPlaying(props) {
  return (
    <div className="bg-white/10 items-center min-w-80 rounded-lg p-1 flex flex-row gap-x-2 border border-white/10">
      <div className="w-14 h-14">
        <img
          className="h-full w-full rounded-md"
          src={
            (
              props.track.artworkURL?.startsWith('/api/public/stations')
                ? props.track.artworkURL?.replace('/api/public/stations', 'https://listen.eternityready.com/api/public/stations')
                : props.track.artworkURL

            ) || props.track.artistImage
          }
        />
      </div>
      <div>
        <div className="text-[10px] font-bold text-white/40 uppercase line-clamp-1">Now Playing:</div>
        <div className="line-clamp-1 text-sm font-extrabold text-white hover:underline">{props.track.trackName}</div>
        <div className="line-clamp-1 text-xs font-medium text-white hover:underline">{props.track.artistName}</div>
      </div>
    </div>
  )
}

function CentralControl(props) {
  let playerIcon;
  let playerState = props.playerState;
  if (playerState === "playing") {
    playerIcon = PLAYER_ICONS.STOP
  } else if (playerState === "stopped" || playerState === "ready") {
    playerIcon = PLAYER_ICONS.PLAY
  } else {
    playerIcon = PLAYER_ICONS.SPINNER
  }

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
      <div className="bg-red-500 w-16 h-16 rounded-full flex justify-center items-center hover:brightness-125"
        onClick={() => props.onTogglePlayer()}
      >
        {playerIcon}
      </div>
    </div>
  )
}

function RightControl(props) {
  const [isOpen, setIsOpen] = useState(false)
  const [changeVolume, setChangeVolume] = useState(false)

  return (
    <div className="flex flex-row gap-x-4 items-center">
      <div className="relative" onClick={() => setChangeVolume(!changeVolume)}>
        {changeVolume && (
          <div className="absolute bottom-full px-5 py-2 border border-white/50 rounded-full flex justify-center items-center hover:cursor-pointer hover:bg-neutral-50/10 gap-x-2 mb-2">
            <svg
              className="fill-current w-6 h-6 text-white font-medium"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
            >
              <path
                d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320Z"
              />
            </svg>
            <input
              type="range"
              id="volume"
              name="volume"
              onChange={(event) => props.volume.onVolume(event.target.value)}
              value={props.volume.currentVolume}
              min={props.volume.minVolume}
              max={props.volume.maxVolume}
            />
          </div>
        )}
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
      </div>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="relative">

        {isOpen && (
          <div
            className="absolute bottom-full left-0 mb-0 min-w-64 rounded-2xl border border-neutral-600 bg-black p-2 shadow-lg flex flex-col gap-y-1"
          >
            {props.stations.map((station, stationIdx) =>
              <div className={
                // -- Tailwind merge for future update
                stationIdx == props.stationToListen
                  ? "w-full rounded-full px-3 py-1 text-left text-sm hover:cursor-pointer text-white bg-white/20 font-semibold"

                  : "w-full rounded-full px-3 py-1 text-left text-sm hover:cursor-pointer text-white/70 hover:bg-white/20 hover:text-white"
                }
                onClick={() => props.onStationSelected(stationIdx)}
              >
                {station}
              </div>
            )}
          </div>
        )}
        <div 
          className="flex justify-between items-center border border-white/50 hover:cursor-pointer hover:bg-neutral-50/10 rounded-full text-sm text-white font-medium py-2 px-4 gap-x-2">
          {props.stations[props.stationToListen]}
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
      <div 
        className="flex justify-between items-center border border-white/50 hover:cursor-pointer hover:bg-neutral-50/10 rounded-full text-sm text-white font-medium py-2 px-4 gap-x-2"
      >
        <svg
          className="fill-current w-6 h-6 text-white/50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path
            d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 400Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z"
          />
        </svg>
        Go to  Station Finder
      </div>
    </div>
  )
}

function RadioPlayer(props) {
  const { station, setStation, stationsList } = useContext(StationContext);
  const { player, playerState, setPlayerIsLoaded, currentTrack } = 
    useContext(PlayerContext);

  const [videoUrl, setVideoUrl] = useState(null);

  const [volume, setVolume] = useState({
    minVolume: 0,
    maxVolume: 100,
    currentVolume: 50,
    onVolume: (volumeValue) => {
      console.log(volumeValue)
      setVolume(prevVolume => ({...prevVolume, currentVolume: volumeValue}))
    }
  })
  
  function togglePlayer() {
    if (playerState === "playing") {
      player.stop();
    } else {
      setPlayerIsLoaded(true);
      player.play();
    }
  }

  if (!station) {
    return;
  }

  console.log(currentTrack);

  return (
    <div className="fixed bottom-0 left-0 cursor-pointer w-full bg-black/90 h-20 border-t border-neutral-700 flex flex-row justify-between px-3 py-1.5 hover:bg-black/80 ">
      <TrackPlaying track={currentTrack}/>
      <CentralControl
        onTogglePlayer={togglePlayer}
        playerState={playerState}
      />
      <RightControl
        stations={stationsList.map(stationInList => stationInList.name)}
        stationToListen={stationsList.findIndex(
          stationInList => stationInList.name == station.name
        )}
        volume={volume}
        onStationSelected={async (stationIdx) => {
          await player.switchEndpoint();
          setStation(stationsList[stationIdx])
        }}
      />
    </div>
  )
}

function EternityRadioPlayer() {
  return (
    <StationProvider>
      <PlayerProvider>
        <RadioPlayer />
      </PlayerProvider>
    </StationProvider>
  )
}

export default EternityRadioPlayer
