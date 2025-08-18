import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { z } from "zod";
import qs from "qs";

// schemas
import { businessMarketSchema } from "./BusinessProvider.schemas";

// types
import {
  BusinessMarketType,
  ImageType,
  ItemSearchPlaceAddressType,
} from "./BusinessProvider.types";

// providers
import { useUserProvider } from "../UserProvider/UserProvider";
import { useApiProvider } from "../ApiProvider/ApiProvider";

// constants
import { PATHS_API } from "../paths.constants";

type BusinessContext = {
  businessMarketUser: BusinessMarketType | null;
  onCreateBusinessMarket: (
    newBusinessMarket: Omit<
      BusinessMarketType,
      "place" | "logo" | "_id" | "userId"
    > & {
      userId: string;
      place: ItemSearchPlaceAddressType;
      newLogo: ImageType | null;
    }
  ) => Promise<boolean>;
  onUpdateBusinessMarket: (
    newBusinessMarket: Omit<BusinessMarketType, "place" | "userId"> & {
      userId: string;
      place: ItemSearchPlaceAddressType;
      newLogo: ImageType | null;
    }
  ) => Promise<boolean>;
  onDeleteBusinessMarket: () => Promise<boolean>;
};

type BusinessProviderProps = {
  children: React.ReactNode;
};

export const businessContext = React.createContext({} as BusinessContext);

const BusinessProvider: FunctionComponent<BusinessProviderProps> = ({
  children,
}) => {
  const { api } = useApiProvider();
  const { userData } = useUserProvider();
  const [businessMarketUser, setBusinessMarketUser] =
    useState<BusinessMarketType | null>(null);

  const getBusinessUser = async (userId?: string | number) => {
    if (!userData?._id) return false;
    const query = qs.stringify({ userId }, { addQueryPrefix: true });
    const result = await api(
      `${PATHS_API.businessMarket}${query}`,
      null,
      z.object({ businessMarket: businessMarketSchema.nullable() })
    );
    if (result?.businessMarket) setBusinessMarketUser(result.businessMarket);
    return Boolean(result?.businessMarket);
  };

  const onCreateBusinessMarket = async (
    newBusinessMarket: Omit<
      BusinessMarketType,
      "place" | "logo" | "_id" | "userId"
    > & {
      userId: string;
      place: ItemSearchPlaceAddressType;
      newLogo: ImageType | null;
    }
  ) => {
    if (!userData?._id || !newBusinessMarket.place) return false;
    const result = await api(
      PATHS_API.businessMarketCreate,
      { method: "POST", data: newBusinessMarket },
      z.object({ businessMarket: businessMarketSchema })
    );
    if (result?.businessMarket) setBusinessMarketUser(result.businessMarket);
    return Boolean(result?.businessMarket);
  };

  const onUpdateBusinessMarket = async (
    newBusinessMarket: Omit<BusinessMarketType, "place" | "userId"> & {
      userId: string;
      place: ItemSearchPlaceAddressType;
      newLogo: ImageType | null;
    }
  ) => {
    if (!userData?._id || !newBusinessMarket.place) return false;
    const result = await api(
      PATHS_API.businessMarketUpdate,
      { method: "PUT", data: newBusinessMarket },
      z.object({ businessMarket: businessMarketSchema })
    );
    if (result?.businessMarket) setBusinessMarketUser(result.businessMarket);
    return Boolean(result?.businessMarket);
  };

  const onDeleteBusinessMarket = async () => {
    if (!businessMarketUser?._id || !userData?._id) return false;
    const result = await api(
      PATHS_API.businessMarketDelete,
      {
        method: "DELETE",
        data: {
          userId: userData._id,
          businessMarketId: businessMarketUser._id,
        },
      },
      z.object({ success: z.boolean() })
    );

    if (result) setBusinessMarketUser(null);
    return true;
  };

  const valueContext: BusinessContext = useMemo(
    () => ({
      businessMarketUser,
      onCreateBusinessMarket,
      onUpdateBusinessMarket,
      onDeleteBusinessMarket,
    }),
    [
      businessMarketUser,
      onCreateBusinessMarket,
      onUpdateBusinessMarket,
      onDeleteBusinessMarket,
    ]
  );

  useEffect(() => {
    if (userData?._id) getBusinessUser(userData._id);
  }, [userData?._id]);

  return (
    <businessContext.Provider value={valueContext}>
      {children}
    </businessContext.Provider>
  );
};

export const useBusinessProvider = () => useContext(businessContext);

export default BusinessProvider;
