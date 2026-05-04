/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@devboard/ui-components",
    "@devboard/kanban",
    "@devboard/snippetvault",
    "@devboard/utils",
    "@devboard/auth",
  ],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "unsafe-none",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
