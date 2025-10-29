import { useState, useEffect, useContext, useRef, useImperativeHandle, forwardRef } from "react";
import { StationProvider, StationContext } from "./context/station";
import { PlayerProvider, PlayerContext } from "./context/player";

import LocationMap from './LocationMap';

import {
  FaCommentSms,
  FaFacebookF,
  FaPlay,
  FaSpinner,
  FaStop,
  FaVolumeOff,
  FaVolumeLow,
  FaVolumeHigh,
  FaXmark,
  FaChevronDown,
  FaChevronUp,
  FaCaretLeft,
  FaCircleArrowDown,
  FaCircleArrowUp
} from "react-icons/fa6";

const PLAYER_ICONS = {
  PLAY: <FaPlay className="h-5 w-5 text-xl"/>,
  STOP: <FaStop className="h-5 w-5 text-xl" />,
  SPINNER: <FaSpinner className="h-5 w-5 animate-spin" />,
};

function useWindowDimensions() {
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

function TrackPlaying(props) {
  const { height, width } = useWindowDimensions();

  if (width != null && width < 1280) {
    return (
      <div className="flex items-center gap-2">
        <img
          alt={props.track?.trackName}
          loading="lazy"
          width={56}
          height={56}
          decoding="async"
          data-nimg={1}
          className="h-14 w-14 rounded-sm object-cover"
          src={
            (
              props.track?.artworkURL?.startsWith('/api/public/stations')
                ? props.track?.artworkURL?.replace('/api/public/stations', 'https://listen.eternityready.com/api/public/stations')
                : props.track?.artworkURL

            ) || props.track?.artistImage
          }

        />
        <div className="flex flex-col">
          <p className="mb-px line-clamp-1 text-sm font-bold text-white">
            {props.track?.trackName}
          </p>
          <p className="line-clamp-1 text-sm font-medium text-white/60">
            {props.track?.artistName}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex max-w-80 xl:min-w-80 items-center rounded-lg border border-white/10 bg-white/10 p-1">
      <div className="aspect-square w-14 h-14">
        <img
          className="aspect-square h-full w-full rounded-md border border-white/10 object-cover"
          src={
            (
              props.track?.artworkURL?.startsWith('/api/public/stations')
                ? props.track?.artworkURL?.replace('/api/public/stations', 'https://listen.eternityready.com/api/public/stations')
                : props.track?.artworkURL

            ) || props.track?.artistImage
          }
        />
      </div>
      <div className="ml-2 flex flex-col justify-center">
        <p className="line-clamp-1 text-[10px] font-bold text-white/40 uppercase">Now Playing:</p>
        <div className="line-clamp-1 text-sm font-extrabold text-white hover:underline">{props.track?.trackName}</div>
        <div className="line-clamp-1 text-xs font-medium text-white hover:underline">{props.track?.artistName}</div>
      </div>
    </div>
  )
}

function CentralControl(props) {
  const { height, width } = useWindowDimensions();
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
    <div className="flex flex-row gap-2 xl:gap-4 items-center justify-center">
      <div
        className="flex flex-col justify-center"
        onClick={props.onExpand}
      >
        {(width != null && width < 1280)
          ? (
            props.expand
              ? (
                <FaCircleArrowDown className="group-hover:text-primary text-2xl text-white transition-all"/>
              )
              : (
                <FaCircleArrowUp className="group-hover:text-primary text-2xl text-white transition-all"/>
              )
          )
          : (
            <div className="group relative flex items-center justify-between rounded-full border border-neutral-50/30 text-sm font-medium whitespace-nowrap text-white transition-all hover:cursor-pointer hover:bg-neutral-50/10 p-3"
            >
              { props.expand
                ? (
                  <FaChevronDown className="fill-current group-hover:text-red-500 text-white transition-all"/>
                )
                : (
                  <FaChevronUp className="fill-current group-hover:text-red-500 text-white transition-all"/>
                )
              }
            </div>
          )
        }
      </div>
      <button 
        disabled={props.playerState === "loading"}
        className="bg-red-500 flex items-center justify-center rounded-full text-black transition-all hover:cursor-pointer hover:brightness-125 disabled:opacity-50 h-12 w-12 xl:h-16 xl:w-16"
        onClick={() => props.onTogglePlayer()}
      >
        {playerIcon}
      </button>
    </div>
  )
}

function VolumeControl(props) {
  const [changeVolume, setChangeVolume] = useState(false)
  const dropdownRef = useRef();
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setChangeVolume(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  let volumeIcon;
  if (props.volume.currentVolume == 0) {
    volumeIcon = <FaVolumeOff className="fill-current w-8 text-white font-medium" />
  }
  else if (props.volume.currentVolume < props.volume.maxVolume / 2) {
    volumeIcon = <FaVolumeLow className="fill-current w-8 text-white transition-all" />
  }

  else { 
    volumeIcon = <FaVolumeHigh className="fill-current w-8 text-white transition-all" />
  }

  return (
    <div 
      className="relative"
    >
      <div className="absolute bottom-full left-0 mb-2 flex items-center justify-center rounded-full border border-neutral-600 bg-black py-3 px-1.5 shadow-lg transition-all duration-300"
        style={{
          opacity: changeVolume ? 1 : 0,
          transform: changeVolume ? "translateY(0)" : "translateY(10px)",
        }}
        ref={dropdownRef}
      >
        {volumeIcon}
        <input
          type="range"
          id="volume"
          name="volume"
          onChange={(event) => props.volume.onVolume(event.target.value)}
          value={props.volume.currentVolume}
          min={props.volume.minVolume}
          max={props.volume.maxVolume}
          className="w-48 h-2 bg-red-500 appearance-none rounded-lg cursor-pointer"
          style={{
            background: `linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 0, 0) ${props.volume.currentVolume * 100}%, rgb(64, 64, 64) ${props.volume.currentVolume * 100}%, rgb(64, 64, 64) 100%)`,
            appearance: 'none',
            '--thumb-color': 'white'
          }}
          step={props.volume.step}
        />
      </div>
      <div
        className="group flex items-center justify-between rounded-full border border-neutral-50/30 px-4 py-3 text-sm font-medium whitespace-nowrap text-white transition-all hover:cursor-pointer hover:bg-neutral-50/10"
        onClick={() => setChangeVolume(!changeVolume)}
      >
        { changeVolume
          ? <FaXmark className="fill-current w-8 text-white transition-all" />
          : volumeIcon
        }
      </div>
    </div>
  )
}

function StationSelector(props) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div 
      className="relative">
      <div
        className="absolute bottom-full left-0 mb-0 min-w-64 rounded-2xl border border-neutral-600 bg-black p-2 shadow-lg flex flex-col gap-y-1 transition-all"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0)" : "translateY(10px)",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {props.stations.map((station, stationIdx) =>
          <div className={
            // -- Tailwind merge for future update
            stationIdx == props.stationToListen
              ? "w-full rounded-full px-3 py-1 text-left text-sm transition-all hover:cursor-pointer bg-white/20 font-semibold text-white"

              : "w-full rounded-full px-3 py-1 text-left text-sm transition-all hover:cursor-pointer text-white/70 hover:bg-white/20 hover:text-white"
            }
            onClick={() => isOpen && props.onStationSelected(stationIdx)}
          >
            {station}
          </div>
        )}
      </div>
      <div 
        className="group flex items-center justify-between rounded-full border border-neutral-50/30 px-4 py-2 text-sm font-medium whitespace-nowrap text-white transition-all hover:cursor-pointer hover:bg-neutral-50/10"

        onClick={() => setIsOpen(!isOpen)}
      >
        {props.stations[props.stationToListen]}
        <FaChevronDown className="ml-3 text-white/50 transition-all group-hover:text-white"/>
      </div>
    </div>
  )
}

