const { defineConfig } = require('@playwright/test');
require('dotenv').config();
module.exports = defineConfig({
  use: {
    baseURL: 'https://animated-gingersnap-8cf7f2.netlify.app/',
  } ,
  extra: {
    Email: process.env.EMAIL,
    Password: process.env.PASSWORD,
  }
});