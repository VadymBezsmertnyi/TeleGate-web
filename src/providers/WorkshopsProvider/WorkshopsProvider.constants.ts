import { WorkshopType } from "./WorkshopsProvider.types";

export const DEFAULT_WORKSHOP_DATA: Omit<WorkshopType, "_id"> & {
  _id?: string;
} = {
  userId: null,
  title: "",
  description: "",
  phoneNumber: "",
  place_id: null,
  region_place_id: null,
  country_place_id: null,
  place_address: "",
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  motoTypesWorks: [],
  autoTypesWorks: [],
  images: [],
  dataCreate: 0,
  comments: [],
  rating: null,
  likeUserIds: [],
};
