const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/songs',
        permanent: true,
      },
    ]
  }
}
