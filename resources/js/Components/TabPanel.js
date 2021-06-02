import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const TabPanel = ({id, children, value, index, ...other}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${id}-${index}`}
      aria-labelledby={`${id}-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

export default TabPanel;