import React, { useState } from 'react';
import '../css/Essays.css';

export default function EssaysNode(props) {
    const [checked, isChecked] = useState({Checked: props.array[props.getIndex] === 1 ? true : false});

    return (
        <li onChange={(e) => {
            isChecked({Checked: !checked.Checked})
            props.updateSaved(props.name, props.getIndex);
        }}
        id={props.prompt}>
            <input type="checkbox" value={checked.Checked} checked={checked.Checked} />
            {props.getIndex+1}.{props.prompt}
        </li>
     )
}