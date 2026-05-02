/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@Taskvault/ui-components",
    "@Taskvault/kanban",
    "@Taskvault/snippetvault",
    "@Taskvault/utils",
  ],
};

module.exports = nextConfig;
