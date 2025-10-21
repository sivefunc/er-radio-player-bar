import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconSize: [20, 30],
  iconAnchor: [5, 30],
  popupAnchor: [1, -30],
});

function FitBounds({ locations }) {
  const map = useMap();

  React.useEffect(() => {
    if (locations.length === 0) return;
    const bounds = L.latLngBounds(locations.map(({ lat, lng }) => [lat, lng]));
    map.fitBounds(bounds, { padding: [50, 50] })
  }, [locations, map]);

  return null;
}

const LocationMap = ({ locations }) => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <MapContainer
        center={locations.length ? [locations[0].lat, locations[0].lng] : [0, 0]}
        scrollWheelZoom={false}
        className="h-full w-full rounded-xl"
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map(({ lat, lng, name, thumbnail, stationUrl}, idx) => (
          <Marker key={idx} position={[lat, lng]} icon={redIcon}>
            <Popup>
              <div className="p-2 rounded min-w-48 flex justify-center items-center flex-col">
                <h3 className="text-lg font-bold">{name}</h3>
                <img
                  src={`https://listen.eternityready.com/${thumbnail}`}
                  className="w-full h-32"
                />
              </div>
            </Popup>
          </Marker>
        ))}
        <FitBounds locations={locations} />
      </MapContainer>
    </div>
  );
};

export default LocationMap;
