import { memo } from "react";
import { Tooth } from "../Tooth/Tooth";
import type { ToothCondition, ToothDefinition, ToothStateMap, ToothSurface } from "../../types";

type QuadrantProps = {
  label: string;
  teeth: readonly ToothDefinition[];
  records: ToothStateMap;
  editable: boolean;
  selectedCondition: ToothCondition;
  size: "xs" | "sm" | "md" | "lg";
  onApplySurface: (tooth: string, surface: ToothSurface, condition: ToothCondition) => void;
  onApplyTooth: (tooth: string, condition: ToothCondition) => void;
  onClearSurface: (tooth: string, surface: ToothSurface) => void;
  onClearTooth: (tooth: string) => void;
};

export const Quadrant = memo(function Quadrant({
  teeth,
  records,
  editable,
  selectedCondition,
  size,
  onApplySurface,
  onApplyTooth,
  onClearSurface,
  onClearTooth
}: QuadrantProps) {
  return (
    <section>
      <div className="ov-overflow-x-auto ov-pb-1">
        <div className="ov-flex ov-min-w-max ov-justify-center ov-gap-0.5">
          {teeth.map((definition) => (
            <Tooth
              key={definition.id}
              definition={definition}
              record={records[definition.id]}
              editable={editable}
              selectedCondition={selectedCondition}
              size={size}
              onApplySurface={onApplySurface}
              onApplyTooth={onApplyTooth}
              onClearSurface={onClearSurface}
              onClearTooth={onClearTooth}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
