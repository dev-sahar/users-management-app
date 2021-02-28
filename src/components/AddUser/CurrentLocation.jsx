import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import { fetchLocation } from '../../axios/axios';

const CurrentLocation = (props) => {
  const mapStyles = {
    height: '100vh',
    width: '100%',
    marginBottom: '20px',
  };

  const [currentPosition, setCurrentPosition] = useState({});

  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  });

  useEffect(() => {
    const fetchedLocation = async () => {
      if (props.country) {
        const location = await fetchLocation(props.country);
        setCurrentPosition({ lat: location[0], lng: location[1] });

        props.getLocationInfo({ lat: location[0], lng: location[1] });
      }
    };
    fetchedLocation();
  }, [props.country]);

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng });
    props.getLocationInfo({ lat, lng });
  };

  return (
    <LoadScript googleMapsApiKey='AIzaSyA0AVQU3qw095LyEOg0kxFEh8P_tHVThbI'>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={currentPosition}
      >
        {currentPosition.lat ? (
          <Marker
            position={currentPosition}
            onDragEnd={(e) => onMarkerDragEnd(e)}
            draggable={true}
          />
        ) : null}
      </GoogleMap>
    </LoadScript>
  );
};

export default CurrentLocation;
