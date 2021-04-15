import React from 'react'
import Header from './Header';
import { css } from '@emotion/react';

export default function Layout({children}) {

    const contentstyle = css`
        max-width: 800px;
        margin: 0 auto;
        padding: 0 1em;
    `;

    return (
        <>
            <Header></Header>
            <main css={contentstyle}>
                {children}
            </main>
        </>
    )
}
