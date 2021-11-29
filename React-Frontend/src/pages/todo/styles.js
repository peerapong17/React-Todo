import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  container: {
    height: "100vh",
    width: "100vw",
  },
  title: {
    flexGrow: 1,
  },
  gridContainer: {
    marginTop: "20px",
  },
  circular: {
    marginLeft: "50%",
    marginTop: "70px",
  },
  noTask: {
    display: "flex",
    justifyContent: "center",
    marginTop: "70px",
    fontWeight: "600"
  },
});
