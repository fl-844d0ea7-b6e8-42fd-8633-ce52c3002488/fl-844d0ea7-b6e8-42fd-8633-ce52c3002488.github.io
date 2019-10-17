import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ColourPicker from '../common/ColourPicker';
import { insertTopic } from '../connectors/flashcardVault';


const CreateTopicsForm = ({handleNewTopic}) => {

    const [topic, setTopic] = useState("");
    const [topicColour, setTopicColour] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [successMessage, setSuccess] = useState("")
    const [errorMessage, setError] = useState("")
    const [showError, setShowError] = useState(false)

    const handleTopicColourChange = ({ hex }) => {
        setTopicColour(hex)
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        setShowError(false)
        setShowSuccess(false)

        const resp = await insertTopic(topic, topicColour)

        if (resp && resp.data) {
            setIsLoading(false)
            setSuccess(`Successfully added topic: ${topic} :)`)
            setShowSuccess(true)
            setTopic("")
            setTopicColour("")
            console.log("Setting new topic created")
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
            <Form.Group controlId="formTopic">
                <Form.Label>Topic</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Enter the Topic"
                    name="flashcardTopic"
                    onChange={(e) => setTopic(e.target.value)}
                    value={topic}
                />
                <Form.Text className="text-muted">
                    Enter the topic name (e.g. Tort Law)
                </Form.Text>
            </Form.Group>

            <Form.Group>
                <ColourPicker
                    labelText={"Set Topic Colour"}
                    handleTopicColourChange={handleTopicColourChange}
                    colour={topicColour}
                />
            </Form.Group>

            <Alert
                variant="success"
                show={showSuccess}
                onClose={() => setShowSuccess(false)}
                dismissible
            >
                <Alert.Heading>{successMessage}</Alert.Heading>
            </Alert>

            <Alert
                variant="danger"
                show={showError}
                onClose={() => setShowError(false)}
                dismissible
            >
                <Alert.Heading>{errorMessage}</Alert.Heading>
            </Alert>


            <Button
                variant="primary"
                onClick={() => handleSubmit()}>
                {isLoading ? 'Loading...' : 'Submit'}
            </Button>
        </Form>
    )
}

export default CreateTopicsForm