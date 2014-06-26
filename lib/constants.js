/*
 * xbee-api
 * https://github.com/jouz/xbee-api
 *
 * Copyright (c) 2013 Jan Kolkmeier
 * Licensed under the MIT license.
 */

'use strict';

exports = module.exports;

exports.START_BYTE = 0x7E;
exports.ESCAPE = 0x7D;
exports.XOFF = 0x13;
exports.XON = 0x11;
exports.ESCAPE_WITH = 0x20;

exports.UNKNOWN_16     = [ 0xff, 0xfe ];
exports.UNKNOWN_64     = [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff ];
exports.BROADCAST_16_XB= [ 0xff, 0xff ];
exports.COORDINATOR_16 = [ 0x00, 0x00 ];
exports.COORDINATOR_64 = [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ];

exports.ESCAPE_BYTES = [ 
  exports.START_BYTE,
  exports.ESCAPE,
  exports.XOFF,
  exports.XON
];

var ft = exports.FRAME_TYPE = {};
var diss = exports.DISCOVERY_STATUS = {};
var dels = exports.DELIVERY_STATUS = {};
var coms = exports.COMMAND_STATUS = {};
var ms = exports.MODEM_STATUS = {};
var ro = exports.RECEIVE_OPTIONS = {};
var dt = exports.DEVICE_TYPE = {};

var dc = exports.DIGITAL_CHANNELS = { MASK: {}, PIN:{} };
var ac = exports.ANALOG_CHANNELS = { MASK: {}, PIN:{} };
var pr = exports.PULLUP_RESISTOR = { MASK: {}, PIN:{} };
var ic = exports.CHANGE_DETECTION = { MASK: {}, PIN:{} };
var pm = exports.PIN_MODE = {};
var pc = exports.PIN_COMMAND = { PIN:{} };

//Xbee Wifi
var ci = exports.WIFI_COMMAND_ID = {};
var co = exports.WIFI_COMMAND_OPTIONS = {};
var cfgo = exports.WIFI_CONFIGURATION_OPTIONS = {};

var fts = exports.FRAME_TYPE_SETS = {
  "802.15.4": [0x00,0x01,0x08,0x09,0x17,0x80,0x81,0x82,0x83,0x88,0x89,0x8A,0x97],
  "ZNet": [0x08,0x09,0x10,0x11,0x17,0x88,0x8A,0x8B,0x90,0x91,0x92,0x94,0x95,0x97],
  "ZigBee": [0x08,0x09,0x10,0x11,0x17,0x21,0x24,0x88,0x8A,0x8B,0x90,0x91,0x92,0x94,0x95,0x97,0xA0,0xA1,0xA2,0xA3,0xA4,0xA5],
  "Any": [0x00,0x01,0x08,0x09,0x17,0x80,0x81,0x82,0x83,0x88,0x89,0x8a,0x97,0x10,0x11,0x8b,0x90,0x91,0x92,0x94,0x95,0x21,0x24,0xa0,0xa1,0xa2,0xa3,0xa4,0xa5]
};

//Start byte used to distinguish different frame structures, based on the options.module
//TODO change all examples and tests to set options.module to use constants
var msb = exports.MODULE_ID = {};

// Device Type
dt.COORDINATOR = 0x00;
dt[0x00] = "Coordinator (0x00)";
dt.ROUTER = 0x01;
dt[0x01] = "Router (0x01)";
dt.END_DEVICE = 0x02;
dt[0x02] = "End Device (0x02)";

//Xbee Wifi Frame Type
ci.DATA = 0x00;
ci[0x00] = "Data";
ci.REMOTE_COMMAND = 0x02;
ci[0x02] = "Remote AT Command";
ci.MEMORY_COMMAND = 0x03;
ci[0x03] = "General Purpose Memory Command";
ci.IO_SAMPLE = 0x04;
ci[0x04] = "I/O Sample";
ci.DATA_ACK = 0x80;
ci[0x80] = "Data Acknowledgement";
ci.REMOTE_RESPONSE = 0x82;
ci[0x82] = "Remote AT Command Response";
ci.MEMORY_RESPONSE = 0x83;
ci[0x83] = "General Purpose Memory Response";

