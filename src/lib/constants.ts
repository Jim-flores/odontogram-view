import type { ConditionDefinition, ToothDefinition, ToothType, ToothVisualConfig } from "./types";

const PERMANENT_SURFACE_MAP: Record<number, ToothType> = {
  1: "incisor",
  2: "incisor",
  3: "canine",
  4: "premolar",
  5: "premolar",
  6: "molar",
  7: "molar",
  8: "molar"
};

const PRIMARY_SURFACE_MAP: Record<number, ToothType> = {
  1: "incisor",
  2: "incisor",
  3: "canine",
  4: "molar",
  5: "molar"
};

const ROOT_COUNT_BY_TOOTH: Record<string, 1 | 2 | 3> = {
  "11": 1,
  "12": 1,
  "13": 1,
  "14": 2,
  "15": 1,
  "16": 3,
  "17": 3,
  "18": 3,
  "21": 1,
  "22": 1,
  "23": 1,
  "24": 2,
  "25": 1,
  "26": 3,
  "27": 3,
  "28": 3,
  "31": 1,
  "32": 1,
  "33": 1,
  "34": 1,
  "35": 1,
  "36": 2,
  "37": 2,
  "38": 2,
  "41": 1,
  "42": 1,
  "43": 1,
  "44": 1,
  "45": 1,
  "46": 2,
  "47": 2,
  "48": 2,
  "51": 1,
  "52": 1,
  "53": 1,
  "54": 3,
  "55": 3,
  "61": 1,
  "62": 1,
  "63": 1,
  "64": 3,
  "65": 3,
  "71": 1,
  "72": 1,
  "73": 1,
  "74": 2,
  "75": 2,
  "81": 1,
  "82": 1,
  "83": 1,
  "84": 2,
  "85": 2
};

const visualConfigByType = (
  toothId: string,
  type: ToothType,
  arch: "upper" | "lower"
): ToothVisualConfig => {
  const rootCount = ROOT_COUNT_BY_TOOTH[toothId] ?? 1;

  if (type === "incisor") {
    return {
      centerLabel: "I",
      roots: rootCount,
      surfaces: 5,
      crownWidth: 32,
      crownHeight: 42,
      rootStyle: "single"
    };
  }

  if (type === "canine") {
    return {
      centerLabel: "I",
      roots: rootCount,
      surfaces: 5,
      crownWidth: 36,
      crownHeight: 44,
      rootStyle: "singleLong"
    };
  }

  if (type === "premolar") {
    return {
      centerLabel: "O",
      roots: rootCount,
      surfaces: 5,
      crownWidth: 42,
      crownHeight: 42,
      rootStyle: rootCount === 2 ? "double" : "single"
    };
  }

  return {
    centerLabel: "O",
    roots: rootCount,
    surfaces: 5,
    crownWidth: 48,
    crownHeight: 42,
    rootStyle: rootCount === 3 ? "triple" : arch === "upper" ? "triple" : "double"
  };
};

const buildQuadrant = (
  quadrant: number,
  toothNumbers: number[],
  arch: "upper" | "lower",
  dentition: "permanent" | "primary"
): ToothDefinition[] => {
  const typeMap = dentition === "permanent" ? PERMANENT_SURFACE_MAP : PRIMARY_SURFACE_MAP;

  return toothNumbers.map((position) => {
    const type = typeMap[position];
    const toothId = `${quadrant}${position}`;
    return {
      id: toothId,
      type,
      arch,
      dentition,
      label: toothId,
      visual: visualConfigByType(toothId, type, arch)
    };
  });
};

const upperPermanentLeft = buildQuadrant(1, [8, 7, 6, 5, 4, 3, 2, 1], "upper", "permanent");
const upperPermanentRight = buildQuadrant(2, [1, 2, 3, 4, 5, 6, 7, 8], "upper", "permanent");
const lowerPermanentLeft = buildQuadrant(4, [8, 7, 6, 5, 4, 3, 2, 1], "lower", "permanent");
const lowerPermanentRight = buildQuadrant(3, [1, 2, 3, 4, 5, 6, 7, 8], "lower", "permanent");

const upperPrimaryLeft = buildQuadrant(5, [5, 4, 3, 2, 1], "upper", "primary");
const upperPrimaryRight = buildQuadrant(6, [1, 2, 3, 4, 5], "upper", "primary");
const lowerPrimaryLeft = buildQuadrant(8, [5, 4, 3, 2, 1], "lower", "primary");
const lowerPrimaryRight = buildQuadrant(7, [1, 2, 3, 4, 5], "lower", "primary");

export const PERMANENT_DENTITION_LAYOUT = {
  upper: [...upperPermanentLeft, ...upperPermanentRight],
  lower: [...lowerPermanentLeft, ...lowerPermanentRight]
};

export const PRIMARY_DENTITION_LAYOUT = {
  upper: [...upperPrimaryLeft, ...upperPrimaryRight],
  lower: [...lowerPrimaryLeft, ...lowerPrimaryRight]
};

export const MIXED_DENTITION_LAYOUT = [
  {
    id: "upper-permanent",
    label: "Superior permanente",
    teeth: PERMANENT_DENTITION_LAYOUT.upper
  },
  {
    id: "upper-primary",
    label: "Superior temporal",
    teeth: PRIMARY_DENTITION_LAYOUT.upper
  },
  {
    id: "lower-primary",
    label: "Inferior temporal",
    teeth: PRIMARY_DENTITION_LAYOUT.lower
  },
  {
    id: "lower-permanent",
    label: "Inferior permanente",
    teeth: PERMANENT_DENTITION_LAYOUT.lower
  }
] as const;

export const CLINICAL_CONDITIONS: ConditionDefinition[] = [
  { id: "CARIES", label: "Caries", color: "#ef4444", scope: "both" },
  { id: "CROWN", label: "Corona", color: "#f59e0b", scope: "both" },
  { id: "EXTRACTION", label: "Extracción", color: "#7c3aed", scope: "both" },
  { id: "IMPLANT", label: "Implante", color: "#2563eb", scope: "both" },
  { id: "FRACTURE", label: "Fractura", color: "#fb7185", scope: "both" },
  { id: "RESIN", label: "Resina", color: "#10b981", scope: "both" },
  { id: "ENDO", label: "Endodoncia", color: "#0f172a", scope: "both" },
  { id: "MISSING", label: "Ausente", color: "#64748b", scope: "both" },
  { id: "SEALANT", label: "Sellante", color: "#14b8a6", scope: "both" }
];
