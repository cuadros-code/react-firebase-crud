import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FacebookIcon from '@material-ui/icons/Facebook'
import styled from 'styled-components'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useForm } from '../hooks/useForm'
import { auth, GoogleProvider, FacebookProvider } from '../firebase-config'
import AlertContainer from '../components/Alert'

const Register = () => {

  const [messageAlert, setMessageAlert] = useState('')

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth)

  const { formValue, onChange } = useForm({
    email: '',
    password: '',
  })

  const { email, password } = formValue

  console.log(error);

  const handleSubmit = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(email, password)
      .catch(() => setMessageAlert('error when creating user'))
  }

  const handleGoogleAuth = () => {
    auth.signInWithPopup(GoogleProvider)
      .catch(() => setMessageAlert('error when authenticating with google'))

  }
  const handleFacebookAuth = () => {
    auth.signInWithPopup(FacebookProvider)
      .catch(() => setMessageAlert('error when authenticating with facebook'))

  }

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        {
          (error?.message || messageAlert !== '')
          &&
          <AlertContainer
            message={error?.message ? error?.message : messageAlert}
            type="err"
          />
        }
        <h1 style={{ textAlign: 'center' }}  >Sign up</h1>
        <InputText
          id="outlined-basic"
          label="Email"
          name="email"
          variant="outlined"
          value={email}
          onChange={onChange} />

        <InputText
          id="outlined-basic"
          label="Password"
          name="password"
          value={password}
          variant="outlined"
          type="password"
          onChange={onChange} />
        <ButtonForm
          variant="contained"
          color="secondary"
          type="submit"
          disabled={loading}
        >
          Sign Up
        </ButtonForm>
        <ButtonFormGoogle
          variant="contained"
          color="inherit"
          onClick={handleGoogleAuth}
        >
          <ImgGoogle src="/assets/google-icon.svg" alt="" />

         Log In With Google
        </ButtonFormGoogle>
        <ButtonForm
          variant="contained"
          color="primary"
          onClick={handleFacebookAuth}
        >
          <ImgFacebook />
          Log In With Facebook
        </ButtonForm>
      </FormContainer>
    </Container>
  )
}

export default Register

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 100vw;
`
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;

  @media (max-width: 480px) {
  width: 330px;
  }
`

const InputText = styled(TextField)`
  margin-bottom: 1rem;
`

const ButtonForm = styled(Button)`
margin-bottom: 1rem;
`
const ButtonFormGoogle = styled(Button)`
margin-bottom: 1rem;
color: #000;
`

const ImgGoogle = styled.img`
width: 20px;
margin-right: 15px;
`
const ImgFacebook = styled(FacebookIcon)`
width: 25px;
margin-right: 15px;
`