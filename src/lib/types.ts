import type { CSSProperties } from "react";

export type ToothSurface = "M" | "D" | "V" | "L" | "O" | "I";

export type ToothCondition =
  | "CARIES"
  | "CROWN"
  | "EXTRACTION"
  | "IMPLANT"
  | "FRACTURE"
  | "RESIN"
  | "ENDO"
  | "MISSING"
  | "SEALANT";

export type ToothType = "molar" | "premolar" | "canine" | "incisor";

export type ToothVisualConfig = {
  centerLabel: "I" | "O";
  roots: 1 | 2 | 3;
  surfaces: 5;
  crownWidth: number;
  crownHeight: number;
  rootStyle: "single" | "singleLong" | "double" | "triple";
};

export type ToothRecord = {
  tooth: string;
  surfaces?: Partial<Record<ToothSurface, ToothCondition[]>>;
  conditions?: ToothCondition[];
};

export type OdontogramChange = ToothRecord[];

export type ToothDefinition = {
  id: string;
  type: ToothType;
  arch: "upper" | "lower";
  dentition: "permanent" | "primary";
  label: string;
  visual: ToothVisualConfig;
};

export type ConditionDefinition = {
  id: ToothCondition;
  label: string;
  color: string;
  scope: "tooth" | "surface" | "both";
};

export type ToothStateMap = Record<string, ToothRecord | undefined>;

export type SurfaceSegment = {
  key: ToothSurface;
  label: string;
  points: string;
  text: { x: number; y: number };
};

export type OdontogramTheme = {
  panelStyle?: CSSProperties;
};

export type OdontogramProps = {
  value?: OdontogramChange;
  defaultValue?: OdontogramChange;
  onChange?: (changes: OdontogramChange) => void;
  dentition?: "mixed" | "permanent" | "primary";
  selectedCondition?: ToothCondition;
  onSelectedConditionChange?: (condition: ToothCondition) => void;
  editable?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  theme?: OdontogramTheme;
};
