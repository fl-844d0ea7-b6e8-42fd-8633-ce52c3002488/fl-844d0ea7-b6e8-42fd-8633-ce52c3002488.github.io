import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
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
    const [validFormInputs, setValidFormInputs] = useState(false)
    const [formErrors, setFormErrors] = useState({ name: '', term: '', definition: ''})

    const validateFormInput = (e) => {
        const isEmpty = (string) => {
            return (string === null || string === "")
        }

        if (e && isEmpty(e.target.value)) {
            switch(e.target.id){
                case "formFlashcardName":
                    setFormErrors({...formErrors, name: "Please enter a value for the flashcard name"})
                    setValidFormInputs(false)
                    break;
                case "formFlashcardTerm":
                    setFormErrors({...formErrors, term: "Please enter a value for the flashcard term"})
                    setValidFormInputs(false)
                    break;
                case "formFlashcardDefinition":
                    setFormErrors({...formErrors, definition: "Please enter a value for the flashcard definition"})
                    setValidFormInputs(false)
                    break;
            }
        }
        else {
            switch (e.target.id) {
                case "formFlashcardName":
                    setFormErrors({ ...formErrors, name: "" })
                    break;
                case "formFlashcardTerm":
                    setFormErrors({ ...formErrors, term: "" })
                    break;
                case "formFlashcardDefinition":
                    setFormErrors({ ...formErrors, definition: "" })
                    break;
            }
        }

        setValidFormInputs(
            Object.values(formErrors).every((val) => (val === ''))
        )

    }

    const handleSubmit = async () => {
        setLoading(true)
        setShowSuccess(false)
        setShowError(false)

        console.log("Making request to insert flashcard")
        console.log(`Valid form inputs?: ${validFormInputs}`)
        if (!validFormInputs){
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
            <Form.Group controlId="formFlashcardName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Enter the name of the flashcard"
                    name="flashcardName"
                    onBlur={validateFormInput}
                    onChange={(e) => setName(e.target.value)}
                    isInvalid={formErrors.name}
                    value={name}
                />
                <Form.Control.Feedback type="invalid">
                    {formErrors.name}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                    Enter the name for the flashcard (e.g. TortCard)
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formFlashcardTerm">
                <Form.Label>Term</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Enter the Term"
                    name="flashcardTerm"
                    onBlur={validateFormInput}
                    onChange={(e) => setTerm(e.target.value)}
                    isInvalid={formErrors.term}
                    value={term}
                />
                <Form.Control.Feedback type="invalid">
                    {formErrors.term}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                    Enter the word you want to define (e.g. Tort)
                </Form.Text>
            </Form.Group>

            <Form.Group>
                <Form.Label>Topic</Form.Label>
                <TopicSelect
                    handleTopicChange={handleTopicChange}
                    newTopicCreated={newTopicCreated}
                />
            </Form.Group>

            <Form.Group controlId="formFlashcardDefinition">
                <Form.Label>Definition</Form.Label>
                <Form.Control
                    required
                    as="textarea"
                    rows="3"
                    placeholder="Enter the Definition"
                    name="flashcardDefinition"
                    invalid={formErrors.definition}
                    onBlur={validateFormInput}
                    onChange={(e) => setDefinition(e.target.value)}
                    value={definition}
                />
                <Form.Control.Feedback type="invalid">
                    {formErrors.definition}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                    Enter the corresponding defintion (e.g. a civil wrong)
                </Form.Text>
            </Form.Group>

            <Alert
                variant="danger"
                show={showError}
                onClose={() => setShowError(false)}
                dismissible
            >
                <Alert.Heading>{errorMessage}</Alert.Heading>
            </Alert>

            <Alert
                variant="success"
                show={showSuccess}
                onClose={() => setShowSuccess(false)}
                dismissible
            >
                <Alert.Heading>{successMessage}</Alert.Heading>
            </Alert>

            <Button
                variant="primary"
                onClick={() => handleSubmit()}>
                {isLoading ? 'Loading...' : 'Submit'}
            </Button>
        </Form>
    )
}

export default CreateFlashcardsForm