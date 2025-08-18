import { I18n } from "@lingui/core";
import { NameKeyType } from "@/helps/useErrors";

export const checkEnterData = (
  {
    title,
    place,
    description,
    selectMotoTypesWorks,
    selectAutoTypesWorks,
    isPhone,
    getErrorText,
  }: {
    title: string;
    place: string | null;
    description: string;
    selectMotoTypesWorks: number[];
    selectAutoTypesWorks: number[];
    isPhone: boolean;
    getErrorText: (
      type: NameKeyType,
      options: {
        min?: number;
        max?: number;
        otherName?: string;
      }
    ) => {
      name: string;
      title: string;
    };
  },
  i18n: I18n
): Record<
  string,
  {
    name: string;
    title: string;
  }
> => {
  const errorsObject = {
    ...((title.length < 5 || title.length > 40) && {
      title: getErrorText("title", {
        min: 5,
        max: 40,
        otherName: i18n._("workshop"),
      }),
    }),
    ...(place === null && {
      place: getErrorText("place", {
        otherName: i18n._("workshop"),
      }),
    }),
    ...((description.length < 50 || description.length > 9000) && {
      description: getErrorText("description", {
        min: 50,
        max: 9000,
        otherName: i18n._("workshop"),
      }),
    }),
    ...(!isPhone && {
      phoneNumber: getErrorText("phoneNumber", {
        otherName: i18n._("workshop"),
      }),
    }),
    ...(selectMotoTypesWorks.length === 0 &&
      selectAutoTypesWorks.length === 0 && {
        types: getErrorText("types", {
          otherName: i18n._("workshop"),
        }),
      }),
  };
  return errorsObject;
};
