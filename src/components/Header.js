import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/react';


export default function Header(props) {
    const emojiList = ['😘','😛','🤣','😁','😜','😝','😲','🤪','🤠','🤡', '🎅','🤞','👀','🧡','💛','💖'];
    const buttonValue = {
      "dark": "light",
      "light": "dark"
    }
    let [nextColorMode, setNextColorMode] = React.useState(buttonValue[props.colorMode]);
    const btn = React.useRef('dark');

    const toggleDarkMode = () => {
      document.body.classList.toggle('dark');
      localStorage.setItem("b0ee67a4b84e9f55", nextColorMode);
      setNextColorMode(buttonValue[nextColorMode]);
    }

    return (
      <header css={headerstyle}>
        <h1 style={{ cursor: "pointer" }}>
          <Link to="/">
            LLwyct{" "}
            <span role="img" aria-label="welcome" id="header_emoji">
              {emojiList[Math.floor(Math.random() * emojiList.length)]}
            </span>
          </Link>
        </h1>
        <nav>
          <ul css={header_ul}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/articles">Articles</Link>
            </li>
            <li>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  onClick={toggleDarkMode}
                  css={colormodebtn}
                  ref={btn}
                  id="colorSwitchBtn"
                >
                  {nextColorMode}
                </button>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    );
}

const headerstyle = css`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1em 1em 1em;
  display: flex;
  justify-content: space-between;

  #header_emoji {
      font-size: 0.75em;
  }
  @media only screen and (max-width: 480px) {
    #header_emoji {
        display: none;
    }
    li + li {
        margin-left: 0.5em;
    }
  }
`;
const header_ul = css`
  padding: 0;
  margin: 0;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  li + li {
    margin-left: 1.5em;
  }
  li {
    list-style: none;
    margin: 0;
  }
  a {
    position: relative;
    color: var(--text-color);
    text-decoration: none;
  }
  a::after {
    position: absolute;
    content: "";
    height: 3px;
    width: 100%;
    bottom: -3px;
    left: 0;
    background-color: var(--text-color);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s ease;
  }
  a:hover {
    color: var(--text-color);
  }
  a:hover::after {
    color: ;
    transform: scaleX(1);
  }
  a:active {
    color: var(--text-color);
  }
`;

const colormodebtn = css`
  padding: 3px 5px;
  background-color: transparent;
  color: var(--text-color);
  border: 2px solid var(--text-color);
  cursor: pointer;
  width: 65px;
  outline: none;
`;