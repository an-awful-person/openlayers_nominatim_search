import { CSSProperties } from "react";

export enum INTERFACE_COLORS {
  PRIMARY = "#1976d2",
  SECONDARY = "",
  TEXT = "#333",
  SUBTLE_TEXT = "#888",
  DISABLED_TEXT = "rgba(16, 16, 16, 0.3)",
  ERROR = "rgb(244, 67, 54)"
}

export const ButtonStyle: CSSProperties = {};

export enum SIDE_BUTTON_SIDES {
  LEFT,
  RIGHT,
  BOTTOM,
  TOP,
}

export enum DRAWER_SIDE {
  LEFT,
  RIGHT,
}