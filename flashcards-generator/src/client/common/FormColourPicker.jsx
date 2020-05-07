import React from 'react'
import ColourPicker from './ColourPicker'
import Form from 'react-bootstrap/Form'

const FormColourPicker = ({
    handleTopicColourChange,
    fieldErrorMessage,
    fieldGroupControlId,
    labelText,
    topicColour
}) => {
    return (
        <Form.Group controlId={fieldGroupControlId}>
            <Form.Label>{labelText}</Form.Label>
            <ColourPicker
                labelText={"Set Topic Colour"}
                handleTopicColourChange={handleTopicColourChange}
                colour={topicColour}
            />
            <Form.Control.Feedback type="invalid" data-cy="formInvalid">
                {fieldErrorMessage ? fieldErrorMessage : ""}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export default FormColourPicker