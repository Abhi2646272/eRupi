// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/register',
    createProxyMiddleware({
      target: 'http://localhost:3002', // Replace with your actual Express server URL
      changeOrigin: true,
    })
  );
};
