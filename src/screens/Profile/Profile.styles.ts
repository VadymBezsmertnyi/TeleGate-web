const styles = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 2,
    gap: 2,
  },
  containerMain: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    borderBottom: "1px solid #e0e0e0",
  },
  containerNotImage: {
    width: 200,
    height: 200,
    bgcolor: "grey.300",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  containerMainInfo: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    gap: 2,
  },
  containerBusiness: {},
  containerItems: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 2,
  },
  containerItem: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    borderBottom: "1px solid #e0e0e0",
  },
  titleItem: {
    width: "100%",
    padding: 2,
  },
};

export default styles;
