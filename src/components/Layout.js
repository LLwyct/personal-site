import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { css } from '@emotion/react';

export default function Layout({children}) {
    const contentstyle = css`
        max-width: 800px;
        margin: 0 auto;
        padding: 0 1em;
    `;
    let colorMode = undefined;
    if (window) {
        colorMode = localStorage.getItem("b0ee67a4b84e9f55");
        if (!colorMode) {
            colorMode = "dark";
            console.log("change to dark mode");
            setTimeout(() => {
                document.body.classList.add(colorMode.toString());
                localStorage.setItem("b0ee67a4b84e9f55", "dark");
            }, 1000);
        } else {
            document.body.classList.add(colorMode.toString());
        }
    }
    
    return (
      <>
        <Header colorMode={colorMode ? colorMode : "light"}></Header>
        <main css={contentstyle}>{children}</main>
        <Footer></Footer>
      </>
    );
}