// next-sitemap.config.cjs
const { attractions } = require("./data/attractiondata");
const { activities } = require("./data/activitydata");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://thetirthanvalley.in",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 7000,

  additionalPaths: async () => {
    const attractionPaths = attractions.map((attraction) => ({
      loc: `/explore/attractions/${attraction.slug}`,
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));

    const activityPaths = activities.map((activity) => ({
      loc: `/explore/activities/${activity.slug}`,
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));

    return [...attractionPaths, ...activityPaths];
  },
};
