const { readFileSync } = require('fs')
const withNextra = require('nextra')({
  output: 'export',
  theme: './src/theme.tsx',
  mdxOptions: {
    rehypePrettyCodeOptions: {
      // VSCode theme or built-in Shiki theme, see Shiki documentation for more information
      theme: JSON.parse(
        readFileSync('./public/syntax/moonlight-ii.json', 'utf8')
      ),
    },
  },
})

module.exports = withNextra({
  images: {
    domains: ['assets.nicholasoxford.com'],
  },
})
