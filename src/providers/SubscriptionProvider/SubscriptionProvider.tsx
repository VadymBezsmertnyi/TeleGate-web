import React, { FunctionComponent, useContext, useMemo } from "react";
import { useUserProvider } from "../UserProvider/UserProvider";
import {
  TYPE_BUSINESS_SUBSCRIPTIONS_ADVERT,
  TYPE_INDIVIDUAL_SUBSCRIPTIONS_ADVERT,
  TYPE_SMALL_SUBSCRIPTIONS_EVENT,
} from "./SubscriptionProvider.constants";

type SubscriptionContext = {
  infoBusinessAdverts: {
    amountBusinessAdvert: number;
    useAmountBusinessAdvert: number;
  };
  infoAdverts: {
    amountAdvert: number;
    useAmountAdvert: number;
  };
  infoSmallEvents: {
    amountSmallEvent: number;
    useAmountSmallEvent: number;
  };
  infoBigEvents: {
    amountBigEvent: number;
    useAmountBigEvent: number;
  };
  infoWorkshops: {
    amountWorkshop: number;
    useAmountWorkshop: number;
  };
};

type SubscriptionProviderProps = {
  children: React.ReactNode;
};

export const subscriptionContext = React.createContext(
  {} as SubscriptionContext
);

const SubscriptionProvider: FunctionComponent<SubscriptionProviderProps> = ({
  children,
}) => {
  const { userData } = useUserProvider();

  const infoBusinessAdverts = useMemo(() => {
    if (!userData)
      return {
        amountBusinessAdvert: 0,
        useAmountBusinessAdvert: 0,
      };
    const subscription = userData.subscriptionAdvertIds.reduce(
      (state, next) => {
        if (next.type === TYPE_BUSINESS_SUBSCRIPTIONS_ADVERT) {
          const isEnd = next.dateEnd > new Date().getTime();
          if (isEnd) return state;
          return state + next.amount;
        }
        return state;
      },
      0
    );
    const useBusinessAdvert = userData.productsIds.filter(
      (item) => item.isBusiness
    ).length;
    const amountBusinessAdvert =
      subscription +
      userData.defaultAmount.advertBusinessAmount -
      useBusinessAdvert;
    return {
      amountBusinessAdvert,
      useAmountBusinessAdvert: useBusinessAdvert,
    };
  }, [
    userData?.subscriptionAdvertIds,
    userData?.productsIds,
    userData?.defaultAmount.advertBusinessAmount,
  ]);
  const infoAdverts = useMemo(() => {
    if (!userData)
      return {
        amountAdvert: 0,
        useAmountAdvert: 0,
      };
    const subscription = userData.subscriptionAdvertIds.reduce(
      (state, next) => {
        if (next.type === TYPE_INDIVIDUAL_SUBSCRIPTIONS_ADVERT) {
          const isEnd = next.dateEnd > new Date().getTime();
          if (isEnd) return state;
          return state + next.amount;
        }
        return state;
      },
      0
    );
    const useAdvert = userData.productsIds.filter(
      (item) => !item.isBusiness
    ).length;
    const amountAdvert =
      subscription + userData.defaultAmount.advertAmount - useAdvert;
    return {
      amountAdvert,
      useAmountAdvert: useAdvert,
    };
  }, [
    userData?.subscriptionAdvertIds,
    userData?.productsIds,
    userData?.defaultAmount.advertAmount,
  ]);
  const infoSmallEvents = useMemo(() => {
    if (!userData)
      return {
        amountSmallEvent: 0,
        useAmountSmallEvent: 0,
      };
    const subscription = userData.subscriptionEventIds.reduce((state, next) => {
      const isEnd = next.dateEnd > new Date().getTime();
      const isSmall = next.type === TYPE_SMALL_SUBSCRIPTIONS_EVENT;
      if (isEnd || !isSmall) return state;
      return state + next.amount;
    }, 0);
    const useSmallEvent = userData.eventsIds.length;
    const amountSmallEvent =
      subscription + userData.defaultAmount.eventSmallAmount - useSmallEvent;
    return {
      amountSmallEvent,
      useAmountSmallEvent: useSmallEvent,
    };
  }, [
    userData?.subscriptionEventIds,
    userData?.eventsIds,
    userData?.defaultAmount.eventSmallAmount,
  ]);
  const infoBigEvents = useMemo(() => {
    if (!userData)
      return {
        amountBigEvent: 0,
        useAmountBigEvent: 0,
      };
    const subscription = userData.subscriptionEventIds.reduce((state, next) => {
      const isEnd = next.dateEnd > new Date().getTime();
      const isBig = next.type !== TYPE_SMALL_SUBSCRIPTIONS_EVENT;
      if (isEnd || !isBig) return state;
      return state + next.amount;
    }, 0);
    const useBigEvent = 0;
    const amountBigEvent =
      subscription + userData.defaultAmount.eventBigAmount - useBigEvent;
    return {
      amountBigEvent,
      useAmountBigEvent: useBigEvent,
    };
  }, [userData?.subscriptionEventIds, userData?.defaultAmount.eventBigAmount]);
  const infoWorkshops = useMemo(() => {
    if (!userData)
      return {
        amountWorkshop: 0,
        useAmountWorkshop: 0,
      };
    const subscription = userData.subscriptionWorkshopIds.reduce(
      (state, next) => {
        const isEnd = next.dateEnd > new Date().getTime();
        if (isEnd) return state;
        return state + next.amount;
      },
      0
    );
    const useWorkshop = userData.workshopsIds.length;
    const amountWorkshop =
      subscription + userData.defaultAmount.workshopAmount - useWorkshop;
    return {
      amountWorkshop,
      useAmountWorkshop: useWorkshop,
    };
  }, [
    userData?.subscriptionWorkshopIds,
    userData?.workshopsIds,
    userData?.defaultAmount.workshopAmount,
  ]);

  const contextValue: SubscriptionContext = useMemo(
    () => ({
      infoBusinessAdverts,
      infoAdverts,
      infoSmallEvents,
      infoBigEvents,
      infoWorkshops,
    }),
    [
      infoBusinessAdverts,
      infoAdverts,
      infoSmallEvents,
      infoBigEvents,
      infoWorkshops,
    ]
  );
  return (
    <subscriptionContext.Provider value={contextValue}>
      {children}
    </subscriptionContext.Provider>
  );
};

export const useSubscriptionProvider = () => useContext(subscriptionContext);

export default SubscriptionProvider;
