import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 콘솔에 데이터 페칭 남기기
  logging: {
    fetches: {
      fullUrl: true,
    }
  }
};

export default nextConfig;
