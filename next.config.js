/** @type {import('next').NextConfig} */
const { i18n } = require('./src/configs/i18n.config');
// const { webpack } = require('./src/configs/webpack.config');

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@ckeditor/ckeditor5-react',
    '@ckeditor/ckeditor5-build-classic',
    '@ckeditor/ckeditor5-source-editing',
  ],
  serverRuntimeConfig: {
    ...process.env,
    API_SERVER_V1: process.env.API_SERVER_V1,
  },
  // images: {
  //   domains: ['bizweb.dktcdn.net'],
  // },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'bizweb.dktcdn.net',
  //       port: '',
  //       pathname: '/',
  //     },
  //   ],
  // },
  i18n,
  // webpack
};

module.exports = nextConfig;
