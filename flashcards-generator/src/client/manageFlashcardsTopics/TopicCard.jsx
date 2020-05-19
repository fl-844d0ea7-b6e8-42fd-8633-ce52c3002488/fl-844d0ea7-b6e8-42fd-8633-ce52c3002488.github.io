import React, { useState, useMemo } from 'react'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { updateTopicName } from '../connectors/serverData'

const TopicCard = ({ id, name, colour, handleDelete }) => {
    const [edit, setEdit] = useState(false)
    const [newTopicName, setNewTopicName] = useState(name)

    const handleEditClick = () => {
        setEdit(!edit)
    }

    const handleEditTopicNameSubmission = async (e) => {
        if (e.key == "Enter") {
            if (newTopicName && newTopicName !== name) {
                console.log("Making request to update flashcard")

                const resp = await updateTopicName(id, newTopicName)

                if (resp) {
                    console.log("Received request - all good")
                    setEdit(false)
                }
            }
            else {
                setEdit(false)
            }
        }
    }

    // Taken from: https://codepen.io/andreaswik/pen/YjJqpK
    const getAppropriateTextColour = (colour) => {
        var brightness, r, g, b, hsp;

        brightness = colour ? lightOrDark(colour) : "";

        if (brightness == 'dark') {
            return '#fff'
        }
        else {
            return '#000'
        }

        function lightOrDark(color) {
            // Check the format of the color, HEX or RGB?
            if (color.match(/^rgb/)) {

                // If HEX --> store the red, green, blue values in separate variables
                color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

                r = color[1];
                g = color[2];
                b = color[3];
            }
            else {
                // If RGB --> Convert it to HEX: http://gist.github.com/983661
                color = +("0x" + color.slice(1).replace(
                    color.length < 5 && /./g, '$&$&'
                )
                );

                r = color >> 16;
                g = color >> 8 & 255;
                b = color & 255;
            }

            // HSP (Highly Sensitive Perceived Brightness) equation from http://alienryderflex.com/hsp.html
            hsp = Math.sqrt(
                0.299 * (r * r) +
                0.587 * (g * g) +
                0.114 * (b * b)
            );

            // Using the HSP value, determine whether the color is light or dark
            if (hsp > 127.5) {
                return 'light';
            }
            else {
                return 'dark';
            }
        }
    }

    return (
        <Card id={id}>
            <Card.Body style={{ backgroundColor: colour, color: getAppropriateTextColour(colour) }}>
                {
                    edit
                        ?
                            <input type="text"
                                value={newTopicName}
                                onKeyDown={handleEditTopicNameSubmission}
                                onChange={(e) => setNewTopicName(e.target.value)}
                            />
                        : <div className="topicCard">
                            <Card.Text>{(newTopicName)}</Card.Text>
                            <div className="topicIcons">
                                <FontAwesomeIcon icon={faEdit} size="sm" onClick={() => handleEditClick()} />
                                <FontAwesomeIcon icon={faTrash} size="sm" onClick={() => handleDelete(id)} />
                            </div>
                        </div>
                }
            </Card.Body>
        </Card>
    )
}

export default TopicCard