module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    import: ["./steps/**/*.js", "./support/**/*.js"],
    format: ["progress-bar", "json:cucumber-report.json"],
    tags: process.env.CUCUMBER_TAGS || undefined,
    retry: process.env.CI ? 1 : 0,
  },
};
