/** @type {import('next').NextConfig} */
const nextConfig = {
  // `output: "standalone"` requires symlink permissions that plain Windows shells
  // lack (EPERM when copying pnpm-linked deps). Only enable it inside Docker,
  // where the Dockerfile sets STANDALONE_BUILD=true.
  output: process.env.STANDALONE_BUILD === "true" ? "standalone" : undefined,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
