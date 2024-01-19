const withTM = require('next-transpile-modules')([
  '@stripe/firestore-stripe-payments',
]) // pass the modules you would like to see transpiled

module.exports = withTM({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'rb.gy',
        port: '',
        pathname: '/ulxxee',
      },
      {
        protocol: 'https',
        hostname: 'rb.gy',
        port: '',
        pathname: '/g1pwyx',
      },
      {
        protocol: 'https',
        hostname: 'rb.gy',
        port: '',
        pathname: '/p2hphi/**',
      },
    ],
  },
})
