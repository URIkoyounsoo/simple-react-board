const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/v1',
        createProxyMiddleware({
            target: 'http://localhost:8000',  // API 서버 주소
            changeOrigin: true,
        })
    );
};