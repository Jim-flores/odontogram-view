import { memo, useCallback, useMemo, useState } from "react";
import {
  MIXED_DENTITION_LAYOUT,
  PERMANENT_DENTITION_LAYOUT,
  PRIMARY_DENTITION_LAYOUT
} from "../../constants";
import {
  applySurfaceCondition,
  applyToothCondition,
  clearSurfaceCondition,
  clearToothCondition,
  normalizeChanges,
  serializeChanges
} from "../../utils/odontogram";
import { Quadrant } from "../Quadrant/Quadrant";
import { Toolbar } from "../Toolbar/Toolbar";
import type { OdontogramProps, ToothCondition, ToothStateMap, ToothSurface } from "../../types";

const DEFAULT_CONDITION: ToothCondition = "CARIES";

export const Odontogram = memo(function Odontogram({
  value,
  defaultValue,
  onChange,
  dentition = "mixed",
  selectedCondition,
  onSelectedConditionChange,
  editable = true,
  size = "sm",
  className,
  theme
}: OdontogramProps) {
  const isControlled = typeof value !== "undefined";
  const [internalState, setInternalState] = useState<ToothStateMap>(() =>
    normalizeChanges(defaultValue)
  );
  const [internalCondition, setInternalCondition] = useState<ToothCondition>(DEFAULT_CONDITION);

  const records = useMemo(
    () => (isControlled ? normalizeChanges(value) : internalState),
    [internalState, isControlled, value]
  );

  const activeCondition = selectedCondition ?? internalCondition;

  const updateRecords = useCallback(
    (nextState: ToothStateMap) => {
      if (!isControlled) {
        setInternalState(nextState);
      }

      onChange?.(serializeChanges(nextState));
    },
    [isControlled, onChange]
  );

  const selectCondition = useCallback(
    (condition: ToothCondition) => {
      if (!selectedCondition) {
        setInternalCondition(condition);
      }

      onSelectedConditionChange?.(condition);
    },
    [onSelectedConditionChange, selectedCondition]
  );

  const handleApplySurface = useCallback(
    (tooth: string, surface: ToothSurface, condition: ToothCondition) => {
      updateRecords(applySurfaceCondition(records, tooth, surface, condition));
    },
    [records, updateRecords]
  );

  const handleApplyTooth = useCallback(
    (tooth: string, condition: ToothCondition) => {
      updateRecords(applyToothCondition(records, tooth, condition));
    },
    [records, updateRecords]
  );

  const handleClearSurface = useCallback(
    (tooth: string, surface: ToothSurface) => {
      updateRecords(clearSurfaceCondition(records, tooth, surface));
    },
    [records, updateRecords]
  );

  const handleClearTooth = useCallback(
    (tooth: string) => {
      updateRecords(clearToothCondition(records, tooth));
    },
    [records, updateRecords]
  );

  const layout = useMemo(() => {
    if (dentition === "permanent") {
      return [
        { id: "permanent-upper", label: "Superior permanente", teeth: PERMANENT_DENTITION_LAYOUT.upper },
        { id: "permanent-lower", label: "Inferior permanente", teeth: PERMANENT_DENTITION_LAYOUT.lower }
      ];
    }

    if (dentition === "primary") {
      return [
        { id: "primary-upper", label: "Superior temporal", teeth: PRIMARY_DENTITION_LAYOUT.upper },
        { id: "primary-lower", label: "Inferior temporal", teeth: PRIMARY_DENTITION_LAYOUT.lower }
      ];
    }

    return [...MIXED_DENTITION_LAYOUT];
  }, [dentition]);

  return (
    <div
      className={[
        "ov-odontogram ov-w-full ov-max-w-full ov-overflow-hidden ov-rounded-[28px] ov-border ov-border-slate-200 ov-bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.98),_rgba(240,248,249,0.98)_40%,_rgba(229,239,241,1)_100%)] ov-p-4 ov-text-slate-900 ov-shadow-panel md:ov-p-6",
        className ?? ""
      ].join(" ")}
      style={theme?.panelStyle}
      onContextMenu={(event) => {
        event.preventDefault();
      }}
    >
      <div className="ov-space-y-5">
        <Toolbar selectedCondition={activeCondition} onSelect={selectCondition} />

        <div className="ov-overflow-x-auto ov-overflow-y-hidden">
          <div className="ov-grid ov-min-w-max ov-gap-5">
            {layout.map((section) => (
              <Quadrant
                key={section.id}
                label={section.label}
                teeth={section.teeth}
                records={records}
                editable={editable}
                selectedCondition={activeCondition}
                size={size}
                onApplySurface={handleApplySurface}
                onApplyTooth={handleApplyTooth}
                onClearSurface={handleClearSurface}
                onClearTooth={handleClearTooth}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
