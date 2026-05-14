import { memo, useCallback, useMemo } from "react";
import { getConditionColor } from "../../utils/odontogram";
import { ToothSurface } from "./ToothSurface";
import { getToothGeometry } from "./toothGeometry";
import type { ToothCondition, ToothDefinition, ToothRecord, ToothSurface as ToothSurfaceType } from "../../types";

type ToothProps = {
  definition: ToothDefinition;
  record?: ToothRecord;
  editable: boolean;
  selectedCondition: ToothCondition;
  size: "xs" | "sm" | "md" | "lg";
  onApplySurface: (tooth: string, surface: ToothSurfaceType, condition: ToothCondition) => void;
  onApplyTooth: (tooth: string, condition: ToothCondition) => void;
  onClearSurface: (tooth: string, surface: ToothSurfaceType) => void;
  onClearTooth: (tooth: string) => void;
};

const sizeClassMap = {
  xs: {
    wrapper: "ov-min-w-[56px] ov-gap-0.5",
    label: "ov-text-[10px]",
    svg: "ov-h-[68px] ov-w-[34px]"
  },
  sm: {
    wrapper: "ov-min-w-[60px] ov-gap-0.5",
    label: "ov-text-[11px]",
    svg: "ov-h-[116px] ov-w-[58px]"
  },
  md: {
    wrapper: "ov-min-w-[64px] ov-gap-0.5",
    label: "ov-text-[11px]",
    svg: "ov-h-[124px] ov-w-[62px]"
  },
  lg: {
    wrapper: "ov-min-w-[74px] ov-gap-0.5",
    label: "ov-text-xs",
    svg: "ov-h-[138px] ov-w-[72px]"
  }
} as const;

// The geometry uses a narrower coordinate range than the original SVG box.
// Tightening the viewBox removes the apparent internal padding.
const TOOTH_VIEW_BOX = "8 10 46 114";
const UPPER_TOOTH_TRANSFORM = "matrix(1 0 0 -1 0 134)";

export const Tooth = memo(function Tooth({
  definition,
  record,
  editable,
  selectedCondition,
  size,
  onApplySurface,
  onApplyTooth,
  onClearSurface,
  onClearTooth
}: ToothProps) {
  const sizeClasses = sizeClassMap[size];
  const geometry = useMemo(() => getToothGeometry(definition), [definition]);
  const toothConditions = record?.conditions ?? [];
  const toothFill = useMemo(
    () => (toothConditions.length ? getConditionColor(toothConditions[0]) : "#f8fafc"),
    [toothConditions]
  );
  const isUpperTooth = definition.arch === "upper";

  const accentClass = useMemo(() => {
    if (definition.type === "incisor") {
      return "ov-border-sky-100";
    }
    if (definition.type === "canine") {
      return "ov-border-amber-100";
    }
    if (definition.type === "premolar") {
      return "ov-border-emerald-100";
    }
    return "ov-border-rose-100";
  }, [definition.type]);

  const handleApplySurface = useCallback(
    (surface: ToothSurfaceType) => onApplySurface(definition.id, surface, selectedCondition),
    [definition.id, onApplySurface, selectedCondition]
  );

  const handleClearSurface = useCallback(
    (surface: ToothSurfaceType) => onClearSurface(definition.id, surface),
    [definition.id, onClearSurface]
  );

  const handleApplyTooth = useCallback(() => {
    onApplyTooth(definition.id, selectedCondition);
  }, [definition.id, onApplyTooth, selectedCondition]);

  const handleClearTooth = useCallback(() => {
    onClearTooth(definition.id);
  }, [definition.id, onClearTooth]);

  return (
    <div className={["ov-flex ov-flex-col ov-items-center", accentClass, sizeClasses.wrapper].join(" ")}>
      <span className={["ov-font-semibold ov-text-clinic-700", sizeClasses.label].join(" ")}>
        {definition.label}
      </span>

      <svg viewBox={TOOTH_VIEW_BOX} className={sizeClasses.svg}>
        <g transform={isUpperTooth ? UPPER_TOOTH_TRANSFORM : undefined}>
          {geometry.rootPaths.map((root, index) => (
            <path
              key={`${definition.id}-root-${index}`}
              d={root}
              fill={toothFill}
              stroke="#1f2937"
              strokeWidth={1.4}
              strokeLinejoin="round"
              className={editable ? "ov-cursor-pointer ov-transition-opacity hover:ov-opacity-85" : ""}
              onClick={editable ? handleApplyTooth : undefined}
              onContextMenu={
                editable
                  ? (event) => {
                    event.preventDefault();
                    handleClearTooth();
                  }
                  : undefined
              }
            />
          ))}

          <path d={geometry.crownCap} fill={toothFill} stroke="#1f2937" strokeWidth={1.6} />

          {geometry.surfaces.map((surface) => (
            <ToothSurface
              key={`${definition.id}-${surface.key}`}
              surface={surface.key}
              path={surface.path}
              condition={record?.surfaces?.[surface.key]?.[0]}
              onApply={handleApplySurface}
              onClear={handleClearSurface}
              disabled={!editable}
            />
          ))}

          <path
            d={geometry.crownOutline}
            fill="none"
            stroke="#0f172a"
            strokeWidth={1.6}
            strokeLinejoin="round"
            className={editable ? "ov-cursor-pointer" : ""}
            onClick={editable ? handleApplyTooth : undefined}
            onContextMenu={
              editable
                ? (event) => {
                  event.preventDefault();
                  handleClearTooth();
                }
                : undefined
            }
          />
        </g>
      </svg>
    </div>
  );
});
