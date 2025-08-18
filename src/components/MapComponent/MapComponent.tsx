"use client";

import { FunctionComponent, useMemo, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Box } from "@mui/material";

// types
import { CoordinatesType } from "@/providers/PlacesProvider/PlacesProvider.types";

// styles
import styles from "./MapComponent.styles";
import { usePlacesProvider } from "@/providers/PlacesProvider/PlacesProvider";
import { useMapProvider } from "@/providers/MapProvider/MapProvider";

type MapComponentType = {
  setCoordinates?: (newCoordinates: CoordinatesType) => void;
  coordinates?: CoordinatesType;
};

const defaultMapCenter = {
  lat: 49.43233388510375,
  lng: 32.05339479103558,
};

const defaultMapZoom = 15;

const defaultMapOptions: google.maps.MapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  mapTypeId: "roadmap",
};

const MapComponent: FunctionComponent<MapComponentType> = ({
  setCoordinates,
  coordinates,
}) => {
  const { location } = useMapProvider();
  const { isEnableMap } = usePlacesProvider();
  const [selectedPlace, setSelectedPlace] = useState<CoordinatesType | null>(
    null
  );

  const centerCoordinates = useMemo(() => {
    if (coordinates)
      return {
        lat: coordinates.latitude,
        lng: coordinates.longitude,
      };
    if (location)
      return {
        lat: location.latitude,
        lng: location.longitude,
      };
    return defaultMapCenter;
  }, [coordinates, location]);

  if (!isEnableMap) return null;
  return (
    <Box sx={styles.container}>
      <GoogleMap
        mapContainerStyle={styles.containerMap}
        onClick={(props) => {
          if (!props.latLng) return;
          const latitude = props.latLng.lat();
          const longitude = props.latLng.lng();
          if (setCoordinates)
            setCoordinates({
              latitude,
              longitude,
            });
          setSelectedPlace({
            latitude,
            longitude,
          });
        }}
        center={centerCoordinates}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        {selectedPlace && (
          <Marker
            position={{
              lat: selectedPlace.latitude,
              lng: selectedPlace.longitude,
            }}
          />
        )}
        {coordinates && (
          <Marker
            position={{ lat: coordinates.latitude, lng: coordinates.longitude }}
          />
        )}
      </GoogleMap>
    </Box>
  );
};

export default MapComponent;