// Frame Type
ft.AT_COMMAND = 0x08;
ft[0x08] = "AT Command (0x08)";
ft.AT_COMMAND_QUEUE_PARAMETER_VALUE = 0x09;
ft[0x09] = "AT Command - Queue Parameter Value (0x09)";
ft.ZIGBEE_TRANSMIT_REQUEST = 0x10;
ft[0x10] = "ZigBee Transmit Request (0x10)";
ft.EXPLICIT_ADDRESSING_ZIGBEE_COMMAND_FRAME = 0x11;
ft[0x11] = "Explicit Addressing ZigBee Command Frame (0x11)";
ft.REMOTE_AT_COMMAND_REQUEST = 0x17;
ft[0x17] = "Remote Command Request (0x17)";
ft.CREATE_SOURCE_ROUTE = 0x21;
ft[0x21] = "Create Source Route (0x21)";
ft.REGISTER_JOINING_DEVICE = 0x24;
ft[0x24] = "Register Joining Device (0x24)";
ft.AT_COMMAND_RESPONSE = 0x88;
ft[0x88] = "AT Command Response (0x88)";
ft.MODEM_STATUS = 0x8A;
ft[0x8A] = "Modem Status (0x8A)";
ft.ZIGBEE_TRANSMIT_STATUS = 0x8B;
ft[0x8B] = "ZigBee Transmit Status (0x8B)";
ft.ZIGBEE_RECEIVE_PACKET = 0x90;
ft[0x90] = "ZigBee Receive Packet (AO=0) (0x90)";
ft.ZIGBEE_EXPLICIT_RX = 0x91;
ft[0x91] = "ZigBee Explicit Rx Indicator (AO=1) (0x91)";
ft.ZIGBEE_IO_DATA_SAMPLE_RX = 0x92;
ft[0x92] = "ZigBee IO Data Sample Rx Indicator (0x92)";
ft.XBEE_SENSOR_READ = 0x94;
ft[0x94] = "XBee Sensor Read Indicator (AO=0) (0x94)";
ft.NODE_IDENTIFICATION = 0x95;
ft[0x95] = "Node Identification Indicator (AO=0) (0x95)";
ft.REMOTE_COMMAND_RESPONSE = 0x97;
ft[0x97] = "Remote Command Response (0x97)";
ft.OTA_FIRMWARE_UPDATE_STATUS = 0xA0;
ft[0xA0] = "Over-the-Air Firmware Update Status (0xA0)";
ft.ROUTE_RECORD = 0xA1;
ft[0xA1] = "Route Record Indicator (0xA1)";
ft.DEVICE_AUTHENITCATED_INDICATOR = 0xA2;
ft[0xA2] = "Device Authenticated Indicator (0xA2)";
ft.MTO_ROUTE_REQUEST = 0xA3;
ft[0xA3] = "Many-to-One Route Request Indicator (0xA3)";
ft.REGISTER_JOINING_DEVICE_STATUS = 0xA4;
ft[0xA4] = "Register Joining Device Status (0xA4)";
ft.JOIN_NOTIFICATION_STATUS = 0xA5;
ft[0xA5] = "Join Notification Status (0xA5)";

// Series 1/802.15.4 Support
ft.TX_REQUEST_64 = 0x00;
ft[0x00] = "TX (Transmit) Request: 64-bit address (0x00)";
ft.TX_REQUEST_16 = 0x01;
ft[0x01] = "TX (Transmit) Request: 16-bit address (0x01)";
ft.TX_STATUS = 0x89;
ft[0x89] = "TX (Transmit) Status (0x89)";
ft.RX_PACKET_64 = 0x80;
ft[0x80] = "RX (Receive) Packet: 64-bit Address (0x80)";
ft.RX_PACKET_16 = 0x81;
ft[0x81] = "RX (Receive) Packet: 16-bit Address (0x81)";
ft.RX_PACKET_64_IO = 0x82;
ft[0x82] = "RX (Receive) Packet: 64-bit Address IO (0x82)";
ft.RX_PACKET_16_IO = 0x83;
ft[0x83] = "RX (Receive) Packet: 16-bit Address IO (0x83)";


