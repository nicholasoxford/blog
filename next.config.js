const withNextra = require("nextra")({
  theme: "./src/theme.tsx",
});

module.exports = withNextra({
  images: {
    domains: ["pub-93998b4c6a7245cd94fd26c0d8c78199.r2.dev"],
  },
});
