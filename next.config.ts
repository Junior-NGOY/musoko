import type { NextConfig } from "next";
import withNextIntl from "next-intl/plugin";

const nextConfig: NextConfig = withNextIntl()({
  /* config options here */
  //reactStrictMode: true,
  images: {
    remotePatterns: [
         {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/**",
        port: ""
      },
      {
        protocol: "https",
        hostname: "*.ufs.sh",
        pathname: "/**",
        port: ""
      },
      
      {
        protocol: "https",
        hostname: "azure-tired-lizard-333.mypinata.cloud",
        pathname: "/ipfs/**",
      },
 
    ],
    domains: [
      'azure-tired-lizard-333.mypinata.cloud',
      // ...autres domaines existants si vous en avez
    ],
  }
});

export default nextConfig;
