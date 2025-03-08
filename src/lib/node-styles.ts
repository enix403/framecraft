// Node styles (colors) are defined in a separate file since they change based on theme

import { BedDouble, Droplet, Eclipse, Grape, LogIn, Tv } from "lucide-react";
import { NodeTypeId } from "./nodes";

// Hack
type LucideIconType = typeof BedDouble;

interface NodeStyle {
  Icon: LucideIconType;
  iconColor: string;
  mapRectColor: string;
}

// mapRectColor: "#ffd5ef"
// iconColor: "#a808c5",
// iconColor: "#cbae2f",
// mapRectColor: "#f2e3b9"
export const appNodeStyle: Record<string, NodeStyle> = {
  living: {
    Icon: Tv,
    iconColor: "#ed6f4f",
    mapRectColor: "#ffc5b4"
  },
  bedroom: {
    Icon: BedDouble,
    // iconColor: "#358aa7",
    // mapRectColor: "#f4d6f4"
    iconColor: "#936b94",
    mapRectColor: "#f3def3"
  },
  kitchen: {
    Icon: Grape,
    iconColor: "#76bf43",
    mapRectColor: "#caf2aa"
  },
  bathroom: {
    Icon: Droplet,
    // iconColor: "#cea827",
    // iconColor: "#6fd0cc",
    iconColor: "#358aa7",
    mapRectColor: "#d3e7f0"
  },
  balcony: {
    Icon: Eclipse,
    // iconColor: "#cea827",
    iconColor: "#c49049",
    mapRectColor: "#ffe192"
  },
  fdoor: {
    Icon: LogIn,
    iconColor: "#000000",
    mapRectColor: "#000000"
  }
} satisfies Record<NodeTypeId, NodeStyle>;
