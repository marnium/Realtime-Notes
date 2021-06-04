import React from 'react';
import Conatiner from '@material-ui/core/Container';

import App, {AuthContext} from '@/Layouts/App';
import TableLinks from '@/Components/TableLinks';
import { Inertia } from '@inertiajs/inertia';

const MyLinks = (props) => {
  const [_auth, _setAuth, idEdit, setIdEdit, setTap] = React.useContext(AuthContext);
  const headCells = [
    { id: 'id', numeric: true, disablePadding: false, label: 'ID' },
    { id: 'autor', numeric: false, disablePadding: false, label: 'Autor' },
    { id: 'year', numeric: false, disablePadding: false, label: 'Año de publicación' },
    { id: 'page', numeric: false, disablePadding: false, label: 'Nombre de la página' },
    { id: 'link', numeric: false, disablePadding: false, label: 'Link' },
    { id: 'created_at', numeric: false, disablePadding: false, label: 'Fecha creación' },
    { id: 'updated_at', numeric: false, disablePadding: false, label: 'Ultima Actualización' },
    { id: 'edit', numeric: false, disablePadding: false, label: 'Editar' },
  ];

  React.useEffect(() => {
    setTap(3);
  }, []);

  React.useEffect(() => {
    if (props.auth)
      _setAuth(props.auth);
  }, [props.auth]);

  let links = [];
  if (props.links) {
    const configDate = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }
    links =  props.links.map(link => ({
      id: link.id,
      autor: link.autor,
      year: link.year,
      page: link.page,
      link: link.link,
      created_at: new Date(link.created_at)
            .toLocaleString('es-ES', configDate),
      updated_at: new Date(link.updated_at)
            .toLocaleString('es-ES', configDate),
    }));
  }

  const handleEdit = id => {
    Inertia.get(`/app/link/${id}`, {}, {
      replace: true
    })
  };

  return (
    <Conatiner fixed>
      <TableLinks
        headCells={headCells}
        rows={links}
        title="Mis Links"
        onEdit={handleEdit}
      />
    </Conatiner>
  );
};

MyLinks.layout = page => <App>{page}</App>

export default MyLinks;