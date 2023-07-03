/** @type {import('next').NextConfig} */
const { hostname } = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`);
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [`${hostname}`],
  },

  exportPathMap: async function () {
    return {
      '/': { page: '/' }, 
      '/about': { page: '/about' },
      '/contact': { page: '/contact' },
      '/blog': { page: '/blog' },
      '/blog/[slug]': { page: '/blog/[slug]' },
      '/portfolio': { page: '/portfolio' },
      '/portfolio/[slug]': { page: '/portfolio/[slug]' },
      '/services': { page: '/services' },
      '/services/[slug]': { page: '/services/[slug]' },
      '/team': { page: '/team' },
      '/team/[slug]': { page: '/team/[slug]' },
      '/testimonials': { page: '/testimonials' },
      '/testimonials/[slug]': { page: '/testimonials/[slug]' },
      '/404': { page: '/404' },
      
    };
  },
};

module.exports = nextConfig;
