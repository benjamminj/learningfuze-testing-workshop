import React from 'react'

/**
 * This functions as an "index.css" file for the entire app. It handles a few things:
 *
 * 1. Sets all of the theme colors as CSS custom properties (also known as "CSS variables")
 *  on the root. This allows us to theme our app using `var(--variable-name)` in our CSS.
 *  For more on CSS custom properties check out [this link](https://developers.google.com/web/updates/2016/02/css-variables-why-should-you-care).
 * 2. Creates a basic CSS reset to normalize margin, font-sizes, font-family, stuff like that.
 */
export const GlobalStyles = () => {
  return (
    <style jsx global>{`
      :root {
        --primary-050: #e6f6ff;
        --primary-100: #bae3ff;
        --primary-200: #7cc4fa;
        --primary-300: #47a3f3;
        --primary-400: #2186eb;
        --primary-500: #0967d2;
        --primary-600: #0552b5;
        --primary-700: #03449e;
        --primary-800: #01337d;
        --primary-900: #002159;

        --neutral-050: #f5f7fa;
        --neutral-100: #e4e7eb;
        --neutral-200: #cbd2d9;
        --neutral-300: #9aa5b1;
        --neutral-400: #7b8794;
        --neutral-500: #616e7c;
        --neutral-600: #52606d;
        --neutral-700: #3e4c59;
        --neutral-800: #323f4b;
        --neutral-900: #1f2933;

        --white: #fff;
        --black: #000;
      }

      *,
      *:before,
      *:after {
        box-sizing: border-box;
      }

      body {
        padding: 16px;
      }

      body,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      button,
      input,
      textarea {
        margin: 0;
        font-size: 1rem;
        font-family: Menlo, monospace;
      }

      input,
      textarea {
        line-height: 1.5;
        padding: 12px 16px;
      }

      p {
        word-break: break-word;
      }

      ul {
        padding: 0;
      }

      a {
        color: var(--primary-500);
      }

      a:visited {
        color: var(--primary-700);
      }
    `}</style>
  )
}
