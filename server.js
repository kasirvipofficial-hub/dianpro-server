const NodeMediaServer = require('node-media-server');
const path = require('path');
const fs = require('fs');

const httpPort = parseInt(process.env.PORT) || 8000;
const rtmpPort = (httpPort === 1935) ? 1936 : 1935;

const staticPath = path.resolve(__dirname, 'public');
const indexPath = path.join(staticPath, 'index.html');

console.log("=========================================");
console.log("🎬 DIANPRO SERVER STARTUP");
console.log("RTMP (Video In)  : " + rtmpPort);
console.log("HTTP (Web/Watch) : " + httpPort);
console.log("Checking Filesystem...");
console.log("Static Dir Exists: " + fs.existsSync(staticPath) + " (" + staticPath + ")");
console.log("Index.html Exists: " + fs.existsSync(indexPath));

const config = {
    rtmp: {
        port: rtmpPort,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: httpPort,
        allow_origin: '*',
        mediaroot: './media',
        static: staticPath
    }
};

if (httpPort === 1935) {
    console.log("⚠️ WARNING: Port collision detected. RTMP shifted to 1936.");
}
console.log("=========================================");

const nms = new NodeMediaServer(config);
nms.run();
