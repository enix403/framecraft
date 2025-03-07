import { BedDouble, Droplet, Eclipse, Grape, Tv, Icon } from "lucide-react";

// Hack
type LucideIconType = typeof Icon;

export interface RoomType {
  id: string;
  serverId: number;
  title: string;
  importance: number;
  colors: {
    icon: string;
    mapRect: string;
    // presetGraphNode: string;
  };
  Icon: LucideIconType;
}

export const appRoomTypes = [
  {
    id: "living",
    serverId: 0,
    importance: 0,
    title: "Living Room",
    colors: {
      icon: "#EE4D4D",
      mapRect: "#d3e7f0"
    },
    Icon: Tv
  },
  {
    id: "kitchen",
    serverId: 1,
    importance: 1,
    title: "Kitchen",
    colors: {
      icon: "#6ce244",
      mapRect: "#ffd5ef"
    },
    Icon: Grape
  },
  {
    id: "bedroom",
    serverId: 2,
    importance: 2,
    title: "Bedroom",
    colors: {
      icon: "#a808c5",
      mapRect: "#f2e3b9"
    },
    Icon: BedDouble
  },
  {
    id: "bathroom",
    serverId: 3,
    importance: 3,
    title: "Bathroom",
    colors: {
      icon: "#67d8e0",
      mapRect: "#caf2aa"
    },
    Icon: Droplet
  },
  {
    id: "balcony",
    serverId: 4,
    importance: 4,
    title: "Balcony",
    colors: {
      icon: "#0400fc",
      mapRect: "#ffe192"
    },
    Icon: Eclipse
  }
] as const satisfies RoomType[];

type RoomId = (typeof appRoomTypes)[number]["id"];

const idToRoomType: Record<RoomId, RoomType> = appRoomTypes.reduce(
  (acc, roomType) => ({
    ...acc,
    [roomType.id]: roomType
  }),
  {} as any
);

