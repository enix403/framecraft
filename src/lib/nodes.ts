export interface NodeType {
  id: string;
  serverId: number;
  title: string;
  importance: number;
}

export const appRoomTypes = [
  {
    id: "living",
    serverId: 0,
    importance: 0,
    title: "Living Room"
  },
  {
    id: "kitchen",
    serverId: 1,
    importance: 1,
    title: "Kitchen"
  },
  {
    id: "bedroom",
    serverId: 2,
    importance: 2,
    title: "Bedroom"
  },
  {
    id: "bathroom",
    serverId: 3,
    importance: 3,
    title: "Bathroom"
  },
  {
    id: "balcony",
    serverId: 4,
    importance: 4,
    title: "Balcony"
  }
] as const satisfies NodeType[];

export type RoomTypeId = (typeof appRoomTypes)[number]["id"];

/* ====================== */

export const appDoorTypes = [
  {
    id: "fdoor",
    serverId: 14,
    importance: 14,
    title: "Entrance"
  }
] as const satisfies NodeType[];

export type DoorTypeId = (typeof appDoorTypes)[number]["id"];

/* ====================== */

export const appNodeTypes: NodeType[] = [...appRoomTypes, ...appDoorTypes];

/* ====================== */

export type NodeTypeId = RoomTypeId | DoorTypeId;

export const idToNodeType: Record<string, NodeType> = appNodeTypes.reduce(
  (acc, nodeType) => ({
    ...acc,
    [nodeType.id]: nodeType
  }),
  {} as any
);

export const serverIdToNodeType: Record<number, NodeType> = appNodeTypes.reduce(
  (acc, nodeType) => ({
    ...acc,
    [nodeType.serverId]: nodeType
  }),
  {} as any
);
