import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
}));

const Input = ({
  icon,
  label,
  id,
  type = 'text',
  value,
  name,
  isRequired = true,
  isFocused = false,
  handleChange,
}) => {
  const input = useRef();
  const classes = useStyles();

  useEffect(() => {
    if (isFocused)
      input.current.focus();
  }, []);

  return (
    <div className={classes.margin}>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>{icon}</Grid>
        <Grid item xs>
          <TextField
            fullWidth
            id={id}
            label={label}
            type={type}
            value={value} 
            required={isRequired}
            onChange={handleChange}
            name={name}
            ref={input}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Input;