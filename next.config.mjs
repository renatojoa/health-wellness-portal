/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/WellFlowApp',
  assetPrefix: '/WellFlowApp/',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig