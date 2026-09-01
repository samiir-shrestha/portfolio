import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        <meta name="description" content="Portfolio of Samir Shrestha - Backend Developer & Full-Stack Engineer. Experienced in FastAPI, Node.js, PostgreSQL, MySQL, and ML integration." />
        <meta name="keywords" content="Samir Shrestha, Backend Developer, Full Stack Engineer, FastAPI, Node.js, PostgreSQL, MySQL, Docker, React, BSc CSIT, Nepal Developer" />
        <meta name="author" content="Samir Shrestha" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta property="og:title" content="Samir Shrestha | Backend & Full-Stack Developer" />
        <meta property="og:description" content="Portfolio and CV of Samir Shrestha - Final-Year BSc.CSIT student & Backend Engineer." />
        <meta property="og:type" content="website" />
      </Head>
      <body className="antialiased bg-white text-gray-900 selection:bg-emerald-100 selection:text-emerald-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
