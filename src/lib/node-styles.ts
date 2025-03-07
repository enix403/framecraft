// Node styles (colors) are defined in a separate file since they change based on theme

import { BedDouble, Droplet, Eclipse, Grape, Tv } from "lucide-react";
import { NodeTypeId } from "./nodes";

// Hack
type LucideIconType = typeof BedDouble;

interface NodeStyle {
  Icon: LucideIconType;
  iconColor: string;
  mapRectColor: string;
}

export const appNodeStyle: Record<string, NodeStyle> = {
  living: {
    Icon: Tv,
    iconColor: "#EE4D4D",
    mapRectColor: "#d3e7f0"
  },
  kitchen: {
    Icon: Grape,
    iconColor: "#6ce244",
    mapRectColor: "#ffd5ef"
  },
  bedroom: {
    Icon: BedDouble,
    iconColor: "#a808c5",
    mapRectColor: "#f2e3b9"
  },
  bathroom: {
    Icon: Droplet,
    iconColor: "#67d8e0",
    mapRectColor: "#caf2aa"
  },
  balcony: {
    Icon: Eclipse,
    iconColor: "#0400fc",
    mapRectColor: "#ffe192"
  },
  fdoor: {
    Icon: Tv,
    iconColor: "#000000",
    mapRectColor: ""
  }
} satisfies Record<NodeTypeId, NodeStyle>;
