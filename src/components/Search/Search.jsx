import React from 'react';
import greenMarker from '../Map/logos/marker-green.png';
import redMarker from '../Map/logos/marker-red.png';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';

const Search = ({
  panTo,
  setCordinate1,
  setCordinate2,
  type,
  onPositionSelect,
  onFinishSelect,
  clearOldPoint,
  setOrigin,
  setDestination,
  setLimit,
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.65324, lng: () => -79.3832 },
      radius: 200 * 1000,
    },
  });

  return (
    <div className="search">
      <Combobox
        style={{ zIndex: 2 }}
        onSelect={async (address) => {
          setOrigin('');
          setDestination('');
          setLimit(0);
          setValue(address, false);
          clearSuggestions();
          try {
            const result = await getGeocode({ address });
            const { lat, lng } = await getLatLng(result[0]);
            if (type === 'startPoint') {
              clearOldPoint('start');
              setCordinate1({ x: lat, y: lng });
              onPositionSelect(lat, lng, greenMarker, 'start');
            } else {
              clearOldPoint('finish');
              setCordinate2({ x: lat, y: lng });
              onFinishSelect(lat, lng, redMarker, 'finish');
            }
            panTo({ lat, lng });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <ComboboxInput
          style={{ zIndex: 2 }}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Enter an Adress"
        />
        <ComboboxPopover style={{ zIndex: 2 }}>
          <ComboboxList style={{ zIndex: 2 }}>
            {status === 'OK' &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default Search;
