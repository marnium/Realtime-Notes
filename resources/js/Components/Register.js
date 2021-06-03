import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailRounded from '@material-ui/icons/EmailRounded';
import LockRounded from '@material-ui/icons/LockRounded';

import ValidationErrors from '@/Components/ValidationErrors';
import Input from '@/Components/Input';
import Button from '@/Components/Button';

const Register = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post('/register', {replace: true});
  };

  return (
    <>
      <ValidationErrors errors={errors} />
      <form onSubmit={submit}>
        <Input
          label="Nombre"
          icon={<AccountCircle />}
          id="register-name"
          value={data.name}
          name="name"
          handleChange={onHandleChange}
        />
        <Input
          label="Apellidos"
          icon={<AccountCircle />}
          id="register-lastname"
          value={data.lastname}
          name="lastname"
          handleChange={onHandleChange}
        />
        <Input
          label="Email"
          icon={<EmailRounded />}
          id="register-email"
          type="email"
          value={data.email}
          name="email"
          handleChange={onHandleChange}
        />
        <Input
          label="Contraseña"
          icon={<LockRounded />}
          id="register-password"
          type="password"
          value={data.password}
          name="password"
          handleChange={onHandleChange}
        />
        <Input
          label="Confirmar contraseña"
          icon={<LockRounded />}
          id="register-confirm-password"
          type="password"
          value={data.password_confirmation}
          name="password_confirmation"
          handleChange={onHandleChange}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button processing={processing}>Registrar</Button>
        </div>
      </form>
    </>
  );
}

export default Register;