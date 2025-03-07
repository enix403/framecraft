import { ChevronLeft, ChevronRight } from "lucide-react";

// @dwats-nocheck

import { ResponsiveNetworkCanvas } from "@nivo/network";
import { serverIdToNodeType } from "@/lib/nodes";
import { appNodeStyle } from "@/lib/node-styles";
import { repeatNode } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
    id: `${index}`,
    color: appNodeStyle[serverIdToNodeType[n].id].iconColor
  })),
  links: demoEdges.map(([a, b]) => ({
    source: `${a}`,
    target: `${b}`
  }))
};

const PresetPreview = () => (
  <button className='h-[12rem] w-[12rem] rounded-2xl bg-indigo-50 tc hover:bg-indigo-100'>
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
  </button>
);

export function GraphPresets() {
  return (
    <>
      <div className='flex max-w-full gap-x-4 overflow-auto p-4'>
        {repeatNode(16, index => (
          <PresetPreview key={index} />
        ))}
      </div>
      <div className="flex items-center gap-x-2">
        <Button
          variant='outline'
          size='icon'
          className='rounded-full border-blue-700 text-blue-700'
        >
          <ChevronLeft strokeWidth={3} />
        </Button>
        <Button
          variant='outline'
          size='icon'
          className='rounded-full border-blue-700 text-blue-700'
        >
          <ChevronRight strokeWidth={3} />
        </Button>
      </div>
    </>
  );
}

/*


return (
  <div>
    <h2 className='px-4 pt-2.5 text-xl font-bold tracking-tight'>Presets</h2>
    <div className='flex'>
      <button className='d'>
        <ChevronLeft />
      </button>
      <div className='flex flex-1-x divide-x-2 py-2'>
        {repeatNode(16, index => (
          <PresetPreview key={index} />
        ))}
      </div>
      <button className='d'>
        <ChevronRight />
      </button>
    </div>
  </div>
);

*/
