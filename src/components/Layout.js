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
    let [colorMode, setColorMode] = React.useState(
      localStorage.getItem("b0ee67a4b84e9f55")
    );

    React.useEffect(() => {
        if (!colorMode || colorMode === "undefined") {
            setColorMode("dark");
            setTimeout(() => {
                document.body.classList.add(colorMode.toString());
                localStorage.setItem("b0ee67a4b84e9f55", "dark");
            }, 1000);
        } else {
            document.body.classList.add(colorMode);
        }
    }, [colorMode]);
    
    return (
      <>
        <Header colorMode={colorMode}></Header>
        <main css={contentstyle}>{children}</main>
        <Footer></Footer>
      </>
    );
}