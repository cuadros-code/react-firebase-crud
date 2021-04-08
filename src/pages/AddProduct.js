import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import { useForm } from '../hooks/useForm'
import Alert from '../components/Alert'
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase-config'


const AddProduct = ({ openModal, data }) => {

  const [messageAlert, setMessageAlert] = useState('')
  const [user] = useAuthState(auth)

  const { formValue, onChange, setFormValue } = useForm({
    name: '',
    description: '',
    price: '',
    stock: '',
  })

  const { name, description, price, stock } = formValue

  useEffect(() => {
    if (data) {
      setFormValue(data)
    }
  }, [data])

  const onSubmit = (e) => {
    e.preventDefault()
    if (name === '' || description === '' || price === '' || stock === '') {
      return setMessageAlert('Insert all fields')
    }
    formValue.uid = user.uid
    if (data) {
      db
        .collection('products')
        .doc(data.id)
        .set(formValue)
    } else {
      db
        .collection('products')
        .add(formValue)
    }

    openModal(false)
  }

  return (
    <Container>
      <FormContainer
        onSubmit={onSubmit}
      >
        {
          messageAlert !== ''
          &&
          <>
            <Alert
              message={messageAlert}
              type="err"
            />
          </>
        }
        {
          data
            ?
            <h2>Edit product</h2>
            :
            <h2>Add product</h2>
        }
        <InputText
          id="outlined-basic"
          label="Name"
          name="name"
          onChange={onChange}
          value={name}
          variant="outlined"
        />
        <InputText
          id="outlined-basic"
          label="Description"
          name="description"
          onChange={onChange}
          value={description}
          variant="outlined"
        />
        <InputText
          id="outlined-basic"
          label="Stock"
          name="stock"
          onChange={onChange}
          value={stock}
          type="number"
          variant="outlined"
        />
        <InputText
          id="outlined-basic"
          label="Price"
          name="price"
          onChange={onChange}
          type="number"
          value={price}
          variant="outlined"
        />

        {
          data
            ?
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Edit
            </Button>
            :
            <Button
              variant="contained"
              color="secondary"
              type="submit"
            >
              Save
            </Button>
        }

      </FormContainer>

    </Container >
  )
}

export default AddProduct

const Container = styled.div`
  height: 450px;
  width: 350px;
`
const FormContainer = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`
const InputText = styled(TextField)`
  margin-bottom: 1rem;
`