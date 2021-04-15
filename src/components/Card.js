import React from 'react'
import {css} from '@emotion/react';
import styled from '@emotion/styled';
import Pill from './Pill';

const PillList = styled.div`
    div + div {
        margin-left: 15px;
    }
`;

export default function Card(props) {
    const cardstyle = css`
        transition: all 0.35s ease;
        padding: 0.4em 1.8em;
        border-radius: 10px;
        &:hover {
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
            transform: translateY(-10px);
        }
    `;
    return (
        <div css={cardstyle}>
            <h3>{props.title}</h3>
            <PillList>
                <Pill value="Algorithm" />
                <Pill value="刷题" />
                <Pill value="日常" />
            </PillList>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, natus perferendis! Harum, molestias iusto! Similique.</p>
        </div>
    )
}