function StationFinder(props) {
  return (
    <a
      className=" group flex justify-between items-center border border-neutral-50/30 hover:cursor-pointer hover:bg-neutral-50/10 transition-all rounded-full text-sm text-white font-medium py-2 px-4 gap-x-2 whitespace-nowrap"
      onClick={props.onClick}
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
  )
}

function AboutArtistExpand(props) {

  const { height, width } = useWindowDimensions();
  return (
    <div className="col-span-1">
      <h3 className="mb-2 text-lg xl:text-2xl font-bold xl:font-extrabold text-white">
        {(width != null && width < 1280)
          ? "The Artist"
          : "About the artist"
        }
      </h3>
      { (width != null && width < 1280)
        ? (
          <a href={props.track?.artistViewUrl} >
            <div className="relative max-h-64 overflow-clip rounded-xl">
              <img
                alt={props.track?.artistName}
                loading="lazy"
                width={600}
                height={300}
                decoding="async"
                data-nimg={1}
                className="relative w-full rounded-xl object-cover"
                style={{ color: "transparent" }}
                src={
                  (
                    props.track?.artistImage?.startsWith('/api/public/stations')
                      ? props.track?.artistImage?.replace('/api/public/stations', 'https://listen.eternityready.com/api/public/stations')
                      : props.track?.artistImage
                  ) || (
                    props.track?.artworkURL?.startsWith('/api/public/stations')
                      ? props.track?.artworkURL?.replace('/api/public/stations', 'https://listen.eternityready.com/api/public/stations')
                      : props.track?.artworkURL

                  )
                }
              />
              <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <h3 className="absolute bottom-2 left-4 text-lg font-bold text-white drop-shadow-sm">{props.track?.artistName}
              </h3>
            </div>
          </a>
        )
        : (
          <>
          <a href={props.track?.artistViewUrl}>
            <img
              alt={props.track?.artistName}
              loading="lazy"
              width={600}
              height={300}
              decoding="async"
              data-nimg={1}
              className="mb-2 rounded-2xl object-cover transition-all hover:brightness-90 aspect-video max-h-64"
              style={{ color: "transparent" }}
              src={
                  (
                    props.track?.artistImage?.startsWith('/api/public/stations')
                      ? props.track?.artistImage?.replace('/api/public/stations', 'https://listen.eternityready.com/api/public/stations')
                      : props.track?.artistImage
                  ) || (
                    props.track?.artworkURL?.startsWith('/api/public/stations')
                      ? props.track?.artworkURL?.replace('/api/public/stations', 'https://listen.eternityready.com/api/public/stations')
                      : props.track?.artworkURL

                  )
                }
          />
        </a>
        <h4 className="mb-2 text-xl font-extrabold text-white">
          {props.track?.artistName}
        </h4>
        <p className="line-clamp-5 font-medium text-neutral-300">
          {props.track?.aboutDescription}
        </p>
        <div className="mt-6 flex">
          <div className="">
            <a
              target="_self"
              className="group flex items-center justify-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-bold whitespace-nowrap backdrop-blur-2xl transition-all xl:px-5 xl:py-3 border-white text-white hover:bg-white hover:text-black "
              href={props.track?.artistViewUrl}
            >
              Visit Artist Page
            </a>
          </div>
        </div>
        </>
      )}
    </div>
  )
}

