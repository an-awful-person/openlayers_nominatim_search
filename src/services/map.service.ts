import { Feature, Map as OlMap, Overlay, View } from "ol";
import { Layer, Tile } from "ol/layer";
import BaseLayer from "ol/layer/Base";
import { fromLonLat } from "ol/proj";
import { XYZ } from "ol/source";
import { MAP_ID, MAP_KEYS, MAP_PROJECTION } from "../constants/map.constants";
import type { Service } from "../interfaces/service.interface";
import { Reactive } from "./reactive.service";
import type { Coordinate } from "ol/coordinate";
import { Geometry, LineString, MultiPolygon, Polygon } from "ol/geom";
import VectorSource from "ol/source/Vector";
import type VectorLayer from "ol/layer/Vector";
import { Fill, Stroke, Style } from "ol/style";



export class MapService implements Service {
  private _target: string;
  private _startView: View;
  private _olMap: Reactive<OlMap | undefined> = new Reactive<OlMap | undefined>(undefined);

  private _togglerFunctions: Map<string, { (layer: BaseLayer): void }> =
    new Map<string, { (layer: BaseLayer): void }>();

  public static readonly DEFAULT_TILESERVER =
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

  constructor(target: string, options?: { startView?: View }) {
    this._target = target ?? MAP_ID;
    this._startView =
      options?.startView ??
      new View({
        projection: MAP_PROJECTION.EPSG_3857,
        center: fromLonLat([4.6, 52.25]),
        zoom: 8,
        multiWorld: true,
      });
  }

  public init() {
    if (!this.olMap) {
      this.createOlMap();
    }

    this.olMap?.setTarget(this._target);
  }

  exit() {}

  /**
   * Create the base Open Layers map and add the first layer to it.
   */
  private createOlMap(): void {
    const baseLayer: BaseLayer =
      new Tile({
            source: new XYZ({
              url: MapService.DEFAULT_TILESERVER,
            }),
          });
    baseLayer.setOpacity(0.5);
    baseLayer.set(MAP_KEYS.NAME, MAP_KEYS.BASE_LAYER);

    this._olMap.set(new OlMap({
      target: this._target,
      layers: [baseLayer],
      view: this._startView,
      controls: [],
    }));
  }

  get target(): string {
    return this._target;
  }

  setTarget(id: string) {
    this._target = id;
    this.olMap?.setTarget(id);
  }

  get view(): View | undefined {
    return this.olMap?.getView();
  }

  setView(view: View) {
    if (this.olMap) {
      this.olMap.setView(view);
    }
  }

  get startView(): View {
    return this._startView;
  }

  get togglerFunctions(): { (layer: BaseLayer): void }[] {
    const functions: { (layer: BaseLayer): void }[] = [];
    this._togglerFunctions.forEach((value, key) => {
      functions.push(value);
    });
    return functions;
  }

  public addTogglerFunction(key: string, value: { (layer: BaseLayer): void }) {
    this._togglerFunctions.set(key, value);
  }

  public removeTogglerFunction(key: string): boolean {
    return this._togglerFunctions.delete(key);
  }

  get olMap(): OlMap | undefined {
    return this._olMap.value;
  }

  // get pointerCoordinateListener(): Observable<Coordinate | undefined> {
  //   return this._pointerLocationTracker.listener();
  // }

  public findLayer(name: string): Layer | undefined {
    return this.olMap
      ?.getLayerGroup()
      .getLayersArray()
      .find((layer) => layer.get("name") === name);
  }

  public addLayer(name: string, layer: BaseLayer): void {
    if (!this.findLayer(name)) {
      layer.set("name", name);
      this.olMap?.addLayer(layer);
    }
  }

  public removeLayer(name: string): void {
    this.olMap
      ?.getLayerGroup()
      .getLayersArray()
      .forEach((layer) => {
        if (layer.get("name") === name) {
          this.olMap?.removeLayer(layer);
        }
      });
  }

  public findOverlay(id: string | number): Overlay | undefined | null {
    return this.olMap?.getOverlayById(id);
  }

  public addOverlay(id: string | number, overlay: Overlay): void {
    if (!this.findOverlay(id)) {
      overlay.set("id", id);
      this.olMap?.addOverlay(overlay);
    }
  }

  public createPolygons(coordinates: Coordinate[][][], layer: VectorLayer) {
    // Create a feature collection for all polygons

    let feature:Feature;

    if (coordinates.length < 2) {
      const polygon = new Polygon(coordinates[0]).transform('EPSG:4326', 'EPSG:3857');
      feature = new Feature(polygon);
    } else {
      const multipolygon = new MultiPolygon(coordinates).transform('EPSG:4326', 'EPSG:3857');
      feature = new Feature(multipolygon);
    }
        

    // Create a vector source and add the features to it
    const vectorSource = new VectorSource<Feature<Geometry>>({
      features: [feature]
    });

    layer.setSource(vectorSource);
    layer.setStyle(new Style({
        fill: new Fill({ color: '#0000ff33' }),
        stroke: new Stroke({ color: '#000000', width: 1 })
      }))
  }

  /**
   * Returns to the origin location on the map
   */
  public goToHome(): void {
    const startView = new View({
      projection: this._startView.getProjection(),
      center: this._startView.getCenter(),
      zoom: this._startView.getZoom(),
      multiWorld: true, // TODO: Cannot get multiworld property value, for now okay because all maps use multiworld = true
    });
    this.olMap?.setView(startView);
  }
}
