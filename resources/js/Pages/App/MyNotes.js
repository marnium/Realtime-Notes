import React from 'react';
import Conatiner from '@material-ui/core/Container';

import App, {AuthContext} from '@/Layouts/App';
import Table from '@/Components/Table';
import { Inertia } from '@inertiajs/inertia';

const MyNotes = (props) => {
  const [_auth, _setAuth, idEdit, setIdEdit, setTap] = React.useContext(AuthContext);
  const headCells = [
    { id: 'id', numeric: true, disablePadding: false, label: 'ID' },
    { id: 'title', numeric: false, disablePadding: false, label: 'Titulo' },
    { id: 'created_at', numeric: false, disablePadding: false, label: 'Fecha creación' },
    { id: 'updated_at', numeric: false, disablePadding: false, label: 'Ultima Actualización' },
    { id: 'edit', numeric: false, disablePadding: false, label: 'Editar' },
  ];

  React.useEffect(() => {
    setTap(1);
  }, []);

  React.useEffect(() => {
    if (props.auth)
      _setAuth(props.auth);
  }, [props.auth]);

  let notes = [];
  if (props.notes) {
    const configDate = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }
    notes =  props.notes.map(note => ({
      id: note.id,
      title: note.title,
      created_at: new Date(note.created_at)
            .toLocaleString('es-ES', configDate),
      updated_at: new Date(note.updated_at)
            .toLocaleString('es-ES', configDate),
    }));
  }

  const handleEdit = id => {
    Inertia.get(`/app/note/${id}`, {}, {
      replace: true
    })
  };

  return (
    <Conatiner fixed>
      <Table
        headCells={headCells}
        rows={notes}
        title="Mis Notas"
        onEdit={handleEdit}
      />
    </Conatiner>
  );
};

MyNotes.layout = page => <App>{page}</App>

export default MyNotes;