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
  size: "sm" | "md" | "lg";
  onApplySurface: (tooth: string, surface: ToothSurfaceType, condition: ToothCondition) => void;
  onApplyTooth: (tooth: string, condition: ToothCondition) => void;
  onClearSurface: (tooth: string, surface: ToothSurfaceType) => void;
  onClearTooth: (tooth: string) => void;
};

const sizeClassMap = {
  sm: {
    wrapper: "ov-min-w-[64px] ov-gap-0.5",
    label: "ov-text-[11px]",
    svg: "ov-h-[124px] ov-w-[62px]"
  },
  md: {
    wrapper: "ov-min-w-[74px] ov-gap-0.5",
    label: "ov-text-xs",
    svg: "ov-h-[138px] ov-w-[98px]"
  },
  lg: {
    wrapper: "ov-min-w-[84px] ov-gap-0.5",
    label: "ov-text-sm",
    svg: "ov-h-[154px] ov-w-[108px]"
  }
} as const;

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

      <svg viewBox="0 0 62 128" className={sizeClasses.svg}>
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
            label={surface.label}
            path={surface.path}
            textX={surface.text.x}
            textY={surface.text.y}
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
      </svg>
    </div>
  );
});
