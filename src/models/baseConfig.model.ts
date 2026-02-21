import { GLOBE_INERTIAL_FRAMES, MAP_VIEW } from "../constants/map.constants"

export type BaseConfig = {
  /**
   * Toggle wether or not the application should take authorization into account
   */
  authorization?: boolean;

  /**
   * MapManager, map and globe related configs
   */
  map?: {
    /**
     * variables that define the map or globe state at start
     */
    start?: {
      /**
       * The default view the map should start on. Can be MAP or GLOBE
       */
      mapView?: string;

      /**
       * Start the globe with natural lighting
       */
      lighting?:boolean;

      /**
       * Start with with inertial Frame, choose from ITRS, ICRS, GCRS, TEME
       */
      inertialFrame?: GLOBE_INERTIAL_FRAMES

      /**
       * Start by tracking an object
       */
      objectTracking?: boolean;

      /**
       * Start with an image overlay
       */
      imageOverlay?:boolean;
    };

    /**
     * If the map start with a filter menu button
     */
    enableFilterMenu?: boolean;

    /**
     * If the map should have inertial frame buttons when on globe
     */
    enableInertialFrameOptions?: boolean;

    /**
     * If the map should have a object tracking option
     */
    enableObjectTracking?: boolean;

    /**
     * If the map should have a timeslider
     */
    enableTimeSlider?: boolean;
  };
};