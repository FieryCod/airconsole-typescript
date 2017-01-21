
/**
 *  An object containing information about a device in this session.
 *  @typedef {object} AirConsole~DeviceState
 *  @property {string} uid - The globally unique ID of the user.
 *  @property {string|undefined} custom - Custom device data that this API can set.
 *  @property {string|undefined} nickname - The nickname of the user.
 *  @property {boolean|undefined} slow_connection - If the user has a high server latency.
 */
interface DeviceState {

  /**
  *  The globally unique ID of the user.
  */
  uid: string;
  /**
  *  Custom device data that this API can set.
  */
  custom: string | void;
  /**
  *  The nickname of the user.
  */
  nickname: string | void;
  /**
   *  If the user has a high server latency.
   */
  slow_connection: boolean | void;
}

/**
 *  An object containing information about a device in this session.
 *  @typedef {object} AirConsole~Config
 *  @property {string} orientation - AirConsole.ORIENTATION_PORTRAIT or
 *            AirConsole.ORIENTATION_LANDSCAPE.
 *  @property {boolean|undefined} synchronize_time - If set to true, you can
 *            call getServerTime() to get the time on the game server.
 *            Default is false.
 *  @property {boolean|undefined} setup_document - Sets up the document so
 *            nothing is selectable, zoom is fixed to 1 and scrolling is
 *            disabled (iOS 8 clients drop out of fullscreen when scrolling).
 *            Default: true
 */
declare interface Config {
  /**
   *  AirConsole.ORIENTATION_PORTRAIT or AirConsole.ORIENTATION_LANDSCAPE.
   */
  orientation: string;
  /**
   *  If set to true, you can call getServerTime() to get the time on
   *  the game server. Default is false.
   */
  synchronize_time: boolean | void;
  /**
   *  Sets up the document so nothing is selectable, zoom is fixed to 1 and scrolling
   *  is disabled (iOS 8 clients drop out of fullscreen when scrolling). Default: true
   */
  setup_document: boolean | void;
}



declare abstract class AirConsole {
  /**
   *  Your gateway object to AirConsole. There are getter and setter functions for all properties. Do not access properties of this object directly
   *  opts: Constructor config.
   *  @constructor
   *  @param {opts}
   */
  constructor(opts?: Config | Object);

  /**
   *  The device ID of the game screen.
   */
  static ORIENTATION_PORTRAIT: string;
  /**
   *  The device ID of the game screen.
   */
  static ORIENTATION_LANDSCAPE: string;
  /**
   *  The device ID of the game screen.
   */
  static SCREEN: number;


  // CONNECTIVITY // 

  /**
   * Returns all controller device ids that have loaded your game.
   * @returns {Array<number>}
   * @memberOf AirConsole
   */
  getControllerDeviceIds(): Array<number>;

  /**
   * Returns the device_id of this device. Every device in an AirConsole session has a device_id. The screen always has device_id 0. You can use the AirConsole.
   * SCREEN constant instead of 0. All controllers also get a device_id. You can NOT assume that the device_ids of controllers are consecutive or that they start at 1. 
   * DO NOT HARDCODE CONTROLLER DEVICE IDS! If you want to have a logic with "players numbers" (Player 0, Player 1, Player 2, Player 3) use the setActivePlayers helper function!.
   * You can hardcode player numbers, but not device_ids. Within an AirConsole session, devices keep the same device_id when they disconnect and reconnect. 
   * Different controllers will never get the same device_id in a session. Every device_id remains reserved for the device that originally got it.
   * @returns {number}
   * @memberOf AirConsole
   */
  getDeviceId(): number;

  /**
   * Returns the device ID of the master controller. In the future, Premium devices are prioritzed.
   * @returns {(number | undefined)}
   * @memberOf AirConsole
   */
  getMasterControllerDeviceId(): number | undefined;


  /**
   * Returns the current time of the game server. This allows you to have a synchronized clock: 
   * You can send the server time in a message to know exactly at what point something happened on a device. 
   * This function can only be called if the AirConsole was instantiated with the "synchronize_time" opts set to true and after onReady was called.
   * Returns: Timestamp in milliseconds.
   * @returns {number}
   * @memberOf AirConsole
   */
  getServerTime(): number;

  /**
   * Gets called when a device has connected and loaded the game.
   * device_id: the device ID that loaded the game.
   * @abstract
   * @param {number} device_id
   * @memberOf AirConsoleAbstract
   */
  abstract onConnect(device_id: number);

