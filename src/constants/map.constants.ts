export const MAP_ID = "my map";
export const POPUP_ID = "popup";

export enum MAP_KEYS {
    NAME = 'name',
    BASE_LAYER = 'baselayer',
    POINTS_LAYER = 'pointslayer',
    EQUATOR_LAYER = 'equatorlayer',
    ACCESS_WINDOW = 'AW'
}

export enum GEOMETRY_TYPE {
    POINT = 'Point',
    LINE_STRING = 'LineString',
    LINEAR_RING = 'LinearRing',
    POLYGON = 'Polygon',
    MULTI_POINT = 'MultiPoint',
    MULTI_LINE_STRING = 'MultiLineString',
    MULTI_POLYGON = 'MultiPolygon',
    GEOMETRY_COLLECTION ='GeometryCollection',
    CIRCLE = 'Circle'
}

export enum GEOSERVER_TYPE {
    TMS = 'TMS',
    WMS = 'WMS',
    WFS = 'WFS',
    // WCS = 'WCS',
    // WMTS = 'WMTS'
}

export enum MAP_PROJECTION {
    EPSG_4326 = "EPSG:4326",
    EPSG_3857 = "EPSG:3857"
}

export enum MAP_VIEW {
    MAP = "MAP",
    GLOBE = "GLOBE"
}

export enum GLOBE_INERTIAL_FRAMES {
    ITRS = "ITRS", //International Terrestrial Reference System
    ICRS = "ICRS", //International Celestial Reference System
    GCRS = "GCRS", //Geocentric Celestial Reference System
    TEME = "TEME" //True Equator Mean Equinox
}