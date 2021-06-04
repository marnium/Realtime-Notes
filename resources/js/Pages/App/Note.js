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

const Note = (props) => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [processing, setProcessing] = React.useState(false);
  const [_auth, _setAuth, idEdit, setIdEdit, setTap] = React.useContext(AuthContext);

  React.useEffect(() => {
    setTap(2);
  }, []);

  React.useEffect(() => {
    if (props.auth)
      _setAuth(props.auth);
  }, [props.auth]);

  React.useEffect(() => {
    if (props.note) {
      setIdEdit(props.note.id);
      setTitle(props.note.title);
      setContent(props.note.content);
    } else {
      setIdEdit(0);
    }

    return () => {
      setIdEdit(0);
    }
  }, [props.note]);

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeContent = event => {
    setContent(event.target.value);
  };

  const handleSubmitNote = (e) => {
    e.preventDefault();
    const config = {
      replace: true,
      preserveState: true,
      onStart: () => setProcessing(true),
      onSuccess: () => {
        toast.success('Se ha guardado tu nota', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
      onError: () => {
        toast.error('No se pudo guardar tu nota', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
      onFinish: () => {
        setProcessing(false);
      }
    }
    const data = {
      title: title,
      content: content,
      id: idEdit,
    }
    if (!idEdit) {
      Inertia.post('/app/note', data, config);
    } else {
      Inertia.put('/app/note', data, config);
    }
  };

  return (
    <Container fixed background="red">
      <div className="crud-create-edit">
          <Card>
            <CardContent>
              <form onSubmit={handleSubmitNote}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      id="create-or-edit-title"
                      name="title"
                      label="Titulo"
                      value={title}
                      onChange={handleChangeTitle}
                      margin="normal"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="create-or-edit-title"
                      label="Escribe tu nota"
                      multiline
                      rows={10}
                      variant="outlined"
                      value={content}
                      onChange={handleChangeContent}
                      margin="normal"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" mt={1}>
                      <Button
                        type="submit"
                        disabled={processing}
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                      >Guardar Nota</Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </div>
    </Container>
  );
};

Note.layout = page => <App>{page}</App>

export default Note;