// Modem Status
ms.HARDWARE_RESET = 0x00;
ms[0x00] = "Hardware Reset (0x00)";
ms.WATCHDOG_RESET = 0x01;
ms[0x01] = "Watchdog timer reset (0x01)";
ms.JOINED_NETWORK = 0x02;
ms[0x02] = "Joined Network (0x02)";
ms.DISASSOCIATED = 0x03;
ms[0x03] = "Disassociated (0x03)";
ms.COORDINATOR_STARTED = 0x06;
ms[0x06] = "Coordinator started (0x06)";
ms.SECURITY_KEY_UPDATED = 0x07;
ms[0x07] = "Network security key was updated (0x07)";
ms.VOLTAGE_SUPPLY_LIMIT_EXCEEDED = 0x0D;
ms[0x0D] = "Voltage supply limit exceeded (0x0D)";
ms.CONFIGURATION_CHANGED_DURING_JOIN = 0x11;
ms[0x11] = "Modem Configuration changed while join in progress (0x11)";
ms.STACK_ERROR = 0x80;
ms[0x80] = "Stack Error (0x80)";

// Command Status
coms.OK = 0x00;
coms[0x00] = "OK (0x00)";
coms.ERROR = 0x01;
coms[0x01] = "ERROR (0x01)";
coms.INVALID_COMMAND = 0x02;
coms[0x02] = "Invalid Command (0x02)";
coms.INVALID_PARAMETER = 0x03;
coms[0x03] = "Invalid Parameter (0x03)";
coms.REMOTE_CMD_TRANS_FAILURE = 0x04;
coms[0x04] = "Remote Command Transmission Failed (0x04)";

// Delivery Status
dels.SUCCESS = 0x00;
dels[0x00] = "Success (0x00)";
dels.MAC_ACK_FALIURE = 0x01;
dels[0x01] = "MAC ACK Failure (0x01)";
dels.CA_FAILURE = 0x02;
dels[0x02] = "CA Failure (0x02)";
dels.INVALID_DESTINATION_ENDPOINT = 0x15;
dels[0x15] = "Invalid destination endpoint (0x15)";
dels.NETWORK_ACK_FAILURE = 0x21;
dels[0x21] = "Network ACK Failure (0x21)";
dels.NOT_JOINED_TO_NETWORK = 0x22;
dels[0x22] = "Not Joined to Network (0x22)";
dels.SELF_ADDRESSED = 0x23;
dels[0x23] = "Self-addressed (0x23)";
dels.ADDRESS_NOT_FOUND = 0x24;
dels[0x24] = "Address Not Found (0x24)";
dels.ROUTE_NOT_FOUND = 0x25;
dels[0x25] = "Route Not Found (0x25)";
dels.BROADCAST_SOURCE_FAILED = 0x26;
dels[0x26] = "Broadcast source failed to hear a neighbor relay the message (0x26)";
dels.INVALID_BINDING_TABLE_INDEX = 0x2B;
dels[0x2B] = "Invalid binding table index (0x2B)";
dels.RESOURCE_ERROR = 0x2C;
dels[0x2C] = "Resource error lack of free buffers, timers, etc. (0x2C)";
dels.ATTEMPTED_BROADCAST_WITH_APS_TRANS = 0x2D;
dels[0x2D] = "Attempted broadcast with APS transmission (0x2D)";
dels.ATTEMPTED_BROADCAST_WITH_APS_TRANS_EE0 = 0x2D;
dels[0x2E] = "Attempted unicast with APS transmission, but EE=0 (0x2E)";
dels.RESOURCE_ERROR_B = 0x32;
dels[0x32] = "Resource error lack of free buffers, timers, etc. (0x32)";
dels.DATA_PAYLOAD_TOO_LARGE = 0x74;
dels[0x74] = "Data payload too large (0x74)";
dels.INDIRECT_MESSAGE_UNREQUESTED = 0x75;
dels[0x75] = "Indirect message unrequested (0x75)";

// Discovery Status
diss.NO_DISCOVERY_OVERHEAD = 0x00;
diss[0x00] = "No Discovery Overhead (0x00)";
diss.ADDRESS_DISCOVERY = 0x01;
diss[0x01] = "Address Discovery (0x01)";
diss.ROUTE_DISCOVERY = 0x02;
diss[0x02] = "Route Discovery (0x02)";
diss.ADDRESS_AND_ROUTE_DISCOVERY = 0x03;
diss[0x03] = "Address and Route (0x03)";
diss.EXTENDED_TIMEOUT_DISCOVERY = 0x40;
diss[0x40] = "Extended Timeout Discovery (0x40)";

