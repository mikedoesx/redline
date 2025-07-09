/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://redlinefirewatch.vercel.app",
  generateRobotsTxt: true, // Will generate robots.txt as well
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/private-page"], // Optional: exclude pages
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      // Example: disallow private pages
      // { userAgent: "*", disallow: "/private-page" },
    ],
    additionalSitemaps: [
      // Add custom sitemaps here if needed
      // "https://yourdomain.com/my-other-sitemap.xml",
    ],
  },
};
