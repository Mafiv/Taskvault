/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@devboard/ui-components",
    "@devboard/kanban",
    "@devboard/snippetvault",
    "@devboard/utils",
  ],
};

module.exports = nextConfig;
