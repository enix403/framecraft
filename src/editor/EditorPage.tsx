import clsx from 'clsx';
import { repeatNode } from '~/utils/markup';

export function EditorPage() {
  return (
    <div className={clsx(
      'w-full max-w-full h-full max-h-full',
      'flex flex-col overflow-auto'
    )}>
      {repeatNode(100, (i) => (
        <div>Hello World {i}</div>
      ))}
    </div>
  );
}
