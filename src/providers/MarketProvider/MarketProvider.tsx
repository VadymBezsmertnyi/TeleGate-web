import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import qs from "qs";
import { z } from "zod";

// types
import {
  MinMaxPricesType,
  PlacesAllIdsType,
  ProductType,
  ProductsType,
} from "./MarketProvider.types";

// schemas
import { productSchema, resultProductsSchema } from "./MarketProvider.schemas";
import { ratesCurrencySchema } from "../PaymentProvider/PaymentProvider.schemas";

// providers
import { useUserProvider } from "../UserProvider/UserProvider";
import { useApiProvider } from "../ApiProvider/ApiProvider";
import { useLoadingProvider } from "../LoadingProvider/LoadingProvider";

// components
import { ItemSearchPlaceType } from "@/components/ModalSelectPlace/ModalSelectPlace.types";

// constants
import { PATHS_API } from "../paths.constants";

export type NewProductType = Omit<
  ProductType,
  | "_id"
  | "prices"
  | "userId"
  | "likeUserIds"
  | "place_id"
  | "country_place_id"
  | "region_place_id"
> & {
  userId: string;
  likeUserIds: string[];
  place?: ItemSearchPlaceType;
  place_id?: string;
  country_place_id?: string;
  region_place_id?: string;
};

type MarketContext = {
  products: ProductsType;
  addProduct: (newProduct: NewProductType) => Promise<boolean>;
  changeProduct: (changeProduct: NewProductType) => Promise<boolean>;
  deleteProduct: (idProduct: string, type?: "all" | "user") => Promise<boolean>;
  minMaxPrices: MinMaxPricesType | null;
  placesAll: PlacesAllIdsType | null;
  uploadExcelProducts: (file: File) => Promise<any>;
};

type MarketProviderProps = {
  children: React.ReactNode;
};

export const marketContext = React.createContext({} as MarketContext);

const MarketProvider: FunctionComponent<MarketProviderProps> = ({
  children,
}) => {
  const { userData, setUserData, meUser } = useUserProvider();
  const { api } = useApiProvider();
  const { setLoading } = useLoadingProvider();
  const [products, setProducts] = useState<ProductsType>([]);
  const [minMaxPrices, setMinMaxPrices] = useState<MinMaxPricesType | null>(
    null
  );
  const [placesAll, setPlacesAll] = useState<PlacesAllIdsType | null>(null);

  const setMinMaxProduct = async (product: ProductType) => {
    const isMinProduct = minMaxPrices
      ? product.price < minMaxPrices?.min[product.codeCurrency]
      : false;
    const isMaxProduct = minMaxPrices
      ? product.price > minMaxPrices?.max[product.codeCurrency]
      : false;

    if (isMinProduct || isMaxProduct) {
      const result = await api(
        PATHS_API.marketsProductsMinMaxPricesGet,
        null,
        z.object({
          max: ratesCurrencySchema,
          min: ratesCurrencySchema,
        })
      );
      setMinMaxPrices(result);
    }
  };

  const getProducts = async () => {
    const result = await api(
      PATHS_API.marketsProductsGet,
      null,
      resultProductsSchema
    );

    if (result) {
      setProducts(result.products);
      setMinMaxPrices({ min: result.min, max: result.max });
      if (result.places) setPlacesAll(result.places);
    }
  };

  const getProductsUser = async () => {
    if (userData?._id) {
      const queryParams = qs.stringify(
        {
          userId: userData._id,
        },
        {
          addQueryPrefix: true,
        }
      );
      const result = await api(
        `${PATHS_API.marketsProductsGetUserId}${queryParams}`,
        null,
        resultProductsSchema
      );
      if (result) {
        setMinMaxPrices({ min: result.min, max: result.max });
      }
    }
  };

  const addProduct = async (newProduct: NewProductType): Promise<boolean> => {
    setLoading(true);
    const result = await api(
      PATHS_API.marketsProductsAdd,
      {
        method: "POST",
        data: newProduct,
      },
      z.object({ product: productSchema })
    );
    if (result?.product) {
      setProducts((state) => [...state, result.product]);
      setLoading(false);
      setMinMaxProduct(result.product);
      if (userData) {
        setUserData({
          ...userData,
          productsIds: [...userData.productsIds, result.product],
        });
      }
      meUser(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const changeProduct = async (changeProduct: NewProductType) => {
    setLoading(true);
    const result = await api(
      PATHS_API.marketsProductsChange,
      {
        method: "POST",
        data: changeProduct,
      },
      z.object({ product: productSchema })
    );
    if (result?.product) {
      setProducts((state) =>
        state.map((product) =>
          product._id === result.product._id ? result.product : product
        )
      );
      if (userData) {
        setUserData({
          ...userData,
          productsIds: userData.productsIds.map((product) =>
            product._id === result.product._id ? result.product : product
          ),
        });
      }
      setMinMaxProduct(result.product);
      setLoading(false);
      meUser(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const deleteProduct = async (
    idProduct: string,
    type: "all" | "user" = "all"
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const result = await api(
        PATHS_API.marketsProductsDelete,
        { method: "DELETE", data: { _id: idProduct } },
        z.object({ result: z.boolean() })
      );
      if (result?.result) {
        setProducts((state) =>
          state.filter((product) => product._id !== idProduct)
        );
        if (type === "user") {
          if (userData && userData.productsIds.length > 0) {
            setUserData({
              ...userData,
              productsIds: userData.productsIds.filter(
                (product) => product._id !== idProduct
              ),
            });
          }
        }
      }

      meUser(false);
      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const uploadExcelProducts = async (file: File) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const result = await api(PATHS_API.marketsProductsDownloadExcel, {
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return result;
    } catch (error) {
      if (process.env.NODE_ENV === "development") console.warn(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const valueContext: MarketContext = useMemo(
    () => ({
      products,
      addProduct,
      changeProduct,
      deleteProduct,
      minMaxPrices,
      placesAll,
      uploadExcelProducts,
    }),
    [products, minMaxPrices, placesAll]
  );

  useEffect(() => {
    if (userData?._id) {
      getProducts();
      getProductsUser();
    }
  }, [userData?._id]);

  return (
    <marketContext.Provider value={valueContext}>
      {children}
    </marketContext.Provider>
  );
};

export const useMarketProvider = () => useContext(marketContext);

export default MarketProvider;
