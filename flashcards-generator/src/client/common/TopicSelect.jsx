import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getTopics } from '../connectors/apigateway'
import Form from 'react-bootstrap/Form'

const TopicSelect = ({ fieldHelpText, newTopicCreated, value, handleTopicChange, handleCreateTopic }) => {

    const [topicOptionsList, setTopicOptionsList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            const result = await getTopics()
            if (result && result.data) {
                setTopicOptionsList(
                    result.data.map(({ topic_id, name, colour }) => {
                        return {
                            value: topic_id,
                            label: name,
                            colour
                        }
                    })
                )
            }
            setIsLoading(false)
        }
        fetchData()
    }, [newTopicCreated])

    const topicOption = ({value, colour, label}) => {
        return (
            <div className="topicOption" key={value} value={value} id={value}>
                <FontAwesomeIcon icon={faSquareFull} size="lg" color={colour} />
                <span className="topicOptionLabel">{label}</span>
            </div>
        )
    }

    return (
        <Form.Group>
            <Form.Label>Topic</Form.Label>
            <Select
                id="flashcardTopics"
                inputId="flashcardTopicsSearch"
                required
                isClearable
                isLoading={isLoading}
                formatOptionLabel={topicOption}
                options={topicOptionsList}
                onChange={handleTopicChange}
                onCreateOption={handleCreateTopic}
                value={value}
            />
            <Form.Text className="text-muted">
                {fieldHelpText ? fieldHelpText : ""}
            </Form.Text>
        </Form.Group>
    )
}

export default TopicSelect