import type { JSX } from "react";

export type DrawerContentModel = {
    innerComponent:JSX.Element | null;
    open: boolean;
}
