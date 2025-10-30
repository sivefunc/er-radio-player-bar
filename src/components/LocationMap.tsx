import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const LocationMap = ({ locations, onClose }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

  maptilersdk.config.apiKey = process.env.MAP_KEY;

  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: "019a1736-e944-74a8-83cb-629deaf97cb8",
      zoom: 12,
      navigationControl: false,
      geolocateControl: false,
    });

    map.current.addControl(
      new maptilersdk.MaptilerNavigationControl(),
      "top-right"
    );

    map.current.addControl(
      new maptilersdk.MaptilerGeolocateControl(),
      "top-right"
    );

    const group = document.createElement("div");
    group.className = "maplibregl-ctrl maplibregl-ctrl-group";

    const element = document.createElement("button");

    element.className = "maplibregl-ctrl-button text-black hover:text-blue-500";
    element.title = "Close map";
    element.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" 
           viewBox="0 0 24 24" 
           width="24" 
           height="24" 
           fill="none" 
           stroke="currentColor" 
           stroke-width="2" 
           stroke-linecap="round" 
           stroke-linejoin="round" 
           aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    `;
    element.style.display = "flex";
    element.style.justifyContent = "center";
    element.style.alignItems = "center";
    element.style.padding = "0";
    element.addEventListener("click", onClose)

    group.appendChild(element);

    map.current.addControl(
      new maptilersdk.MaptilerCustomControl(
        group,
      ),
      "top-right"
    );

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

    map.current.setCenter([-98.583333, 39.833333]);
    map.current.setZoom(2.5);

  }, [locations]);

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default LocationMap;
