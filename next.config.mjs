/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/health-wellness-portal',
  assetPrefix: '/health-wellness-portal/',
  trailingSlash: true,
  
  // Optional: Add these for better static export support
  distDir: 'out',
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // ESLint configuration (optional)
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Images configuration for static export
  images: {
    unoptimized: true,
    domains: [], // Add any image domains you use here
  },
  
  // Optional: Enable React strict mode
  reactStrictMode: true,
  
  // Optional: Configure headers for static hosting
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
}

export default nextConfig