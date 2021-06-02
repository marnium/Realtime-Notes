import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import EmailRounded from '@material-ui/icons/EmailRounded';
import LockRounded from '@material-ui/icons/LockRounded';

import ValidationErrors from './ValidationErrors';
import Input from './Input';
import CheckBox from './CheckBox';
import Button from './Button';

const Login = ({status}) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: '',
  });

  useEffect(() => {
    return () => reset('password');
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ?
      event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('login'), {
      replace: true
    });
  };

  return (
    <>
      {status && <h3>{status}</h3>}
      <ValidationErrors errors={errors} />
      <form onSubmit={submit}>
        <Input
          icon={<EmailRounded />}
          label="Email"
          id="login-email"
          value={data.email}
          name="email"
          isFocused={true}
          handleChange={onHandleChange}
        />
        <Input
          icon={<LockRounded />}
          label="Contraseña"
          id="login-password"
          type="password"
          value={data.password}
          name="password"
          handleChange={onHandleChange}
        />
        <CheckBox
          label="Mantener sesión"
          value={Boolean(data.remember)}
          name="remember"
          handleChange={onHandleChange}
        />

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: '16px'
        }}>
          <Button processing={processing}>Acceder</Button>
        </div>
      </form>
    </>
  );
}

export default Login;