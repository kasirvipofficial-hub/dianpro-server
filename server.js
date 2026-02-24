const NodeMediaServer = require('node-media-server');
const path = require('path');

const httpPort = parseInt(process.env.PORT) || 8000;
// Force RTMP to 1935, but if HTTP is already using it, shift RTMP to 1936 to prevent crash
const rtmpPort = (httpPort === 1935) ? 1936 : 1935;

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
        static: path.join(__dirname, 'public')
    }
};

var nms = new NodeMediaServer(config)
nms.run();

console.log("=========================================");
console.log("🎬 DIANPRO SERVER STATUS");
console.log("RTMP (Video In)  : " + rtmpPort);
console.log("HTTP (Web/Watch) : " + httpPort);
if (httpPort === 1935) {
    console.log("⚠️ WARNING: HTTP and RTMP were both assigned 1935.");
    console.log("RTMP has been shifted to 1936 to prevent a crash.");
}
console.log("=========================================");
