import React, { createRef } from 'react';
import ReactDOM from 'react-dom/client';
import EternityRadioPlayer from './components/RadioPlayer';

export { EternityRadioPlayer };

let eternityRadioRef = null;

export async function EternityRadioPlayerMounter(elementId, outputCSS) {
  const container = document.getElementById(elementId);

  if (!container.shadowRoot) {
    container.attachShadow({ mode: 'open' });
  }
  const shadowRoot = container.shadowRoot;

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
