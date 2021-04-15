import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/react';


export default function Header() {
    const emojiList = ['😘','😛','🤣','😁','😜','😝','😲','🤪','🤠','🤡','😅'];
    return (
        <header css={headerstyle}>
            <h1>LLwyct <span role="img" aria-label="welcome">{emojiList[Math.floor(Math.random()*(emojiList.length))]}</span></h1>
            <nav>
                <ul css={header_ul}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/articles">Articles</Link></li>
                </ul>
            </nav>
        </header>
    )
}

const headerstyle = css`
        max-width: 800px;
        margin: 0 auto;
        padding: 0 1em 0.5em 1em;
        display: flex;
        justify-content: space-between;
    `;
const header_ul = css`
        padding: 0;
        margin: 0;
        height: 100%;
        display: flex;
        align-items: center;
        li + li {
            margin-left: 2em;
        }
        li {
            list-style: none;
            margin: 0;
        }
        a {
            position: relative;
            color: #60545c;
            text-decoration: none;
            transition: color 0.5s ease;
        }
        a::after {
            position: absolute;
            content: "";
            height: 3px;
            width: 100%;
            bottom: -3px;
            left: 0;
            background: #000;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.35s ease;
        }
        a:hover {
            color: #000;
        }
        a:hover::after {
            color: #000;
            transform: scaleX(1);
        }
    `;