function RelatedContentExpand(props) {
  const { height, width } = useWindowDimensions();

  if (!props.track?.relatedSongs) {
    return;
  }

  console.log(props.track?.relatedSongs);

  return (
    <>
      <h3 className="mb-2 text-2xl font-extrabold text-white">
        Related content
      </h3>
      {props.track?.relatedSongs?.slice(0, 3)?.map(relatedTrack => (
      <div className="">
        <a
          className="group hidden items-center rounded-xl border p-1 transition-all hover:shadow-xl xl:flex xl:rounded-2xl xl:p-2 undefined border-neutral-800 bg-neutral-800 hover:border-neutral-600 hover:bg-neutral-700"
          href={relatedTrack?.trackViewUrl ?? relatedTrack.external_urls?.spotify}
        >
          <div className="flex-shrink-0">
            <div className="overflow-clip rounded-lg xl:rounded-md aspect-video h-16 w-28 xl:h-24 xl:w-40">
              <img
                alt={relatedTrack?.trackName ?? relatedTrack?.name}
                loading="lazy"
                width={1366}
                height={768}
                decoding="async"
                data-nimg={1}
                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                style={{ color: "transparent" }}
                src={relatedTrack?.artworkURL ?? relatedTrack?.artworkUrl100 ?? relatedTrack?.album.images[0].url}
              />
            </div>
          </div>
          <div className="flex flex-col px-2 xl:px-4">
            <h3 className="line-clamp-2 leading-tight font-bold xl:text-lg text-white ">
              {relatedTrack?.trackName ?? relatedTrack?.name}
            </h3>
            <div className="mt-1 flex xl:mt-2">
              <p className="flex text-sm font-medium transition-all xl:hidden text-neutral-400">
                Music
              </p>
              <p className="hidden rounded-full px-3 py-1 text-xs font-bold transition-all xl:mt-0 xl:flex bg-neutral-700 text-white group-hover:bg-neutral-600">
                Music
              </p>
            </div>
          </div>
        </a>
      </div>
      ))}
    </>
  )
}

