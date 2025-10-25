import React from 'react';
import ReactDOM from 'react-dom/client';
import EternityRadioPlayer from './components/RadioPlayer';

export { EternityRadioPlayer };

let eternityRadioRef = null;

export async function EternityRadioPlayerMounter(elementId, outputCSS, mapCSS) {
  const container = document.getElementById(elementId);

  if (!container.shadowRoot) {
    container.attachShadow({ mode: 'open' });
  }
  const shadowRoot = container.shadowRoot;

  // Inject Tailwind CSS
  try {
    const res = await fetch(outputCSS);
    const cssText = await res.text();

    let styleTag = shadowRoot.querySelector('style[data-shadow-tailwind]');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.setAttribute('data-shadow-tailwind', '');
      shadowRoot.appendChild(styleTag);
    }
    styleTag.textContent = cssText;
  } catch (error) {
    console.error('Failed to load Tailwind CSS into Shadow DOM:', error);
  }

  // Inject Leaflet CSS
  try {
    const leafletCSSUrl = 'dist/react-radio-player.css';
    const resLeaflet = await fetch(mapCSS);
    const leafletCSSText = await resLeaflet.text();

    let leafletStyleTag = shadowRoot.querySelector('style[data-shadow-leaflet]');
    if (!leafletStyleTag) {
      leafletStyleTag = document.createElement('style');
      leafletStyleTag.setAttribute('data-shadow-leaflet', '');
      shadowRoot.appendChild(leafletStyleTag);
    }
    leafletStyleTag.textContent = leafletCSSText;
  } catch (error) {
    console.error('Failed to load Leaflet CSS into Shadow DOM:', error);
  }

  // Create or select React root container inside shadow root
  let reactRootContainer = shadowRoot.querySelector('#react-root');
  if (!reactRootContainer) {
    reactRootContainer = document.createElement('div');
    reactRootContainer.id = 'react-root';
    shadowRoot.appendChild(reactRootContainer);
  }

  eternityRadioRef = React.createRef();

  ReactDOM.createRoot(reactRootContainer).render(
    <EternityRadioPlayer ref={eternityRadioRef} />
  );
}

export function getEternityRadioPlayerRef() {
  return eternityRadioRef;
}
