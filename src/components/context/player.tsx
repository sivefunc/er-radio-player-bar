import React, { useContext, useEffect, useState } from "react";
import {StationContext} from "./station";
import IcecastMetadataStats from "icecast-metadata-stats";

function getTrack(trackList, streamTitle) {
    const [artistName = "", trackName = streamTitle] = streamTitle.split(" - ");
    if (trackList.length === 0) {
        return null;
    }

    if (artistName) {
        const result = trackList.find(
          track =>
            typeof track?.artistName === "string" &&
            typeof track?.trackName === "string" &&
            track.artistName.toLowerCase() === artistName.toLowerCase() &&
            track.trackName.toLowerCase().includes(trackName.toLowerCase())
        );
        if (result) {
            return result;
        }
        return null;
    }
    return trackList[0];
}


function processSongInfo(input) {
    let result = input.trim();

    // 1. Remove year and parentheses around it
    result = result.replace(/\(\d{4}\)/g, "").trim();

    // 2. Process input that starts with a number and then a dash
    if (/^\d+\.\s?-\s?\S+-\S+/.test(result)) {
        result = result.replace(
            /^(\d+\.)\s?-?\s?(\S+-\S+)-(.+)$/,
            (match, num, artist, track) => {
                const artistName = artist.replace(/-/g, " ");
                const trackName = track.replace(/-/g, " ");
                return `${artistName} - ${trackName}`;
            }
        );
    }

    // 3. Replace '/' with a space
    result = result.replace(/\s?\/\s?/g, " ");

    result = result.replace(/\s?&\s?/g, " ");
    // 4. If there are two hyphens, convert the first hyphen to a space
    if (/ - .+ - /.test(result)) {
        result = result.replace(
            /^(.+?) - (.+?) - (.+)$/,
            (match, artist1, artist2, track) => {
                return `${artist1} ${artist2} - ${track}`;
            }
        );
    }

    return result.trim();
}

const DEFAULT_TRACK = {
    stationId: null,
    trackId: null,
    artistId: null,
    StreamTitle: "",
    trackName: "",
    artistName: "",
    artworkURL: null,
    artistImage: null,
    trackViewUrl: "#",
    loaded: false,
    processed: false,
    metaDataFound: false,
};

// Create a context for Player authentication and session information
export const PlayerContext = React.createContext();