function OnAirExpand(props) {
  return (
    <>
      {(props.loadingUpcomingTracks || props.upcomingTracks?.length) && (
        <>
        <h3 className="mb-2 text-2xl font-extrabold text-white">
          On-Air
        </h3>
        <div className="">
          <a
            className="group flex items-center rounded-full border border-neutral-800 bg-neutral-800 p-2 transition-all hover:border-neutral-600 hover:bg-neutral-700 hover:shadow-xl"
            href={props.station?.donateLink}
          >
            <div className="relative aspect-square w-16 overflow-clip rounded-full xl:h-28 xl:w-28">
              <img
                alt={props.upcomingTracks?.[0]?.artistName}
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                className="absolute inset-0 z-10 h-full w-full object-cover"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  inset: 0,
                  color: "transparent"
                }}
                sizes="100vw"
                src={`https://listen.eternityready.com/${props.upcomingTracks?.[0]?.artworkURL}`}
              />
            </div>
            <div className="flex flex-1 flex-col px-4">
              <h3 className="line-clamp-1 leading-tight font-extrabold text-white xl:line-clamp-2 xl:text-lg">
                {props.upcomingTracks?.[0]?.artistName}
              </h3>
              <p className="mt-1 text-sm font-medium text-neutral-400">
                {props.upcomingTracks?.[0]?.dateScheduled
                  ? new Date(
                    props.upcomingTracks?.[0]?.dateScheduled?.replace(" ", "T") + "Z"
                  ).toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })
                  : "Invalid date"
                }
              </p>
              <p className="mb-1 text-sm font-medium text-neutral-400 xl:mb-3">
                {props.upcomingTracks?.[0]?.trackName}
              </p>
              <div className="flex">
                <p className="rounded-full bg-neutral-700 px-3 py-1 text-xs font-bold text-white transition-all group-hover:bg-neutral-600">
                  Visit Station Page
                </p>
              </div>
            </div>
          </a>
        </div>
        </>
      )}
    </>
  )
}

function StationsExpand(props) {
  const { height, width } = useWindowDimensions();
  return (
    <>
    <h3 className="mb-2 text-2xl font-extrabold text-white">
      Stations
    </h3>
      { (width != null && width < 1280)
        ?
        <div className="scrollbar-hide flex w-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4">
          {props.stationsList.map((station, stationIdx) => (
          <div className="group w-24 flex-none shrink-0 snap-center hover:cursor-pointer">
            <img
              alt={station.name}
              loading="lazy"
              width={300}
              height={300}
              decoding="async"
              data-nimg={1}
              className="aspect-square w-full rounded-xl border border-neutral-50/20 object-cover transition-all hover:brightness-75"
              style={{ color: "transparent" }}
              src={`https://listen.eternityready.com/${station.logo}`}
            />
            <p className="mt-1 text-center text-xs font-medium text-white/70 transition-all group-hover:text-white">
              {station.name}
            </p>
          </div>
          ))}
        </div>
        :
        <div className="mb-4 grid grid-cols-5 gap-4">
          {props.stationsList.map((station, stationIdx) => (
          <div
            className="group hover:cursor-pointer"
            onClick={() => props.onStationSelected(stationIdx) }
          >
            <img
              alt={station.name}
              loading="lazy"
              width={300}
              height={300}
              decoding="async"
              data-nimg={1}
              className="aspect-square w-full rounded-xl border border-neutral-50/20 object-cover transition-all hover:brightness-75"
              style={{ color: "transparent" }}
              src={`https://listen.eternityready.com/${station.logo}`}
            />
            <p className="mt-1 text-center text-xs font-medium text-white/70 transition-all group-hover:text-white">
              {station.name}
            </p>
          </div>
          ))}
        </div>
      }
    </>
  )
}

