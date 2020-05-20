import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormInput from '../common/FormInput'
import FormAlert from '../common/FormAlert'
import CardColumns from 'react-bootstrap/CardColumns'
import { getTopics, getTopicsByName, deleteTopic } from '../connectors/apigateway'
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
        console.log("Handling Topic Search")

        initialiseFormLoadingState()

        let resp

        if (topic) {
            console.log("Got topic - searching by topic name")
            resp = await getTopicsByName(topic)
            console.log(resp)
        } else {
            console.log("No topic - just getting the full list")
            resp = await getTopics()
        }

        if (resp && resp.data) {
            console.log("Data received!")
            if (resp.data.length > 0) {
                console.log(resp.data)
                updateFormSuccessState(resp.data, "")
            } else {
                console.log("Received empty array")
                updateFormSuccessState([], "Query Successful - but no results were returned")
            }
            return
        }

        if (resp && resp.error && resp.error.response) {
            switch (resp.error.response.status) {
                case 404:
                    updateFormErrorState("Couldn't get any results for that query")
                    break;
                default:
                    updateFormErrorState("Hory Shit - that's not what we expected...")
            }
            return
        }
        else {
            updateFormErrorState("Awww crap, we didn't get a response...")
        }
    }

    const handleDelete = async (id) => {

        const resp = await deleteTopic(id)

        console.log("Got response from deleting topic", resp)

        if (resp) {
            setLoading(false)
        }

        if (resp && resp.data) {
            const filteredTopicsList = topicsList.filter(topic => topic.id != id)
            updateFormSuccessState(filteredTopicsList, 'Successfully deleted topic')
        }

        if (resp && resp.error) {
            updateFormErrorState("Something went wrong... :(")
        }
    }

    function initialiseFormLoadingState(){
        setLoading(true)
        setShowSuccess(false)
        setShowError(false)
        setTopicsList([])
    }

    function updateFormSuccessState(topicList, message) {
        setSuccess(message)
        setTopicsList(topicList)
        setLoading(false)
        message ? setShowSuccess(true): null
    }

    function updateFormErrorState(message){
        setShowError(true)
        setError(message)
        setLoading(false)
    }


    return (
        <div>
            <Form id="topicsForm">
                <FormInput
                    labelText="Name"
                    fieldType="text"
                    fieldPlaceholderText="Enter the name of the flashcard"
                    fieldElementName="topicName"
                    fieldOnChangeEvent={(e) => setTopic(e.target.value)}
                    fieldGroupControlId="formTopicName"
                    fieldHelpText="Enter the name you want to search by"
                    fieldValue={topic}
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
                    onClick={handleTopicSearch}>
                    {isLoading ? 'Loading...' : 'Submit'}
                </Button>
            </Form>
            <br />
            <CardColumns>
                {topicsList
                    ?   topicsList.map(({ topic_id, name, colour }, _) => (
                            <TopicCard
                                key={`${topic_id}_${name}`}
                                id={topic_id}
                                name={name}
                                colour={colour}
                                handleDelete={handleDelete}
                            />
                        ))
                    : null
                }
            </CardColumns>
        </div>
    )
}

export default TopicManager