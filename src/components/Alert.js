import React from 'react'
import styled from 'styled-components'

const Alert = ({ message, type = 'ok' }) => {
  return (
    <AlertContainer type={type}>
      <p>{message}</p>
    </AlertContainer>
  )
}

export default Alert

const AlertContainer = styled.div`
  background-color: ${props => props.type === 'ok' ? '#D1E7DD' : '#F8D7DA'};
  text-align: center;
  border-radius:10px;
  padding: 0 5px 0 5px;
`
