import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    display: "flex",
    justifyContent: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
    padding: "30px",
    backgroundColor: "#e6ffd1",
    boxShadow: "1px 1px 4px #e8e8e8",
    borderRadius: "3px",
  },
  textField: {
    marginBottom: "23px",
  },
  text: {
    textAlign: "center",
    marginBottom: "27px",
  },
  regisOrResetLink: {
    textAlign: "end",
    marginBottom: "12px",
    color: "black",
    "&:hover": {
      textDecoration: "underline",
      color: "blue",
    },
  },
  button: {
    backgroundColor: "#91ff5e",
    fontSize: "18px",
    fontWeight: "700",
    "&:hover": {
      backgroundColor: "#64ff24",
    },
  },
  googleBtn: {
    marginTop: "10px",
    backgroundColor: "#ffffff",
    fontSize: "18px",
    fontWeight: "700",
    "&:hover": {
      backgroundColor: "#fcfcfc",
    },
  },
  resetOrRegisLinkContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export { useStyles };
