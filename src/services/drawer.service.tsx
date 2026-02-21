import { DRAWER_SIDE } from "../constants/interface.constants";
import type { Service } from "../interfaces/service.interface";
import type { DrawerContentModel } from "../models/drawer.model";
import { Reactive } from "./reactive.service";

export class DrawerService implements Service {

    private _leftDrawer:Reactive<DrawerContentModel> = new Reactive<DrawerContentModel>({innerComponent:<>Empty</>, open:false});
    private _rightDrawer:Reactive<DrawerContentModel> = new Reactive<DrawerContentModel>({innerComponent:<>Empty</>, open:false});

    private _onDrawerClosed:Reactive<DRAWER_SIDE | null> = new Reactive<DRAWER_SIDE | null>(null);

    get leftDrawer(){
        return this._leftDrawer;
    }

    get rightDrawer(){
        return this._rightDrawer;
    }

    get onDrawerClosed(){
        return this._onDrawerClosed;
    }

    init() {

    }
    exit() :void {
        this._leftDrawer.unsubscribe();
        this._rightDrawer.unsubscribe();
        this._onDrawerClosed.unsubscribe();
    }
}