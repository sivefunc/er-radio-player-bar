import { useState, useEffect, useContext } from "react";
import { StationProvider, StationContext } from "./context/station";
import { PlayerProvider, PlayerContext } from "./context/player";

import {
  FaCommentSms,
  FaFacebookF,
  FaPlay,
  FaSpinner,
  FaStop,
  FaVolumeOff,
  FaVolumeLow,
  FaVolumeHigh,
  FaX,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa6";

const PLAYER_ICONS = {
  PLAY: <FaPlay className="h-5 w-5 text-xl"/>,
  STOP: <FaStop className="h-5 w-5 text-xl" />,
  SPINNER: <FaSpinner className="h-5 w-5 animate-spin" />,
};

function TrackPlaying(props) {
  return (
    <div className="flex min-w-80 items-center rounded-lg border border-white/10 bg-white/10 p-1">
      <div className="aspect-square w-14 h-14">
        <img
          className="aspect-square h-full w-full rounded-md border border-white/10 object-cover"
          src={
            (
              props.track.artworkURL?.startsWith('/api/public/stations')
                ? props.track.artworkURL?.replace('/api/public/stations', 'https://listen.eternityready.com/api/public/stations')
                : props.track.artworkURL

            ) || props.track.artistImage
          }
        />
      </div>
      <div className="ml-2 flex flex-col justify-center">
        <p className="line-clamp-1 text-[10px] font-bold text-white/40 uppercase">Now Playing:</p>
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
    <div className="flex flex-row gap-4 items-center justify-center">
      <div className="flex flex-col justify-center">
        <div className="group relative flex items-center justify-between rounded-full border border-neutral-50/30 text-sm font-medium whitespace-nowrap text-white transition-all hover:cursor-pointer hover:bg-neutral-50/10 p-3"
        >
          <FaChevronUp className="fill-current group-hover:text-red-500 text-white transition-all"/>
        </div>
      </div>
      <div className="bg-red-500 flex items-center justify-center rounded-full text-black transition-all hover:cursor-pointer hover:brightness-125 disabled:opacity-50 h-16 w-16"
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

  let volumeIcon;
  if (props.volume.currentVolume == 0) {
    volumeIcon = <FaVolumeOff className="fill-current w-6 h-6 text-white font-medium" />
  }
  else if (props.volume.currentVolume < props.volume.maxVolume / 2) {
    volumeIcon = <FaVolumeLow className="fill-current w-6 h-6 text-white font-medium" />
  }

  else { 
    volumeIcon = <FaVolumeHigh className="fill-current w-6 h-6 text-white font-medium" />
  }

  return (
    <div className="flex flex-row gap-x-4 items-center">
      <div className="relative" onClick={() => setChangeVolume(!changeVolume)}>
        {changeVolume && (
          <div className="absolute bottom-full px-5 py-2 border border-white/50 rounded-full flex justify-center items-center hover:cursor-pointer hover:bg-neutral-50/10 gap-x-2 mb-2">
            {volumeIcon}
            <input
              type="range"
              id="volume"
              name="volume"
              onChange={(event) => props.volume.onVolume(event.target.value)}
              value={props.volume.currentVolume}
              min={props.volume.minVolume}
              max={props.volume.maxVolume}
              className="range accent-red-500"
              step={props.volume.step}
            />
          </div>
        )}
        <div className="px-5 py-2 border border-white/50 rounded-full flex justify-center items-center hover:cursor-pointer hover:bg-neutral-50/10">
          { changeVolume
            ? <FaX className="fill-current w-6 text-white font-medium" />
            : volumeIcon
          }
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
      <a
        className="flex justify-between items-center border border-white/50 hover:cursor-pointer hover:bg-neutral-50/10 rounded-full text-sm text-white font-medium py-2 px-4 gap-x-2"
        href="https://listen.eternityready.com"
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
      </a>
    </div>
  )
}

function RadioPlayer(props) {
  const { station, setStation, stationsList } = useContext(StationContext);
  const { player, playerState, playerVolume, setPlayerIsLoaded, changeVolume, currentTrack } = 
    useContext(PlayerContext);

  const [videoUrl, setVideoUrl] = useState(null);

  let volume = {
    minVolume: 0,
    maxVolume: 1,
    step: 0.02,
    currentVolume: playerVolume,
    onVolume: (volumeValue) => {
      changeVolume(volumeValue)
    }
  }
  
  console.log(volume)
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
    <div
      className="fixed bottom-0 left-0 border-t border-neutral-700 z-40 flex h-20 w-full cursor-pointer justify-between border-t border-white/20 bg-black/90 p-3 shadow-lg backdrop-blur-3xl transition-all hover:bg-black/80"
    >
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
