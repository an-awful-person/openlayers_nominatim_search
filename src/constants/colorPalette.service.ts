export enum COLOR_PALETTE_TYPES {
  FLAT_UI = "FLAT_UI",
  MAP_UI = "MAP_UI"
}

export class ColorPalette {
  public static readonly PALETTES = new Map<COLOR_PALETTE_TYPES, string[]>([
    [COLOR_PALETTE_TYPES.FLAT_UI, [
        "#1ABC9C",
        "#3498db",
        "#9b59b6",
        "#34495e",
        "#f1c40f",
        "#e67e22",
        "#e74c3c",
        "#16A085",
        "#27ae60",
        "#2ECC71",
        "#2980b9",
        "#8e44ad",
        "#2c3e50",
        "#f39c12",
        "#d35400",
        "#c0392b",
        "#bdc3c7",
        "#7f8c8d",
      ]],
      [COLOR_PALETTE_TYPES.MAP_UI, [
        "#1ABC9C",
        "#F1C40F",
        "#3498DB",
        "#E74C3C",
        "#9B58B6",
        "#2ECC71",
        "#E67E22"
      ]]
  ]);

  static getColor(palette: COLOR_PALETTE_TYPES, index:number):string{
    const paletteFromList = ColorPalette.PALETTES.get(palette);
    if(paletteFromList && paletteFromList.length > 0){
        if(index >= paletteFromList.length){
            const pLength = paletteFromList.length;
            index = index - Math.floor(index/pLength)*pLength;
            return paletteFromList[index]
        } else {
            return paletteFromList[index];
        }
    } else {
        return "0"
    }
  }
}
