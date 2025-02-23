/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    PROJECT_ROOT: __dirname
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs' module on the client side
      config.resolve.fallback = {
        fs: false,
        path: false
      }
    }
    return config
  }
}

module.exports = nextConfig 