import { z } from "zod";
import {
  getSearchPlaceSchema,
  countryDbSchema,
  getSearchCountrySchema,
  placeDbSchema,
  regionDbSchema,
  coordinatesSchema,
} from "./PlacesProvider.schemas";

export type GetSearchPlaceType = z.infer<typeof getSearchPlaceSchema>;
export type GetSearchCountryType = z.infer<typeof getSearchCountrySchema>;

export type CountryDbType = z.infer<typeof countryDbSchema>;
export type RegionDbType = z.infer<typeof regionDbSchema>;
export type PlaceDbType = z.infer<typeof placeDbSchema>;
export type CoordinatesType = z.infer<typeof coordinatesSchema>;
