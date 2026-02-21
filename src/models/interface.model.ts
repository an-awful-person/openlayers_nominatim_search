import type { JSX } from "react"

export type HeaderComponentModel = {
    orientation:HEADER_COMPONENT_ORIENTATION,
    component: JSX.Element
}

export enum HEADER_COMPONENT_ORIENTATION {
    LEFT,
    RIGHT,
    CENTER
}