  /**
   * Gets called when a device has left the game.
   * device_id: the device ID that left the game.
   * @abstract
   * @param {number} device_id
   * @memberOf AirConsoleAbstract
   */
  abstract onDisconnect(device_id: number);

  abstract onReady(code: string): void;
  /**
  *  Sets the custom property in this devices DeviceState object.
  *  @param data {Object} The custom data to set.
  */

  // END //

  // MESSAGES //
  /**
  * Sends a message to all connected devices.
  * @param {*} data
  * @memberOf AirConsole
  */
  broadcast(data: any): void;

  /**
 * Sends a message to another device.
 * device_id: The device ID to send the message to. If "device_id" is undefined, the message is sent to all devices (except this one).
 * @param {any} device_id
 * @param {any} data
 * 
 * @memberOf AirConsole
 */
  message(device_id: number | undefined, data: any): void;

  abstract onMessage(from: number, data: any): void;
  /**
   *  Gets called when the game console is ready.
   *  @param code {string} The AirConsole join code.
   */

  //



  /**
   * Returns the player number for a device_id, if the device_id is part of the active players previously set by the screen by calling setActivePlayers. 
   * Player numbers are zero based and are consecutive. If the device_id is not part of the active players, this function returns undefined.
   * @param {any} device_id
   * @returns {(number | undefined)} 
   * @memberOf AirConsole
   */
  convertDeviceIdToPlayerNumber(device_id: number): number | undefined;

  /**
   * Returns the device_id of a player, if the player is part of the active players previously set by the screen by calling setActivePlayers.
   * If fewer players are in the game than the passed in player_number or the active players have not been set by the screen, this function returns undefined.
   * @param {any} player_number
   * @returns {(number | undefined)}
   * 
   * @memberOf AirConsole
   */
  convertPlayerNumberToDeviceId(player_number: number): number | undefined;


  /**
   * Lets the user change his nickname, profile picture and email address. If you need a real nickname of the user, use this function. onDeviceProfileChange will be called if the user logs in.
   * @memberOf AirConsole
   */
  editProfile(): void;

  /**
   * Returns an array of device_ids of the active players previously set by the screen by calling setActivePlayers. 
   * The first device_id in the array is the first player, the second device_id in the array is the second player, ...
   * @returns {Array<number>}
   * @memberOf AirConsole
   */
  getActivePlayerDeviceIds(): Array<number>;


  /**
   * Gets the custom DeviceState of a device.
   * Parameters:
   * device_id: The device ID of which you want the custom state. Default is this device.
   * @param {number} device_id
   * @memberOf AirConsole
   */
  getCustomDeviceState(device_id?: number): Object | undefined;



  /**
   * Offers the user to become a premium member. Can only be called from controllers. If you call getPremium in development mode, the device becomes premium immediately.
   * @memberOf AirConsole
   */
  getPremium(): void;
  /**
    * Gets called when the screen sets the active players by calling setActivePlayers().
    * The player number of this device. Can be undefined if this device is not part of the active players.
    * @abstract
    * @param {(number | undefined)} player_number
    * @memberOf AirConsoleAbstract
    */
  abstract onActivePlayersChange(player_number: number | undefined);

  /**
   * Gets called when an advertisement is finished or no advertisement was shown.
   * ad_was_shown: True iff an ad was shown and onAdShow was called.
   * @abstract
   * @param {boolean} ad_was_shown
   * 
   * @memberOf AirConsoleAbstract
   */
  abstract onAdComplete(ad_was_shown: boolean);

  /**
   * Gets called if a fullscreen advertisement is shown on this screen. In case this event gets called, please mute all sounds.
   * @abstract
   * @memberOf AirConsoleAbstract
   */
  abstract onAdShow();


  /**
   * Gets called when a device updates it's custom DeviceState by calling setCustomDeviceState or setCustomDeviceStateProperty. Make sure you understand the power of device states:
   * @abstract
   * @param {number} device_id
   * @param {Object} custom_data
   * @memberOf AirConsoleAbstract
   */
  abstract onCustomDeviceStateChange(device_id: number, custom_data: Object);

