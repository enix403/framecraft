import { ComponentType } from "react";
import { BedDouble, Droplet, Eclipse, Grape, Tv } from "lucide-react";

export const CELL_SIZE = 5;
export const snapToGrid = value => Math.round(value / CELL_SIZE) * CELL_SIZE;

interface RoomType {
  id: string;
  title: string;
  color: string;
  rectColor: string;
  Icon: ComponentType<any>;
}

export const roomTypes = {
  living: {
    id: "living",
    title: "Living Room",
    color: "#EE4D4D",
    Icon: Tv,
    rectColor: "#d3e7f0"
  } as RoomType,
  bedroom: {
    id: "bedroom",
    title: "Bedroom Room",
    color: "#a808c5",
    Icon: BedDouble,
    rectColor: "#f2e3b9"
  } as RoomType,
  bathroom: {
    id: "bathroom",
    title: "Bathroom Room",
    color: "#BEBEBE",
    Icon: Droplet,
    rectColor: "#caf2aa"
  } as RoomType,
  kitchen: {
    id: "kitchen",
    title: "Kitchen",
    color: "#6ce244",
    Icon: Grape,
    rectColor: "#ffd5ef"
  } as RoomType,
  balcony: {
    id: "balcony",
    title: "Balcony",
    color: "#f9e909",
    Icon: Eclipse,
    rectColor: "#ffe192"
  } as RoomType
} as const;

export type RoomTypeIds = keyof typeof roomTypes;
export const roomTypeIds = Object.keys(roomTypes) as RoomTypeIds[];

export const nodeTypeToRoomType: Record<number, RoomTypeIds> = {
  0: "living",
  1: "bedroom",
  2: "bathroom",
  3: "kitchen",
  4: "balcony"
};

export function getRectColor(nodeType: number) {
  return roomTypes[nodeTypeToRoomType[nodeType]]?.rectColor || "#ff0000";
}
