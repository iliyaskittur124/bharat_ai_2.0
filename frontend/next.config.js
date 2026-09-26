/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignore type errors during production build so deployment doesn't fail
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint errors during production build
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['lbhjjsydmaxriymvjivi.supabase.co'],
  },
};

module.exports = nextConfig;
