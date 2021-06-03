import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { toast } from 'react-toastify';
import {
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailRounded from '@material-ui/icons/EmailRounded';

import App, { AuthContext } from '@/Layouts/App';
import ValidationErrors from '@/Components/ValidationErrors';
import Input from '@/Components/Input';
import Button from '@/Components/Button';

const Home = (props) => {
  const [_auth, _setAuth, idEdit, setIdEdit, setTap] = React.useContext(AuthContext);
  const [edit, setEdit] = React.useState(false);
  const [temData, setTemData] = React.useState({
    name: '',
    lastname: ''
  });
  const {data, setData, post, processing, errors} = useForm({
    name: '',
    lastname: '',
  });

  React.useEffect(() => {
    setTap(0);
  }, []);

  React.useEffect(() => {
    if (props.auth) {
      _setAuth(props.auth);
      setData({name: props.auth.user.name,
        lastname: props.auth.user.lastname});
    }
    
  }, [props.auth]);

  const handleEdit = (event) => {
    if (event.target.checked)
      setTemData({...data});
    else if (!processing)
      setData({...temData});
    setEdit(event.target.checked);
  }

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    setEdit(false);

    post('/user',{
      replace: true,
      onSuccess: () => {
        toast.success('Se actualizaron tus datos', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  return (
    <Container fixed>
      <Typography variant="h4" gutterBottom align="center">
        Bienvenido. Plasma tus pensamientos y creatividad en nuestra página.
      </Typography>
      <Card>
        <CardActions>
          <FormControlLabel
            control={
              <Switch
                checked={edit}
                onChange={handleEdit}
                color="primary"
              />
            }
            label="Editar datos"
          />
        </CardActions>
        <CardContent>
          <ValidationErrors errors={errors} />
          <form onSubmit={submit}>
            <Input
              readonly={!edit}
              label="Nombre"
              icon={<AccountCircle />}
              id="home-name"
              value={data.name}
              name="name"
              handleChange={onHandleChange}
            />
            <Input
              readonly={!edit}
              label="Apellidos"
              icon={<AccountCircle />}
              id="home-lastname"
              value={data.lastname}
              name="lastname"
              handleChange={onHandleChange}
            />
            <Input
              label="Email"
              icon={<EmailRounded />}
              id="home-email"
              type="email"
              value={_auth ? _auth.user.email : ''}
              readonly
            />
            {edit &&
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Button processing={processing}>Actualizar</Button>
              </div>
            }
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

Home.layout = page => <App>{page}</App>

export default Home;