import { ComponentType } from "react";
import { BedDouble, Droplet, Eclipse, Grape, Tv } from "lucide-react";

interface RoomType {
  id: string;
  title: string;
  rectColor: string;
  color: string;
  Icon: ComponentType<any>;
}

export const roomTypes = {
  // Living Room
  living: {
    id: "living",
    title: "Living Room",
    color: "#EE4D4D",
    rectColor: "#d3e7f0",
    Icon: Tv,
  } as RoomType,
  // Bedroom
  bedroom: {
    id: "bedroom",
    title: "Bedroom",
    color: "#a808c5",
    rectColor: "#f2e3b9",
    Icon: BedDouble,
  } as RoomType,
  // Bathroom
  bathroom: {
    id: "bathroom",
    title: "Bathroom",
    color: "#67d8e0",
    rectColor: "#caf2aa",
    Icon: Droplet,
  } as RoomType,
  // Kitchen
  kitchen: {
    id: "kitchen",
    title: "Kitchen",
    color: "#6ce244",
    rectColor: "#ffd5ef",
    Icon: Grape,
  } as RoomType,
  // Balcony
  balcony: {
    id: "balcony",
    title: "Balcony",
    color: "#0400fc",
    rectColor: "#ffe192",
    Icon: Eclipse,
  } as RoomType
} as const;

/* export type RoomTypeIds = keyof typeof roomTypes;
export const roomTypeIds = Object.keys(roomTypes) as RoomTypeIds[];

export const nodeTypeToRoomType: Record<number, RoomTypeIds> = {
  0: "living",
  1: "kitchen",
  2: "bedroom",
  3: "bathroom",
  4: "balcony"
};

export const roomTypeToNodeType: Record<RoomTypeIds, number> = {
  living: 0,
  kitchen: 1,
  bedroom: 2,
  bathroom: 3,
  balcony: 4
};

export function roomInfoFromNodeType(nodeType: number) {
  return roomTypes[nodeTypeToRoomType[nodeType]];
}
 */