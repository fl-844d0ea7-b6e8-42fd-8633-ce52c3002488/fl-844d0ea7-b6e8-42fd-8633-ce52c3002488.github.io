import React from 'react'
import { SketchPicker } from 'react-color';
import { CustomPicker } from 'react-color';

const ColourPicker = ({ labelText, handleTopicColourChange, colour }) => {
    return (
        <div id="colourPicker">
            <label>{labelText}</label>
            <SketchPicker
                id="sketchPicker"
                onChangeComplete={handleTopicColourChange}
                color={colour}
            />
        </div>
    )
}


export default CustomPicker(ColourPicker)