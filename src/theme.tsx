import type { NextraThemeLayoutProps } from 'nextra'
import Head from 'next/head'
import Link from 'next/link'
import { processPageMap } from './utils/index'
const MAX_SIDEBAR_LENGTH = 40
export default function Layout({ children, pageOpts }: NextraThemeLayoutProps) {
  const { title, frontMatter, pageMap } = pageOpts
  const [headers, tenMostRecentPosts] = processPageMap(pageMap)
  const image =
    frontMatter.image ??
    'https://www.wilsonpeakproperties.com/custimages/Big_Sky_Resort_Winter.jpeg'
  const description = frontMatter.description ?? 'Software. Be happy '
  return (
    <div>
      <Head>
        {<title>{title ?? 'Nicholas Oxford'}</title>}
        {<meta name='og:image' content={image} />}
        {<meta name='og:title' content={title} />}
        <meta name='og:description' content={description} />
        <meta name='og:url' content='https://nicholasoxford.com' />
        <meta name='og:site_name' content='Nicholas Oxford' />
        <meta name='twitter:image' content={image} />
        <meta name='og:type' content='website' />
        <meta name='og:locale' content='en_US' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@ApolloToday' />
        <meta name='twitter:creator' content='@ApolloToday' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        {<meta name='twitter:image' content={image} />}
      </Head>
      <div className=' flex w-full flex-col justify-center sm:flex-row sm:space-x-4  '>
        <div className='w-full flex-row justify-center align-middle sm:flex sm:h-screen sm:w-1/4 sm:flex-col sm:text-right'>
          <div className='mt-2 text-lg  sm:mt-8'>
            <Link
              href='/'
              style={{
                fontVariationSettings: ` 'wght' 850`,
              }}
            >
              Nicholas Oxford
            </Link>
          </div>
          <div className='flex w-full items-start justify-start overflow-auto px-0 sm:flex-col sm:items-center'>
            {headers.map((header, index) => (
              <Link
                className='w-full  text-lg font-extrabold sm:text-right'
                key={index}
                href={`${[Object.keys(header)[0]]}`}
              >
                {header[Object.keys(header)[0]]}
              </Link>
            ))}
            <div className='hidden w-full flex-col items-end sm:flex'>
              <hr className='my-2 h-px w-48 border-0 bg-gray-200 dark:bg-gray-700 ' />
              {tenMostRecentPosts.map((post, postIndex) => (
                <Link
                  className='font-light  '
                  key={postIndex}
                  href={`${post.route}`}
                >
                  {truncateString(post.title)}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className='mt-5 w-full sm:mt-10 sm:w-3/4 '>
          <div className='container max-w-4xl overflow-scroll '>
            {title && (
              <div>
                <h1 className='mb-8 text-4xl font-bold '>{title}</h1>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function truncateString(str: string): string {
  return str.length > MAX_SIDEBAR_LENGTH
    ? str.substring(0, MAX_SIDEBAR_LENGTH - 3) + '...'
    : str
}
