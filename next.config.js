/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => {
    return [
      {
        source: '/',
        destination: '/products',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
