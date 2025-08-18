import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  MuiTelInput,
  MuiTelInputCountry,
  matchIsValidTel,
} from "mui-tel-input";

// types
import { CoordinatesType } from "@/providers/PlacesProvider/PlacesProvider.types";
import { ItemSearchPlaceAddressType } from "@/providers/BusinessProvider/BusinessProvider.types";

// providers
import { useSubscriptionProvider } from "@/providers/SubscriptionProvider/SubscriptionProvider";
import { useLocalesProvider } from "@/localization/localization.provider";
import { usePlacesProvider } from "@/providers/PlacesProvider/PlacesProvider";
import { useWorkshopsProviderState } from "@/providers/WorkshopsProvider/useWorkshopsProvider.constants";
import { useWorkshopsProvider } from "@/providers/WorkshopsProvider/WorkshopsProvider";
import { useUserProvider } from "@/providers/UserProvider/UserProvider";
import { useLoadingProvider } from "@/providers/LoadingProvider/LoadingProvider";

// components
import ButtonBack from "@/components/ButtonBack/ButtonBack";
import ModalSelectPlace from "@/components/ModalSelectPlace/ModalSelectPlace";
import { ItemSearchPlaceType } from "@/components/ModalSelectPlace/ModalSelectPlace.types";
import MapComponent from "@/components/MapComponent/MapComponent";
import ModalSelectTypeWorkshop from "@/components/ModalSelectTypeWorkshop/ModalSelectTypeWorkshop";
import ModalSelectTypeServices from "@/components/ModalSelectTypeServices/ModalSelectTypeServices";
import ButtonFile from "@/components/ButtonFile";

// helps
import { useErrors } from "@/helps/useErrors";
import { checkEnterData } from "./ProfileWorkshopsAdd.helps";
import { getClearValue } from "@/helps/regexp";
import { getImageDimensions } from "@/helps/files";

// constants
import { DEFAULT_WORKSHOP_DATA } from "@/providers/WorkshopsProvider/WorkshopsProvider.constants";
import { PATHS } from "@/providers/paths.constants";

// styles
import styles from "./ProfileWorkshopsAdd.styles";

const DEFAULT_COUNTRY = "UA";