// Player provider component to manage Player authentication and session
export const PlayerProvider = (props) => {
    const { station, currentPlaying, addTrack, } = useContext(StationContext);
    const [player, setPlayer] = useState({
        play: () => {},
        stop: () => {},
        setVolume: () => {},
        switchEndpoint: () => {},
    });
    const [playerInitialized, setPlayerInitialized] = useState(false);
    const [playerIsLoaded, setPlayerIsLoaded] = useState(false);
    const [playerState, setPlayerState] = useState("stopped");
    const [playerVolume, setPlayerVolume] = useState(1);
    const [currentTrack, setCurrentTrack] = useState(DEFAULT_TRACK);
    const [initalTrackLoaded, setInitalTrackLoaded] = useState(false);
    const [icecastState, setIcecastState] = useState(null);
    const [icecastPlayer, setIcecastPlayer] = useState(null);
    const changeVolume = (volume) => {
        setPlayerVolume(volume);
        player.setVolume(volume);
    };
    
    const [externalMetadata, setExternalMetadata] = useState(null);

// Initialize player with current playing track
    useEffect(() => {
        if (!initalTrackLoaded) {
            const defaultTrackData = {
                ...DEFAULT_TRACK,
                loaded: true,
                processed: false,
            };
            const updatedTrack = currentPlaying.title ? {
                ...defaultTrackData,
                StreamTitle: currentPlaying.title,
                stationId: currentPlaying.stationId,
                artworkURL: currentPlaying.artworkURL || station?.thumbnail,
                trackName: currentPlaying.trackName,
                artistName: currentPlaying.artistName,
                artistImage: currentPlaying.artistImage || station?.thumbnail,
                metaDataFound: true,
            } : station ? {
                ...defaultTrackData,
                trackName: station.metaPreset,
                artworkURL: station.thumbnail,
                artistImage: station.thumbnail,
                metaDataFound: false,
            } : currentTrack;

            setInitalTrackLoaded(true);
            setCurrentTrack(updatedTrack);
        }
    }, [currentPlaying, initalTrackLoaded, station]);

// Initialize Icecast player
    useEffect(() => {
    let playerListener;

    const initializePlayer = async () => {
      if (!station && !props?.externalStation) return;

      // stop previous player before creating a new one
      if (icecastPlayer) {
        try {
          await icecastPlayer.stop();
          await icecastPlayer.detachAudioElement();
        } catch (error) {
          console.error("error stopping old player:", error);
        }
      }

      const { default: IcecastMetadataPlayer } = await import("icecast-metadata-player");

      const options = {
        lastPlayedMetadata: true,
        metadataTypes: ["icy", "ogg"],
        onMetadata: (metadata) => {
          setCurrentTrack((prevState) => {
            if (metadata.StreamTitle === prevState.StreamTitle) return prevState;
            return {
              ...DEFAULT_TRACK,
              StreamTitle: metadata.StreamTitle,
              stationId: station.id,
              artworkURL: station.thumbnail,
            };
          });
        },
        onError: (error) => console.error("error", error),
      };

      playerListener = new IcecastMetadataPlayer(
          props?.externalStation ? (
              props.externalStation.src.replace("https://", "https://listen.eternityready.com/stream-proxy/")
          ) : station.url,
          options
      );
      setIcecastPlayer(playerListener);
      setPlayerInitialized(true);

      setPlayer({
        play: async () => {
          setPlayerState("loading");
          await playerListener.play();
          playerListener.audioElement.volume = playerVolume;
          setPlayerState("playing");
        },
        stop: async () => {
          await playerListener.stop();
          setPlayerState("stopped");
        },
        setVolume: (volume) => {
          playerListener.audioElement.volume = volume;
        },
        switchEndpoint: async () => {
          await playerListener.stop();
          await playerListener.detachAudioElement();
          setPlayerInitialized(false);
          setPlayerIsLoaded(true);
          setPlayerState("stopped");
        },
      });

      if (playerIsLoaded) {
        setPlayerState("loading");
        await playerListener.play();
        playerListener.audioElement.volume = playerVolume;
        setPlayerState("playing");
      }
    };

    initializePlayer();

    // cleanup on station change or unmount
    return () => {
      if (playerListener) {
        playerListener.stop();
        playerListener.detachAudioElement();
      }
    };
  }, [station, props.externalStation]);
// Update player volume
    useEffect(() => {
        if (icecastPlayer) {
            player.setVolume(playerVolume);
        }
    }, [playerVolume]);

// Fetch additional metadata for the current track
    useEffect(() => {
        if (currentTrack.stationId !== null && !currentTrack.loaded) {
            async function fetchMetadata() {
                await getAdditionalMetadata(currentTrack);
            }
            fetchMetadata();
        }
    }, [currentTrack]);

// Add current track to the track list
    useEffect(() => {
        if (currentTrack.processed) {
            addTrack(currentTrack);
        }
    }, [currentTrack]);

// Fetch Icecast stats
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const statsListener = new IcecastMetadataStats(station.url, {
                    onStats: async (stats) => {
                        if (stats?.icy?.StreamTitle) {
                            setCurrentTrack((prevState) => {
                                if (stats.icy.StreamTitle === prevState.StreamTitle || (prevState.stationId === station.id && prevState.stationId !== null)) {
                                    return prevState;
                                }
                                return {
                                    ...DEFAULT_TRACK,
                                    StreamTitle: stats.icy.StreamTitle,
                                    stationId: station.id,
                                    artworkURL: station.thumbnail,
                                };
                            });
                        }
                    },
                    onError: (error) => {
                        console.error("Error fetching stats:", error);
                    },
                    interval: 5,
                    sources: ["icy", "ogg"],
                });
                setIcecastState(statsListener);
                statsListener.start();
            } catch (error) {
                console.error("Error fetching stations:", error);
            }
        };

        if (station && playerState !== "playing") {
            fetchStats();
        }
        return () => {
            icecastState && icecastState.stop();
        };
    }, [station, playerState]);

// Fetch tracks from the station
    const fetchTracks = async () => {
        if (!station) {
            return null;
        }
        try {
            const response = await fetch(`https://listen.eternityready.com/api/station/${station.id}/tracks?v=` + new Date().getTime().toString());
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch tracks");
            }
            return (data && data.currentPlaying) && data.currentPlaying;
        } catch (error) {
            console.error("Error fetching tracks:", error);
        }
        return null;
    };

// Fetch Spotify access token
    const getSpotifyAccessToken = async () => {
        const clientId = process.env.SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
        console.log('idadasdasd', process, clientId, clientSecret);
        const tokenURL = "https://accounts.spotify.com/api/token";

        const response = await fetch(tokenURL, {
            method: "POST", headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            }, body: "grant_type=client_credentials",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch Spotify token");
        }

        const data = await response.json();
        return data.access_token;
    };

