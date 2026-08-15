import type { NextConfig } from "next";

/*
  Content-Security-Policy.
  - Google Maps is embedded via an <iframe> from https://www.google.com/maps/embed,
    so google.com is allowed in frame-src (and its tiles/images in img-src).
  - 'unsafe-inline' is permitted for styles (Tailwind/Next inject inline styles).
    Scripts allow 'unsafe-inline' as a pragmatic default for the Next.js runtime;
    tighten with per-request nonces if your threat model requires it.
*/
const isDev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  // React's dev mode needs eval(); production never does.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.google.com https://*.gstatic.com https://*.googleapis.com",
  "font-src 'self' data:",
  // Allow the dev HMR websocket; production is same-origin only.
  `connect-src 'self'${isDev ? " ws://localhost:* http://localhost:*" : ""}`,
  "frame-src https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // Standalone output is only for a self-hosted Node deploy (e.g. Hostinger),
  // enabled explicitly with BUILD_STANDALONE=1. It is OFF by default so hosts
  // that run their own file-tracing — notably Vercel, whose onBuildComplete
  // step fails on `.next/next-server.js.nft.json` when standalone is on — build
  // cleanly. (Gating on a positive opt-in is safer than checking process.env.VERCEL,
  // which isn't set if a project disables Vercel's system env vars.)
  output: process.env.BUILD_STANDALONE ? "standalone" : undefined,
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
