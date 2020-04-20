import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getTopics } from '../connectors/apigateway'
import Form from 'react-bootstrap/Form'

const TopicSelect = ({ fieldHelpText, newTopicCreated, value, handleTopicChange, handleCreateTopic }) => {

    const [topicOptionsList, setTopicOptionsList] = useState([])

    String.prototype.toProperCase = function () {
        return this.replace(/\w\S*/g, txt => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    };

    useEffect(() => {
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