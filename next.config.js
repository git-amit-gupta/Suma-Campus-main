/** @type {import('next').NextConfig} */
const withReExtPlugin = require('@sencha/reext/dist/ReExt/next-plugin-reext.js');

const nextConfig = {
  // Any other Next.js config goes here
};

module.exports = withReExtPlugin(nextConfig);