function LastPlayedExpand(props) {
  const { height, width } = useWindowDimensions();
  return (
    <>
    <h3 className="mb-2 text-lg xl:text-2xl font-bold xl: font-extrabold text-white">
      Last Played
    </h3>
    {(width != null && width < 1280)
      ? (
        <div
          className="scrollbar-hide flex w-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4"
        >
        {props.tracks?.map((track, index) => (
        <div className="w-[85vw] flex-none shrink-0 snap-center">
          <a
            className="builder-ignore group hidden items-center rounded-xl border p-1 transition-all hover:shadow-xl lg:flex lg:rounded-2xl lg:p-2 undefined border-neutral-800 bg-neutral-800 hover:border-neutral-600 hover:bg-neutral-700"
            href={track.trackViewUrl}
          >
            <div className="flex-shrink-0">
              <div className="overflow-clip rounded-lg lg:rounded-md aspect-square h-16 w-16 lg:h-24 lg:w-24">
                <img
                  alt={track?.trackName || "Last Played"}
                  loading="lazy"
                  width={1366}
                  height={768}
                  decoding="async"
                  data-nimg={1}
                  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                  style={{ color: "transparent" }}
                  src={track.artworkURL || track.artistImage}
                />
              </div>
            </div>
            <div className="flex flex-col px-2 lg:px-4">
              <h3 className="line-clamp-2 leading-tight font-bold lg:text-lg text-white builder-ignore">
                {track.trackName}
              </h3>
              <div className="mt-1 flex lg:mt-2">
                <p className="flex text-sm font-medium transition-all lg:hidden text-neutral-400">
                  {track.artistName}
                </p>
                <p className="hidden rounded-full px-3 py-1 text-xs font-bold transition-all lg:mt-0 lg:flex bg-neutral-700 text-white group-hover:bg-neutral-600">
                  {track.artistName}
                </p>
              </div>
            </div>
          </a>
          <a
            className="lg:hidden"
            href={track.trackViewUrl}
          >
            <div className="flex w-full flex-row items-center rounded-xl border border-neutral-800 bg-neutral-900 text-white">
              <div className="flex-shrink-0">
                <img
                  alt={track?.trackName || "Last Played"}
                  loading="lazy"
                  width={1366}
                  height={768}
                  decoding="async"
                  data-nimg={1}
                  className="aspect-square w-24 h-auto rounded-xl object-cover p-1"
                  style={{ color: "transparent" }}
                  src={track.artworkURL || track.artistImage}
                />
              </div>
              <div className="min-w-0 flex-1 space-y-1 px-2">
                <h3 className="line-clamp-2 text-sm leading-tight font-bold text-white builder-ignore">
                  {track.trackName}
                </h3>
                <p className="line-clamp-1 text-xs font-medium text-neutral-400">
                  {track.artistName}
                </p>
              </div>
            </div>
          </a>
        </div>
        ))}
        </div>
      )
      : (
      <div className="grid grid-cols-4 gap-4">
      {props.tracks?.map((track, index) => {
        if (index === 0) { return; }
        return (
          <a href={track.trackViewUrl} target="_blank">
            <div className="group hover:cursor-pointer">
              <img
                alt={track?.trackName || "Last Played"}
                loading="lazy"
                width={100}
                height={100}
                decoding="async"
                data-nimg={1}
                className="aspect-square w-full rounded-xl border border-neutral-50/20 object-cover transition-all hover:brightness-75"
                style={{ color: "transparent" }}
                src={track.artworkURL || track.artistImage}
              />
              <p className="mt-2 line-clamp-1 text-center text-sm font-bold text-white transition-all">
                {track.trackName}
              </p>
              <p className="line-clamp-1 text-center text-sm font-medium text-white/70 transition-all">
                {track.artistName}
              </p>
            </div>
          </a>
        )
      })}
    </div>
    )}
    </>
  )
}

