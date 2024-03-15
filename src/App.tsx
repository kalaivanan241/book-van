import { memo, useCallback, useState } from "react";
import "./App.css";
import CustomAutocomplete from "./components/LocationAutoCompleteField";
import {
  GoogleMap,
  Marker,
  Polyline,
  TrafficLayer,
} from "@react-google-maps/api";
import { useFetchPath } from "./hooks/usePath";
import { formatDistance, formatTime } from "./utils/formatUtils";

import { CiCircleMinus } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";

const CENTER = { lat: 22.31, lng: 114.15 };

function App() {
  const [pickUpLocation, setPickUpLocation] = useState<string>();
  const [dropLocation, setDropLocation] = useState<string>();

  const { error, isLoading, result, handleLocationSearch, reset } =
    useFetchPath();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!pickUpLocation || !dropLocation) return;
      handleLocationSearch(pickUpLocation, dropLocation);
    },
    [pickUpLocation, dropLocation, handleLocationSearch]
  );

  const handleReset = () => {
    setPickUpLocation("");
    setDropLocation("");
    reset();
  };

  return (
    <div className="px-5 md:px md:pl-10 mx-auto grid grid-rows-2 md:grid-rows-1 md:grid-cols-3 min-h-lvh gap-4">
      <div className="col-span-1">
        <header className="text-3xl my-6">BookVan</header>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <CustomAutocomplete
            name="pickUp"
            label="Pick Up"
            onPlaceChanged={(l) => setPickUpLocation(l)}
            icon={CiCircleMinus}
          />
          <CustomAutocomplete
            name="drop"
            label="Drop"
            onPlaceChanged={(l) => setDropLocation(l)}
            icon={CiLocationOn}
          />
          <div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-blue-200"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
            <button
              type="reset"
              onClick={handleReset}
              className="my-4 sm:mx-4 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              Reset
            </button>
          </div>
          <p className="text-red-600 min-h-7">{error}</p>
          {result && (
            <div>
              <b>Distance:</b> {formatDistance(result.distance)} <br />
              <b>Time:</b> {formatTime(result.time)}
            </div>
          )}
        </form>
      </div>
      <div className="col-span-1 md:col-span-2">
        <GoogleMap
          center={result?.path?.[0] ?? CENTER}
          zoom={12}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          <TrafficLayer />
          {result &&
            result.path.map((coord, index) => (
              <Marker
                key={index}
                visible
                position={{ lat: coord.lat, lng: coord.lng }}
                label={{ text: String.fromCharCode(65 + index) }}
                icon={{
                  url: "https://loc8tor.co.uk/wp-content/uploads/2015/08/stencil.png",
                  scaledSize: new window.google.maps.Size(64, 64),
                }}
              />
            ))}
          {result && (
            <Polyline
              path={result.path}
              options={{
                strokeColor: "#FF0000",
                strokeOpacity: 1,
                strokeWeight: 10,
              }}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

export default memo(App);
