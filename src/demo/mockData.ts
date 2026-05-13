import type { OdontogramChange } from "../lib/types";

export const mockOdontogramData: OdontogramChange = [
  {
    tooth: "16",
    surfaces: {
      O: ["CARIES"],
      V: ["SEALANT"]
    }
  },
  {
    tooth: "11",
    conditions: ["CROWN"]
  },
  {
    tooth: "55",
    surfaces: {
      M: ["RESIN"]
    }
  },
  {
    tooth: "36",
    conditions: ["ENDO"]
  }
];
