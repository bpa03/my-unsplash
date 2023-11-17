/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      hostname: 'images.unsplash.com'
    }]
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/photos',
        basePath: false,
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