  /**
   * Gets called every X milliseconds with device motion data iff the AirConsole was instantiated with the "device_motion" opts set to the interval in milliseconds.
   * Only works for controllers. Note: Some browsers do not allow games to access accelerometer and gyroscope in an iframe (your game). So use this method if you need gyroscope or accelerometer data.
   * data: {data.x, data.y, data.z for accelerometer data.alpha, data.beta, data.gamma for gyroscope}
   * @abstract
   * @param {Object} data
   * @memberOf AirConsoleAbstract
   */
  abstract onDeviceMotion(data: Object);

  /**
   * Gets called when a device updates it's profile pic, nickname or email.
   * device_id: The device_id that changed its profile.
   * @abstract
   * @param {number} device_id
   * @memberOf AirConsoleAbstract
   */
  abstract onDeviceProfileChange(device_id: number)

  // FIXME:: Poprawic
  // abstract onDeviceStateChange(device_id:number, user_data)



  /**
   * Gets called if the request of requestEmailAddress() was granted. For privacy reasons, you need to whitelist your game in order to receive the email address of the user. 
   * To whitelist your game, contact developers@airconsole.com. For development purposes, localhost is always allowed.
   * email_address: The email address of the user if it was set.
   * @abstract
   * @param {string|undefined} email_address
   * @memberOf AirConsoleAbstract
   */
  abstract onEmailAddress(email_address: string | undefined);

  /**
   * Returns all device ids that are premium.
   * @returns {Array<number>}
   * @memberOf AirConsole
   */
  getPremiumDeviceIds(): Array<number>;

  /**
   * Returns the url to a profile picture of the user.
   * device_id: The device id or uid for which you want the profile picture. Default is the current user. Screens don't have profile pictures.
   * size: The size of in pixels of the picture. Default is 64.
   * @param {(number | string)} [device_id_or_uid]
   * @param {number} [size]
   * @memberOf AirConsole
   */
  getProfilePictures(device_id_or_uid?: number | string, size?: number)


  /**
   * Returns the globally unique id of a device.
   * device_id: The device id for which you want the uid. Default is this device.
   * @param {number} [device_id]
   * @returns {(string|undefined)}
   * @memberOf AirConsole
   */
  getUID(device_id?: number): string | undefined;

  /**
   * Returns true if the device is premium
   * device_id: The device_id that should be checked. Only controllers can be premium. Default is this device.
   * @param {number} [device_id]
   * @returns {(boolean | undefined)}
   * @memberOf AirConsole
   */
  isPremium(device_id?: number): boolean | undefined;

  /**
   * Returns true if a user is logged in.
   * device_id: The device_id of the user. Default is this device.
   * @param {number} [device_id]
   * @returns {boolean}
   * @memberOf AirConsole
   */
  isUserLoggedIn(device_id?: number): boolean;


  /**
   * Request that all devices return to the AirConsole store.
   * @memberOf AirConsole
   */
  navigateHome(): void;

  /**
   * Request that all devices load a game by url.
   * url: The base url of the game to navigate to (excluding screen.html or controller.html).
   * @param {string} url
   * @memberOf AirConsole
   */
  navigateTo(url: string);



  /**
   * Returns the nickname of a user.
   * device_id: The device id for which you want the nickname. Default is this device. Screens don't have nicknames.
   * @param {number} [device_id]
   * @returns {(string | undefined)}
   * @memberOf AirConsole
   */
  getNickname(device_id?: number): string | undefined;

  /**
   *  Returns the current time of the game server. Can only be called if the AirConsole was instantiated
   *  with the "synchronize_time" opts set to true and after onReady was called.
   *  @return Timestamp in milliseconds.
   */
  getServerTime(): number;

  /**
   *  Request that the devices (screen and players) return to the start screen.
   */
  navigateHome(): void;
  /**
   *  Gets called when a device joins/leaves/updates it's DeviceState.
   *  @param device_id {number} the device ID that changed it's DeviceState.
   *  @param user_data {DeviceState} the data of that device. If undefined, the device has left.
   */
  onDeviceStateChange(device_id, user_data: DeviceState | Object): void;
  /**
   *  @param from {number} The device ID that sent the message.
   *  @param data {any} The data that was sent.
   */

  setCustomDeviceState(data: DeviceState | Object): void;
  /**
   *  Sets the device orientation.
   *  @param orientation {string} AirConsole.ORIENTATION_PORTRAIT or AirConsole.ORIENTATION_LANDSCAPE.
   */
  setOrientation(orientation: string): void;
  /**
   *  Shows or hides the default UI.
   *  @param visible {boolean} Whether to show or hide the default UI.
   */
  showDefaultUI(visible: boolean): void;
}

