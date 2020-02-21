import React from 'react'
import Button from 'react-bootstrap/Button'

const BootstrapButton = ({ onClick, text }) => {
    return (
        <Button
            variant="primary"
            onClick={ onClick }>
            { text }
        </Button>
    )
}

export default BootstrapButton