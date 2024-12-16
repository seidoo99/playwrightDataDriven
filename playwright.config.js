const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    baseURL: 'https://animated-gingersnap-8cf7f2.netlify.app/',
    Email: 'admin', 
    Password: 'password123'

  },
});