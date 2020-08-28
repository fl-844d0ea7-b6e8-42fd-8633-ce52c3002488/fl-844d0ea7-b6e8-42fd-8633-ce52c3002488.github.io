import React, { useState } from 'react'
import FlashcardsList from './FlashcardsList'
import Form from 'react-bootstrap/Form'
import FormInput from '../common/FormInput'
import FormAlert from '../common/FormAlert'
import TopicSelect from '../common/TopicSelect'
import Button from 'react-bootstrap/Button'
import { getFlashcards, deleteFlashcard } from '../connectors/apigateway'

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

        const resp = await getFlashcards(name, topicId, term)

        if (resp && resp.data) {

            setLoading(false)

            if (resp.data.length > 0){
                setTerm("")
                setName("")
                setTopicId("")
                setCardsList(parseCardsList(resp.data))
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

    function parseCardsList(cardsArray) {
        console.log("Finding topics")
        const topics = cardsArray && cardsArray.map((item) => { return item.topic_name })

        let uniqueTopics = topics.filter((v, i, a) => a.indexOf(v) === i)

        let parsedCardsList = {}

        for (const key of uniqueTopics) {
            parsedCardsList[key] = []
        }

        cardsArray.forEach((card) => {
            parsedCardsList[card.topic_name].push(card)
        })

        return parsedCardsList
    }

    const handleDelete = async (id) => {
        console.log("Making request to delete Flashcard")

        const resp = await deleteFlashcard(id)

        if (resp && resp.data) {
            setLoading(false)
            if (resp.data.length > 0) {
                Object.entries(cardsList).map(([topic, cardsArray]) => {
                    if (cardsArray.some(card => card.id === id)){
                        const filteredArray = cardsArray.filter(card => card.id !== id)
                        let newObject = {}

                        // remove topic as no flashcards are associated with it anymore
                        if (filteredArray.length == 0) {
                            newObject = cardsList
                            delete newObject[topic]
                        }
                        else{
                            newObject[topic] = filteredArray
                        }
                        setCardsList({ ...cardsList, ...newObject })
                    }
                })
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
                <TopicSelect
                    handleTopicChange={handleTopicChange}
                    fieldHelpText="Select a topic to search by"
                />

                <FormInput
                    labelText="Term"
                    fieldType="text"
                    fieldPlaceholderText="Enter the Term"
                    fieldElementName="flashcardTerm"
                    fieldOnChangeEvent={(e) => setTerm(e.target.value)}
                    fieldGroupControlId="formFlashcardTerm"
                    fieldHelpText="Enter the term you want to search for"
                    fieldValue={term}
                />

                <FormInput
                    labelText="Name"
                    fieldType="text"
                    fieldPlaceholderText="Enter the name of the flashcard"
                    fieldElementName="flashcardName"
                    fieldOnChangeEvent={(e) => setName(e.target.value)}
                    fieldGroupControlId="formFlashcardName"
                    fieldHelpText="Enter the name you want to search by"
                    fieldValue={name}
                />

                <FormAlert
                    alertVariant="danger"
                    showAlert={showError}
                    onCloseEvent={() => setShowError(false)}
                    message={errorMessage}
                />

                <FormAlert
                    alertVariant="success"
                    showAlert={showSuccess}
                    onCloseEvent={() => setShowSuccess(false)}
                    message={successMessage}
                />

                <Button
                    variant="primary"
                    onClick={() => handleSubmit()}>
                    {isLoading ? 'Loading...' : 'Submit'}
                </Button>
            </Form>
            <br/>
            <FlashcardsList
                cardsList={cardsList}
                handleDelete={handleDelete}
            />
        </div>
    )
}

export default FlashcardsViewer