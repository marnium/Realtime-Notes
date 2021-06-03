import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function ValidationErrors({ errors }) {
  return (
    Object.keys(errors).length > 0 && (
      <div style={{marginBottom: '16px', color: 'red'}}>
        <Typography variant="h6">Hay algunos errores con tus datos.</Typography>
        <ul style={ {listStyleType: 'disc', listStylePosition: 'inside'} }>
          {Object.keys(errors).map((key, index) => <li key={ index }>{ errors[key] }</li>)}
        </ul>
      </div>
    )
  );
}
