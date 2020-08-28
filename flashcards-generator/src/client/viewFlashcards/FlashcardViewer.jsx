import React, { useState } from 'react'
import FlashcardsList from './FlashcardsList'
import CardColumns from 'react-bootstrap/CardColumns'
import Form from 'react-bootstrap/Form'
import FormInput from '../common/FormInput'
import FormAlert from '../common/FormAlert'
import TopicSelect from '../common/TopicSelect'
import Button from 'react-bootstrap/Button'
import { getFlashcards } from '../connectors/apigateway'

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

    const parseCardsList = (cardsArray) => {
        const topics = cardsArray.map((item) => { return item.topic_name })
        //  research this
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
                setTerm("")
                setName("")
                setTopicId("")
                setCardsList(
                    parseCardsList(resp.data)
                )
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
            />
        </div>
    )
}

export default FlashcardsViewer