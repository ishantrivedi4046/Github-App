const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const config = {
  client_id: process.env.REACT_APP_CLIENT_ID,
  client_secret: process.env.REACT_APP_CLIENT_SECRET,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
  proxy_url: process.env.REACT_APP_PROXY_URL,
};

module.exports = config;
