import React from 'react';
import Typografy from '@material-ui/core/Typography';
import App, {AuthContext} from '@/Layouts/App';

const Home = (props) => {
  const [_auth, _setAuth] = React.useContext(AuthContext);

  React.useEffect(() => {
    _setAuth(props.auth);
    
    return () => {
      _setAuth(null);
    }
  }, [props.auth]);
  
  return (
    <Typografy variant="h2">
      Bienvenido. A tomar notas se ha dicho.
    </Typografy>
  );
}

Home.layout = page => <App>{page}</App>

export default Home;