const ProfileWorkshopsAdd: FunctionComponent = () => {
  const router = useRouter();
  const { userData } = useUserProvider();
  const { i18n, language } = useLocalesProvider();
  const { infoWorkshops } = useSubscriptionProvider();
  const { isLoading } = useLoadingProvider();
  const { addWorkshop, changeWorkshop } = useWorkshopsProvider();
  const { placesDB, getPlace } = usePlacesProvider();
  const { getErrorText } = useErrors(i18n);
  const [place, setPlace] = useState<ItemSearchPlaceAddressType | null>(null);
  const [selectCountryCode, setSelectCountryCode] =
    useState<MuiTelInputCountry>(DEFAULT_COUNTRY);
  const [dataWorkshops, setDataWorkshops] = useState(DEFAULT_WORKSHOP_DATA);
  const [isSelectPlace, setIsSelectPlace] = useState(false);
  const [typeWorkshops, setTypeWorkshops] = useState({
    moto: false,
    auto: false,
  });
  const [isSelectTypeWorkshop, setIsSelectTypeWorkshop] = useState(false);
  const [isSelectTypeServices, setIsSelectTypeServices] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const { typesWorkServices } = useWorkshopsProviderState();

  // memoized values
  const selectWorkshop = useMemo(
    () =>
      userData?.workshopsIds.find(
        (workshop) => workshop._id === router.query.workshopId
      ) || null,
    [userData, router.query.workshopId]
  );
  const titleSelectTypeWorkshop = useMemo(() => {
    if (typeWorkshops.moto && typeWorkshops.auto) {
      return i18n._("All types of workshops");
    }
    if (typeWorkshops.moto) return i18n._("Moto workshop");
    if (typeWorkshops.auto) return i18n._("Auto workshop");
    return null;
  }, [typeWorkshops]);
  const amountCanCreate = useMemo(
    () =>
      infoWorkshops.amountWorkshop !== 0 ||
      infoWorkshops.useAmountWorkshop !== 0
        ? infoWorkshops.amountWorkshop - infoWorkshops.useAmountWorkshop
        : null,
    [infoWorkshops, place]
  );
  const selectPlace = useMemo(() => {
    if (!place) return null;
    const findPlace =
      placesDB.find((item) => item.place_id === place.placeId) || null;
    if (!findPlace) {
      getPlace(place.placeId);
      return null;
    }
    return findPlace;
  }, [placesDB, place]);
  const isCanSave = useMemo(() => {
    const isPhone = matchIsValidTel(dataWorkshops.phoneNumber);
    const resultCheck = checkEnterData(
      {
        title: dataWorkshops.title,
        place: place?.placeId || null,
        description: dataWorkshops.description,
        selectMotoTypesWorks: dataWorkshops.motoTypesWorks,
        selectAutoTypesWorks: dataWorkshops.autoTypesWorks,
        isPhone,
        getErrorText,
      },
      i18n
    );
    return Object.values(resultCheck).every((item) => item.name === "");
  }, [dataWorkshops]);

  // functions
  const onSubmitPlace = async (values: {
    place: ItemSearchPlaceType;
    street: string;
    coordinates: CoordinatesType;
  }) => {
    setPlace({
      title: values.place.title,
      placeId: values.place.placeId,
      address: values.street,
      coordinates: values.coordinates,
    });
    setDataWorkshops({
      ...dataWorkshops,
      place_address: values.street,
      coordinates: values.coordinates,
    });
    setIsSelectPlace(false);
  };

  const onSubmitWorkshop = async () => {
    if (
      !amountCanCreate ||
      amountCanCreate <= 0 ||
      !isCanSave ||
      !selectPlace ||
      !titleSelectTypeWorkshop ||
      !userData
    )
      return;

    const currentPlace =
      selectWorkshop &&
      place &&
      place.placeId === selectWorkshop.place_id?._id &&
      place.address === selectWorkshop.place_address
        ? {
            place_id: selectWorkshop.place_id,
            region_place_id: selectWorkshop.region_place_id,
            country_place_id: selectWorkshop.country_place_id,
            place_address: selectWorkshop.place_address,
            coordinates: selectWorkshop.coordinates,
          }
        : { selectPlace };
    const clearPhoneNumber = getClearValue(dataWorkshops.phoneNumber);
    //getImageDimensions
    const currentImages = await Promise.all(
      images.map(async (image, index) => {
        const currentImage = await getImageDimensions(image);
        return {
          _id: "",
          url: "",
          width: currentImage.width,
          height: currentImage.height,
          image: currentImage,
        };
      })
    );
    const newWorkshop = {
      ...DEFAULT_WORKSHOP_DATA,
      userId: userData._id,
      title: dataWorkshops.title,
      description: dataWorkshops.description,
      phoneNumber: clearPhoneNumber,
      ...currentPlace,
      motoTypesWorks: dataWorkshops.motoTypesWorks,
      autoTypesWorks: dataWorkshops.autoTypesWorks,
      images: currentImages,
      dataCreate: new Date().getTime(),
      rating: selectWorkshop?.rating || 0,
      comments: selectWorkshop?.comments || [],
    };

    const result = await addWorkshop(newWorkshop);
    if (result) router.push(PATHS.profileWorkshops);
  };

  useEffect(() => {
    if (amountCanCreate !== null && amountCanCreate === 0)
      router.push(PATHS.profileWorkshops);
  }, [amountCanCreate]);

  return (
    <>
      <Box sx={styles.container}>
        <Box sx={styles.containerHeader}>
          <ButtonBack
            onClick={() => {
              router.back();
            }}
          />
        </Box>
        <Box sx={styles.containerBody}>
          <Box sx={styles.containerInputs}>
            <TextField
              label={`${i18n._("Name workshop")}:`}
              required
              style={styles.input}
              value={dataWorkshops.title}
              onChange={(e) =>
                setDataWorkshops({ ...dataWorkshops, title: e.target.value })
              }
            />
            {selectPlace ? (
              <Box>
                <Typography align="center">
                  {i18n._("Place workshop")}:{" "}
                  {selectPlace?.[language].formatted_address ||
                    i18n._("Not selected place")}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setPlace(null);
                    setIsSelectPlace(true);
                  }}
                  sx={styles.button}
                >
                  {i18n._("Change place workshop")}
                </Button>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setIsSelectPlace(true);
                }}
              >
                {i18n._("Select place workshop")}
              </Button>
            )}
            <TextField
              label={`${i18n._("Description workshop")}:`}
              required
              style={styles.input}
              value={dataWorkshops.description}
              onChange={(e) =>
                setDataWorkshops({
                  ...dataWorkshops,
                  description: e.target.value,
                })
              }
            />
            <MuiTelInput
              label={`${i18n._("Phone number")}:`}
              required
              style={styles.input}
              value={dataWorkshops.phoneNumber}
              defaultCountry={selectCountryCode}
              onChange={(phoneNumber, info) => {
                if (info.countryCode) setSelectCountryCode(info.countryCode);
                setDataWorkshops({
                  ...dataWorkshops,
                  phoneNumber,
                });
              }}
            />
            {titleSelectTypeWorkshop ? (
              <Box sx={styles.containerTypeWorkshop}>
                <Typography>
                  {i18n._("Selected type workshop")}: {titleSelectTypeWorkshop}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setIsSelectTypeWorkshop(true);
                  }}
                  sx={styles.button}
                >
                  {i18n._("Change type workshop")}
                </Button>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setIsSelectTypeWorkshop(true);
                }}
              >
                {i18n._("Select type workshop")}
              </Button>
            )}
            {dataWorkshops.motoTypesWorks.length !== 0 ||
            dataWorkshops.autoTypesWorks.length !== 0 ? (
              <Box sx={styles.containerTypeServices}>
                <Typography>
                  {i18n._("Selected type moto services")}:
                </Typography>
                <Box sx={styles.containerServices}>
                  {dataWorkshops.motoTypesWorks.map((item, index) => {
                    const select = typesWorkServices.moto.find(
                      (type) => type.id === item
                    ) || { title: "" };

                    return (
                      <Typography key={`moto-item-${item}`}>
                        {select.title}
                        {index !== dataWorkshops.autoTypesWorks.length - 1
                          ? ", "
                          : ""}
                      </Typography>
                    );
                  })}
                </Box>
                <Typography>
                  {i18n._("Selected type auto services")}:
                </Typography>
                <Box sx={styles.containerServices}>
                  {dataWorkshops.autoTypesWorks.map((item, index) => {
                    const select = typesWorkServices.auto.find(
                      (type) => type.id === item
                    ) || { title: "" };

                    return (
                      <Typography key={`auto-item-${item}`}>
                        {select.title}
                        {index !== dataWorkshops.autoTypesWorks.length - 1
                          ? ", "
                          : ""}
                      </Typography>
                    );
                  })}
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setIsSelectTypeServices(true);
                  }}
                  sx={styles.button}
                >
                  {i18n._("Change type services")}
                </Button>
              </Box>
            ) : (
              <Button
                disabled={!titleSelectTypeWorkshop}
                variant="contained"
                color="primary"
                onClick={() => {
                  setIsSelectTypeServices(true);
                }}
                sx={styles.button}
              >
                {i18n._("Select type services")}
              </Button>
            )}
            {images.length > 0 ? (
              <Box sx={styles.containerImages}>
                {images.map((image, index) => (
                  <Image
                    key={`image-${index}`}
                    width={200}
                    height={200}
                    src={URL.createObjectURL(image)}
                    alt={`image-${index}`}
                    style={styles.image}
                  />
                ))}
              </Box>
            ) : (
              <ButtonFile
                values={images}
                accept=".png, .jpg, .jpeg"
                onChangeMultiple={(files) => {
                  setImages(files);
                }}
                renderButton={<Typography>{i18n._("Add photo")}</Typography>}
              />
            )}
            <Button
              disabled={!isCanSave || isLoading}
              variant="contained"
              color="primary"
              onClick={onSubmitWorkshop}
              sx={styles.button}
            >
              {isLoading ? i18n._("Loading...") : i18n._("Create workshop")}
            </Button>
          </Box>
          <Box sx={styles.containerInfo}>
            {dataWorkshops.coordinates.latitude !== 0 && (
              <MapComponent coordinates={dataWorkshops.coordinates} />
            )}
          </Box>
        </Box>
      </Box>
      {isSelectPlace && (
        <ModalSelectPlace
          isOpen
          onClose={() => {
            setIsSelectPlace(false);
          }}
          onSubmit={onSubmitPlace}
        />
      )}
      {isSelectTypeWorkshop && (
        <ModalSelectTypeWorkshop
          isOpen={isSelectTypeWorkshop}
          values={typeWorkshops}
          onClose={() => {
            setIsSelectTypeWorkshop(false);
          }}
          onSubmit={(values) => {
            setTypeWorkshops(values);
            setIsSelectTypeWorkshop(false);
          }}
        />
      )}
      {isSelectTypeServices && (
        <ModalSelectTypeServices
          isOpen={isSelectTypeServices}
          values={{
            moto: typeWorkshops.moto ? dataWorkshops.motoTypesWorks : [],
            auto: typeWorkshops.auto ? dataWorkshops.autoTypesWorks : [],
          }}
          typeWorkshops={typeWorkshops}
          onClose={() => {
            setIsSelectTypeServices(false);
          }}
          onSubmit={(values) => {
            setDataWorkshops({
              ...dataWorkshops,
              motoTypesWorks: values.moto,
              autoTypesWorks: values.auto,
            });
            setIsSelectTypeServices(false);
          }}
        />
      )}
    </>
  );
};

export default ProfileWorkshopsAdd;
