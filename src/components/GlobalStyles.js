export const GlobalStyles = () => {
  return (
    <>
      <style jsx global>{`
        :root {
          --primary-050: #e6f6ff;
          --primary-100: #bae3ff;
          --primary-500: #0967d2;

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
          font-family: Menlo, monospace;
        }

        body,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          margin: 0;
          font-size: 1rem;
        }

        input,
        textarea {
          font-size: 1rem;
          line-height: 1.5;
          padding: 12px 16px;
        }
      `}</style>
    </>
  )
}
