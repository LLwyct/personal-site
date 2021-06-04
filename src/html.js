import React from "react";
import PropTypes from "prop-types";

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                let globalColorMode = localStorage.getItem("b0ee67a4b84e9f55");
                window.colorTheme = {
                  color: "light"
                }
                if (globalColorMode === "dark") {
                    window.colorTheme.color = "dark";
                    document.body.classList.add("dark");
                    document.body.setAttribute("data-colormode", "dark");
                } else if (globalColorMode !== "light") {
                  localStorage.setItem("b0ee67a4b84e9f55", "light");
                    setTimeout(() => {
                      window.colorTheme.color = "dark";
                      localStorage.setItem("b0ee67a4b84e9f55", "dark");
                      document.body.setAttribute("data-colormode", "dark");
                      document.body.classList.add("dark");
                    }, 1500);
                } else {
                  document.body.setAttribute("data-colormode", "light");
                }
            `,
          }}
        />
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
