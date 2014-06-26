var dgram = require('dgram');
var xbee = require('../../lib/xbee-api.js');

const startupDelay = 8000;
const onTime = 1500;
const ip = '172.16.1.71';
const port = 0xbee;

var x = new xbee.XBeeAPI({
    module: xbee.constants.MODULE_ID.WIFI
});

//Listening on the 0xbee port will also receive any automatic IO samples if it is configured to send to the
// server's ip or broadcast on the same network
var udp = dgram.createSocket('udp4', function(msg, info){
    console.log(msg, info);
    console.log(x.parseFrame(msg));
});

udp.on("error", function (err) {
    console.log("server error:\n" + err.stack);
    udp.close();
});
udp.on("listening", function () {
    var address = udp.address();
    console.log("server listening " +
        address.address + ":" + address.port);
});

var frameOn = x.buildFrame(
    {
        type: xbee.constants.WIFI_COMMAND_ID.REMOTE_COMMAND,
        command: xbee.constants.PIN_COMMAND.DIO4,
        configOptions: xbee.constants.WIFI_CONFIGURATION_OPTIONS.APPLY_CHANGES,
        commandParameter: [xbee.constants.PIN_MODE.D4.DIGITAL_OUTPUT_HIGH]
    }
);
var frameOff = x.buildFrame(
    {
        type: xbee.constants.WIFI_COMMAND_ID.REMOTE_COMMAND,
        command: xbee.constants.PIN_COMMAND.DIO4,
        configOptions: xbee.constants.WIFI_CONFIGURATION_OPTIONS.APPLY_CHANGES,
        commandParameter: [xbee.constants.PIN_MODE.D4.DIGITAL_OUTPUT_LOW]
    }
);

udp.bind(port);

//Set DIO4 high for onTime ms, then low
setTimeout(function(){
    udp.send(frameOn, 0, frameOn.length, port, ip, function(err, bytes) {
        console.log("on");
        setTimeout(function(){
            udp.send(frameOff, 0, frameOff.length, port, ip, function(err, bytes) {
                console.log("off");
            });
        }, onTime);
    });
}, startupDelay);

