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

    React.useEffect(() => {
        
        if (window) {
            let colorMode = localStorage.getItem("b0ee67a4b84e9f55");
            if (colorMode) {
                const colorSwitchBtn = document.getElementById("colorswitch");
                if (colorSwitchBtn) {
                    colorSwitchBtn.innerText = colorMode === "dark" ? "light" : "dark";
                }
                document.body.classList.add(colorMode.toString());
            }
        }
    }, [])
    
    return (
        <>
            <Header></Header>
            <main css={contentstyle}>
                {children}
            </main>
            <Footer></Footer>
        </>
    )
}
const ASDASD = 1;
class A {
    // 
}

for (let i=0;i<10;++i) {

}