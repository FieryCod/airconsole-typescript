/// <reference path="airconsole-typescript.d.ts" />
let Config: AirConsoleStates.Config = {
  orientation: AirConsole.ORIENTATION_LANDSCAPE,
  synchronize_time: true,
  blabla: "TEST"

};

let airConsole: AirConsole = new AirConsole(Config);

airConsole.editProfile();
