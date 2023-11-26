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

export const processPageMap = (pageMap: any[]): [Header[], Post[]] => {
  const headers: Header[] = pageMap.flatMap(extractHeaders)
  const posts: Post[] = pageMap.flatMap(extractPosts).slice(0, 10)
  return [headers, posts]
}
