import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://sme-loan-wbbk.onrender.com/api/:path*",
      },
    ];
  },
};

// https://sme-loan-wbbk.onrender.com/api/:path*
// http://localhost:8000/api/:path*

export default nextConfig;
