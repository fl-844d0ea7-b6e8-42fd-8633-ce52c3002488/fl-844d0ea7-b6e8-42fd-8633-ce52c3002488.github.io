import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormInput from '../common/FormInput'
import FormAlert from '../common/FormAlert'
import CardColumns from 'react-bootstrap/CardColumns'
import { getTopicsByName, getTopics } from '../connectors/flashcardVault'
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
        let dbResponse
        console.log("Handling Topic Search")
        if (topic) {
            console.log("Got topic - searching by topic name")
            dbResponse = await getTopicsByName(topic)
        }
        else {
            console.log("No topic - just getting the full list")
            dbResponse = await getTopics()
        }

        setTopicsList(dbResponse.data)
        console.log(dbResponse.data)
    }

    return (
        <div>
            <Form>
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
            <CardColumns>
                {topicsList.map(({ id, name, colour }, _) => (
                    <TopicCard
                        key={id}
                        name={name}
                        colour={colour}
                        // definition={definition}
                        // handleDelete={handleDelete}
                    />
                ))}
            </CardColumns>
        </div>
    )
}

export default TopicManager