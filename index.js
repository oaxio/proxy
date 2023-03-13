const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require("morgan");

// Create Express Server
const app = express();

// Configuration
const port = process.env.PORT || 3001;
const API_SERVICE_URL = "http://icnbackup.intercares.nl:5100/v1/alarm/send";

// Logging
app.use(morgan('dev'));

// Proxy endpoints
app.use('/api', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/api`]: '',
    },
    onProxyReq(proxyReq, req) {
        proxyReq.setHeader('Content-Type', 'application/json-patch+json')
        proxyReq.setHeader('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQkgtMDAwMSIsInVzZXJuYW1lIjoiQkgtMDAwMSIsInBob25lbm8iOiJCSC0wMDAxIiwic3RhZmZpZCI6IjM3YzgyZDYwLThiM2ItNDE5Ni1iYThhLTZjNWU1ZGE1ZjNlNyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6InVzZXIiLCJleHAiOjE2Nzg4ODMyNjAsImlzcyI6ImFjY2Vzc1Rva2VuIn0.ud7TVVBYI5LzMfAi-GvECNjJ-MzBKilfj4dP0sT3xS0')
        console.log("HOI")
        console.log(req)
    },
 }));

 // Start the Proxy
app.listen(port, () => {
    console.log(`Starting Proxy at ${port}`);
 });

 module.exports = app;