function UpNext(props) {
  const [upNext, setUpNext] = useState(null)

  useEffect(() => {
    async function getNextSong() {
      const response = await fetch("https://azura.eternityready.com/api/nowplaying");
      const json = await response.json()
      setUpNext(json[0].playing_next.song)
    }

    if (props.station.name === "Eternity Ready Radio") {
      getNextSong()
    }
    else {
      setUpNext(null);
    }
  }, [props.station])

  return upNext && (
    <>
      <FaCaretLeft className="hidden xl:flex h-6 w-6 px-2 text-white/30"/>
      <div className="hidden my-1 xl:flex max-w-80 items-center">
        <img
          alt={upNext.text}
          loading="lazy"
          width="200"
          height="200"
          decoding="async"
          data-nimg="1"
          className="mr-2 h-10 w-10 rounded-xs object-cover opacity-60"
          src={upNext.art}
          style={{
            color: 'transparent'
          }}
        />
        <div>
          <p className="line-clamp-1 text-[0.625rem] font-bold tracking-wide text-white/40 uppercase">Up Next:</p>
          <p className="line-clamp-1 text-xs font-medium text-white/60">
            {`${upNext.artist} - ${upNext.title}`}
          </p>
        </div>
      </div>
    </>
  )
}

function OnAirAndRelatedContent(props) {
  if (!(props.loadingUpcomingTracks || props.upcomingTracks?.length) && !props.track?.relatedSongs) {
    return;
  }

  return (
    <>
    <h3
      className="mb-2 text-lg font-bold text-white"
    >
      {(props.loadingUpcomingTracks || props.upcomingTracks?.length) ? "On-Air &" : ""} {props.track?.relatedSongs ? "Related Content" : ""}
    </h3>
    <div className="scrollbar-hide flex w-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4">

      {(props.loadingUpcomingTracks || props.upcomingTracks?.length) && (
        <div className="w-full flex-none shrink-0 snap-center">
          <a
            className="group flex items-center rounded-full border p-2 transition-all hover:shadow-xl border-neutral-800 bg-neutral-800 hover:border-neutral-600 hover:bg-neutral-700"
            href={props.station?.donateLink}
          >
            <div className="relative aspect-square w-16 overflow-clip rounded-full lg:h-28 lg:w-28">
              <img
                alt={props.upcomingTracks?.[0]?.artistName}
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                className="absolute inset-0 z-10 h-full w-full object-cover"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  inset: 0,
                  color: "transparent"
                }}
                sizes="100vw"
                src={`https://listen.eternityready.com/${props.upcomingTracks?.[0]?.artworkURL}`}
              />
            </div>
            <div className="flex flex-1 flex-col px-4">
              <h3 className="line-clamp-1 leading-tight font-extrabold lg:line-clamp-2 lg:text-lg text-white">
                {props.upcomingTracks?.[0]?.artistName}
              </h3>
              <p className="mb-1 text-sm font-medium lg:mb-3 text-neutral-400">
                {props.upcomingTracks?.[0]?.dateScheduled
                  ? new Date(
                    props.upcomingTracks?.[0]?.dateScheduled?.replace(" ", "T") + "Z"
                  ).toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })
                  : "Invalid date"
                }
              </p>
              <div className="flex">
                <p className="rounded-full px-3 py-1 text-xs font-bold transition-all bg-neutral-700 text-white group-hover:bg-neutral-600">
                  {props.upcomingTracks?.[0]?.trackName}
                </p>
              </div>
            </div>
          </a>
        </div>
      )}
      {props.track?.relatedSongs?.slice(0, 3)?.map(relatedTrack => (
      <div className="w-full flex-none shrink-0 snap-center">
        <a
          className="builder-ignore group hidden items-center rounded-xl border p-1 transition-all hover:shadow-xl lg:flex lg:rounded-2xl lg:p-2 undefined border-neutral-800 bg-neutral-800 hover:border-neutral-600 hover:bg-neutral-700"
          href={relatedTrack?.trackViewUrl ?? relatedTrack.external_urls?.spotify}
        >
          <div className="flex-shrink-0">
            <div className="overflow-clip rounded-lg lg:rounded-md aspect-video h-16 w-28 lg:h-24 lg:w-40">
              <img
                alt={relatedTrack?.trackName ?? relatedTrack?.name}
                loading="lazy"
                width={1366}
                height={768}
                decoding="async"
                data-nimg={1}
                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                style={{ color: "transparent" }}
                src={relatedTrack?.artworkURL ?? relatedTrack?.artworkUrl100 ?? relatedTrack?.album.images[0].url}
              />
            </div>
          </div>
          <div className="flex flex-col px-2 lg:px-4">
            <h3 className="line-clamp-2 leading-tight font-bold lg:text-lg text-white builder-ignore">
              {relatedTrack?.trackName ?? relatedTrack?.name}
            </h3>
            <div className="mt-1 flex lg:mt-2">
              <p className="flex text-sm font-medium transition-all lg:hidden text-neutral-400">
                By {relatedTrack?.artistName ?? relatedTrack?.artists?.[0]?.name}
              </p>
              <p className="hidden rounded-full px-3 py-1 text-xs font-bold transition-all lg:mt-0 lg:flex bg-neutral-700 text-white group-hover:bg-neutral-600">
                By {relatedTrack?.artistName ?? relatedTrack?.artists?.[0]?.name}
              </p>
            </div>
          </div>
        </a>
        <a
          className="lg:hidden"
          href={relatedTrack?.trackViewUrl ?? relatedTrack.external_urls?.spotify}
        >
          <div className="flex w-full flex-row items-center rounded-xl border border-neutral-800 bg-neutral-900 text-white">
            <div className="flex-shrink-0">
              <img
                alt={relatedTrack?.trackName ?? relatedTrack?.name}
                loading="lazy"
                width={1366}
                height={768}
                decoding="async"
                data-nimg={1}
                className="aspect-video w-32 h-auto rounded-xl object-cover p-1"
                style={{ color: "transparent" }}
                src={relatedTrack?.artworkURL ?? relatedTrack?.artworkUrl100 ?? relatedTrack?.album.images[0].url}
              />
            </div>
            <div className="min-w-0 flex-1 space-y-1 px-2">
              <h3 className="line-clamp-2 text-sm leading-tight font-bold text-white builder-ignore">
                {relatedTrack?.trackName ?? relatedTrack?.name}
              </h3>
              <p className="line-clamp-1 text-xs font-medium text-neutral-400">
                By {relatedTrack?.artistName ?? relatedTrack?.artists?.[0]?.name}
              </p>
            </div>
          </div>
        </a>
      </div>
      ))}
    </div>
    </>
  )
}

