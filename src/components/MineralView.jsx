import { memo } from 'react';

function MineralViewImpl({
  mode,
  yaw,
  pitch,
  slice,
  heat,
  fill,
  priority,
  style,
  className,
}) {
  const extra = priority ? { priority: '' } : {};
  return (
    <mineral-view
      mode={mode}
      yaw={yaw}
      pitch={pitch}
      slice={slice}
      heat={heat}
      fill={fill}
      {...extra}
      style={{ position: 'absolute', inset: 0, ...style }}
      className={className}
    />
  );
}

export const MineralView = memo(
  MineralViewImpl,
  (a, b) =>
    a.mode === b.mode
    && a.yaw === b.yaw
    && a.pitch === b.pitch
    && a.slice === b.slice
    && a.heat === b.heat
    && a.fill === b.fill
    && !!a.priority === !!b.priority,
);