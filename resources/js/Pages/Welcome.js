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
    marginTop: '50px',
    marginBottom: '50px'
  },
  minHeight: {
    minHeight: 'calc(100vh - 120px)'
  },
  welcome: {
    backgroundColor: '#0288d1',
    textAlign: 'center',
    padding: '16px 0',
    color: 'white'
  },
  presentation: {
    paddingTop: '12px',
    backgroundColor: '#b2dfdb',
    color: 'white'
  }
}));

const AntTabs = withStyles({
  root: {
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
      color: 'gray',
      opacity: 1,
    },
    '&$selected': {
      color: 'white',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: 'gray',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const Welcome = ({ status, canResetPassword }) => {
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
                  <Login status={status} canResetPassword={canResetPassword} />
                </TabPanel>
                <TabPanel id="register-tab" value={tab} index={1}>
                  <Register />
                </TabPanel>
              </CardContent>
            </Grid>
            <Grid item container xs={12} md={6}
              className={classes.presentation + ' ' + classes.minHeight}>
              <CardContent>
                <Typography variant="body1">
                  Con esta aplicación tendras todas tus agendas
                  en un solo lugar
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