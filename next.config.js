/**
 * Do modes:
 *
 *  - default (local dev, Vercel)  -> server build, /api/contact kaam karta hai
 *  - STATIC_EXPORT=true           -> GitHub Pages ke liye static export
 *
 * Gating isliye hai taki GitHub Pages ka setup local dev ya Vercel deploy
 * ko na tode. Bina env var ke config bilkul pehle jaisa hai.
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";

// GitHub Pages project site: https://im-adilkhan.github.io/portfolio-website
// isliye saare routes/assets ko repo naam ke neeche serve karna padta hai.
const basePath = isStaticExport ? "/portfolio-website" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // static export pe Next ka image optimizer nahi chalta
    ...(isStaticExport ? { unoptimized: true } : {}),
  },
  ...(isStaticExport
    ? {
        output: "export",
        basePath,
        assetPrefix: basePath,
        // har route ko folder/index.html banata hai -> GitHub Pages ise
        // bina .html extension ke sahi serve karta hai
        trailingSlash: true,
      }
    : {}),
};

module.exports = nextConfig;
