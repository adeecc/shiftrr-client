import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';

const Document: React.FC<DocumentProps> = (_props) => {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Roboto+Mono:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />

        <link href="/static/favicons/favicon.ico" rel="shortcut icon" />

        <meta content="#e63946" name="theme-color" />
        <meta content="#ffffff" name="msapplication-TileColor" />
      </Head>
      <body className="bg-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
