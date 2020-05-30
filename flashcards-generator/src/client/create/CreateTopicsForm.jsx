import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormColourPicker from '../common/FormColourPicker';
import FormInput from '../common/FormInput';
import FormAlert from '../common/FormAlert';
import { insertTopic } from '../connectors/apigateway';


const CreateTopicsForm = ({handleNewTopic}) => {

    const [topic, setTopic] = useState("");
    const [topicColour, setTopicColour] = useState("")
    const [successMessage, setSuccess] = useState("")
    const [errorMessage, setError] = useState("")
    const [showError, setShowError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [validFormInputs, setValidFormInputs] = useState(false)
    const [formErrors, setFormErrors] = useState({topicName: '', topicColour: ''})

    async function handleSubmit() {

        initialiseFormState()

        if (!validFormInputs) {
            setLoading(false)
            setError("Please ensure all mandatory fields are filled")
            setShowError(true)
            return
        }

        const resp = await insertTopic(topic, topicColour)

        setLoading(false)

        if (resp && resp.data) {
            updateFormSuccessState()
            return
        }

        if (resp && resp.error) {
            setShowError(true)

            if (!resp.error.response) {
                setError("Awww poop. No response at all :( - please try again, have mercy")
                return
            }

            switch (resp.error.response.status) {
                case 409:
                    setError("A topic with that name already exists - please try again")
                    break
                default:
                    setError("Something went wrong - please try again later")
            }
        }
    }

    function initialiseFormState() {
        setLoading(true)
        setShowError(false)
        setShowSuccess(false)
    }

    function updateFormSuccessState() {
        setSuccess(`Successfully added topic: ${topic} :)`)
        setShowSuccess(true)
        setTopic("")
        setTopicColour("")
        handleNewTopic()
    }

    function validateFormInput(event) {
        if (event && isEmptyString(event.target.value)) {
            setFormErrors({ ...formErrors, topicName: "Please enter a value for the topic name" })
            setValidFormInputs(false)

            if (isEmptyString(topicColour)) {
                setFormErrors({...formErrors, topicColour: "Please pick a colour for the topic"})
            }
        }
        else {
            setFormErrors({...formErrors, topicName: ''})
            setValidFormInputs(true)
        }

        function isEmptyString(string) {
            return (string === null || string === "")
        }
    }

    const handleTopicColourChange = ({ hex }) => {
        setTopicColour(hex)
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

            <FormColourPicker
                fieldGroupControlId="formColourPicker"
                fieldErrorMessage={formErrors.topicColour}
                handleTopicColourChange={handleTopicColourChange}
                topicColour={topicColour}
            />

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