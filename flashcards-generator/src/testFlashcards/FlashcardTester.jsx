import Flashcard from './Flashcard'
import React, { useState } from 'react'
import { TestSettings } from './FlashcardsTestSettings'
import TopicSelect from '../common/TopicSelect'
import Form from 'react-bootstrap/Form'
import Tabs from 'react-bootstrap/Tabs'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
import { getFlashcards } from '../connectors/flashcardVault'

const FlashcardsTester = () => {

    const [name, setName] = useState("");
    const [topicId, setTopicId] = useState("");
    const [term, setTerm] = useState("");
    const [cardsList, setCardsList] = useState([]);
    const [errorMessage, setError] = useState("")
    const [showError, setShowError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [successMessage, setSuccess] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)
    // testOption: [0 = Manual, 1=Automatic/Semantic Similarity]
    const [testOption, setTestOption] = useState(1)

    const handleSubmit = async () => {
        setLoading(true)

        console.log("Making request to get flashcards")

        const resp = await getFlashcards(name, topicId, term)

        if (resp && resp.data) {
            setLoading(false)

            if (resp.data.length > 0) {
                console.log(`Got results: ${resp.data.length}`)
                setTerm("")
                setName("")
                setTopicId("")
                setCardsList(resp.data)
            }
            else {
                setSuccess(`Query succesful - No results were returned ${resp.data.length}`)
                setShowSuccess(true)
            }
        }

        if (resp && resp.error) {
            setError(`Sorry! Something went wrong :( \n ${resp.error}`)
            setShowError(true)
            setLoading(false)
        }
    }

    const handleTestOptionChange = (optionValue) => {
        setTestOption(optionValue)
    }

    const handleTopicChange = (topic) => {
        if (topic && topic.value) {
            setTopicId(topic.value)
        }
    }

    return (
        <div className="flashcardsTester">
            <TestSettings handleTestOptionChange={handleTestOptionChange} />
            <br />
            <Form>
                <Form.Label>Topic</Form.Label>
                <Form.Group controlId="formFlashcardTopic">
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
                        disabled
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
            <br />
            <CardDeck>
                {cardsList.map(({ id, term, definition, colour }, index) => (
                    <Flashcard
                        key={index}
                        id={id}
                        color={colour}
                        term={term}
                        definition={definition}
                        testOption={testOption}
                    />
                ))}
            </CardDeck>
        </div>
    )
}

export default FlashcardsTester