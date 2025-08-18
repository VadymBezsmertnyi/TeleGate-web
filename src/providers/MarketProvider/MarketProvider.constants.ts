import { ProductType } from "./MarketProvider.types";

export const DEFAULT_PRODUCT_DATA: Omit<ProductType, "_id"> = {
  userId: null,
  title: "",
  isNewProduct: false,
  isBusiness: false,
  images: [],
  description: "",
  place_id: null,
  region_place_id: null,
  country_place_id: null,
  price: 0,
  prices: {
    date: null,
  },
  codeCurrency: "UAH",
  phoneNumber: "",
  telegram: "",
  moto: null,
  auto: null,
  motoParts: null,
  autoParts: null,
  updateAT: 0,
  quantityViews: 0,
  likeUserIds: [],
};
