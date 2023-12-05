import { PageOpts } from 'nextra'
import { Header, Post } from '../types'

export const extractHeaders = (page: any): Header[] =>
  page.kind === 'Meta'
    ? Object.entries(page.data)
        .filter(([key]) => key !== 'index')
        // @ts-ignore
        .map(([key, value]) => ({ [key]: value.toString() }))
    : []

export const extractPosts = (page: any): Post[] =>
  page.kind === 'Folder' && page.name === 'posts'
    ? page.children
        .filter((child: any) => child.kind === 'MdxPage' && child.frontMatter)
        .filter(
          (post: any) =>
            post.frontMatter.title &&
            post.name !== 'index' &&
            post.name !== 'about'
        )
        .map((post: any) => ({
          title: post.frontMatter.title,
          route: post.route,
        }))
    : []

export const processPageMap = (
  pageOpts: PageOpts<{
    [key: string]: any
  }>
): {
  headers: Header[]
  tenMostRecentPosts: Post[]
  description: string
  isIndex: boolean
  title: string
  image: string
  route: string
} => {
  const headers: Header[] = pageOpts.pageMap.flatMap(extractHeaders)
  const tenMostRecentPosts: Post[] = pageOpts.pageMap
    .flatMap(extractPosts)
    .slice(0, 10)
  const description = pageOpts.frontMatter.description ?? 'Software. Be happy '
  let isIndex = pageOpts.route === '/'
  const title = isIndex ? 'Software. Be happy' : pageOpts.title
  const image =
    pageOpts.frontMatter.image ??
    'https://assets.nicholasoxford.com/Big_Sky_Resort_Winter.webp'
  return {
    headers,
    tenMostRecentPosts,
    description,
    isIndex,
    title,
    image,
    route: pageOpts.route,
  }
}

export const generatePostPageHeading = ({
  route,
  image,
}: {
  route: string
  image: string
}) => {
  return {
    backgroundImage: route.includes('/posts/') ? `url(${image})` : '',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }
}
