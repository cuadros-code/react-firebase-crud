import React, { useState } from 'react'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import AddProduct from './AddProduct';
import Modal from 'react-modal';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2'

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
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

Modal.setAppElement('#root')
const Dashboard = () => {

  const classes = useStyles();
  const [infoEdit, setInfoEdit] = useState(null)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [user,] = useAuthState(auth)

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false)
    setInfoEdit(null)
  };

  const [productsSnapshot] = useCollection(
    db
      .collection('products')
      .where('uid', '==', user ? user.uid : '')
  )

  const handleDeleteProduct = (idProduct) => {
    Swal.fire({
      title: 'Remove Product',
      text: "the information cannot be retrieved",
      showDenyButton: true,
      confirmButtonText: `Delete`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        db
          .collection('products')
          .doc(idProduct)
          .delete()
        Swal.fire('Removed!', '', 'success')
      }
    })
  }

  const handleEditProduct = async (idProduct) => {

    try {
      const product = await db
        .collection('products')
        .doc(idProduct)
        .get()
      const productToEdit = {
        ...product.data(),
        id: product.id
      }
      setIsOpen(true)
      setInfoEdit(productToEdit)
    } catch (error) {
      console.log(error);
    }
  }

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
        <ContainerTable>
          <TableContaint component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right" >Name</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Stock</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productsSnapshot?.docs?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="right">{row.data().name}</TableCell>
                    <TableCell align="right">{row.data().description}</TableCell>
                    <TableCell align="right">{row.data().stock}</TableCell>
                    <TableCell align="right">{row.data().price}</TableCell>
                    <TableCell align="right">
                      <ButtonTable
                        variant="contained"
                        color="primary"
                        onClick={() => handleDeleteProduct(row.id)}
                      >
                        Delete
                      </ButtonTable>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleEditProduct(row.id)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContaint>
        </ContainerTable>

      </Container>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <AddProduct openModal={setIsOpen} data={infoEdit} />
      </Modal>



    </>
  )
}

export default Dashboard

const ButtonTable = styled(Button)`
 margin-right: 1rem;
`

const Container = styled.div`
  padding: 10px;
  width: 100vw; 
  height: 100vh;
`
const ContainerTable = styled.div`
margin-top: 1rem;
  display: flex;
 justify-content: center;
 align-items: center;
`
const TableContaint = styled(TableContainer)`
 width: 70%;

 @media (max-width: 900px){
  width: 90%;
 }
 @media (max-width: 700px){
  width: 100%;
 }

`



