
import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom/client"; // Use the modern API
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const LocationMap = ({ locations }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

  maptilersdk.config.apiKey = process.env.MAP_KEY;

  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: "019a1736-e944-74a8-83cb-629deaf97cb8",
      center: locations.length ? [locations[0].lng, locations[0].lat] : [0, 0],
      zoom: 12,
    });
  }, [locations]);

  useEffect(() => {
    if (!map.current) return;

    markers.current.forEach((marker) => marker.remove());
    markers.current = [];

    if (locations.length === 0) return;

    const bounds = new maptilersdk.LngLatBounds();
    let hasValidLocation = false;
    locations.forEach(({ lat, lng, name, address, homepage, telephone, email, thumbnail }) => {

      if (lat == null || lat == "" || lng == null || lng == "") {
        return;
      }
      hasValidLocation = true;

      const marker = new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat([lng, lat])
        .addTo(map.current);

      const popupNode = document.createElement("div");

      const root = ReactDOM.createRoot(popupNode);
      root.render(
        <div className="flex justify-center items-center gap-1 h-32">
          <img
            className="w-20 h-20 rounded-full"
            src={`https://listen.eternityready.com/${thumbnail}`}
          />
          <div className="bg-gray-500 w-px h-full"></div>
          <div className="flex flex-col">
            <h1 className="text-black font-bold text-lg">{name}</h1>
            <h2 className="text-gray-500">{address}</h2>
            <a href={homepage} className="text-red-500">{homepage}</a>
            <a href={`tel:${telephone}`} className="text-red-500">{telephone}</a>
            <a href={`mailto:${email}`} className="text-red-500">{email}</a>
          </div>
        </div>
      );

      const popup = new maptilersdk.Popup({maxWidth: 'none'}).setDOMContent(popupNode);
      marker.setPopup(popup);

      markers.current.push(marker);
      bounds.extend([lng, lat]);
    });

    if (hasValidLocation) {
      map.current.fitBounds(bounds, { padding: 50 });
    }

  }, [locations]);

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default LocationMap;
