import React, { FunctionComponent, useState } from "react";
import { Box, Button } from "@mui/material";

// providers
import { useLocalesProvider } from "@/localization/localization.provider";
import { useSubscriptionProvider } from "@/providers/SubscriptionProvider/SubscriptionProvider";
import { useMarketProvider } from "@/providers/MarketProvider/MarketProvider";

// components
import HeaderInfoProfile from "@/components/HeaderInfoProfile/HeaderInfoProfile";
import ButtonFile from "@/components/ButtonFile";

// styles
import styles from "./ProfileProducts.styles";

const ProfileProducts: FunctionComponent = () => {
  const { i18n } = useLocalesProvider();
  const { infoBusinessAdverts, infoAdverts } = useSubscriptionProvider();
  const { uploadExcelProducts } = useMarketProvider();
  const [fileExcel, setFileExcel] = useState<File | null>(null);
  const [result, setResult] = useState<Array<
    Record<string, string | number | boolean | null | undefined>
  > | null>(null);
  const [showItems, setShowItems] = useState(20);

  const handleUploadExcel = async () => {
    if (fileExcel) {
      const result = await uploadExcelProducts(fileExcel);
      setResult(result.products);
    }
    setFileExcel(null);
  };

  return (
    <Box sx={styles.container}>
      <HeaderInfoProfile
        title={i18n._("Products")}
        total={
          infoBusinessAdverts.amountBusinessAdvert + infoAdverts.amountAdvert
        }
        used={
          infoBusinessAdverts.useAmountBusinessAdvert +
          infoAdverts.useAmountAdvert
        }
        remaining={
          infoBusinessAdverts.amountBusinessAdvert +
          infoAdverts.amountAdvert -
          infoBusinessAdverts.useAmountBusinessAdvert -
          infoAdverts.useAmountAdvert
        }
      />
      <ButtonFile
        values={fileExcel ? [fileExcel] : []}
        onChange={(file) => setFileExcel(file)}
        accept={".xls, .xlsx, .csv"}
      />
      {fileExcel && (
        <Button
          variant="contained"
          sx={{
            marginTop: "20px",
            width: "100%",
            backgroundColor: "#FFD700",
            color: "#000",
          }}
          onClick={handleUploadExcel}
        >
          {i18n._("Upload")}
        </Button>
      )}

      {result && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(4, 1fr)`,
          }}
        >
          {result.slice(0, showItems).map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid #000",
                padding: "10px",
              }}
            >
              {Object.keys(item).map((key, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    borderBottom: "1px solid #000",
                  }}
                >
                  <Box
                    sx={{
                      width: "100px",
                      fontWeight: "bold",
                    }}
                  >
                    {key}
                  </Box>
                  <Box
                    sx={{
                      width: "100px",
                    }}
                  >
                    {item[key]}
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
          <Box>
            <Button
              variant="contained"
              sx={{
                marginTop: "20px",
                width: "100%",
                backgroundColor: "#FFD700",
                color: "#000",
              }}
              onClick={() => setShowItems(showItems + 20)}
            >
              {i18n._("Show more")}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProfileProducts;
