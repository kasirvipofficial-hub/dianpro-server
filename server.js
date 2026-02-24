const NodeMediaServer = require('node-media-server');
const path = require('path');

// Railway usually provides 'PORT' for HTTP traffic. 
// We distinguish it from the RTMP port.
const httpPort = process.env.PORT || 8000;
const rtmpPort = 1935;

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
console.log("=========================================");
