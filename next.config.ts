// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: ["res.cloudinary.com"],
//   },
// };

// export default nextConfig;
import bundleAnalyzer from "@next/bundle-analyzer";
// const withBundleAnalyzer = bundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
// });

// const nextConfig = {
//   images: {
//     domains: ["res.cloudinary.com"],
//   },
// };

// module.exports = withBundleAnalyzer(nextConfig);
const withBundleAnalyzer = bundleAnalyzer({
  enabled:
    process.env.ANALYZE === "true" && process.env.NODE_ENV === "production",
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
