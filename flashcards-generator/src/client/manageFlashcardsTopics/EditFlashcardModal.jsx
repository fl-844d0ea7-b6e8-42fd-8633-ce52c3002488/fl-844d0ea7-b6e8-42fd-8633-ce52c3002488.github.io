import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormInput from '../common/FormInput'
import FormAlert from '../common/FormAlert'
import FormColourPicker from '../common/FormColourPicker'
import TopicSelect from '../common/TopicSelect'
import { updateFlashcard } from '../connectors/apigateway'

const EditFlashcardModal = ({ showModal, id, name, term, colour, definition }) => {

    const [show, setShow] = useState(showModal)
    const [editFlashcardData, setFlashcardData] = useState({})
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleClose = () => setShow(false);

    const submitChange = async () => {
        console.log("Making request to update flashcard")
        initialiseLoadingFormState()

        const resp = await updateFlashcard(id, editFlashcardData)

        if (resp){
            setIsLoading(false)

            console.log(resp)

            if (resp.data === 1) {
                setSuccessMessage("Successfully updated flashcard, you can now close this window")
                setShowSuccess(true)
            } else if (resp.error) {
                setErrorMessage("Something went wrong - your changes have not been saved")
                setShowError(true)
            }
        }
    }

    function initialiseLoadingFormState() {
        setShowError(false)
        setShowSuccess(false)
        setIsLoading(true)
    }

    function validateInputs() {
        if (Object.entries(editFlashcardData).length === 0) {
            setFormErrorStatus("You need to make changes, or close the window")
        }
    }

    function setFormErrorStatus(message) {
        setErrorMessage(message)
        setShowError(true)
    }

    return (
        <Modal show={show} onHide={handleClose} data-cy={'editFlashcardModal'}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Flashcard {name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <FormInput
                        labelText="Name"
                        fieldType="text"
                        fieldPlaceholderText="Enter the Name"
                        fieldElementName="editFlashcardName"
                        fieldOnChangeEvent={(e) => setFlashcardData({...editFlashcardData, name: e.target.value })}
                        fieldGroupControlId="formFlashcardName"
                        fieldHelpText="Enter any changes to the flashcard name here"
                        fieldValue={editFlashcardData.name ? editFlashcardData.name : name}
                    />

                    <FormAlert
                        alertVariant="danger"
                        showAlert={showError}
                        alertCloseEvent={() => setShowError(false)}
                        message={errorMessage}
                    />

                    <FormAlert
                        alertVariant="success"
                        showAlert={showSuccess}
                        alertCloseEvent={() => setShowSuccess(false)}
                        message={successMessage}
                    />

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={submitChange}
                    data-cy={'saveEditFlashcardChanges'}>
                    { isLoading ? "Loading..." : "Save Changes" }
                </Button>
                <Button variant="secondary" onClick={handleClose} data-cy={'closeEditFlashcardModal'}>
                    Cancel
                </Button>
            </Modal.Footer>

        </Modal>
    )
}

export default EditFlashcardModal