/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => [{ source: '/map', destination: '/map.html' }],
}

module.exports = nextConfig
