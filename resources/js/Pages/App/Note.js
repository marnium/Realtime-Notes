import React from 'react';
import { toast } from 'react-toastify';
import { Inertia } from '@inertiajs/inertia';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import App, {AuthContext} from '@/Layouts/App';

const Note = (props) => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [processing, setProcessing] = React.useState(false);
  const [_auth, _setAuth, idEdit, setIdEdit] = React.useContext(AuthContext);

  React.useEffect(() => {
    _setAuth(props.auth);

    if (props.note) {
      setIdEdit(props.note.id);
      setTitle(props.note.title);
      setContent(props.note.content);
    } else {
      setIdEdit(0);
    }
    
    return () => {
      _setAuth(null);
      setIdEdit(0)
    }
  }, [props.auth]);

  console.log('Props de Note', props);

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeContent = event => {
    setContent(event.target.value);
  };
  const handleClick = (e) => {
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
      onError: (error) => {
        console.log("error: ", error);
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
      id: idEdit
    }
    if (!idEdit) {
      console.log('Nueva nota');
      Inertia.post(route('app.note'), data, config);
    } else {
      console.log('Actualizando datos');
      Inertia.put(route('app.note'), data, config);
    }
  };

  return (
    <Container fixed>
      <Box display="flex" flexDirection="column">
      <TextField
          id="create-or-edit-title"
          name="title"
          label="Titulo"
          value={title}
          onChange={handleChangeTitle}
          margin="normal"
          required
        />
        <TextField
          id="create-or-edit-title"
          label="Escribe tu nota"
          multiline
          rows={10}
          variant="outlined"
          value={content}
          onChange={handleChangeContent}
          margin="normal"
          required
        />
        <Button
          onClick={handleClick}
          variant="outlined"
          color="primary"
          disabled={processing}
        >Guardar nota</Button>
      </Box>
    </Container>
  );
};

Note.layout = page => <App>{page}</App>

export default Note;