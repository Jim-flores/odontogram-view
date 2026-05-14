import { memo } from "react";
import { getConditionColor } from "../../utils/odontogram";
import type { ToothCondition, ToothSurface as ToothSurfaceType } from "../../types";

type ToothSurfaceProps = {
  surface: ToothSurfaceType;
  path: string;
  condition?: ToothCondition;
  onApply: (surface: ToothSurfaceType) => void;
  onClear: (surface: ToothSurfaceType) => void;
  disabled?: boolean;
};

export const ToothSurface = memo(function ToothSurface({
  surface,
  path,
  condition,
  onApply,
  onClear,
  disabled
}: ToothSurfaceProps) {
  return (
    <g>
      <path
        d={path}
        fill={getConditionColor(condition)}
        stroke="#1f2937"
        strokeWidth={1.4}
        strokeLinejoin="round"
        className={disabled ? "" : "ov-cursor-pointer ov-transition-opacity hover:ov-opacity-85"}
        onClick={disabled ? undefined : () => onApply(surface)}
        onContextMenu={
          disabled
            ? undefined
            : (event) => {
                event.preventDefault();
                onClear(surface);
              }
        }
      />
    </g>
  );
});
