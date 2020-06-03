import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getTopics } from '../connectors/apigateway'
import Form from 'react-bootstrap/Form'
import { array, bool } from 'prop-types'

const TopicSelect = ({ topics, fieldHelpText, value, handleTopicChange, handleCreateTopic }) => {

    const [topicOptionsList, setTopicOptionsList] = useState(topics)
    const [isLoading, setIsLoading] = useState(false)

    String.prototype.toProperCase = function () {
        return this.replace(/\w\S*/g, txt => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    };

    useEffect(() => {
        setTopicOptionsList(
            topics.map(({ topic_id, name, colour }) => {
                return {
                    value: topic_id,
                    label: name,
                    colour
                }
            })
        )
    }, [topics])

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

TopicSelect.proptypes = {
    topics: array,
}

TopicSelect.defaultProps = {
    topics: [],
}

export default TopicSelect