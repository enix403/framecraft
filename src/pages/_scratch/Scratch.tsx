// @dwats-nocheck

import { ResponsiveNetworkCanvas } from "@nivo/network";

const data = {
  nodes: [
    {
      id: "Node 1",
      color: "rgb(97, 205, 187)"
    },
    {
      id: "Node 0",
      color: "rgb(244, 117, 96)"
    },
    {
      id: "Node 1.0",
      color: "rgb(232, 193, 160)"
    },
    {
      id: "Node 1.1",
      color: "rgb(232, 193, 160)"
    },
  ],
  links: [
    {
      source: "Node 0",
      target: "Node 1"
    },
    {
      source: "Node 1",
      target: "Node 1.0"
    },
    {
      source: "Node 1",
      target: "Node 1.1"
    }
  ]
};

const MyResponsiveNetworkCanvas = ({ data }: { data: any }) => (
  <ResponsiveNetworkCanvas
    data={data}
    isInteractive={false}
    animate={false}
    nodeColor={"rgb(97, 205, 187)"}
    nodeBorderWidth={1}
    linkThickness={2}
  />

);

export function Scratch() {
  return (
    <div className='h-[16rem] w-[16rem] border-4'>
      <MyResponsiveNetworkCanvas data={data} />
    </div>
  );
}
