import React from 'react'
import styled from "@emotion/styled"


export default function Pill({value}) {
    const Pill = styled.div`
        padding: 2px 7px;
        background-color: #3d5af1;
        color: white;
        display: inline-block;
        font-size: 0.8em;
        border-radius: 5px;
    `;
    return (
        <Pill>
            {value}
        </Pill>
    )
}
