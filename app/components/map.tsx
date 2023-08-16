"use client";

import maplibregl, { GeoJSONSource } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import React, { useEffect, useRef } from "react";

interface MapProps {
  coordinateList?: maplibregl.LngLat[];
  addCoordinateFunc?: Function;
}

let map: maplibregl.Map;

const Map: React.FC<MapProps> = ({
  coordinateList = [],
  addCoordinateFunc = () => {
    alert("addCoordinateFunc is undefined");
  },
}) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const initialState = {
      lng: -0.118,
      lat: 51.509,
      zoom: 6,
    };

    map = new maplibregl.Map({
      container: "map-container",
      style: "https://tiles.stadiamaps.com/styles/alidade_smooth.json",
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });

    map.addControl(new maplibregl.NavigationControl());

    map.on("click", (e) => {
      addCoordinateFunc(e.lngLat);
    });
  }, [mapContainer.current]);

  useEffect(() => {
    if (coordinateList.length > 0) {

      var source = map.getSource('line') as GeoJSONSource;

      if (source === undefined) {
        var firstData = {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  coordinateList[0].toArray(),
                ]
              }
            }
          ]
        };
        map.addSource('line', { type: 'geojson', data: firstData });
        map.addLayer({
          'id': 'line',
          'type': 'line',
          'source': 'line',
          'paint': {
            'line-color': 'yellow',
            'line-opacity': 0.75,
            'line-width': 5
          }
        });
      } else {
        var updateData = {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "geometry": {
                "type": "LineString",
                "coordinates": 
                  coordinateList.map(c => c.toArray()),
                
              }
            }
          ]
        };

        map.removeLayer('line');
        map.removeSource('line');

        map.addSource('line', { type: 'geojson', data: updateData });
        map.addLayer({
          'id': 'line',
          'type': 'line',
          'source': 'line',
          'paint': {
            'line-color': 'yellow',
            'line-opacity': 0.75,
            'line-width': 5
          }
        });
      }






      console.log(coordinateList);
      console.log(coordinateList[coordinateList.length - 1]);
      const geojson = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: coordinateList[coordinateList.length - 1].toArray(),
            },
          },
        ],
      };

      map.addSource(`point ${coordinateList.length}`, {
        type: "geojson",
        data: geojson,
      });

      map.addLayer({
        id: `point ${coordinateList.length}`,
        type: "circle",
        source: `point ${coordinateList.length}`,
        paint: {
          "circle-radius": 10,
          "circle-color": "#3887be",
        },
      });
    }
  }, [coordinateList]);

  return (
    <div id="map-container" className="h-full w-full" ref={mapContainer}></div>
  );
};

export default Map;
