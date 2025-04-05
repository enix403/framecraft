import { Stat } from "@/components/Stat";
import { RectPreview } from "@/components/RectPreview";
import { usePlan, useSelectedObject, useSetPlan } from "../plan-state";
import { DoorOpen } from "lucide-react";
import { RoomIdentityInput } from "@/components/RoomIdentityInput";
import { appNodeStyle } from "@/lib/node-styles";
import { useSettings } from "../world2d/state/settings";
import { CELL_PHYSICAL_LENGTH, unitFactor } from "@/lib/units";
import { useCallback } from "react";
import { produce } from "immer";
import { usePlanComponents } from "../plan-state";
import { apiRoutes } from "@/lib/api-routes";

type PlanComponents = any;

function getLargestRect(room: PlanComponents["rooms"][number]) {
  let largestRectIndex = -1;
  let largestArea = -1;

  for (let i = 0; i < room.rects.length; ++i) {
    const { width, height } = room.rects[i];
    let area = width * height;

    if (area > largestArea) {
      largestArea = area;
      largestRectIndex = i;
    }
  }

  // let [row, col, width, height] = room.rects[largestRectIndex];
  return room.rects[largestRectIndex];
}

function useRoomSize(room: PlanComponents["rooms"][number] | null) {
  const { unit } = useSettings();

  let length = 1;
  let width = 1;

  if (room) {
    const { width: rectW, height: rectH } = getLargestRect(room);
    const factor = CELL_PHYSICAL_LENGTH * (unitFactor[unit] || 1);

    length = Math.round(rectH * factor);
    width = Math.round(rectW * factor);
  }

  return [length, width];
}
/*

const components = usePlanComponents();
  // const setPlanComponents = useSetPlanComponents();
  const updatePlan = useCallback(
    (fn: (old: PlanComponents) => void) => {
      // setPlanComponents(
      //   produce(draft => {
      //     if (!draft) return;
      //     fn(draft);
      //   })
      // );
    },
    // [setPlanComponents]
    []
  );

*/

export function RoomDetails() {
  const { unit } = useSettings();

  const plan = usePlan();
  const components = usePlanComponents();
  const setPlan = useSetPlan();

  const [selectedObj] = useSelectedObject();

  const room = selectedObj ? components.rooms[selectedObj.index] : null;
  const style = room ? appNodeStyle[room.typeId] : null;

  const [length, width] = useRoomSize(room);
  const area = length * width;

  const updateRoom = useCallback(
    (fn: (room: any) => void) => {
      const updatedComponents: any = produce(components, (components: any) => {
        let room = components.rooms[selectedObj!.index];
        fn(room);
      });

      setPlan(plan => ({
        ...plan,
        canvas: {
          ...plan.canvas,
          canvasData: updatedComponents
        }
      }));

      apiRoutes.updatePlanCanvas(
        { canvasData: updatedComponents },
        plan.canvas.id
      );
    },
    [selectedObj, plan, setPlan, components]
  );

  return (
    <div className='h-full p-4'>
      {room ? (
        <>
          <h2 className='mb-2 font-semibold'>Room Details</h2>

          <RoomIdentityInput
            key={room.id}
            initialName={room.label}
            initialTypeId={room.typeId}
            onUpdateName={name => {
              updateRoom(room => {
                room.label = name;
              });
            }}
            onUpdateNodeType={typeId => {
              updateRoom(room => {
                room.typeId = typeId;
              });
            }}
          />

          <RectPreview
            className='mt-6 mb-6'
            rectangles={room.rects.map(({ row, col, width, height }) => ({
              left: col,
              top: row,
              width: width,
              height: height
            }))}
            outStrokeColor={style!.iconColor}
            fillColor={style!.mapRectColor}
          />

          <Stat label='Length' value={`${length} ${unit}.`} />
          <Stat label='Width' value={`${width} ${unit}.`} />
          <Stat label='Area' value={`${area} ${unit}. sq`} />
        </>
      ) : (
        <div className='flex h-full max-h-[34rem] flex-col items-center justify-center px-3'>
          <DoorOpen
            className='h-auto w-full max-w-52 text-muted-foreground opacity-40'
            strokeWidth={1}
          />
          <p className='mt-2 text-center leading-[1.2] font-medium text-muted-foreground/70'>
            Select a room to inspect
          </p>
        </div>
      )}
    </div>
  );
}
