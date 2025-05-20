/** @type {import('next').NextConfig} */
import withReExtPlugin from '@sencha/reext/dist/ReExt/next-plugin-reext.js';

const nextConfig = {
  // Any other Next.js config goes here
};

module.exports = withReExtPlugin(nextConfig);
