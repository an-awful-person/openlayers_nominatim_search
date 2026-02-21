import type { NavigateFunction, Params, Path } from "react-router-dom";
import type { Service } from "../interfaces/service.interface";
import type { HeaderComponentModel } from "../models/interface.model";
import type { HeaderButtonModel, RouteModel } from "../models/subPages.model";
import { Reactive } from "./reactive.service";
import { ReactiveMap } from "./reactiveMap.service";
import { Subscription } from "rxjs";
import { UserService } from "./user.service";

export class RouterService implements Service {
  public static readonly HEADER_MAIN_HEIGHT = 48;
  public static readonly HEADER_SUB_HEIGHT = 35;
  public static readonly HEADER_BREADCRUMBS_HEIGHT = 35;

  private _userService: UserService;

  private _routes: ReactiveMap<RouteModel> = new ReactiveMap();

  private _breadcrumbs: ReactiveMap<RouteModel[]> = new ReactiveMap();

  private _activeRoute: Reactive<string> = new Reactive<string>("");

  private _headerPageButtons: ReactiveMap<HeaderButtonModel> =
    new ReactiveMap();

  private _headerSubPageButtons: ReactiveMap<HeaderButtonModel> =
    new ReactiveMap();

  private _headerAdditionalComponents: ReactiveMap<HeaderComponentModel> =
    new ReactiveMap();

  private _navigateToUrl: Reactive<string> = new Reactive<string>("");

  private _navigator: Reactive<NavigateFunction | undefined> = new Reactive<
    NavigateFunction | undefined
  >(undefined);

  private _pageParams: Reactive<Readonly<Params<string>> | undefined> =
    new Reactive<Readonly<Params<string>> | undefined>(undefined);

  private _path: Reactive<Path | undefined> = new Reactive<Path | undefined>(
    undefined
  );

  private _subscriptions: Subscription[] = [];

  private _headerTotalHeight: Reactive<number> = new Reactive(
    RouterService.HEADER_MAIN_HEIGHT + RouterService.HEADER_BREADCRUMBS_HEIGHT
  );

  private _hasSubHeader: Reactive<boolean> = new Reactive(false);

  constructor(userService: UserService) {
    this._userService = userService;
  }

  init() {
    this._subscriptions.push(
      this._navigateToUrl.listener().subscribe((url) => {
        if (this._navigator.value !== undefined) {
          this._navigator.value(url);
        }
      })
    );

    this._subscriptions.push(
      this.hasSubHeader.listener().subscribe((state) => {
        if (state) {
          this.headerTotalHeight.set(
            RouterService.HEADER_MAIN_HEIGHT +
              RouterService.HEADER_BREADCRUMBS_HEIGHT +
              RouterService.HEADER_SUB_HEIGHT
          );
        } else {
          this.headerTotalHeight.set(
            RouterService.HEADER_MAIN_HEIGHT +
              RouterService.HEADER_BREADCRUMBS_HEIGHT
          );
        }
      })
    );
  }

  exit() {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
    this._headerAdditionalComponents.unsubscribe();
  }

  get routes(): ReactiveMap<RouteModel> {
    return this._routes;
  }

  get breadcrumbs(): ReactiveMap<RouteModel[]> {
    return this._breadcrumbs;
  }

  get navigator(): Reactive<NavigateFunction | undefined> {
    return this._navigator;
  }

  get pageParams(): Reactive<Readonly<Params<string>> | undefined> {
    return this._pageParams;
  }

  get path(): Reactive<Path | undefined> {
    return this._path;
  }

  /**
   * Should be the route title of the first breadcrumb
   */
  get activeRoute(): Reactive<string> {
    return this._activeRoute;
  }

  get headerAdditionalComponents(): ReactiveMap<HeaderComponentModel> {
    return this._headerAdditionalComponents;
  }

  get headerPageButtons(): ReactiveMap<HeaderButtonModel> {
    return this._headerPageButtons;
  }

  get headerSubPageButtons(): ReactiveMap<HeaderButtonModel> {
    return this._headerSubPageButtons;
  }

  get navigateToUrl(): Reactive<string> {
    return this._navigateToUrl;
  }

  get headerTotalHeight(): Reactive<number> {
    return this._headerTotalHeight;
  }

  get hasSubHeader(): Reactive<boolean> {
    return this._hasSubHeader;
  }

  navigateToLogin() {
    const loginRoute = this._userService.loginRoute.value;
    const useAuthorization = this._userService.useAuthorization ?? false;
    const hasLoginRoute = loginRoute !== undefined;
    const correctPath = loginRoute?.path !== undefined;
    if (useAuthorization && hasLoginRoute && correctPath) {
      this.changeParentPage(loginRoute.path);
    }
  }

  navigateTo(url: string) {
    this.navigateToUrl.set(url);
  }

  goToChildPage(route: RouteModel) {
    const newMap = this.breadcrumbs.value;
    const breadcrumbLine: RouteModel[] | undefined = newMap.get(
      this.activeRoute.value
    );
    if (breadcrumbLine !== undefined) {
      const routeIndex = breadcrumbLine.findIndex((r) => r.path === route.path);
      if (routeIndex !== -1) {
        breadcrumbLine.splice(routeIndex + 1);
      } else {
        breadcrumbLine.push(route);
      }
      newMap.set(this.activeRoute.value, breadcrumbLine);
      this.breadcrumbs.set(newMap);
      this.navigateTo(route.path);
    }
  }

  changeParentPage(routePath: string | undefined) {
    if (routePath === undefined) {
      return;
    }

    this._activeRoute.set(routePath);
    const routes: RouteModel[] | undefined = this.breadcrumbs.get(routePath);
    if (routes !== undefined && routes.length > 0) {
      this.navigateTo(routes[routes.length - 1].path);
    } else {
      console.debug(
        `You are trying to access route ${routePath} but it doesn't exist.`,
        routePath,
        this._breadcrumbs.value
      );
    }
  }
}