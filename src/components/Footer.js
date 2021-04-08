import React from 'react'

const Footer = () => {
  return (
    <footer
      style={{
        position: 'absolute',
        bottom: 0,
        background: '#E0E0E0',
        width: '100vw',
        textAlign: 'center',
        padding: '13px ',

      }}
    >
      <a
        style={{
          textDecoration: 'none',
        }}
        href="https://kevin-david-cuadros.netlify.app/"
        target="_blank" rel="noopener noreferrer"
      >
        &copy; Kevin David Cuadros
      </a>
    </footer>
  )
}

export default Footer