function RadioPlayer(props) {
  const { station, setStation, currentPlaying, stationsList, tracks, loadingTracks, loadingUpcomingTracks, upcomingTracks } = useContext(StationContext);
  const { player, playerState, externalStation, setExternalStation, playerVolume, setPlayerIsLoaded, changeVolume, currentTrack } = 
    useContext(PlayerContext);

  const [expand, setExpand] = useState(false);
  const [expandStationFinder, setExpandStationFinder] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  const { height, width } = useWindowDimensions();

  let volume = {
    minVolume: 0,
    maxVolume: 1,
    step: 0.02,
    currentVolume: playerVolume,
    onVolume: (volumeValue) => {
      changeVolume(volumeValue)
    }
  }
  
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

  return (
    <div
      className="font-inter fixed right-0 bottom-16 xl:bottom-0 left-0 z-[100] flex-col border-t border-neutral-700 xl:flex"
    >
      {expandStationFinder && (
        <div className="relative overflow-y-auto z-1 flex flex-col items-center justify-center bg-black/80 backdrop-blur-3xl text-white p-8"
          style={{ height: 'calc(100vh - 4rem)' }}
        >
          <h1 className="text-3xl font-semibold mb-4">Stations</h1>
          <div className="w-[80vw] h-[80vh] border border-neutral-700 flex items-center justify-center rounded-xl">
            <LocationMap
              locations={stationsList
                .filter(stationInList => stationInList.gtm !== "")
                .map(stationInList => ({
                  ...stationInList,
                  lat: Number(stationInList.gtm.split(', ')[0]),
                  lng: Number(stationInList.gtm.split(', ')[1]),
                  ...JSON.parse(stationInList.analytics == ""
                    ? "{}"
                    : stationInList.analytics
                  ),
                }))}
            />
          </div>
        </div>
      )}

      {expand && (
        <>
          {(width != null && width >= 1280) &&
            <div className="fixed left-[5vw] z-[200]">
              <button
                className="group hover:z-[200] -mt-8 flex h-16 w-16 items-center justify-center rounded-full border border-neutral-700 bg-black/80 font-medium text-white transition-all hover:cursor-pointer hover:border-neutral-600 hover:bg-neutral-600"
                onClick={() => setExpand(false)}
              >
                <FaXmark className="text-white transition-all group-hover:text-xl" />
              </button>
            </div>
          }
        <div
          className="relative z-[100] w-full bg-black/80 backdrop-blur-3xl overflow-y-auto"
          style={{
            height: width != null && width >= 1280 ? "750px" : "100dvh",
            maxHeight: width != null && width >= 1280
              ? 'calc(100vh - 4rem)'
              : 'calc(100dvh - 8rem)'
          }}
        >
          <div className="mx-auto xl:max-w-[90vw]">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-20 p-4 xl:p-12">
              <AboutArtistExpand track={currentTrack} />
              <div className="col-span-1 space-y-4">
                { (width != null && width < 1280)
                  ? <OnAirAndRelatedContent 
                      track={currentTrack}
                      loadingUpcomingTracks={loadingUpcomingTracks}
                      upcomingTracks={upcomingTracks}
                      station={station}
                    />
                  : (
                    <>
                    <RelatedContentExpand track={currentTrack} />
                    <OnAirExpand
                      loadingUpcomingTracks={loadingUpcomingTracks}
                      upcomingTracks={upcomingTracks}
                      station={station}
                    />
                    </>
                  )
                }
              </div>
              <div className="col-span-1">
                <StationsExpand
                  stationsList={stationsList}
                  onStationSelected={async (stationIdx) => {
                    await player.switchEndpoint();
                    setStation(stationsList[stationIdx]);
                    setExternalStation(null);
                  }}
                />
                <LastPlayedExpand tracks={tracks} />
              </div>
            </div>
          </div>
        </div>
        </>
      )}
      <div
        className="flex h-20 w-full cursor-pointer justify-between border-t border-white/20 bg-black/90 px-3 py-1.5 shadow-lg backdrop-blur-3xl transition-all hover:bg-black/80"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setExpandStationFinder(false);
            setExpand(prevExpand => !prevExpand);
          }
        }}
      >
        <div className="flex items-center">
          <TrackPlaying track={currentTrack} />
          <UpNext station={station} />
        </div>
        <CentralControl
          onTogglePlayer={togglePlayer}
          playerState={playerState}
          onExpand={() => {
            setExpandStationFinder(false);
            setExpand(!expand)
          }}
          expand={expand}
        />
        <div className="hidden xl:flex flex-row gap-x-4 items-center">
          <VolumeControl volume={volume} />
          <StationSelector
            stations={stationsList.map(stationInList => stationInList.name)}
            stationToListen={stationsList.findIndex(
              stationInList => stationInList.name === station.name
            )}
            onStationSelected={async (stationIdx) => {
              await player.switchEndpoint();
              setStation(stationsList[stationIdx]);
              setExternalStation(null);
            }}
          />
          <StationFinder onClick={() => {
            setExpand(false);
            setExpandStationFinder(p => !p);
          }} />
        </div>
      </div>
    </div>
  )
}

const EternityRadioPlayer = forwardRef((props, ref) => {
  const [externalStation, setExternalStation] = useState(null)

  useImperativeHandle(ref, () => ({
    changeExternalStation: (station) => {
      setExternalStation(station)
    },
  }));

  return (
    <StationProvider>
      <PlayerProvider externalStation={externalStation} setExternalStation={setExternalStation}>
        <RadioPlayer />
      </PlayerProvider>
    </StationProvider>
  )
})

export default EternityRadioPlayer
