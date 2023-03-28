const nextConfig = {
  reactStrictMode: true,
  env: {
    APP_OPENAI_API_KEY: process.env.REACT_APP_OPENAI_API_KEY,
    REACT_APP_OPENAI_API_KEY: process.env.REACT_APP_OPENAI_API_KEY,
  },
};

module.exports = nextConfig;
