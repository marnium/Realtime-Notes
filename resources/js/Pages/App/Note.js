import React from 'react';
import { toast } from 'react-toastify';
import { Inertia } from '@inertiajs/inertia';
import { makeStyles } from '@material-ui/core/styles';
import {
  CardContent,
  TextField,
  Button,
  Container,
  Grid,
  Card,
  Box,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import App, { AuthContext } from '@/Layouts/App';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    width: '100%',
    height: 450,
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
  titleBarDelete: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  title: {
    color: 'red',
  },
  inputUp: {
    display: 'none',
  },
}));


const Note = (props) => {
  const classes = useStyles();
  const [image, setImage] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [processing, setProcessing] = React.useState(false);
  const [_auth, _setAuth, idEdit, setIdEdit, setTap] = React.useContext(AuthContext);

  const refImageUp = React.useRef(null);
  console.log('Props NOtes: ', props);
  React.useEffect(() => {
    setTap(2);
  }, []);

  React.useEffect(() => {
    console.log('Ejecutando el efecto para el cambio de imagen');
    if (props.image) {
      let img = document.createElement('img');
      img.src = props.image.name;
      img.style.maxWidth = 'auto';
      img.style.height = '300px';
      let container = document.getElementById('note-container-img');
      if (container.firstChild)
        container.removeChild(container.firstChild);
      container.appendChild(img);
      setImage(props.image);
    }
  }, [props.image]);

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
      image_id: image ? image.id : null
    }
    if (!idEdit) {
      console.log('Nueva nota');
      Inertia.post('/app/note', data, config);
    } else {
      console.log('Actualizando datos');
      Inertia.put('/app/note', data, config);
    }
  };

  const handleSubmitImage = () => {
    Inertia.post('/image', {
      'image': refImageUp.current.files[0],
      'note_id': idEdit
    }, {
      forceFormData: true,
      replace: true,
      preserveState: true,
      onStart: () => setProcessing(true),
      onFinish: () => setProcessing(false),
      onSuccess: () => {
        toast.success('Imagen guardada', {
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
        toast.error(error.image || 'No se pudo guardar tu imagen', {
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

  console.log('image_seleccionado: ', image);

  const handleDeleteImage = (image_id) => {
    if (image_id === (image ? image.id : null)) {
      toast.warn('La imagen esta actualmente seleccionada', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    Inertia.visit('/image', {
      data: {
        'image_id': image_id,
        'note_id': idEdit
      },
      method: 'delete',
      replace: true,
      preserveState: true,
      onStart: () => setProcessing(true),
      onFinish: () => setProcessing(false),
      onSuccess: () => {
        toast.success('Imagen Eliminada', {
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
        console.log('Error: ', error);
        toast.error(error.image_id || 'No se pudo eliminar la imagen', {
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

  const handleAddImageToNote = (id, name) => {
    let img = document.getElementById(id);
    let container = document.getElementById('note-container-img');
    let imgClone = img.cloneNode();
    imgClone.id = id + 'copy';
    imgClone.className = '';
    imgClone.style.maxWidth = 'auto';
    imgClone.style.height = '300px';

    if (container.firstChild)
      container.removeChild(container.firstChild);
    container.appendChild(imgClone);

    setImage({ id: id, name: name });
  }

  return (
    <Container fixed background="red">
      <Grid container spacing={1} alignItems="flex-start">
        <Grid item xs={12} md={idEdit ? 6 : 12}>
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
                    <div id="note-container-img" style={{ display: 'flex', justifyContent: 'center' }}>
                    </div>
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
        </Grid>
        {Boolean(idEdit) &&
          <Grid item xs={12} md={6}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px', alignItems: 'center' }}>
              <div>
                <input
                  required
                  ref={refImageUp}
                  accept="image/*"
                  className={classes.inputUp}
                  id="note-upload-image"
                  type="file"
                  onChange={handleSubmitImage}
                />
                <label htmlFor="note-upload-image">
                  <Button variant="contained" color="primary" component="span">
                    Agregar nueva imagen a la galeria
                  </Button>
                </label>
              </div>
            </div>
            <div className={classes.root}>
              <GridList cellHeight={200} spacing={1} className={classes.gridList}>
                {props.images.map(image => (
                  <GridListTile key={image.id} cols={1} rows={1}>
                    <img src={image.name} id={image.id} />
                    <GridListTileBar
                      title="Agregar a la Nota"
                      titlePosition="top"
                      actionIcon={
                        <IconButton disabled={processing}
                          className={classes.icon} onClick={() => handleAddImageToNote(image.id, image.name)}>
                          <AddIcon />
                        </IconButton>
                      }
                      actionPosition="left"
                      className={classes.titleBar}
                    />
                    <GridListTileBar
                      title="Eliminar imagen"
                      classes={{
                        root: classes.titleBarDelete,
                        title: classes.titleDelete,
                      }}
                      actionIcon={
                        <IconButton disabled={processing}
                          onClick={() => handleDeleteImage(image.id)}>
                          <DeleteForeverIcon className={classes.titleDelete} />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </Grid>
        }
      </Grid>
    </Container>
  );
};

Note.layout = page => <App>{page}</App>

export default Note;