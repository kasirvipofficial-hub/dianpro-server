const NodeMediaServer = require('node-media-server');

const config = {
    rtmp: {
        port: process.env.RTMP_PORT || 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: process.env.PORT || 8000,
        allow_origin: '*',
        mediaroot: './media',
        static: './public'
    }
};

var nms = new NodeMediaServer(config)
nms.run();

console.log("=========================================");
console.log("🎬 RTMP Server is running!");
console.log("RTMP Port: " + (process.env.RTMP_PORT || 1935));
console.log("HTTP Port: " + (process.env.PORT || 8000));
console.log("=========================================");
