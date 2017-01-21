
/// <reference path="shared.ts"/>
/// <reference path="../../airconsole-1.2.1.d.ts"/>

var air_console: AirConsole = null;

window.onload = function() {

  air_console = new AirConsole();

  air_console.onReady = function() {
    message_log("You are the Screen!");
  };

  air_console.onMessage = function(device_id, data) {
    message_log("received msg");
  };
};
