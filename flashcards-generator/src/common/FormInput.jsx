import React from 'react'
import Form from 'react-bootstrap/Form'

const FormInput = ({
    labelText,
    fieldErrorMessage,
    fieldIsInvalid,
    fieldHelpText,
    fieldType,
    fieldPlaceholderText,
    fieldElementName,
    fieldValue,
    fieldOnBlurEvent,
    fieldOnChangeEvent,
    fieldGroupControlId,
    fieldAs
}) => {
    return (
        <Form.Group controlId={fieldGroupControlId}>
            <Form.Label>{labelText}</Form.Label>
            <Form.Control
                as={fieldAs}
                type={fieldType}
                placeholder={fieldPlaceholderText}
                name={fieldElementName}
                onBlur={fieldOnBlurEvent}
                onChange={fieldOnChangeEvent}
                isInvalid={fieldIsInvalid}
                value={fieldValue}
            />
            <Form.Control.Feedback type="invalid">
                {fieldErrorMessage ? fieldErrorMessage : ""}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
                {fieldHelpText ? fieldHelpText : ""}
            </Form.Text>
        </Form.Group>
    )
}

export default FormInput