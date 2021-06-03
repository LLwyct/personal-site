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
        "dark"
    );
        
    React.useEffect(() => {
        let value = localStorage.getItem("b0ee67a4b84e9f55");
        if (!value || value === "undefined") {
            value = "dark";
          localStorage.setItem("b0ee67a4b84e9f55", value);
          setTimeout(() => {
            document.body.classList.add(value);
          }, 1000);
        } else {
          document.body.classList.add(value);
        }
        setColorMode(value);
    }, [colorMode]);
    
    return (
      <>
        <Header colorMode={colorMode}></Header>
        <main css={contentstyle}>{children}</main>
        <Footer></Footer>
      </>
    );
}