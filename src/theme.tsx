import type { NextraThemeLayoutProps } from 'nextra'
import Head from 'next/head'
import Link from 'next/link'
import { generatePostPageHeading, processPageMap } from './utils/index'
import { SpeedInsights } from '@vercel/speed-insights/next'

const MAX_SIDEBAR_LENGTH = 35
export default function Layout({ children, pageOpts }: NextraThemeLayoutProps) {
  // Get the pages metadata
  const {
    headers,
    tenMostRecentPosts,
    description,
    isIndex,
    title,
    image,
    route,
  } = processPageMap(pageOpts)

  const backgroundStyle = generatePostPageHeading({
    route,
    image,
  })

  return (
    <div>
      <Head>
        {isIndex ? (
          <title>Nicholas Oxford</title>
        ) : (
          <title>{title ?? 'Nicholas Oxford'}</title>
        )}

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

      <div className=' flex w-full flex-col justify-center md:flex-row md:space-x-4  '>
        <div className='w-full flex-row justify-center align-middle md:flex md:h-screen md:w-1/4 md:flex-col md:text-right'>
          <div className='mt-2 text-lg  md:mt-8'>
            <Link
              prefetch={false}
              href='/'
              style={{
                fontVariationSettings: ` 'wght' 850`,
              }}
            >
              Nicholas Oxford
            </Link>
          </div>
          <div className='flex w-full items-start justify-start overflow-auto px-0 md:flex-col md:items-center'>
            {headers.map((header, index) => (
              <Link
                prefetch={false}
                className='w-full  text-lg font-extrabold md:text-right'
                key={index}
                href={`${[Object.keys(header)[0]]}`}
              >
                {header[Object.keys(header)[0]]}
              </Link>
            ))}
            <div className='hidden w-full flex-col items-end md:flex'>
              <hr className='my-2 h-px w-48 border-0 bg-gray-200 dark:bg-gray-700 ' />
              {tenMostRecentPosts.map((post, postIndex) => (
                <Link
                  prefetch={false}
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
        <div className='w-full md:w-3/4 '>
          <div className='container max-w-4xl overflow-scroll '>
            {title && (
              <>
                <div
                  className='custom-background my-2 hidden h-32 items-center justify-start rounded-md md:flex'
                  style={backgroundStyle}
                >
                  <div className='overlay'></div>{' '}
                  {/* Overlay for reduced opacity */}
                  <h1 className='text-4xl font-bold text-black '>{title}</h1>
                </div>
                <div>
                  <h1 className='mb-8 text-4xl font-bold md:hidden'>{title}</h1>
                </div>
              </>
            )}
            {children}
          </div>
        </div>
        <SpeedInsights />
      </div>
    </div>
  )
}

function truncateString(str: string): string {
  return str.length > MAX_SIDEBAR_LENGTH
    ? str.substring(0, MAX_SIDEBAR_LENGTH - 3) + '...'
    : str
}
