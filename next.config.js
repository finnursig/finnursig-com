const path = require('path');
const env =
  process.env.NODE_ENV === 'development'
    ? {} // We're never in "production server" phase when in development mode
    : !process.env.NOW_REGION
    ? require('next/constants') // Get values from `next` package when building locally
    : require('next-server/constants') // Get values from `next-server` package when building on now v2

const config = {
  webpack: function (config) {
    const originalEntry = config.entry;
    config.resolve.modules = [path.resolve(`${__dirname}`), ...config.resolve.modules];

    // config.entry = async () => {
    //   const entries = await originalEntry();

    //   if (entries['main.js'] && !entries['main.js'].includes('./polyfills.ts')) {
    //     entries['main.js'].unshift('./polyfills.ts');
    //   }

    //   return entries;
    // };

    return config;
  }
};

module.exports = (phase, { defaultConfig }) => {
  if (phase === env.PHASE_PRODUCTION_SERVER) {
    // Config used to run in production.
    return config;
  }

  const withTypescript = require('@zeit/next-typescript');

  return withTypescript(config);
};