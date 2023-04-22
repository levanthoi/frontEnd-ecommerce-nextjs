/** @type {import('next').NextConfig} */
const { i18n } = require('./src/configs/i18n.config');
// const { webpack } = require('./src/configs/webpack.config');

const nextConfig = {
  reactStrictMode: false,
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
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
