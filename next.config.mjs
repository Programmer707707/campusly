/** @type {import('next').NextConfig} */
const nextConfig = {
    images: 
        {
        domains: ['images.pexels.com'], // Add the hostname of your external image source
    },
     eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
