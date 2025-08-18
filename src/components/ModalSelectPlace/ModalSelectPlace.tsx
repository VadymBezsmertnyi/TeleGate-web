import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import lodash from "lodash";
import { Box, Button, TextField, Typography } from "@mui/material";

// types
import { ItemSearchPlaceType } from "./ModalSelectPlace.types";

// providers
import { useLocalesProvider } from "@/localization/localization.provider";
import { usePlacesProvider } from "@/providers/PlacesProvider/PlacesProvider";
import { CoordinatesType } from "@/providers/PlacesProvider/PlacesProvider.types";

// components
import ModalWindow from "../ModalWindow/ModalWindow";
import MapComponent from "../MapComponent/MapComponent";

// styles
import styles from "./ModalSelectPlace.styles";

type ModalSelectPlaceProps = {
  isOpen: boolean;
  statePlace?: ItemSearchPlaceType;
  onClose: () => void;
  onSubmit: (values: {
    place: ItemSearchPlaceType;
    street: string;
    coordinates: CoordinatesType;
  }) => void;
};

const ModalSelectPlace: FunctionComponent<ModalSelectPlaceProps> = ({
  isOpen,
  statePlace,
  onClose,
  onSubmit,
}) => {
  const { i18n, language } = useLocalesProvider();
  const { getSearchPlace, isEnableMap } = usePlacesProvider();
  const [valueCity, setValueCity] = useState("");
  const [select, setSelect] = useState<ItemSearchPlaceType | null>(null);
  const [coordinates, setCoordinates] = useState<CoordinatesType | null>(null);
  const [valueStreet, setValueStreet] = useState("");
  const [list, setList] = useState<ItemSearchPlaceType[] | null>(null);
  const [isDeepSearch, setIsDeepSearch] = useState(false);
  const [isShowOther, setIsShowOther] = useState(false);
  const isSelectList = useMemo(
    () =>
      list
        ? list.filter((item) => item.placeId === select?.placeId).length > 0
        : false,
    [list, select]
  );

  const throttled = useRef(
    lodash.throttle(async (newValue: string, isDeep: boolean) => {
      const result = await getSearchPlace(newValue, isDeep);
      const newList = result
        ? [
            ...result.resultGoogle.map((item) => ({
              placeId: item.place_id,
              title: item.description,
            })),
            ...result.resultDB.map((item) => ({
              placeId: item.place_id,
              title: item[language].formatted_address,
            })),
          ]
        : [];
      const newCurrentList = newList.reduce<ItemSearchPlaceType[]>(
        (state, next) => {
          const is =
            state.filter(({ placeId }) => placeId === next.placeId).length > 0;
          if (is) return state;
          return [...state, next];
        },
        []
      );
      setList(newCurrentList);
    }, 2000)
  );

  const showOther = () => {
    const timeout = setTimeout(() => {
      setIsShowOther(true);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  };

  const onToggleDeepSearch = () => {
    if (valueStreet.length > 2 && !isDeepSearch)
      throttled.current(valueStreet, true);
    setIsDeepSearch((state) => !state);
  };

  useEffect(() => {
    if (valueCity.length > 2) throttled.current(valueCity, isDeepSearch);
  }, [valueCity]);

  useEffect(() => {
    if (isOpen) showOther();
    if (isOpen && statePlace?.placeId.length) {
      setSelect(statePlace);
      setList([statePlace]);
    }
  }, [isOpen, statePlace]);

  if (!isEnableMap)
    return (
      <ModalWindow open={isOpen} onClose={onClose}>
        <Box
          sx={{
            ...styles.container,
            ...styles.containerNotMapWork,
          }}
        >
          <Typography>{i18n._("Map is not available")}</Typography>
          <Typography>{i18n._("Please contact the administrator")}</Typography>
          <Button variant="contained" color="primary" onClick={onClose}>
            {i18n._("Close")}
          </Button>
        </Box>
      </ModalWindow>
    );

  return (
    <ModalWindow open={isOpen} onClose={onClose}>
      <Box sx={styles.container}>
        {select ? (
          <Box style={styles.containerSelected}>
            <Typography>
              {i18n._("Selected place")}: {select.title}
            </Typography>
            <Button
              variant="text"
              color="primary"
              onClick={() => {
                setSelect(null);
              }}
            >
              {i18n._("Change place")}
            </Button>
          </Box>
        ) : (
          <Box>
            <TextField
              label={`${i18n._("City")}:`}
              required
              value={valueCity}
              onChange={(e) => setValueCity(e.target.value)}
              sx={styles.input}
            />
            {list && list?.length > 0 && (
              <Box sx={styles.containerResult}>
                <Typography>{i18n._("Result search")}:</Typography>
                <Box sx={styles.containerResultList}>
                  {list.map((item) => (
                    <Button
                      key={`result-db-${item.placeId}`}
                      onClick={() => {
                        setSelect(item);
                      }}
                    >
                      <Typography>{item.title}</Typography>
                    </Button>
                  ))}
                </Box>
              </Box>
            )}
            {isShowOther ? (
              <Box sx={styles.containerShowOther}>
                {!isDeepSearch ? (
                  <Typography>
                    {i18n._(
                      "If there is no suitable option in the list, use 'Deep Search'"
                    )}
                  </Typography>
                ) : null}
                <Button
                  variant={isDeepSearch ? "contained" : "text"}
                  color={isDeepSearch ? "error" : "primary"}
                  onClick={onToggleDeepSearch}
                >
                  {isDeepSearch
                    ? i18n._("Disable Deep Search")
                    : i18n._("Enable Deep Search")}
                </Button>
              </Box>
            ) : null}
          </Box>
        )}
        {!select ? null : (
          <Box sx={styles.containerStreet}>
            <TextField
              label={`${i18n._("Street")}:`}
              required
              value={valueStreet}
              onChange={(e) => setValueStreet(e.target.value)}
              sx={styles.input}
            />
          </Box>
        )}
        {!select || valueStreet.length < 3 ? null : (
          <Box sx={styles.containerMap}>
            <Typography align="center">
              {i18n._("Please specify the coordinates on the map")}:
            </Typography>
            <MapComponent setCoordinates={setCoordinates} />
            <Box>
              {coordinates ? (
                <Typography>
                  {i18n._("Latitude")}: {coordinates.latitude}
                </Typography>
              ) : null}
              {coordinates ? (
                <Typography>
                  {i18n._("Longitude")}: {coordinates.longitude}
                </Typography>
              ) : null}
            </Box>
          </Box>
        )}
        {!select || valueStreet.length < 3 || !coordinates ? null : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onSubmit({
                place: select,
                coordinates,
                street: valueStreet,
              });
            }}
          >
            {i18n._("Submit")}
          </Button>
        )}
      </Box>
    </ModalWindow>
  );
};

export default ModalSelectPlace;
