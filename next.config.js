/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    // Run static generation in the main thread to avoid OOM crashes on
    // Windows machines with limited per-process memory limits.
    workerThreads: false,
    cpus: 1,
  },
};

module.exports = nextConfig;
