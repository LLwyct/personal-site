import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/react';

export default function Header(props) {
    const emojiList = ['😘','😛','🤣','😁','😜','😝','😲','🤪','🤠','🤡', '🎅','🤞','👀','🧡','💛','💖'];
    const buttonValue = {
      "dark": "light",
      "light": "dark"
    }
    const btn = React.useRef();
    React.useEffect(() => {
      if (!document.body.dataset.colormode || document.body.dataset.colormode === "undefined") {
        btn.current.innerText = "dark";
        setTimeout(() => btn.current.innerText = buttonValue[document.body.dataset.colormode], 1000);
      } else {
        btn.current.innerText = buttonValue[document.body.dataset.colormode];
      }
    }, []);

    function toggleDarkMode () {
      document.body.classList.toggle("dark");
      localStorage.setItem("b0ee67a4b84e9f55", btn.current.innerText);
      btn.current.innerText = buttonValue[btn.current.innerText];
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
              <div
                onClick={toggleDarkMode}
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <button css={colormodebtn} ref={btn} id="colorSwitchBtn">
                  &nbsp;
                </button>
                <span className="svg-container" css={svgContainer}>
                  <svg
                    t="1622792552018"
                    className="svg-sunny"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1197"
                    width="200"
                    height="200"
                  >
                    <defs>
                      <style type="text/css"></style>
                    </defs>
                    <path
                      d="M512 768a256 256 0 1 1 0-512 256 256 0 0 1 0 512zM469.333333 42.666667h85.333334v128h-85.333334V42.666667z m0 810.666666h85.333334v128h-85.333334v-128zM149.973333 210.304l60.330667-60.330667L300.8 240.469333 240.469333 300.8 149.973333 210.346667zM723.2 783.530667l60.330667-60.330667 90.496 90.496-60.330667 60.330667-90.496-90.496z m90.496-633.6l60.330667 60.373333-90.496 90.496-60.330667-60.330667 90.496-90.496zM240.469333 723.2l60.330667 60.330667-90.496 90.496-60.330667-60.330667 90.496-90.496zM981.333333 469.333333v85.333334h-128v-85.333334h128zM170.666667 469.333333v85.333334H42.666667v-85.333334h128z"
                      p-id="1198"
                      data-spm-anchor-id="a313x.7781069.0.i0"
                      className="selected"
                      fill="#e6e6e6"
                    ></path>
                  </svg>
                  <svg
                    t="1622792615234"
                    className="svg-moon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2337"
                    width="200"
                    height="200"
                  >
                    <defs>
                      <style type="text/css"></style>
                    </defs>
                    <path
                      d="M830.025143 655.725714C951.552 634.331429 1024 535.369143 1024 471.497143c0-15.177143-7.003429-26.093714-19.474286-26.093714-18.688 0-47.122286 24.923429-100.882285 24.923428-95.030857 0-155.410286-57.654857-155.410286-144.512 0-51.803429 27.666286-89.197714 27.666286-109.842286 0-12.068571-8.192-20.242286-23.771429-19.858285-72.045714 3.108571-163.2 83.748571-183.844571 187.355428 12.068571 11.282286 23.771429 26.477714 33.097142 46.738286 131.291429 10.130286 226.322286 109.056 228.644572 225.517714zM161.645714 855.149714h421.430857c110.244571 0 195.931429-83.748571 195.931429-191.634285 0-107.117714-87.241143-188.123429-203.702857-188.891429-45.586286-86.857143-126.592-137.508571-220.854857-137.508571-126.592 0-234.093714 98.157714-245.778286 226.304C42.459429 583.277714 0 639.36 0 707.913143c0 87.259429 65.828571 147.236571 161.645714 147.236571z"
                      p-id="2338"
                    ></path>
                  </svg>
                </span>
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
  padding: 5px 7px;
  background-color: transparent;
  color: var(--text-color);
  border: 2px solid var(--text-color);
  cursor: pointer;
  width: 65px;
  outline: none;
  padding-right: 4.5em;
`;

const svgContainer = css`
  pointer-event: none;
  width: 1.5em;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 3px;
  right: 10px;
  .svg-sunny {
    margin-bottom: 20px;
  }
  .svg-moon {
    transform: rotateX(180deg) rotateY(180deg);
  }
  svg {
    height: 100%;
    width: 100%;
  }
`;