"use client";

import React, { useEffect, useState } from "react";

import Map from "./components/map";
import Button from "./components/button";

export default function Home() {
  const [coordinateList, setCoordinateList] = useState<maplibregl.LngLat[]>([]);
  const [coordinateListText, setCoordinateListText] = useState<string>();

  useEffect(() => {
    setCoordinateListText(
      coordinateList
        .map((coordList) =>
          coordList
            .wrap()
            .toArray()
            .map((coord) => coord.toFixed(6))
        )
        .join("\n")
    );
  }, [coordinateList]);

  return (
    <main className="flex min-h-screen flex-row items-stretch justify-between">
      <div className="flex w-full bg-green-50">
        <Map
          addCoordinateFunc={(e: maplibregl.LngLat) =>
            setCoordinateList((prev) => prev.concat([e]))
          }
          coordinateList={coordinateList}
        />
      </div>
      <div className="flex flex-col justify-between w-64 bg-gray-50 p-4 gap-4 m-4 rounded-md shadow-sm ">
        {/* <div>Radio Buttono</div> */}
        <div className="flex-grow">
          <textarea
            value={coordinateListText}
            readOnly
            className="w-full h-full p-1 resize-none text-sm border-none outline-none shadow-sm rounded-md"
          ></textarea>
        </div>
        <div>
          <Button
            variant="primary"
            onClick={() => console.log("Primary button clicked")}
          >
            GitHub
          </Button>
        </div>
      </div>
    </main>
  );
}
