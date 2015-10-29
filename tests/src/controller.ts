
/// <reference path="shared.ts"/>
/// <reference path="airconsole-1.2.1.d.ts"/>

var air_console: AirConsole = null;

window.onload = function() {

  air_console = new AirConsole({
    orientation: AirConsole.ORIENTATION_PORTRAIT
  });

  air_console.onReady = function() {
    
  };

  air_console.onMessage = function(device_id, data) {

  };
};
