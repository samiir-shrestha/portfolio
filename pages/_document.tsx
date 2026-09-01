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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
                  if (saved === 'light' || (!saved && prefersLight)) {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </Head>
      <body className="antialiased selection:bg-emerald-500 selection:text-slate-950">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