// Receive Options
ro.PACKET_ACKNOWLEDGED = 0x01;
ro[0x01] = "Packet Acknowledged (0x01)";
ro.PACKET_WAS_BROADCAST = 0x02;
ro[0x02] = "Packet was a broadcast packet (0x02)";
ro.PACKET_ENCRYPTED = 0x20;
ro[0x20] = "Packet encrypted with APS encryption (0x20)";
ro.PACKET_SENT_FROM_END_DEVICE = 0x40;
ro[0x40] = "Packet was sent from an end device (if known) (0x40)";

//Xbee Wifi command options
co.REQUEST_ACK = 0x02;
co[0x02] = "Request Acknowledge (bit 1)";
//Xbee Wifi configuration options
cfgo.APPLY_CHANGES = 0x02;
cfgo[0x02] = "Apply Changes immediately";//or else AC command required to apply changes all at once

//module specific frame identifiers
msb.WIFI = msb.WIFI_S6 = msb.WIFI_S6B = "Wifi";
msb["Wifi"] = [exports.WIFI_COMMAND_ID.REMOTE_COMMAND, exports.WIFI_COMMAND_ID.IO_SAMPLE];
msb.SERIAL_802_15_4 = msb.SERIAL_ZNET = msb.SERIAL_ZIGBEE = msb.SERIAL_ANY = "Serial";
msb["Serial"] = [exports.START_BYTE];

//
// Digital Channel Mask/Pins
//
// Map mask to name (specific per module)
var dcmserial = dc.MASK[exports.MODULE_ID.SERIAL_ANY] = {};
var dcmwifi = dc.MASK[exports.MODULE_ID.WIFI] = {};

dcmserial[0]  = dcmwifi[0] = ["DIO0", "AD0"];
dcmserial[1]  = dcmwifi[1] = ["DIO1", "AD1"];
dcmserial[2]  = dcmwifi[2] = ["DIO2", "AD2"];
dcmserial[3]  = dcmwifi[3] = ["DIO3", "AD3"];
dcmserial[4]  =              ["DIO4"];
                dcmwifi[4] = ["DIO4", "AD4"];
dcmserial[5]  = dcmwifi[5] = ["DIO5", "ASSOCIATE"];
dcmserial[6]  = dcmwifi[6] = ["DIO6", "RTS"];
dcmserial[7]  = dcmwifi[7] = ["DIO7", "CTS"];
                dcmwifi[8] = ["DIO8", "DTR"];
                dcmwifi[9] = ["DIO9", "OnSleep"];
dcmserial[10] =              ["DIO10", "RSSI"];
                dcmwifi[10]= ["DIO10", "PWM0"];
dcmserial[11] =              ["DIO11", "PWM"];
                dcmwifi[11]= ["DIO11", "PWM1"];
dcmserial[12] =              ["DIO12", "CD"];
                dcmwifi[12]= ["DIO12", "SPIMISO"];
                dcmwifi[13]= ["DIO13", "DOUT"];
                dcmwifi[14]= ["DIO14", "DIN"];

// Map pin/name to mask (specific per module)
var dPinserial = dc.PIN[exports.MODULE_ID.SERIAL_ANY] = {};
var dPinwifi = dc.PIN[exports.MODULE_ID.WIFI] = {};

var dcserial = dc[exports.MODULE_ID.SERIAL_ANY] = {};
var dcwifi = dc[exports.MODULE_ID.WIFI] = {};

