import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import FormAlert from '../common/FormAlert'
import FormInput from '../common/FormInput'
import TopicSelect from '../common/TopicSelect'
import { insertFlashcard } from '../connectors/flashcardVault'

const CreateFlashcardsForm = ({ newTopicCreated }) => {

    const [name, setName] = useState("");
    const [definition, setDefinition] = useState("");
    const [topicId, setTopicId] = useState("");
    const [term, setTerm] = useState("");
    const [isLoading, setLoading] = useState(false)
    const [errorMessage, setError] = useState("")
    const [showError, setShowError] = useState(false)
    const [successMessage, setSuccess] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)
    const [formErrors, setFormErrors] = useState({ name: false, term: false, definition: false})

    const hasValidFormInputs = () => {
        return Object.values(formErrors).every((val) => (val === '' || val === false))
    }

    const validateFormInput = (e) => {
        const isEmpty = (string) => {
            return (string === null || string === "")
        }

        if (e && isEmpty(e.target.value)) {
            switch(e.target.id){
                case "formFlashcardName":
                    setFormErrors({...formErrors, name: "Please enter a value for the flashcard name"})
                    break;
                case "formFlashcardTerm":
                    setFormErrors({...formErrors, term: "Please enter a value for the flashcard term"})
                    break;
                case "formFlashcardDefinition":
                    setFormErrors({...formErrors, definition: "Please enter a value for the flashcard definition"})
                    break;
            }
        }
        else {
            switch (e.target.id) {
                case "formFlashcardName":
                    setFormErrors({ ...formErrors, name: false })
                    break;
                case "formFlashcardTerm":
                    setFormErrors({ ...formErrors, term: false })
                    break;
                case "formFlashcardDefinition":
                    setFormErrors({ ...formErrors, definition: false })
                    break;
            }
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        setShowSuccess(false)
        setShowError(false)

        if (!hasValidFormInputs() || !topicId){
            setLoading(false)
            setError("There are invalid fields - please check your data is correct")
            setShowError(true)
            return
        }

        const resp = await insertFlashcard(name, topicId, term, definition)

        if (resp && resp.data) {
            setLoading(false)
            setSuccess(`Flashcard ${name} successfully added - feel free to add more!`)
            setShowSuccess(true)
            setTerm("")
            setName("")
            setDefinition("")
            setTopicId("")
        }

        if (resp && resp.error) {
            switch (resp.error.response.status) {
                case 409:
                    setError("Sorry! You've already got a flashcard with that name")
                    setShowError(true)
                    setLoading(false)
                    break
                case 503:
                    setError("Shit really fucked up - like seriously...")
                    setShowError(true)
                    setLoading(false)
                    break
            }
        }
    }

    const handleTopicChange = (topic) => {
        if (topic && topic.value){
            setTopicId(topic.value)
        }
    }

    return (
        <Form>
            <FormInput
                labelText="Name"
                fieldType="text"
                fieldPlaceholderText="Enter the name of the flashcard"
                fieldElementName="flashcardName"
                fieldOnBlurEvent={validateFormInput}
                fieldOnChangeEvent={(e) => setName(e.target.value)}
                fieldGroupControlId="formFlashcardName"
                fieldHelpText="Enter the name for the flashcard (e.g. TortCard)"
                fieldErrorMessage={formErrors.name}
                fieldIsInvalid={formErrors.name}
                fieldValue={name}
            />

            <FormInput
                labelText="Term"
                fieldType="text"
                fieldPlaceholderText="Enter the Term"
                fieldElementName="flashcardTerm"
                fieldOnBlurEvent={validateFormInput}
                fieldOnChangeEvent={(e) => setTerm(e.target.value)}
                fieldGroupControlId="formFlashcardTerm"
                fieldHelpText="Enter the word you want to define (e.g. Tort)"
                fieldErrorMessage={formErrors.term}
                fieldIsInvalid={formErrors.term}
                fieldValue={term}
            />

            <TopicSelect
                handleTopicChange={handleTopicChange}
                newTopicCreated={newTopicCreated}
            />

            <FormInput
                labelText="Definition"
                fieldAs="textarea"
                fieldPlaceholderText="Enter the Definition"
                fieldElementName="flashcardDefinition"
                fieldOnBlurEvent={validateFormInput}
                fieldOnChangeEvent={(e) => setDefinition(e.target.value)}
                fieldGroupControlId="formFlashcardDefinition"
                fieldHelpText="Enter the corresponding defintion (e.g. a civil wrong)"
                fieldErrorMessage={formErrors.definition}
                fieldIsInvalid={formErrors.definition}
                fieldValue={definition}
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
                onClose={() => setShowSuccess(false)}
                message={successMessage}
            />

            <Button
                variant="primary"
                onClick={() => handleSubmit()}>
                {isLoading ? 'Loading...' : 'Submit'}
            </Button>
        </Form>
    )
}

export default CreateFlashcardsForm