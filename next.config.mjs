/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin the workspace root so Turbopack does not walk up to C:\Users\offic.
  turbopack: { root: import.meta.dirname },
  // Do not auto-generate an AGENTS.md file on dev start.
  agentRules: false,
  // Hide the dev-only badge so it does not overlap the mobile bottom navigation.
  devIndicators: false,
};
export default nextConfig;
