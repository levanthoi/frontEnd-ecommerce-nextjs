/** @type {import('next').NextConfig} */
const { i18n } = require('./src/configs/i18n.config');

const nextConfig = {
  reactStrictMode: true,
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
};

module.exports = nextConfig;
