import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { esES } from '@material-ui/core/locale';
import { ToastContainer } from 'react-toastify';
import { Inertia } from '@inertiajs/inertia';
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import tabs from '../data/tabs';

export const AuthContext = React.createContext(null);
const theme = createMuiTheme({
  palette: {
    primary: { main: '#1976d2' },
  },
}, esES);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh'
  },
  containerAppBar: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: '12px'
  }
}));

const App = ({ children }) => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(null);
  const [idEdit, setIdEdit] = React.useState(null);
  const [idEditLink, setIdEditLink] = React.useState(null);
  const [tab, setTab] = React.useState(0);
  const [itemMenu, setItemMenu] = React.useState(null);

  const handleChangeTab = (event, newTab) => {
    let url;
    if (idEdit && newTab === 2)
      url = `${tabs[newTab + 1].route}${idEdit}`;
    else if (newTab === 4) {
      if (idEditLink) {
        url = `${tabs[newTab + 1].route}${idEdit}`;
      } else {
        url = tabs[newTab + 2].route;
      }
    } else if (newTab === 3) {
      url = tabs[newTab + 1].route;
    } else
      url = tabs[newTab].route;

    Inertia.get(
      url, {}, {
      replace: true
    })
  };
  const handleClickMenu = event => {
    setItemMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setItemMenu(null);
  };

  const handleLogut = () => {
    Inertia.post('/logout', {}, {
      replace: true
    });
  }

  return (
    <AuthContext.Provider value={[auth, setAuth, idEdit, setIdEdit, setTab, idEditLink, setIdEditLink]}>
      <ToastContainer />
      <main className={classes.root}>
        <ThemeProvider theme={theme}>
          <AppBar position="sticky" color="default">
            <div className={classes.containerAppBar}>
              <Tabs value={tab}
                onChange={handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="Inicio" id="app-tab-inicio" aria-controls="app-tab-inicio" />
                <Tab label="Mis Notas" id="app-tab-notes" aria-controls="app-tab-notes" />
                {idEdit ?
                  <Tab label="Editar Nota" id="app-tab-edit" aria-controls="app-tab-edit" />
                  :
                  <Tab label="Crear Nota" id="app-tab-create" aria-controls="app-tab-create" />
                }
                <Tab label="Mis Link" id="app-tab-links" aria-controls="app-tab-links" />
                {idEditLink ?
                  <Tab label="Editar Link" id="app-tab-edit-link" aria-controls="app-tab-edit-link" />
                  :
                  <Tab label="Crear Link" id="app-tab-create-link" aria-controls="app-tab-create-link" />
                }
              </Tabs>
              <Button
                aria-controls="app-menu"
                aria-haspopup="true"
                onClick={handleClickMenu}
              >{auth && auth.user.name + ' ' + auth.user.lastname}</Button>
              <Menu
                id="app-menu"
                anchorEl={itemMenu}
                keepMounted
                open={Boolean(itemMenu)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={() => {handleCloseMenu(); handleLogut()}}>
                  Cerrar Sesión
                </MenuItem>
              </Menu>
            </div>
          </AppBar>

          <Box component="section" py={2} px={1}>{children}</Box>
        </ThemeProvider>
      </main>
    </AuthContext.Provider>
  );
};

export default App;