import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import BootstrapButton from '../common/Button'

const EditFlashcardModal = ({ showModal, name }) => {

    const [show, setShow] = useState(showModal)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submitChange = () => {
        console.log("hahhahhahahah")
    }

    return (
        <Modal show={show} onHide={handleClose} data-cy={'editFlashcardModal'}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Flashcard {name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>


            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={submitChange}>
                    Save Changes
                </Button>
                <Button variant="secondary" onClick={handleClose} data-cy={'closeEditFlashcardModal'}>
                    Cancel
                </Button>
            </Modal.Footer>

        </Modal>
    )
}

export default EditFlashcardModal