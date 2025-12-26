const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const helmet = require('helmet');
const path = require('path');
const enforce = require('express-sslify');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de seguridad
app.use(helmet());

// Redirigir HTTP a HTTPS en producción
if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=0');
    }
  }
}));

// Configuración de CSP
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "connect-src 'self' https://api.tudominio.com https://www.google-analytics.com;"
  );
  next();
});

// Manejar rutas del cliente
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
