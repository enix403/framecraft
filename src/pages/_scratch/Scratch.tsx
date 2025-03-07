// @dwats-nocheck

import { ResponsiveNetworkCanvas } from "@nivo/network";
import { nodeTypeToRoomType, roomTypes } from "@/lib/rooms";


const demoNodeTypes = [0, 1, 2, 2, 2, 3, 3, 3, 4, 14];
const demoEdges = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 9],
  [8, 4],
  [2, 5],
  [3, 6],
  [4, 7]
] as [number, number][];

const data = {
  nodes: demoNodeTypes.map((n, index) => ({
    id: index,
    color: roomTypes[nodeTypeToRoomType[n]]?.color || "pink"
  })),
  links: demoEdges.map(([a, b]) => ({
    source: a,
    target: b
  }))
};

const MyResponsiveNetworkCanvas = ({ data }: { data: any }) => (
  <ResponsiveNetworkCanvas
    data={data}
    isInteractive={false}
    centeringStrength={0.9}
    animate={false}
    // @ts-ignore
    nodeColor={n => n.color}
    nodeBorderWidth={1}
    linkThickness={2}
  />
);

export function Scratch() {
  return (
    <div className='h-[12rem] w-[12rem] border-4'>
      <MyResponsiveNetworkCanvas data={data} />
    </div>
  );
}
