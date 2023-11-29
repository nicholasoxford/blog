import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const meta = {
    title: 'Nicholas Oxford',
    description: 'Software. Be happy ',
    image:
      'https://www.wilsonpeakproperties.com/custimages/Big_Sky_Resort_Winter.jpeg',
  }

  return (
    <Html lang='en'>
      <Head>
        <meta name='robots' content='follow, index' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
