/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "cdn2.thedogapi.com" }],
  },
};

export default nextConfig;