dPinserial[20]    =  dcserial.DIO0    = dcserial.AD0          = 0;
dPinserial[19]    =  dcserial.DIO1    = dcserial.AD1          = 1;
dPinserial[18]    =  dcserial.DIO2    = dcserial.AD2          = 2;
dPinserial[17]    =  dcserial.DIO3    = dcserial.AD3          = 3;
dPinserial[11]    =  dcserial.DIO4    =                         4;
dPinserial[15]    =  dcserial.DIO5    = dcserial.ASSOCIATE    = 5;
dPinserial[16]    =  dcserial.DIO6    = dcserial.RTS          = 6;
dPinserial[12]    =  dcserial.DIO7    = dcserial.CTS          = 7;
dPinserial[6]     =  dcserial.DIO10   = dcserial.RSSI         = 10;
dPinserial[7]     =  dcserial.DIO11   = dcserial.PWM          = 11;
dPinserial[4]     =  dcserial.DIO12   = dcserial.CD           = 12;
//////////////////////////////////////////////////////////////////////
dPinwifi[20]      =  dcwifi.DIO0      = dcwifi.AD0            = 0;
dPinwifi[19]      =  dcwifi.DIO1      = dcwifi.AD1            = 1;
dPinwifi[18]      =  dcwifi.DIO2      = dcwifi.AD2            = 2;
dPinwifi[17]      =  dcwifi.DIO3      = dcwifi.AD3            = 3;
dPinwifi[11]      =  dcwifi.DIO4      = dcwifi.AD4            = 4;
dPinwifi[15]      =  dcwifi.DIO5      = dcwifi.ASSOCIATE      = 5;
dPinwifi[16]      =  dcwifi.DIO6      = dcwifi.RTS            = 6;
dPinwifi[12]      =  dcwifi.DIO7      = dcwifi.CTS            = 7;
dPinwifi[9]       =  dcwifi.DIO8      = dcwifi.DTR            = 8;
dPinwifi[13]      =  dcwifi.DIO9      = dcwifi.ONSLEEP        = 9;
dPinwifi[6]       =  dcwifi.DIO10     = dcwifi.PWM0           = 10;
dPinwifi[7]       =  dcwifi.DIO11     = dcwifi.PWM1           = 11;
dPinwifi[4]       =  dcwifi.DIO12     = dcwifi.SPIMISO        = 12;
dPinwifi[2]       =  dcwifi.DIO13     = dcwifi.DOUT           = 13;
dPinwifi[3]       =  dcwifi.DIO14     = dcwifi.DIN            = 14;

// Analog Channel Mask/Pins
//
// Map mask to name (per module)
var acmserial = ac.MASK[exports.MODULE_ID.SERIAL_ANY] = {};
var acmwifi = ac.MASK[exports.MODULE_ID.WIFI] = {};

acmserial[0] =   acmwifi[0] = ["AD0", "DIO0" ];
acmserial[1] =   acmwifi[1] = ["AD1", "DIO1" ];
acmserial[2] =   acmwifi[2] = ["AD2", "DIO2" ];
acmserial[3] =   acmwifi[3] = ["AD3", "DIO3" ];
                 acmwifi[4] = ["AD4", "DIO4" ];
acmserial[7] =   acmwifi[7] = ["SUPPLY"];

// map pin/name to mask
var aPinserial = ac.PIN[exports.MODULE_ID.SERIAL_ANY] = {};
var aPinwifi = ac.PIN[exports.MODULE_ID.WIFI] = {};

var acserial = ac[exports.MODULE_ID.SERIAL_ANY] = {};
var acwifi = ac[exports.MODULE_ID.WIFI] = {};

aPinserial[20]  = acserial.AD0  = acserial.DIO0     = 0;
aPinserial[19]  = acserial.AD1  = acserial.DIO1     = 1;
aPinserial[18]  = acserial.AD2  = acserial.AD3      = 3;   //TODO why are 2 and 3 on the same mask? I think this is a bug
aPinserial[17]  = acserial.SUPPLY                   = 7; // 17 True?   //TODO maybe pin 1 makes sense? vcc?
////////////////////////////////////////////////////
aPinwifi[20]    = acwifi.AD0    = acwifi.DIO0       = 0;
aPinwifi[19]    = acwifi.AD1    = acwifi.DIO1       = 1;
aPinwifi[18]    = acwifi.AD2    = acwifi.DIO2       = 2;
aPinwifi[11]    = acwifi.AD4    = acwifi.DIO4       = 4;
aPinwifi[1]     = acwifi.SUPPLY                     = 7;

