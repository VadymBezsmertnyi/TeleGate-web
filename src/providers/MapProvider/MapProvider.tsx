import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// providers
import { useUserProvider } from "../UserProvider/UserProvider";

type MapContext = {
  location: GeolocationCoordinates | null;
};

type MapProviderProps = {
  children: React.ReactNode;
};

const INTERVAL_GET_LOCATION = 15000;

export const mapContext = React.createContext({} as MapContext);

const MapProvider: FunctionComponent<MapProviderProps> = ({ children }) => {
  const { userData } = useUserProvider();
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);

  const getLocation = async () => {
    if (userData && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(position.coords);
      });
    }
  };

  const onIntervalGetLocation = () => {
    const intervalId = setInterval(getLocation, INTERVAL_GET_LOCATION);
    getLocation();
    return () => {
      clearInterval(intervalId);
    };
  };

  const valueContext: MapContext = useMemo(
    () => ({
      location,
    }),
    [location]
  );

  useEffect(() => {
    if (userData?._id) onIntervalGetLocation();
  }, [userData?._id]);

  return (
    <mapContext.Provider value={valueContext}>{children}</mapContext.Provider>
  );
};

export const useMapProvider = () => useContext(mapContext);

export default MapProvider;
