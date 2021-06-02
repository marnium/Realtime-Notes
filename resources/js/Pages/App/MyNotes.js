import React from 'react';
import Button from '@material-ui/core/Button';
import Conatiner from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import App, {AuthContext} from '@/Layouts/App';
import Table from '@/Components/Table';
import { Inertia } from '@inertiajs/inertia';

const MyNotes = (props) => {
  const [_auth, _setAuth] = React.useContext(AuthContext);
  const headCells = [
    { id: 'id', numeric: true, disablePadding: false, label: 'ID' },
    { id: 'title', numeric: false, disablePadding: false, label: 'Titulo' },
    { id: 'created_at', numeric: false, disablePadding: false, label: 'Fecha creación' },
    { id: 'updated_at', numeric: false, disablePadding: false, label: 'Ultima Actualización' },
    { id: 'edit', numeric: false, disablePadding: false, label: 'Editar' },
  ];

  React.useEffect(() => {
    _setAuth(props.auth);
    
    return () => {
      _setAuth(null);
    }
  }, [props.auth]);

  let notes = [];
  if (props.notes) {
    const configDate = {
      timeZone: 'UTC',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    notes =  props.notes.map(note => ({
      id: note.id,
      title: note.title,
      created_at: new Date(Date.parse(props.notes[0].created_at))
            .toLocaleString('es-ES', configDate),
      updated_at: new Date(Date.parse(props.notes[0].created_at))
            .toLocaleString('es-ES', configDate),
    }));
  }

  const hanldeDelte = (selected) => {
    Inertia.visit(route('app.note'),
    {
      data: {idsNotes: selected},
      replace: true,
      method: 'delete'
    });
  };
  const handleEdit = id => {
    Inertia.get(route('app.note.edit', id), {}, {
      replace: true
    })
  };

  return (
    <Conatiner fixed>
      <Table
        headCells={headCells}
        rows={notes}
        title="Mis Notas"
        onDelete={hanldeDelte}
        onEdit={handleEdit}
      />
    </Conatiner>
  );
};

MyNotes.layout = page => <App>{page}</App>

export default MyNotes;