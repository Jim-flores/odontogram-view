import { memo } from "react";
import { CLINICAL_CONDITIONS } from "../../constants";
import type { ToothCondition } from "../../types";

type ToolbarProps = {
  selectedCondition: ToothCondition;
  onSelect: (condition: ToothCondition) => void;
};

export const Toolbar = memo(function Toolbar({ selectedCondition, onSelect }: ToolbarProps) {
  return (
    <div className="ov-rounded-3xl ov-border ov-border-slate-200 ov-bg-white ov-p-4 ov-shadow-panel">
      <div className="ov-mb-3 ov-flex ov-items-center ov-justify-between ov-gap-3">
        <div>
          <p className="ov-text-xs ov-font-semibold ov-uppercase ov-tracking-[0.22em] ov-text-clinic-600">
            Estados clínicos
          </p>
          <p className="ov-text-sm ov-text-slate-500">
            Click izquierdo aplica. Click derecho limpia solo la pieza o superficie elegida.
          </p>
        </div>
        <div className="ov-rounded-full ov-bg-clinic-50 ov-px-3 ov-py-1 ov-text-xs ov-font-medium ov-text-clinic-700">
          Activo: {selectedCondition}
        </div>
      </div>

      <div className="ov-flex ov-flex-wrap ov-gap-2">
        {CLINICAL_CONDITIONS.map((condition) => {
          const isActive = condition.id === selectedCondition;

          return (
            <button
              key={condition.id}
              type="button"
              onClick={() => onSelect(condition.id)}
              className={[
                "ov-flex ov-items-center ov-gap-2 ov-rounded-full ov-border ov-px-3 ov-py-2 ov-text-sm ov-transition",
                isActive
                  ? "ov-border-clinic-700 ov-bg-clinic-900 ov-text-white"
                  : "ov-border-slate-200 ov-bg-slate-50 ov-text-slate-700 hover:ov-border-clinic-400 hover:ov-bg-white"
              ].join(" ")}
            >
              <span
                className="ov-h-3 ov-w-3 ov-rounded-full ov-border ov-border-white/40"
                style={{ backgroundColor: condition.color }}
              />
              <span>{condition.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
});
