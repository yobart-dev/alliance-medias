/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Corrigé : activer la vérification TypeScript
  },
  images: {
    // Optimisation des images activée
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_WORDPRESS_URL?.replace(/^https?:\/\//, '') || '',
      },
      {
        protocol: 'http',
        hostname: process.env.NEXT_PUBLIC_WORDPRESS_URL?.replace(/^https?:\/\//, '') || '',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Configuration pour l'API WordPress
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ]
  },
}

export default nextConfig
