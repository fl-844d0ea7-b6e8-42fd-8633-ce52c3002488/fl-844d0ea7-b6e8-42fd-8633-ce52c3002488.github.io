import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getTopics } from '../connectors/flashcardVault'

const TopicSelect = ({ newTopicCreated, value, handleTopicChange, handleCreateTopic }) => {

    const [topicOptionsList, setTopicOptionsList] = useState([])

    String.prototype.toProperCase = function () {
        return this.replace(/\w\S*/g, txt => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await getTopics()
            if (result) {
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
                <span>{label}</span>
                <FontAwesomeIcon icon={faSquareFull} size="lg" color={colour} />
            </div>
        )
    }

    return (
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
    )
}

export default TopicSelect