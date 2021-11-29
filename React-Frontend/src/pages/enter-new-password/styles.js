import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
    padding: "30px",
    backgroundColor: "#e8fffe",
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
  button: {
    backgroundColor: "#91ff5e",
    fontSize: "18px",
    fontWeight: "700",
    "&:hover": {
      backgroundColor: "#64ff24",
    },
  },
});

export { useStyles };
