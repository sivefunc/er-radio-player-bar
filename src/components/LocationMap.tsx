import React, { useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const LocationMap = ({ locations }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

  maptilersdk.config.apiKey = process.env.MAP_KEY

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

    locations.forEach(({ lat, lng, name }) => {
      const marker = new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat([lng, lat])
        .addTo(map.current);

      marker.getElement().addEventListener("click", () => {
        new maptilersdk.Popup()
          .setLngLat([lng, lat])
          .setHTML(`<strong>${name}</strong>`)
          .addTo(map.current);
      });

      markers.current.push(marker);
      bounds.extend([lng, lat]);
    });

    map.current.fitBounds(bounds, { padding: 50 });
  }, [locations]);

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default LocationMap;
