import React, { useState } from 'react'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import AddProduct from './AddProduct';
import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px'
  }
};
Modal.setAppElement('#root')
const Dashboard = () => {

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);


  return (
    <>
      <Container>
        <Button
          variant="contained"
          color="secondary"
          onClick={openModal}
        >
          Add Product <AddIcon />
        </Button>
      </Container>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <AddProduct />
      </Modal>

    </>
  )
}

export default Dashboard

const Container = styled.div`
 padding: 10px;
 width: 100vw; 
height: 100vh;
`



