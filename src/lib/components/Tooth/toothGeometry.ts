import type { ToothDefinition, ToothSurface } from "../../types";

type GeometrySurface = {
  key: ToothSurface;
  label: string;
  path: string;
  text: { x: number; y: number };
};

type ToothGeometry = {
  crownOutline: string;
  crownCap: string;
  rootPaths: string[];
  surfaces: GeometrySurface[];
};

const quad = (x1: number, y1: number, cx: number, cy: number, x2: number, y2: number) =>
  `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;

const closed = (...segments: string[]) => `${segments.join(" ")} Z`;

const buildIncisorGeometry = (centerLabel: "I" | "O"): ToothGeometry => {
  const crownOutline = closed(
    "M 19 20",
    "Q 31 13 43 20",
    "Q 49 27 47 38",
    "Q 45 50 31 55",
    "Q 17 50 15 38",
    "Q 13 27 19 20"
  );

  const surfaces: GeometrySurface[] = [
    {
      key: "V",
      label: "V",
      path: closed(
        "M 19 20",
        "Q 31 14 43 20",
        "Q 40 26 37 30",
        "Q 31 32 25 30",
        "Q 22 26 19 20"
      ),
      text: { x: 31, y: 25 }
    },
    {
      key: "M",
      label: "M",
      path: closed(
        "M 15 38",
        "Q 15 28 19 20",
        "Q 22 26 25 30",
        "Q 24 38 25 44",
        "Q 18 43 15 38"
      ),
      text: { x: 21, y: 38 }
    },
    {
      key: centerLabel,
      label: centerLabel,
      path: closed(
        "M 25 30",
        "Q 31 26 37 30",
        "Q 40 37 37 44",
        "Q 31 49 25 44",
        "Q 22 38 25 30"
      ),
      text: { x: 31, y: 40 }
    },
    {
      key: "D",
      label: "D",
      path: closed(
        "M 47 38",
        "Q 47 28 43 20",
        "Q 40 26 37 30",
        "Q 38 38 37 44",
        "Q 44 43 47 38"
      ),
      text: { x: 41, y: 38 }
    },
    {
      key: "L",
      label: "L",
      path: closed(
        "M 25 44",
        "Q 31 50 37 44",
        "Q 42 45 47 38",
        "Q 45 50 31 55",
        "Q 17 50 15 38",
        "Q 20 45 25 44"
      ),
      text: { x: 31, y: 55 }
    }
  ];

  return {
    crownOutline,
    crownCap: crownOutline,
    rootPaths: [
      closed(
        "M 26 54",
        "Q 31 58 36 54",
        "Q 39 65 37 81",
        "Q 34 95 31 106",
        "Q 28 95 25 81",
        "Q 23 65 26 54"
      )
    ],
    surfaces
  };
};

const buildCanineGeometry = (): ToothGeometry => {
  const crownOutline = closed(
    "M 22 23",
    "Q 31 12 40 23",
    "Q 46 31 44 41",
    "Q 42 52 31 58",
    "Q 20 52 18 41",
    "Q 16 31 22 23"
  );

  const surfaces: GeometrySurface[] = [
    {
      key: "V",
      label: "V",
      path: closed(
        "M 22 23",
        "Q 31 13 40 23",
        "Q 37 29 36 31",
        "Q 31 34 26 31",
        "Q 25 29 22 23"
      ),
      text: { x: 31, y: 26 }
    },
    {
      key: "M",
      label: "M",
      path: closed(
        "M 18 41",
        "Q 18 31 22 23",
        "Q 25 29 26 31",
        "Q 25 39 26 46",
        "Q 20 44 18 41"
      ),
      text: { x: 22, y: 40 }
    },
    {
      key: "I",
      label: "I",
      path: closed(
        "M 26 31",
        "Q 31 28 36 31",
        "Q 38 39 36 46",
        "Q 31 51 26 46",
        "Q 24 40 26 31"
      ),
      text: { x: 31, y: 40 }
    },
    {
      key: "D",
      label: "D",
      path: closed(
        "M 44 41",
        "Q 44 31 40 23",
        "Q 37 29 36 31",
        "Q 37 39 36 46",
        "Q 42 44 44 41"
      ),
      text: { x: 40, y: 40 }
    },
    {
      key: "L",
      label: "L",
      path: closed(
        "M 26 46",
        "Q 31 52 36 46",
        "Q 40 47 44 41",
        "Q 42 52 31 58",
        "Q 20 52 18 41",
        "Q 22 47 26 46"
      ),
      text: { x: 31, y: 55 }
    }
  ];

  return {
    crownOutline,
    crownCap: crownOutline,
    rootPaths: [
      closed(
        "M 26 58",
        "Q 31 62 36 58",
        "Q 40 71 38 88",
        "Q 35 106 31 116",
        "Q 27 106 24 88",
        "Q 22 71 26 58"
      )
    ],
    surfaces
  };
};

const buildPremolarGeometry = (): ToothGeometry => {
  const crownOutline = closed(
    "M 20 20",
    "Q 31 15 42 20",
    "Q 48 28 46 39",
    "Q 44 52 31 57",
    "Q 18 52 16 39",
    "Q 14 28 20 20"
  );

  const surfaces: GeometrySurface[] = [
    {
      key: "V",
      label: "V",
      path: closed(
        "M 20 20",
        "Q 31 14 42 20",
        "Q 39 28 36 31",
        "Q 31 33 26 31",
        "Q 23 28 20 20"
      ),
      text: { x: 31, y: 25 }
    },
    {
      key: "M",
      label: "M",
      path: closed(
        "M 16 39",
        "Q 15 29 20 20",
        "Q 23 28 26 31",
        "Q 24 39 26 46",
        "Q 20 45 16 39"
      ),
      text: { x: 22, y: 40 }
    },
    {
      key: "O",
      label: "O",
      path: closed(
        "M 26 31",
        "Q 31 27 36 31",
        "Q 39 38 36 46",
        "Q 31 50 26 46",
        "Q 23 39 26 31"
      ),
      text: { x: 31, y: 40 }
    },
    {
      key: "D",
      label: "D",
      path: closed(
        "M 46 39",
        "Q 47 29 42 20",
        "Q 39 28 36 31",
        "Q 38 39 36 46",
        "Q 42 45 46 39"
      ),
      text: { x: 40, y: 40 }
    },
    {
      key: "L",
      label: "L",
      path: closed(
        "M 26 46",
        "Q 31 51 36 46",
        "Q 41 47 46 39",
        "Q 44 52 31 57",
        "Q 18 52 16 39",
        "Q 21 47 26 46"
      ),
      text: { x: 31, y: 56 }
    }
  ];

  return {
    crownOutline,
    crownCap: crownOutline,
    rootPaths: [
      closed(
        "M 22 57",
        "Q 25 60 28 57",
        "Q 28 70 25 86",
        "Q 23 96 20 104",
        "Q 17 94 17 82",
        "Q 17 71 22 57"
      ),
      closed(
        "M 34 57",
        "Q 37 60 40 57",
        "Q 45 70 45 82",
        "Q 45 94 42 104",
        "Q 39 96 37 86",
        "Q 34 71 34 57"
      )
    ],
    surfaces
  };
};

const buildMolarGeometry = (arch: "upper" | "lower"): ToothGeometry => {
  const crownOutline = closed(
    "M 16 22",
    "Q 31 13 46 22",
    "Q 52 32 49 43",
    "Q 46 56 31 61",
    "Q 16 56 13 43",
    "Q 10 32 16 22"
  );

  const surfaces: GeometrySurface[] = [
    {
      key: "V",
      label: "V",
      path: closed(
        "M 16 22",
        "Q 31 12 46 22",
        "Q 42 31 38 34",
        "Q 31 36 24 34",
        "Q 20 31 16 22"
      ),
      text: { x: 31, y: 26 }
    },
    {
      key: "M",
      label: "M",
      path: closed(
        "M 13 43",
        "Q 11 32 16 22",
        "Q 20 31 24 34",
        "Q 22 43 24 49",
        "Q 17 48 13 43"
      ),
      text: { x: 21, y: 43 }
    },
    {
      key: "O",
      label: "O",
      path: closed(
        "M 24 34",
        "Q 31 29 38 34",
        "Q 41 42 38 49",
        "Q 31 54 24 49",
        "Q 21 43 24 34"
      ),
      text: { x: 31, y: 43 }
    },
    {
      key: "D",
      label: "D",
      path: closed(
        "M 49 43",
        "Q 51 32 46 22",
        "Q 42 31 38 34",
        "Q 40 43 38 49",
        "Q 45 48 49 43"
      ),
      text: { x: 41, y: 43 }
    },
    {
      key: "L",
      label: "L",
      path: closed(
        "M 24 49",
        "Q 31 55 38 49",
        "Q 44 50 49 43",
        "Q 46 56 31 61",
        "Q 16 56 13 43",
        "Q 18 50 24 49"
      ),
      text: { x: 31, y: 60 }
    }
  ];

  const rootPaths =
    arch === "upper"
      ? [
          closed(
            "M 17 61",
            "Q 20 64 23 61",
            "Q 24 72 22 87",
            "Q 20 98 17 106",
            "Q 14 96 14 84",
            "Q 14 73 17 61"
          ),
          closed(
            "M 28 61",
            "Q 31 65 34 61",
            "Q 36 74 35 92",
            "Q 34 105 31 116",
            "Q 28 105 27 92",
            "Q 26 74 28 61"
          ),
          closed(
            "M 39 61",
            "Q 42 64 45 61",
            "Q 48 72 48 84",
            "Q 48 96 45 106",
            "Q 42 98 40 87",
            "Q 38 73 39 61"
          )
        ]
      : [
          closed(
            "M 22 61",
            "Q 26 64 29 61",
            "Q 29 74 26 92",
            "Q 24 103 20 112",
            "Q 17 101 17 88",
            "Q 17 74 22 61"
          ),
          closed(
            "M 33 61",
            "Q 36 64 40 61",
            "Q 45 74 45 88",
            "Q 45 101 42 112",
            "Q 38 103 36 92",
            "Q 33 76 33 61"
          )
        ];

  return {
    crownOutline,
    crownCap: crownOutline,
    rootPaths,
    surfaces
  };
};

export const getToothGeometry = (definition: ToothDefinition): ToothGeometry => {
  if (definition.type === "incisor") {
    return buildIncisorGeometry(definition.visual.centerLabel);
  }

  if (definition.type === "canine") {
    return buildCanineGeometry();
  }

  if (definition.type === "premolar") {
    return buildPremolarGeometry();
  }

  return buildMolarGeometry(definition.arch);
};
