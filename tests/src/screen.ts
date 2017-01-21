
/// <reference path="shared.ts"/>
/// <reference path="../../airconsole-1.2.1.d.ts"/>


window.onload = function () {

  let air_console = new AirConsole({ orientation: AirConsole.ORIENTATION_LANDSCAPE, synchronize_time: true, setup_document: true });

  air_console.onReady = function () {
    message_log("You are the Screen!");
  };

  air_console.onMessage = function (device_id, data) {
    message_log("received msg");
  };
};
