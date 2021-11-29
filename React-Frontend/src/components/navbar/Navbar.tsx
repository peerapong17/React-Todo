import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../states/reducers";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
});

const Navbar = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const classes = useStyles();
  const { username } = useSelector((state: RootState) => state.auth);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Todo {username}
        </Typography>
        <Button
          onClick={() => setOpen(true)}
          variant="outlined"
          endIcon={<ExitToAppIcon />}
          color="secondary"
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
