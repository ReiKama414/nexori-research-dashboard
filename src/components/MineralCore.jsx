/** @typedef {React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
 *   mode?: string; slice?: string; autorotate?: string; alert?: string;
 * }} MineralCoreProps */

import { memo } from 'react';

export const MineralCore = memo(function MineralCore({
  mode,
  slice,
  autorotate,
  alert,
  style,
  className,
}) {
  return (
    <mineral-core
      mode={mode}
      slice={slice}
      autorotate={autorotate}
      alert={alert}
      style={{ position: 'absolute', inset: 0, ...style }}
      className={className}
    />
  );
});