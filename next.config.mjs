/** @type {import('next').NextConfig} */
import {withReExtPlugin} from './node_modules/@sencha/reext/dist/ReExt/next-plugin-reext.js';

const nextConfig = {};
export default withReExtPlugin(nextConfig);