//
// Pullup-enable Mask/Pins
//
// Map mask to name
//these are identical in the wifi document
pr.MASK[0] = ["DIO4"];
pr.MASK[1] = ["DIO3", "AD3"];
pr.MASK[2] = ["DIO2", "AD2"];
pr.MASK[3] = ["DIO1", "AD1"];
pr.MASK[4] = ["DIO0", "AD0"];
pr.MASK[5] = ["DIO6", "RTS"];
pr.MASK[6] = ["DIO8", "DTR", "SLEEP_REQUEST"];
pr.MASK[7] = ["DIN", "CONFIG"];
pr.MASK[8] = ["DIO5", "ASSOCIATE"];
pr.MASK[9] = ["DIO9", "ON"];
pr.MASK[10] = ["DIO12"];
pr.MASK[11] = ["DIO10", "RSSI", "PWM0"];
pr.MASK[12] = ["DIO11", "PWM1"];
pr.MASK[13] = ["DIO7", "CTS"];
// Map pin/name to maks
pr.PIN[11] = pr.DIO4 = 0;
pr.PIN[17] = pr.AD3 = pr.DIO3 = 1; 
pr.PIN[18] = pr.AD2 = pr.DIO2 = 2;
pr.PIN[19] = pr.AD1 = pr.DIO1 = 3;
pr.PIN[20] = pr.AD0 = pr.DIO0 = 4;
pr.PIN[16] = pr.RTS = pr.DIO6 = 5;
pr.PIN[9] = pr.DIO8 = pr.DTR  = pr.SLEEP_REQUEST = 6;
pr.PIN[3] = pr.DIN  = pr.CONFIG = 7;
pr.PIN[15] = pr.ASSOCIATE = pr.DIO5 = 8;
pr.PIN[13] = pr.ON = pr.SLEEP = pr.DIO9 = 9;
pr.PIN[4] = pr.DIO12 = 10;
pr.PIN[6] = pr.PWM0 = pr.RSSI = pr.DIO10 = 11;
pr.PIN[7] = pr.PWM1 = pr.DIO11 = 12;
pr.PIN[12] = pr.CTS = pr.DIO7 = 13;


//
// Change Reporting Mask/Pins
//
// Map mask to name
ic.MASK[0] = ["DIO0"];
ic.MASK[1] = ["DIO1"];
ic.MASK[2] = ["DIO2"];
ic.MASK[3] = ["DIO3"]; 
ic.MASK[4] = ["DIO4"]; 
ic.MASK[5] = ["DIO5"]; 
ic.MASK[6] = ["DIO6"]; 
ic.MASK[7] = ["DIO7"]; 
ic.MASK[8] = ["DIO8"]; 
ic.MASK[9] = ["DIO9"]; 
ic.MASK[10] = ["DIO10"]; 
ic.MASK[11] = ["DIO11"]; 
// Map pin/name to mask
ic.PIN[20] = ic.DIO0 = 0;
ic.PIN[19] = ic.DIO1 = 1;
ic.PIN[18] = ic.DIO2 = 2;
ic.PIN[17] = ic.DIO3 = 3;
ic.PIN[11] = ic.DIO4 = 4;
ic.PIN[15] = ic.DIO5 = 5;
ic.PIN[16] = ic.DIO6 = 6;
ic.PIN[12] = ic.DIO7 = 7;
ic.PIN[9]  = ic.DIO8 = 8;
ic.PIN[13] = ic.DIO9 = 9;
ic.PIN[6]  = ic.DIO10 = 10;
ic.PIN[7]  = ic.DIO11 = 11;

// 
// Pin Modes
//
var pmserial = pm[exports.MODULE_ID.SERIAL_ANY] = {};
var pmwifi = pm[exports.MODULE_ID.WIFI] = {};

pmserial.P2 = pmserial.P1 = {
  UNMONITORED_INPUT: 0x00,
  DIGITAL_INPUT: 0x03,
  DIGITAL_OUTPUT_LOW: 0x04,
  DIGITAL_OUTPUT_HIGH: 0x05
};
pmwifi.P1 = {
    DISABLED: 0x00,
    PWM1_OUTPUT: 0x02,
    DIGITAL_INPUT: 0x03,
    DIGITAL_OUTPUT_LOW: 0x04,
    DIGITAL_OUTPUT_HIGH: 0x05
};
pmwifi.P2 = {
    DISABLED: 0x00,
    SPI_MISO: 0x01,
    DIGITAL_INPUT: 0x03,
    DIGITAL_OUTPUT_LOW: 0x04,
    DIGITAL_OUTPUT_HIGH: 0x05
};

pmserial.P0 = {
  DISABLED: 0x00,
  RSSI_PWM: 0x01,
  DIGITAL_INPUT: 0x03,
  DIGITAL_OUTPUT_LOW: 0x04,
  DIGITAL_OUTPUT_HIGH: 0x05
};
pmwifi.P0 = {
    DISABLED: 0x00,
    PWM0_OUTPUT: 0x02,
    DIGITAL_INPUT: 0x03,
    DIGITAL_OUTPUT_LOW: 0x04,
    DIGITAL_OUTPUT_HIGH: 0x05
};

