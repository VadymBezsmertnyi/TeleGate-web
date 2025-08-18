import { TypeDataCategory } from "@/screens/ProfileMarketAdd/ProfileMarketAdd.types";
import { I18n } from "@lingui/core";

export type NameKeyType =
  | "eventName"
  | "location"
  | "finish"
  | "aboutEvent"
  | "errorMessage"
  | "title"
  | "description"
  | "phoneNumber"
  | "place"
  | "types"
  | "category"
  | "price"
  | "brand"
  | "mileage"
  | "yearRelease"
  | "typeFuel"
  | "typeTransmission"
  | "typeParts"
  | "images";

export const useErrors = (i18n: I18n) => {
  const getErrorText = (
    type: NameKeyType,
    options: { min?: number; max?: number; otherName?: string }
  ) => {
    const { min, max, otherName } = options;
    if (i18n) {
      if (type === "eventName")
        return {
          name: i18n._("Name of the {otherName}", { otherName }),
          title: i18n._(
            `The text must contain a minimum of {min} and a maximum of {max} characters.`,
            { min, max }
          ),
        };
      if (type === "location")
        return {
          name: i18n._("The place of the {otherName}", { otherName }),
          title: i18n._("The location of the {otherName} must be selected.", {
            otherName,
          }),
        };
      if (type === "finish")
        return {
          name: i18n._("Date of the {otherName}", { otherName }),
          title: i18n._("The end date must be greater than the start date."),
        };
      if (type === "aboutEvent")
        return {
          name: i18n._("Tell us about the {otherName}", { otherName }),
          title: i18n._(
            "The text must contain a minimum of {min} and a maximum of {max} characters.",
            { min, max }
          ),
        };
      if (type === "title")
        return {
          name: i18n._("Name of the {otherName}", { otherName }),
          title: i18n._(
            "The text must contain a minimum of {min} and a maximum of {max} characters.",
            { min, max }
          ),
        };
      if (type === "place")
        return {
          name: i18n._("The place of the {otherName}", { otherName }),
          title: i18n._("The location of the {otherName} must be selected.", {
            otherName,
          }),
        };
      if (type === "description")
        return {
          name: i18n._("Description of the {otherName}", { otherName }),
          title: i18n._(
            "The text must contain a minimum of {min} and a maximum of {max} characters.",
            { min, max }
          ),
        };
      if (type === "phoneNumber")
        return {
          name: i18n._("Phone number the {otherName}", { otherName }),
          title: i18n._("Please enter phone number"),
        };
      if (type === "types")
        return {
          name: i18n._("Types of {otherName} jobs", { otherName }),
          title: i18n._("Please select at least one type"),
        };
      if (type === "price")
        return {
          name: i18n._("Price {otherName}", { otherName }),
          title: i18n._("Please enter price for {otherName}", { otherName }),
        };
      if (type === "category")
        return {
          name: i18n._("Category {otherName}", { otherName }),
          title: i18n._("Please enter category for {otherName}", { otherName }),
        };
      if (type === "brand")
        return {
          name: i18n._("Brand {otherName}", { otherName }),
          title: i18n._("Please enter brand for {otherName}", { otherName }),
        };
      if (type === "mileage")
        return {
          name: i18n._("Mileage {otherName}", { otherName }),
          title: i18n._("Please enter mileage for {otherName}", { otherName }),
        };
      if (type === "yearRelease")
        return {
          name: i18n._("Year release {otherName}", { otherName }),
          title: i18n._(
            "Please enter year minimum of {min} and a maximum of {max} for {otherName}",
            { otherName, min, max }
          ),
        };
      if (type === "typeFuel")
        return {
          name: i18n._("Type fuel {otherName}", { otherName }),
          title: i18n._("Please enter type fuel for {otherName}", {
            otherName,
          }),
        };
      if (type === "typeTransmission")
        return {
          name: i18n._("Type transmission {otherName}", { otherName }),
          title: i18n._("Please enter type transmission for {otherName}", {
            otherName,
          }),
        };
      if (type === "typeParts")
        return {
          name: i18n._("Type parts {otherName}", { otherName }),
          title: i18n._("Please enter type parts for {otherName}", {
            otherName,
          }),
        };
      if (type === "errorMessage")
        return { name: "", title: i18n._("Incorrectly entered data") };
      if (type === "images")
        return {
          name: i18n._("Images {otherName}", { otherName }),
          title: i18n._("Please add images for {otherName}", { otherName }),
        };
      return { name: "", title: "" };
    }
    return { name: "", title: "" };
  };

  const getErrorAddProduct = ({
    title,
    description,
    place,
    isPhone,
    price,
    select,
    isTransport,
    isParts,
    mileage,
    yearRelease,
    images,
  }: {
    title: string;
    description: string;
    place: any | null;
    isPhone: boolean;
    price: string;
    select?: {
      category?: TypeDataCategory;
      brandAuto?: TypeDataCategory;
      brandMoto?: TypeDataCategory;
      typeFuel?: TypeDataCategory;
      typeTransmission?: TypeDataCategory;
      motoParts?: TypeDataCategory;
      autoParts?: TypeDataCategory;
    } | null;
    isTransport: boolean;
    isParts: boolean;
    mileage: string;
    yearRelease: string;
    images?: string[];
  }) => ({
    ...((title.length < 5 || title.length > 40) && {
      title: getErrorText("title", {
        min: 5,
        max: 40,
        otherName: i18n._("advert"),
      }),
    }),
    ...((description.length < 20 || description.length > 9000) && {
      description: getErrorText("description", {
        min: 20,
        max: 9000,
        otherName: i18n._("advert"),
      }),
    }),
    ...(place === null && {
      place: getErrorText("place", {
        otherName: i18n._("advert"),
      }),
    }),
    ...(!isPhone && {
      phoneNumber: getErrorText("phoneNumber", {
        otherName: i18n._("advert"),
      }),
    }),
    ...((Number(price) <= 0 || isNaN(Number(price))) && {
      price: getErrorText("price", {
        otherName: i18n._("advert"),
      }),
    }),
    ...(!select?.category && {
      category: getErrorText("category", {
        otherName: i18n._("advert"),
      }),
    }),
    ...(!(select?.brandAuto || select?.brandMoto) && {
      brand: getErrorText("brand", {
        otherName: i18n._("advert"),
      }),
    }),
    ...(isTransport &&
      (Number(mileage) <= 0 || isNaN(Number(mileage))) && {
        mileage: getErrorText("mileage", {
          otherName: i18n._("advert"),
        }),
      }),
    ...(isTransport &&
      (Number(yearRelease) < 1900 ||
        Number(yearRelease) > new Date().getFullYear()) && {
        yearRelease: getErrorText("yearRelease", {
          otherName: i18n._("advert"),
          min: 1900,
          max: new Date().getFullYear(),
        }),
      }),
    ...(isTransport &&
      !select?.typeFuel && {
        typeFuel: getErrorText("typeFuel", {
          otherName: i18n._("advert"),
        }),
      }),
    ...(isTransport &&
      !select?.typeTransmission && {
        typeTransmission: getErrorText("typeTransmission", {
          otherName: i18n._("advert"),
        }),
      }),
    ...(isParts &&
      !(select?.motoParts || select?.autoParts) && {
        typeParts: getErrorText("typeParts", {
          otherName: i18n._("advert"),
        }),
      }),
    ...(images &&
      images.length === 0 && {
        images: getErrorText("images", {
          otherName: i18n._("advert"),
        }),
      }),
  });

  return { getErrorText, getErrorAddProduct };
};
