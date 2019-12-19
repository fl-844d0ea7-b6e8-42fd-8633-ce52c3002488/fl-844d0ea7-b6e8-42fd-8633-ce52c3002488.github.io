import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ColourPicker from '../common/ColourPicker';
import FormInput from '../common/FormInput';
import FormAlert from '../common/FormAlert';
import { insertTopic } from '../connectors/flashcardVault';


const CreateTopicsForm = ({handleNewTopic}) => {

    const [topic, setTopic] = useState("");
    const [topicColour, setTopicColour] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [successMessage, setSuccess] = useState("")
    const [errorMessage, setError] = useState("")
    const [showError, setShowError] = useState(false)
    const [validFormInputs, setValidFormInputs] = useState(false)
    const [formErrors, setFormErrors] = useState({topicName: ''})

    const validateFormInput = (e) => {
        const isEmpty = (string) => {
            return (string === null || string === "")
        }

        if (e && isEmpty(e.target.value)) {
            setFormErrors({ ...formErrors, topicName: "Please enter a value for the topic name" })
            setValidFormInputs(false)
        }
        else {
            setFormErrors({...formErrors, topicName: ''})
            setValidFormInputs(true)
        }

    }

    const handleTopicColourChange = ({ hex }) => {
        setTopicColour(hex)
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        setShowError(false)
        setShowSuccess(false)

        if (!validFormInputs){
            setIsLoading(false)
            setError("Please ensure all mandatory fields are filled")
            setShowError(true)
            return
        }

        const resp = await insertTopic(topic, topicColour)

        if (resp && resp.data) {
            setIsLoading(false)
            setSuccess(`Successfully added topic: ${topic} :)`)
            setShowSuccess(true)
            setTopic("")
            setTopicColour("")
            handleNewTopic()
        }

        if (resp && resp.error) {
            setIsLoading(false)
            setShowError(true)

            switch (resp.error.response.status) {
                case 409:
                    setError("That topic already exists apparently")
                    break
                case 503:
                    setError("Oooooh... That's like real bad... Something real bad")
                    break
            }
        }
    }

    return (
        <Form>
            <FormInput
                fieldGroupControlId="formTopic"
                fieldType="text"
                fieldPlaceholderText="Enter the Topic"
                fieldElementName="flashcardTopic"
                fieldOnBlurEvent={validateFormInput}
                fieldOnChangeEvent={(e) => setTopic(e.target.value)}
                fieldIsInvalid={formErrors.topicName}
                fieldErrorMessage={formErrors.topicName}
                fieldHelpText="Enter the topic name (e.g. Tort Law)"
                fieldValue={topic}
            />

            <Form.Group>
                <ColourPicker
                    labelText={"Set Topic Colour"}
                    handleTopicColourChange={handleTopicColourChange}
                    colour={topicColour}
                />
            </Form.Group>

            <FormAlert
                alertVariant="success"
                showAlert={showSuccess}
                onCloseEvent={() => setShowSuccess(false)}
                message={successMessage}
            />

            <FormAlert
                alertVariant="danger"
                showAlert={showError}
                onCloseEvent={() => setShowError(false)}
                message={errorMessage}
            />

            <Button
                variant="primary"
                onClick={() => handleSubmit()}>
                {isLoading ? 'Loading...' : 'Submit'}
            </Button>
        </Form>
    )
}

export default CreateTopicsForm