import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import qs from "qs";
import { z } from "zod";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";

// types
import {
  CountryDbType,
  GetSearchCountryType,
  GetSearchPlaceType,
  PlaceDbType,
  RegionDbType,
} from "./PlacesProvider.types";

// schemas
import {
  getCountiesResultSchema,
  getPlacesResultSchema,
  getRegionsResultSchema,
  getSearchCountrySchema,
  getSearchPlaceSchema,
  placeDbSchema,
} from "./PlacesProvider.schemas";

// providers
import { useApiProvider } from "../ApiProvider/ApiProvider";
import { useLocalesProvider } from "@/localization/localization.provider";

// constants
import { PATHS, PATHS_API } from "../paths.constants";

type PlacesContext = {
  placesDB: PlaceDbType[];
  countriesDB: CountryDbType[];
  regionsDB: RegionDbType[];
  placesFindDB: PlaceDbType[];
  getSearchCountry: (
    searchText: string,
    isDeep?: boolean
  ) => Promise<GetSearchCountryType | null>;
  getSearchRegion: (
    searchText: string,
    isDeep?: boolean
  ) => Promise<GetSearchCountryType | null>;
  getSearchPlace: (
    searchText: string,
    isDeep?: boolean
  ) => Promise<GetSearchPlaceType | null>;
  getPlace: (placeId: string) => Promise<PlaceDbType | null>;
  getRegions: (countryPlaceIds: string[]) => Promise<RegionDbType[] | null>;
  getPlaces: (
    countryPlaceIds: string[],
    regionPlaceIds: string[]
  ) => Promise<PlaceDbType[] | null>;
  isEnableMap: boolean;
};

type PlacesProviderProps = {
  children: React.ReactNode;
};

export const placesContext = React.createContext({} as PlacesContext);
const libraries = ["places", "drawing", "geometry"];

const PlacesProvider: FunctionComponent<PlacesProviderProps> = ({
  children,
}) => {
  const { api } = useApiProvider();
  const { language } = useLocalesProvider();
  const [countriesDB, setCountriesDB] = useState<CountryDbType[]>([]);
  const [regionsDB, setRegionsDB] = useState<RegionDbType[]>([]);
  const [placesDB, setPlacesDB] = useState<PlaceDbType[]>([]);
  const [placesFindDB, setPlacesFindDB] = useState<PlaceDbType[]>([]);
  const { isLoaded: isLoadedMap, loadError: loadErrorMap } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
    libraries: libraries as Libraries,
  });
  const isEnableMap = useMemo(
    () => isLoadedMap && !loadErrorMap,
    [isLoadedMap, loadErrorMap]
  );

  const getPlaceDB = async (placeId: string): Promise<void> => {
    const queryParams = qs.stringify({
      placeId,
    });
    const placeDB = await api(
      `${PATHS_API.placesCityId}?${queryParams}`,
      { method: "GET" },
      z.object({
        resultDB: placeDbSchema,
      })
    );
    if (placeDB) setPlacesDB((state) => [...state, placeDB.resultDB]);
  };

  const getPlace = async (placeId: string): Promise<PlaceDbType | null> => {
    const placeState = placesDB.find(
      (placeDB) => placeDB._id === placeId || placeDB.place_id === placeId
    );
    if (placeState) return placeState;
    await getPlaceDB(placeId);
    return null;
  };

  const getCounties = async () => {
    const result = await api(
      PATHS_API.placesCountries,
      { method: "GET" },
      getCountiesResultSchema
    );
    if (result) setCountriesDB(result.countries);
  };

  const getRegions = async (
    countryPlaceIds: string[]
  ): Promise<RegionDbType[] | null> => {
    const queryParams = qs.stringify({
      countryPlaceIds,
    });
    const result = await api(
      `${PATHS_API.placesRegions}?${queryParams}`,
      { method: "GET" },
      getRegionsResultSchema
    );
    if (result) {
      setRegionsDB(result.regions);
      return result.regions;
    }
    return null;
  };

  const getPlaces = async (
    countryPlaceIds: string[],
    regionPlaceIds: string[]
  ): Promise<PlaceDbType[] | null> => {
    const queryParams = qs.stringify({
      countryPlaceIds,
      regionPlaceIds,
    });
    const result = await api(
      `${PATHS_API.placesCities}?${queryParams}`,
      { method: "GET" },
      getPlacesResultSchema
    );
    if (result) {
      setPlacesFindDB(result.places);
      return result.places;
    }
    return null;
  };

  const getSearchCountry = async (
    searchText: string,
    isDeep = false
  ): Promise<GetSearchCountryType | null> => {
    const queryParams = qs.stringify(
      {
        searchText,
        language,
        isDeep,
      },
      { addQueryPrefix: true }
    );
    const result = await api(
      `${PATHS_API.placesCountriesSearch}${queryParams}`,
      { method: "GET" },
      getSearchCountrySchema
    );
    return result;
  };

  const getSearchRegion = async (
    searchText: string,
    isDeep = false
  ): Promise<GetSearchCountryType | null> => {
    const queryParams = qs.stringify(
      {
        searchText,
        language,
        isDeep,
      },
      { addQueryPrefix: true }
    );
    const result = await api(
      `${PATHS_API.placesRegionsSearch}${queryParams}`,
      { method: "GET" },
      getSearchCountrySchema
    );
    return result;
  };

  const getSearchPlace = async (
    searchText: string,
    isDeep = false
  ): Promise<GetSearchPlaceType | null> => {
    const queryParams = qs.stringify(
      {
        searchText,
        language,
        isDeep,
      },
      { addQueryPrefix: true }
    );
    const result = await api(
      `${PATHS_API.placesCitiesSearch}${queryParams}`,
      { method: "GET" },
      getSearchPlaceSchema
    );
    return result;
  };

  const valueContext: PlacesContext = useMemo(
    () => ({
      placesDB,
      countriesDB,
      regionsDB,
      placesFindDB,
      getSearchCountry,
      getSearchRegion,
      getSearchPlace,
      getPlace,
      getRegions,
      getPlaces,
      isEnableMap,
    }),
    [placesDB, countriesDB, regionsDB, placesFindDB, isEnableMap]
  );

  useEffect(() => {
    getCounties();
  }, []);

  return (
    <placesContext.Provider value={valueContext}>
      {children}
    </placesContext.Provider>
  );
};

export const usePlacesProvider = () => useContext(placesContext);

export default PlacesProvider;
