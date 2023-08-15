'use client'

import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import React, { useEffect, useRef } from 'react';

const Map: React.FunctionComponent<any> = ({
    _mapIsReadyCallback /* To be triggered when a map object is created */,
  }) => {
    const mapContainer = useRef(null);
  
    useEffect(() => {
  
      const initialState = {
        lng: -0.118,
        lat: 51.509,
        zoom: 6,
      };
  
      const map = new maplibregl.Map({
        container:'map-container',
        style: 'https://tiles.stadiamaps.com/styles/alidade_smooth.json',
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom,
      });

      map.addControl(new maplibregl.NavigationControl());
  
    //   mapIsReadyCallback(map);


      
    }, [mapContainer.current]);
  
    return <div id="map-container" className="h-full w-full" ref={mapContainer}></div>;
  };
  
  export default Map;
  