import type { NextConfig } from "next";

const apiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://sme-loan-wbbk.onrender.com"
    : "http://localhost:8000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiBaseUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
