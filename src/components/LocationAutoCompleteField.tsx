import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { IconType } from "react-icons";

const CustomAutocomplete = (props: {
  label: string;
  name: string;
  onPlaceChanged: (name?: string) => void;
  placeHolder?: string;
  styles?: React.CSSProperties;
  icon: IconType;
}) => {
  const { onPlaceChanged, placeHolder, styles, label, name, icon } = props;

  const [autoComplete, setAutoComplete] =
    useState<google.maps.places.Autocomplete>();

  const handlePlaceChange = (place?: google.maps.places.PlaceResult) => {
    if (place?.formatted_address || place?.name)
      onPlaceChanged(place?.name ?? "");
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {label}
      </label>

      <div className="flex w-full justify-between items-start gap-2">
        <div>{icon({ className: "h-[30px]" })}</div>
        <Autocomplete
          onLoad={(autoComplete) => setAutoComplete(autoComplete)}
          onPlaceChanged={() => {
            const place = autoComplete?.getPlace();
            handlePlaceChange(place);
          }}
          fields={["icon", "name", "formatted_address"]}
          className="w-full relative flex-1 flex items-center justify-between"
        >
          <input
            type="text"
            id={name}
            name={name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 flex-1 w-full"
            placeholder={placeHolder}
            style={styles}
            required
          />
        </Autocomplete>
      </div>
    </div>
  );
};

export default React.memo(CustomAutocomplete);
