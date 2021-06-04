import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Login from '@/Components/Login';
import Register from '@/Components/Register';
import TabPanel from '@/Components/TabPanel';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    boxSizing: 'border-box'
  },
  container: {
    minHeight: 'calc(100vh - 120px)',
    paddingTop: '50px',
    paddingBottom: '50px'
  },
  minHeight: {
    minHeight: 'calc(100vh - 120px)'
  },
  welcome: {
    backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
    padding: '16px 0',
  },
  presentation: {
    paddingTop: '12px',
    backgroundColor: '#9fa8da',
  }
}));

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
    marginBottom: '12px'
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const Welcome = ({ status }) => {
  const classes = useStyles();
  const [tab, setTab] = React.useState(0);

  const handleChangeTap = (e, newTap) => {
    setTab(newTap);
  }

  return (
    <main className={classes.root}>
      <Container fixed className={classes.container}>
        <Card>
          <Grid container direction="row-reverse">
            <Grid item xs={12} md={6}>
              <div className={classes.welcome}>
                <AntTabs
                  value={tab}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleChangeTap}
                >
                  <AntTab label="Login" />
                  <AntTab label="Registro" />
                </AntTabs>
                <Typography variant="h5">
                  {!tab ? 'Accede a tu cuenta' : 'Crea tu cuenta'}
                </Typography>
              </div>
              <CardContent>
                <TabPanel id="login-tab" value={tab} index={0}>
                  <Login status={status} />
                </TabPanel>
                <TabPanel id="register-tab" value={tab} index={1}>
                  <Register />
                </TabPanel>
              </CardContent>
            </Grid>
            <Grid item container xs={12} md={6}
              className={classes.presentation + ' ' + classes.minHeight}>
              <CardContent>
                <Typography variant="h5" align="center" gutterBottom>
                  Bienvenido
                </Typography>
                <Typography variant="body1" align="justify" gutterBottom>
                  Te encuentras en un lugar seguro, libre y apropiado para
                  redactar tus pensamientos, tus metas, tu lista de música
                  favorita o lo que quieras.
                </Typography>
                <Typography variant="body1" align="center">
                  ¡Pero, si te vas, vuelve pronto!
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </main>
  );
};

export default Welcome;