import type { NextraThemeLayoutProps } from "nextra";
import Head from "next/head";
import Link from "next/link";

const MAX_SIDEBAR_LENGTH = 40;
export default function Layout({ children, pageOpts }: NextraThemeLayoutProps) {
  const { title, frontMatter, headings, pageMap, route } = pageOpts;
  let headers: {
    [key: string]: string;
  }[] = [];
  let tenMostRecentPosts: {
    title: string;
    route: string;
  }[] = [];
  let type = "";
  for (let i = 0; i < pageMap.length; i++) {
    const page = pageMap[i];
    if (page.kind === "Meta") {
      Object.entries(page.data).forEach(([key, value]) => {
        if (key !== "index") {
          headers.push({ [key]: value.toString() });
        }
      });
    }
    if (page.kind === "Folder" && page.name === "post") {
      for (let j = 0; j < page.children.length; j++) {
        const post = page.children[j];

        if (post.kind === "MdxPage" && post.frontMatter) {
          if (
            post.frontMatter.title &&
            post.name !== "index" &&
            post.name != "about"
          ) {
            tenMostRecentPosts.push({
              title: post.frontMatter.title,
              route: post.route,
            });
          }
        }
      }
    }
  }
  if (frontMatter && frontMatter.type) {
    type = frontMatter.type;
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="og:image" content={frontMatter.image} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={frontMatter.description} />
        <meta name="og:url" content="https://nicholasoxford.com" />
        <meta name="og:site_name" content="Nicholas Oxford" />
        <meta name="og:type" content="website" />
        <meta name="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ApolloToday" />
        <meta name="twitter:creator" content="@ApolloToday" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={frontMatter.description} />
        <meta name="twitter:image" content={frontMatter.image} />
      </Head>
      <div className="flex sm:flex-row flex-col justify-center w-full sm:space-x-4  ">
        <div className="sm:w-1/4 w-full sm:h-screen sm:flex sm:flex-col justify-center align-middle sm:text-right">
          <h1 className="w-full mt-2 sm:mt-8">Nicholas Oxford</h1>
          <div className="flex sm:flex-col justify-start items-start sm:items-center w-full px-4 sm:px-0 overflow-auto">
            {headers.map((header, index) => (
              <Link
                className="w-full  sm:text-right"
                key={index}
                href={`${[Object.keys(header)[0]]}`}
              >
                <div className="text-lg font-extrabold">
                  {header[Object.keys(header)[0]]}
                </div>
              </Link>
            ))}
            <div className="hidden sm:flex flex-col w-full items-end">
              <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700 w-48 " />
              {tenMostRecentPosts.map((post, postIndex) => (
                <Link
                  className="font-light  "
                  key={postIndex}
                  href={`${post.route}`}
                >
                  {truncateString(post.title)}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="sm:w-3/4 w-full mt-5 sm:mt-10 ">
          {type === "posts" ? (
            <div>
              <div className="">{children}</div>
              <div>POSTS</div>
            </div>
          ) : (
            <div className="container overflow-scroll max-w-4xl ">
              {title && route.includes("/post/") && (
                <div>
                  <h1 className="text-4xl font-bold mb-8 ">{title}</h1>
                </div>
              )}
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function truncateString(str: string): string {
  return str.length > MAX_SIDEBAR_LENGTH
    ? str.substring(0, MAX_SIDEBAR_LENGTH - 3) + "..."
    : str;
}