// Fetch additional metadata for the track
    const getAdditionalMetadata = async (track) => {
        setCurrentTrack((prevState) => ({
            ...prevState,
            loaded: true,
        }));
        if (!track.StreamTitle) return;
        const [artistName, trackName] = track.StreamTitle.split(" - ");
        let trackData = {
            artistId: null,
            trackId: null,
            trackName: trackName || track.StreamTitle,
            artistName: artistName || "",
            artistImage: station?.thumbnail,
        };
        let relatedSongs = null;
        let aboutDescription = null;

        console.log('hello');
        if (track.StreamTitle.trim().toLowerCase() !== "unknown") {
            /*
            const trackDataSpotify = await getSpotifyData(track);
            const ArtistImageSpotify = await getArtistImageFromSpotify(trackDataSpotify);
             */
            const trackDataSpotify = null;
            const ArtistImageSpotify = null;

            if (trackDataSpotify && ArtistImageSpotify) {
                trackData = {
                    ...trackDataSpotify,
                    artworkURL: trackDataSpotify.artworkUrl100?.replace("100x100", "600x600") || trackDataSpotify.artworkUrl100,
                    artistImage: ArtistImageSpotify || station?.thumbnail,
                };
            } else {

                const trackDataApple = await getAppleData(track);
                const ArtistImageApple = await getArtistImageFromApple(trackDataApple?.artistViewUrl);
                if (trackDataApple) {
                    trackData = {
                        ...trackDataApple,
                        artworkURL: trackDataApple.artworkUrl100?.replace("100x100", "600x600") || station?.thumbnail,
                        artistImage: ArtistImageApple || station?.thumbnail,
                    };
                    try {
                        relatedSongs = await getRelatedSongs(trackData.artistId, trackData.trackName);
                        aboutDescription = await getAboutDescription(trackData.artistName, trackData.trackName);
                        console.log(aboutDescription);
                    } catch (error) {
                        console.error(error)
                    }
                }
            }
        }
        setCurrentTrack((prevState) => ({
            ...prevState,
            ...trackData,
            metaDataFound: true,
            processed: true,
            relatedSongs: relatedSongs,
            aboutDescription: aboutDescription,
        }));
    };

    const getNewArtistImage = async (trackData) => {
        if (!trackData?.artistViewUrl) {
            return null;
        }
        try {
            const response = await fetch("https://listen.eternityready.com/api/artist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    artistId: trackData.artistId,
                    url: trackData.artistViewUrl,
                }),
            });
            const data = await response.json();
            return (response.ok) && data.artistImage;
        } catch (error) {
            console.error("There was a problem fetching the data:", error);
        }
        return null;
    }

    const getAppleData = async (track) => {
        try {
            const processText = processSongInfo(track.StreamTitle);
            const encodedSearchText = encodeURIComponent(processText);
            const iTunesSearchURL = `https://itunes.apple.com/search?term=${encodedSearchText}&media=music&entity=song&limit=10`;
            const response = await fetch(iTunesSearchURL);
            const json = await response.json();
            return (json.results) && getTrack(json.results, processText);
        } catch (error) {
            console.log("There was a problem fetching the data:", error);
        }
        console.log("getAppleData - null");
        return null;
    }

    const getArtistImageFromApple = async (artistViewUrl) => {
        if (!artistViewUrl) {
            return null;
        }
        try {
            const response = await fetch(
              artistViewUrl
            );
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(
              html,
              "text/html"
            );
            const artistImageElement = doc.querySelector(
              "main picture source"
            );
            return (artistImageElement) && artistImageElement
              .getAttribute("srcset")
              .split(" ")[0]
              .replace(
                /\d{1,4}x\d{1,4}/,
                "1280x1280"
              );
        } catch (error) {
            console.log("There was a problem fetching the data:", error);
        }
        console.log("getArtistImageFromApple - null");
        return null;
    }

    const getSpotifyData = async (track) => {
        try {
            const accessToken = await getSpotifyAccessToken();
            const metaArray = track.StreamTitle.split(" - ");
            const searchText = metaArray[1]?.trim().toLowerCase() === "unknown" ? "" : `track:${metaArray[1]}`;
            const b1 = metaArray[0].trim().toLowerCase() === "unknown" ? "" : `artist:${metaArray[0]}`;
            const processText = processSongInfo(`${searchText} ${b1}`);
            const encodedSearchText = encodeURIComponent(processText);
            const spotifySearchURL = `https://api.spotify.com/v1/search?q=${encodedSearchText}&type=track&limit=10`;
            const response = await fetch(spotifySearchURL, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const json = await response.json();
            const spotifyTracks = json.tracks.items.map((item) => ({
                artistId: item.artists[0]?.id || null,
                artistName: item.artists[0]?.name || null,
                artistImage: item.artists[0]?.images?.[0]?.url || station?.thumbnail,
                artistViewUrl: item.artists[0]?.external_urls?.spotify || null,
                artworkUrl30: item.album.images[2]?.url || null,
                artworkUrl60: item.album.images[1]?.url || null,
                artworkUrl100: item.album.images[0]?.url || null,
                collectionExplicitness: item.explicit ? "explicit" : "notExplicit",
                collectionId: item.album.id || null,
                collectionName: item.album.name || null,
                collectionViewUrl: item.album.external_urls?.spotify || null,
                discNumber: item.disc_number || 1,
                isStreamable: true,
                kind: "song",
                previewUrl: item.preview_url || null,
                releaseDate: item.album.release_date || null,
                trackCensoredName: item.name || null,
                trackCount: item.album.total_tracks || 1,
                trackExplicitness: item.explicit ? "explicit" : "notExplicit",
                trackId: item.id || null,
                trackName: item.name || null,
                trackNumber: item.track_number || null,
                trackTimeMillis: item.duration_ms || null,
                trackViewUrl: item.external_urls?.spotify || null,
                wrapperType: "track",
            }));
            const trackData = getTrack(spotifyTracks, processText) || spotifyTracks[0] || null;
            return (trackData) && trackData;
        } catch (error) {
            console.log("There was a problem fetching the data:", error);
        }
        console.log("getSpotifyData - null");
        return null;
    }

    const getArtistImageFromSpotify = async (trackData) => {
        if (!trackData?.artistId) {
            return null
        }
        try {
            const accessToken = await getSpotifyAccessToken();
            const response = await fetch(
              `https://api.spotify.com/v1/artists/${trackData.artistId}`, {
                  headers: {
                      Authorization: `Bearer ${accessToken}`,
                  },
              });
            const data = await response.json();
            return (data.images.length > 0) && data.images[0].url.replace(/\d{1,4}x\d{1,4}/, "1280x1280");
        } catch (error) {
            console.log("There was a problem fetching the data:", error);
        }
        console.log("getArtistImageFromSpotify - null");
        return null;
    }

    async function getRelatedSongs(artistId, trackName, limit = 10) {
      const url = `https://itunes.apple.com/lookup?id=${artistId}&entity=song&limit=${limit}`;
      const response = await fetch(url);
      const data = await response.json();
      return data.results.filter(item => item.wrapperType === 'track' && item?.trackName != trackName);
    }

    

    
    async function getAboutDescription(artistName, songTitle) {
      const query = `recording:"${songTitle}" AND artist:"${artistName}"`;
      const searchUrl = `https://musicbrainz.org/ws/2/recording/?query=${encodeURIComponent(query)}&fmt=json&limit=1`;

      // Step 1: Search recording
      const searchResponse = await fetch(searchUrl);
      if (!searchResponse.ok) throw new Error(`MusicBrainz recording search failed: ${searchResponse.status}`);
      const searchData = await searchResponse.json();
      if (!searchData.recordings || searchData.recordings.length === 0) return null;

      const recording = searchData.recordings[0];
      const artistMBID = recording['artist-credit'][0].artist.id;

      // Step 2: Fetch artist URL relations
      const artistUrl = `https://musicbrainz.org/ws/2/artist/${artistMBID}?inc=url-rels&fmt=json`;
      const artistResponse = await fetch(artistUrl);
      if (!artistResponse.ok) throw new Error(`MusicBrainz artist lookup failed: ${artistResponse.status}`);
      const artistData = await artistResponse.json();

      const relations = artistData.relations || [];
      let wikiUrl = (relations.find(rel => rel.type === 'wikipedia') || {}).url?.resource || null;
      const wikidataRel = relations.find(rel => rel.type === 'wikidata');

      // If no Wikipedia link, try to get it from Wikidata
      if (!wikiUrl && wikidataRel) {
        const wikidataId = wikidataRel.url.resource.split('/').pop();
        const wdResponse = await fetch(`https://www.wikidata.org/wiki/Special:EntityData/${wikidataId}.json`);
        if (wdResponse.ok) {
          const wdData = await wdResponse.json();
          const entity = wdData.entities[wikidataId];
          const sitelinks = entity?.sitelinks || {};
          const enwiki = sitelinks.enwiki;
          if (enwiki) wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(enwiki.title)}`;
        }
      }

      if (!wikiUrl) return null;

      // Step 3: Fetch Wikipedia summary
      const pageTitle = wikiUrl.match(/\/wiki\/(.+)$/)?.[1];
      if (!pageTitle) return null;

      const wikiApiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${pageTitle}`;
      const wikiResponse = await fetch(wikiApiUrl);
      if (!wikiResponse.ok) throw new Error(`Wikipedia API fetch failed: ${wikiResponse.status}`);

      const wikiData = await wikiResponse.json();
      return wikiData.extract || null;
    }

    return (
        <PlayerContext.Provider
            value={{
                player,
                playerState,
                playerVolume,
                setPlayerIsLoaded,
                changeVolume,
                currentTrack,
                externalStation: props.externalStation,
                setExternalStation: props.setExternalStation,
            }}
        >
            {props.children}
        </PlayerContext.Provider>
    );
};
