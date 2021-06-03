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
                if (globalColorMode === "dark") {
                    document.body.classList.add("dark");
                    document.body.setAttribute("data-colormode", "dark");
                } else if (globalColorMode !== "light") {
                    setTimeout(() => document.body.classList.add("dark"), 1500);
                    localStorage.setItem("b0ee67a4b84e9f55", "dark");
                    document.body.setAttribute("data-colormode", "dark");
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
