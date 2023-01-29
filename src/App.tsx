import React, { useEffect } from "react";
import styles from "./App.module.css";
import { Grid, Avatar } from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  Theme,
  ThemeProvider,
} from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PolymerIcon from "@material-ui/icons/Polymer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./app/store";
import {
  fetchAsyncGetCategory,
  fetchAsyncGetTasks,
  fetchAsyncGetUsers,
  selectEditedTask,
  selectTasks,
} from "./features/task/taskSlice";
import {
  fetchAsyncGetMyProf,
  fetchAsyncGetProfs,
  fetchAsyncUpdateProf,
  selectLoginUser,
  selectProfiles,
} from "./features/auth/authSlice";
import TaskList from "./features/task/TaskList";
import TaskForm from "./features/task/TaskForm";
import TaskDisplay from "./features/task/TaskDisplay";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#3cb371",
    },
  },
});

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    marginTop: theme.spacing(3),
    cursor: "none",
  },
  avatar: {
    marginLeft: theme.spacing(1),
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const editedTask = useSelector(selectEditedTask);
  const tasks = useSelector(selectTasks);
  const loginUser = useSelector(selectLoginUser);
  const profiles = useSelector(selectProfiles);

  const loginProfile = profiles.filter(
    (prof) => prof.user_profile === loginUser.id
  )[0];

  const Logout = () => {
    localStorage.removeItem("localJWT");
    window.location.href = "/";
  };

  const handlerEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput?.click();
  };

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetTasks());
      await dispatch(fetchAsyncGetMyProf());
      await dispatch(fetchAsyncGetUsers());
      await dispatch(fetchAsyncGetCategory());
      await dispatch(fetchAsyncGetProfs());
    };
    fetchBootLoader();
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app__root}>
        <Grid container>
          <Grid item xs={4}>
            <PolymerIcon className={classes.icon} />
          </Grid>
          <Grid item xs={4}>
            <h1>Scrum Task Board</h1>
          </Grid>
          <Grid item xs={4}>
            <div className={styles.app__logout}>
              <button className={styles.app__iconLogout} onClick={Logout}>
                <ExitToAppIcon fontSize="large" />
              </button>
              <input
                type="file"
                id="imageInput"
                hidden={true}
                onChange={(e) => {
                  dispatch(
                    fetchAsyncUpdateProf({
                      id: loginProfile.id,
                      img: e.target.files !== null ? e.target.files[0] : null,
                    })
                  );
                }}
              />
              <button className={styles.app__btn} onClick={handlerEditPicture}>
                <Avatar
                  className={classes.avatar}
                  alt="avatar"
                  src={
                    loginProfile?.img !== null ? loginProfile?.img : undefined
                  }
                />
              </button>
            </div>
          </Grid>
          <Grid item xs={6}>
            {tasks[0]?.task && <TaskList />}
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: "80vh" }}
            >
              <Grid item>
                {editedTask.status ? <TaskForm /> : <TaskDisplay />}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default App;
