import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name='robots' content='follow, index' />
        <link
          rel='icon'
          type='image/svg+xml'
          href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%234d4d4d%22></rect><path fill=%22%23fff%22 d=%22M62.46 81.99L70.72 81.99L70.72 18.01L62.50 18.01L62.37 65.73L37.54 18.01L29.28 18.01L29.28 81.99L37.50 81.99L37.63 34.18L62.46 81.99Z%22></path></svg>'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
