import clsx from 'clsx';

import { repeatNode } from '~/utils/markup';

import FloorPlanEditor from './FloorPlanEditor';

import planJson from './plan.json';
(window as any).planJson = planJson;

export function EditorPage() {
  return (
    <div className={clsx(
      'w-full max-w-full h-full max-h-full',
    )}>
      <FloorPlanEditor />
    </div>
  );
}

