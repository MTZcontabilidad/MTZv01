#!/usr/bin/env node

/**
 * FUNDACIÓN TE QUIERO FELIZ - DEVELOPMENT SERVER
 * ==============================================
 * Servidor de desarrollo local
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain',
    '.xml': 'application/xml'
};

function serveFile(req, res, filePath) {
    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'text/plain';
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Si no se encuentra el archivo, servir 404.html
                const notFoundPath = path.join(PUBLIC_DIR, '404.html');
                fs.readFile(notFoundPath, (err404, data404) => {
                    if (err404) {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('404 - Página no encontrada');
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(data404);
                    }
                });
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error interno del servidor');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

const server = http.createServer((req, res) => {
    // Habilitar CORS para desarrollo
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    // Si la ruta es '/', servir index.html
    if (pathname === '/') {
        pathname = '/index.html';
    }
    
    const filePath = path.join(PUBLIC_DIR, pathname);
    
    // Verificar que el archivo esté dentro del directorio público
    if (!filePath.startsWith(PUBLIC_DIR)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Acceso prohibido');
        return;
    }
    
    serveFile(req, res, filePath);
});

server.listen(PORT, () => {
    console.log(`🚀 Servidor de desarrollo iniciado en http://localhost:${PORT}`);
    console.log(`📁 Sirviendo archivos desde: ${PUBLIC_DIR}`);
    console.log(`🛑 Presiona Ctrl+C para detener el servidor\n`);
    
    // Auto-abrir el navegador (solo en Windows)
    if (process.platform === 'win32') {
        const { exec } = require('child_process');
        exec(`start http://localhost:${PORT}`);
    }
});

// Manejo de errores
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Error: El puerto ${PORT} ya está en uso.`);
        console.error(`💡 Intenta con otro puerto: PORT=3001 node scripts/dev-server.js`);
    } else {
        console.error('❌ Error del servidor:', err);
    }
});

// Manejo de cierre limpio
process.on('SIGINT', () => {
    console.log('\n👋 Cerrando servidor de desarrollo...');
    server.close(() => {
        console.log('✅ Servidor cerrado correctamente.');
        process.exit(0);
    });
}); 