pmserial.D4 = {
  DISABLED: 0x00,
  DIGITAL_INPUT: 0x03,
  DIGITAL_OUTPUT_LOW: 0x04,
  DIGITAL_OUTPUT_HIGH: 0x05
};
pmwifi.D4 = {
    DISABLED: 0x00,
    SPI_MOSI: 0x01,
    ANALOG_INPUT: 0x02,
    DIGITAL_INPUT: 0x03,
    DIGITAL_OUTPUT_LOW: 0x04,
    DIGITAL_OUTPUT_HIGH: 0x05
};

pmserial.D7 = pmwifi.D7 = {
  DISABLED: 0x00,
  CTS_FLOW_CTRL: 0x01,
  DIGITAL_INPUT: 0x03,
  DIGITAL_OUTPUT_LOW: 0x04,
  DIGITAL_OUTPUT_HIGH: 0x05,
  RS485_TX_LOW: 0x06,
  RS485_TX_HIGH: 0x07
};

pmserial.D5 = pmwifi.D5 = {
  DISABLED: 0x00,
  ASSOC_LED: 0x01,
  DIGITAL_INPUT: 0x03,
  DIGITAL_OUTPUT_LOW: 0x04,
  DIGITAL_OUTPUT_HIGH: 0x05
};

pmserial.D6 = pmwifi.D6 = {
  DISABLED: 0x00,
  RTS_FLOW_CTRL: 0x01,
  DIGITAL_INPUT: 0x03,
  DIGITAL_OUTPUT_LOW: 0x04,
  DIGITAL_OUTPUT_HIGH: 0x05
};

pmserial.D0 = pmserial.D1 = pmserial.D2 = pmserial.D3 = {
  DISABLED: 0x00,
  NODE_ID_ENABLED: 0x01, // Only valid for D0!
  ANALOG_INPUT: 0x02,
  DIGITAL_INPUT: 0x03,
  DIGITAL_OUTPUT_LOW: 0x04,
  DIGITAL_OUTPUT_HIGH: 0x05
};

pmwifi.D0 = {
    DISABLED: 0x00,
    ANALOG_INPUT: 0x02,
    DIGITAL_INPUT: 0x03,
    DIGITAL_OUTPUT_LOW: 0x04,
    DIGITAL_OUTPUT_HIGH: 0x05
};
pmwifi.D1 = {
    DISABLED: 0x00,
    SPI_ATTN: 0x01,
    ANALOG_INPUT: 0x02,
    DIGITAL_INPUT: 0x03,
    DIGITAL_OUTPUT_LOW: 0x04,
    DIGITAL_OUTPUT_HIGH: 0x05
};
pmwifi.D2 = {
    DISABLED: 0x00,
    SPI_CLK: 0x01,
    ANALOG_INPUT: 0x02,
    DIGITAL_INPUT: 0x03,
    DIGITAL_OUTPUT_LOW: 0x04,
    DIGITAL_OUTPUT_HIGH: 0x05
};
pmwifi.D3 = {
    DISABLED: 0x00,
    SPI_SLAVE_SELECT: 0x01,
    ANALOG_INPUT: 0x02,
    DIGITAL_INPUT: 0x03,
    DIGITAL_OUTPUT_LOW: 0x04,
    DIGITAL_OUTPUT_HIGH: 0x05
};

for (var pin in pmserial) {
  for (var key in pmserial[pin]) {
    pmserial[pin][pmserial[pin][key]] = key;
  }
}
for (var pin in pmwifi) {
    for (var key in pmwifi[pin]) {
        pmwifi[pin][pmwifi[pin][key]] = key;
    }
}

//Pin commands TODO wifi
pc.PIN[6] = pc.PWM0 = pc.DIO10 = pc.RSSIM = "P0";
pc.PIN[7] = pc.DIO11 = pc.PWM1 = "P1";
pc.PIN[4] = pc.DIO12 = "P2";
pc.PIN[12] = pc.DIO7 = pc.CTS = "D7";
pc.PIN[16] = pc.DIO6 = "D6";
pc.PIN[20] = pc.AD0 = pc.DIO0 = "D0";
pc.PIN[19] = pc.AD1 = pc.DIO1 = "D1";
pc.PIN[18] = pc.AD2 = pc.DIO2 = "D2";
pc.PIN[17] = pc.AD3 = pc.DIO3 = "D3";
pc.PIN[11] = pc.DIO4 = "D4";
pc.PIN[15] = pc.DIO5 = pc.ASSOC = "D5";

