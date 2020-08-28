import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { updateFlashcard } from '../connectors/apigateway'
import EditFlashcardModal from './EditFlashcardModal'

const Flashcard = ({ id, name, term, definition, colour, handleDelete }) => {
    const [edit, setEdit] = useState(false)
    const [editFlashcardData, setFlashcardData] = useState({ name, term, definition })

    const handleEditClick = () => {
        setEdit(!edit)
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
        <>
            <Card id={id}>
                <Card.Header style={{backgroundColor: colour, color: getAppropriateTextColour(colour)}}>
                    {(editFlashcardData.term)}
                    <div className="flashcardsIcons">
                        <FontAwesomeIcon icon={faEdit} size="sm" onClick={() => handleEditClick()}/>
                        <FontAwesomeIcon icon={faTrash} size="sm" onClick={() => handleDelete(id)}/>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Text>{editFlashcardData.definition}</Card.Text>
                </Card.Body>
            </Card>
            {
                edit
                    ? <EditFlashcardModal
                        id={id}
                        name={editFlashcardData.name}
                        term={editFlashcardData.term}
                        colour={editFlashcardData.colour}
                        definition={editFlashcardData.definition}
                        setFlashcardData={setFlashcardData}
                        showModal={edit} />
                    : null
            }
        </>
    )
}

export default Flashcard
