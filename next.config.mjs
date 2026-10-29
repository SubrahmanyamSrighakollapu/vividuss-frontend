import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
/** @type {import('next').NextConfig} */
const nextConfig = {
  // The standalone repository includes its versioned contracts in ./shared.
  turbopack: { root: dirname(fileURLToPath(import.meta.url)) },
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
};

export default nextConfig;
