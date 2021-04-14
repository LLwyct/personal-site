import React from 'react'
import Header from './Header';
import { css } from '@emotion/react';

export default function Layout({children}) {

    const contentstyle = css`
        max-width: 800px;
        margin: 0 auto;
    `;

    return (
        <main>
            <Header></Header>
            <section css={contentstyle}>
                {children}
            </section>
        </main>
    )
}
