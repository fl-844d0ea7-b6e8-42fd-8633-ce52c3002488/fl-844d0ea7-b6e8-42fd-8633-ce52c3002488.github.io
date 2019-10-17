import React, { useState } from 'react'
import Flashcard from './Flashcard'
import CardColumns from 'react-bootstrap/CardColumns'
import Form from 'react-bootstrap/Form'
import TopicSelect from '../common/TopicSelect'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { getFlashcards, deleteFlashcard } from '../connectors/flashcardVault'

const FlashcardsViewer = () => {

    const [name, setName] = useState("");
    const [topicId, setTopicId] = useState("");
    const [term, setTerm] = useState("");
    const [cardsList, setCardsList] = useState([]);
    const [errorMessage, setError] = useState("")
    const [showError, setShowError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [successMessage, setSuccess] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        setShowError(false)
        setShowSuccess(false)

        console.log("Making request to get flashcards")
        console.log(`Using search terms name: ${name}, topic: ${topicId}, term: ${term}`)

        const resp = await getFlashcards(name, topicId, term)

        if (resp && resp.data) {
            setLoading(false)

            if (resp.data.length > 0){
                console.log('Got results:', resp.data)
                setTerm("")
                setName("")
                setTopicId("")
                setCardsList(resp.data)
            }
            else {
                setSuccess(`Query succesful - No results were returned ${resp.data.length}`)
                setShowSuccess(true)
                setCardsList([])
            }
        }

        if (resp && resp.error) {
            setError(`Sorry! Something went wrong :( \n ${resp.error}`)
            setShowError(true)
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        console.log("Making request to delete Flashcard")

        const resp = await deleteFlashcard(id)

        if (resp && resp.data) {
            setLoading(false)

            if (resp.data.length > 0) {
                console.log('Got results:', resp.data)
                setCardsList(cardsList.filter(card => card.id != id))
            }
            else {
                setSuccess(`Query succesful - No results were returned ${resp.data.length}`)
                setShowSuccess(true)
                setCardsList([])
            }
        }

        if (resp && resp.error) {
            setError(`Sorry! Something went wrong :( \n ${resp.error}`)
            setShowError(true)
            setLoading(false)
        }
    }

    const handleTopicChange = (topic) => {
        if (topic && topic.value){
            setTopicId(topic.value)
        }
    }

    return (
        <div className="flashcardsViewer">
            <Form>
                <Form.Group controlId="formFlashcardTopic">
                    <Form.Label>Topic</Form.Label>
                    <TopicSelect
                        handleTopicChange={handleTopicChange}
                    />
                </Form.Group>

                <Form.Group controlId="formFlashcardTerm">
                    <Form.Label>Term</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="By Term"
                        name="flashcardTerm"
                        onChange={(e) => setTerm(e.target.value)}
                        value={term}
                        // disabled
                    />
                    <Form.Text className="text-muted">
                        Enter the term you want to search for
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formFlashcardTerm">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="By Name"
                        name="flashcardName"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <Form.Text className="text-muted">
                        Enter the definition you want to search by
                    </Form.Text>
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
            <br/>
            <CardColumns>
                {cardsList.map(({id, term, definition, colour}, _) => (
                    <Flashcard
                        key={id}
                        id={id}
                        term={term}
                        colour={colour}
                        definition={definition}
                        handleDelete={handleDelete}
                    />
                ))}
            </CardColumns>
        </div>
    )
}

export default FlashcardsViewer