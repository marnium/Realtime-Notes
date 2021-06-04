import React from 'react';
import { toast } from 'react-toastify';
import { Inertia } from '@inertiajs/inertia';
import {
  CardContent,
  TextField,
  Button,
  Container,
  Grid,
  Card,
  Box
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import App, { AuthContext } from '@/Layouts/App';
import '../../../css/app.css';

const Link = (props) => {
  const [autor, setAutor] = React.useState('');
  const [year, setYear] = React.useState('');
  const [page, setPage] = React.useState('');
  const [link, setLink] = React.useState('');
  const [processing, setProcessing] = React.useState(false);
  const [_auth, _setAuth, idEdit, setIdEdit, setTap, idEditLink, setIdEditLink] = React.useContext(AuthContext);

  React.useEffect(() => {
    setTap(4);
  }, []);

  React.useEffect(() => {
    if (props.auth)
      _setAuth(props.auth);
  }, [props.auth]);

  React.useEffect(() => {
    if (props.link) {
      setIdEditLink(props.link.id);
      setLink(props.link.link);
      setPage(props.link.page);
      setYear(props.link.year);
      setAutor(props.link.autor);
    } else {
      setIdEditLink(0);
    }

    return () => {
      setIdEditLink(0);
    }
  }, [props.link]);

  const handleChangeAutor = (event) => {
    setAutor(event.target.value);
  };
  const handleChangeYear = event => {
    setYear(event.target.value);
  };
  const handleChangePage = (event) => {
    setPage(event.target.value);
  };
  const handleChangeLink = event => {
    setLink(event.target.value);
  };

  const handleSubmitLink = (e) => {
    e.preventDefault();

    const config = {
      replace: true,
      preserveState: true,
      onStart: () => setProcessing(true),
      onSuccess: () => {
        toast.success('Se ha guardado tu link', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
      onError: (errors) => {
        Object.keys(errors).forEach(error => {
          let mensaje = errors[error];
          if (error === 'year')
            mensaje = 'El campo año debe tener 4 digitos';
          toast.error(mensaje, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        });
      },
      onFinish: () => {
        setProcessing(false);
      }
    }
    const data = {
      autor: autor,
      year: year,
      page: page,
      link: link,
      id: idEditLink,
    }
    if (!idEditLink) {
      Inertia.post('/app/link', data, config);
    } else {
      Inertia.put('/app/link', data, config);
    }
  };

  return (
    <Container fixed background="red">
      <div className="crud-create-edit">
      <Card>
        <CardContent>
          <form onSubmit={handleSubmitLink}>
            <TextField
              id="create-or-edit-autor"
              name="title"
              label="Autor de la página"
              value={autor}
              onChange={handleChangeAutor}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              type="number"
              id="create-or-edit-year"
              label="Año de publicación"
              variant="outlined"
              value={year}
              onChange={handleChangeYear}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              id="create-or-edit-page"
              label="Nombre de la página"
              variant="outlined"
              value={page}
              onChange={handleChangePage}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              id="create-or-edit-page"
              label="Enlace web"
              variant="outlined"
              value={link}
              onChange={handleChangeLink}
              margin="normal"
              fullWidth
              required
            />
            <Box display="flex" justifyContent="center" mt={1}>
              <Button
                type="submit"
                disabled={processing}
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
              >Guardar Link</Button>
            </Box>
          </form>
        </CardContent>
      </Card>
      </div>
    </Container>
  );
};

Link.layout = page => <App>{page}</App>

export default Link;