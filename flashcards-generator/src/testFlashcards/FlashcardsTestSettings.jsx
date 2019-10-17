import React, { useState } from 'react'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

export const TestSettings = ({handleTestOptionChange}) => {
        const [value, setValue] = useState([1, 3]);

    const handleChange = val => { handleTestOptionChange(val); setValue(val) }

        return (
            <div className="d-flex flex-column">
                <ToggleButtonGroup
                    name="testOptions"
                    type="radio"
                    value={value}
                    size="md"
                    onChange={handleChange}
                >
                    <ToggleButton value={0}> Test Manually </ToggleButton>
                    <ToggleButton value={1}> Mark answers automagically </ToggleButton>
                </ToggleButtonGroup>
            </div>
        )
}
