import { Button } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import { useForm } from '../hooks/useForm'
import Alert from '../components/Alert'
import { useCollection } from 'react-firebase-hooks/firestore';


const AddProduct = () => {

  const { formValue, onChange } = useForm({
    name: '',
    description: '',
    price: '',
    stock: '',
  })

  const { name, description, price, stock } = formValue

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <Container>
      <FormContainer
        onSubmit={onSubmit}
      >
        <Alert
          message="Insert all fields"
          type="err"
        />
        <h2>Add product</h2>
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

        <Button
          variant="contained"
          color="secondary"
          type="submit"
        >
          Save
      </Button>
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