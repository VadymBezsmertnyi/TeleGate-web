const styles = {
  container: {
    width: "100%",
  },
  containerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #e0e0e0",
  },
  containerBody: {
    padding: "20px",
    display: "flex",
    gap: 3,
  },
  containerInputs: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  input: {
    width: "-webkit-fill-available",
  },
  button: {
    width: "-webkit-fill-available",
  },
  containerTypeWorkshop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  containerInfo: {
    width: "-webkit-fill-available",
  },
  containerTypeServices: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  containerServices: {
    display: "flex",
    flexDirection: "row",
    gap: 1,
  },
  containerImages: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 1,
  },
  image: {
    objectFit: "contain" as const,
  },
};

export default styles;
