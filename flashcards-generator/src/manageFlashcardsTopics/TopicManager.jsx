import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormInput from '../common/FormInput'
import FormAlert from '../common/FormAlert'
import CardColumns from 'react-bootstrap/CardColumns'
import { getTopicsByName, getTopics, deleteTopic } from '../connectors/flashcardVault'
import TopicCard from './TopicCard'

const TopicManager = () => {

    const [topic, setTopic] = useState("")
    const [errorMessage, setError] = useState("")
    const [showError, setShowError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [successMessage, setSuccess] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)
    const [topicsList, setTopicsList] = useState([])

    const handleTopicSearch = async () => {
        let resp
        console.log("Handling Topic Search")
        if (topic) {
            console.log("Got topic - searching by topic name")
            resp = await getTopicsByName(topic)
        }
        else {
            console.log("No topic - just getting the full list")
            resp = await getTopics()
        }

        setTopicsList(resp.data)
    }

    const handleDelete = async (id) => {

        const resp = await deleteTopic(id)

        console.log("Got dbResponse from deleting topic", resp)

        if (resp) {
            setLoading(false)
        }

        if (resp && resp.data) {
            const filteredTopicsList = topicsList.filter(topic => topic.id != id)
            setTopicsList(filteredTopicsList)
        }

        if (resp && resp.error) {
            setError("Cannot delete that topic as there are flashcards related to it")
            setShowError(true)
        }
    }

    return (
        <div>
            <Form id="topicsForm">
                <FormInput
                    labelText="Name"
                    fieldType="text"
                    fieldPlaceholderText="Enter the name of the flashcard"
                    fieldElementName="topicName"
                    fieldOnChangeEvent={(e) => setName(e.target.value)}
                    fieldGroupControlId="formTopicName"
                    fieldHelpText="Enter the name you want to search by"
                    fieldValue={name}
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
                    onClick={handleTopicSearch}>
                    {isLoading ? 'Loading...' : 'Submit'}
                </Button>
            </Form>
            <br />
            <CardColumns>
                {topicsList.map(({ topic_id, name, colour }, _) => (
                    <TopicCard
                        key={`${topic_id}_${name}`}
                        id={topic_id}
                        name={name}
                        colour={colour}
                        handleDelete={handleDelete}
                    />
                ))}
            </CardColumns>
        </div>
    )
}

export default TopicManager