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
    "M 21 20",
    "Q 31 13 41 20",
    "Q 47 27 45 38",
    "Q 43 50 31 55",
    "Q 19 50 17 38",
    "Q 15 27 21 20"
  );

  const surfaces: GeometrySurface[] = [
    {
      key: "V",
      label: "V",
      path: closed(
        "M 21 20",
        "Q 31 14 41 20",
        "Q 39 26 36 30",
        "Q 31 32 26 30",
        "Q 23 26 21 20"
      ),
      text: { x: 31, y: 25 }
    },
    {
      key: "M",
      label: "M",
      path: closed(
        "M 17 38",
        "Q 17 28 21 20",
        "Q 23 26 26 30",
        "Q 25 39 26 47",
        "Q 20 46 17 38"
      ),
      text: { x: 22, y: 38 }
    },
    {
      key: centerLabel,
      label: centerLabel,
      path: closed(
        "M 26 30",
        "Q 31 26 36 30",
        "Q 39 38 36 46",
        "Q 31 51 26 46",
        "Q 23 38 26 30"
      ),
      text: { x: 31, y: 40 }
    },
    {
      key: "D",
      label: "D",
      path: closed(
        "M 45 38",
        "Q 45 28 41 20",
        "Q 39 26 36 30",
        "Q 37 39 36 47",
        "Q 42 46 45 38"
      ),
      text: { x: 40, y: 38 }
    },
    {
      key: "L",
      label: "L",
      path: closed(
        "M 24 45",
        "Q 31 54 38 45",
        "Q 42 47 45 38",
        "Q 43 54 31 59",
        "Q 19 54 17 38",
        "Q 20 47 24 45"
      ),
      text: { x: 31, y: 55 }
    }
  ];

  return {
    crownOutline,
    crownCap: crownOutline,
    rootPaths: [
      closed(
        "M 27 54",
        "Q 31 58 35 54",
        "Q 38 65 36 84",
        "Q 34 100 31 112",
        "Q 28 100 26 84",
        "Q 24 65 27 54"
      )
    ],
    surfaces
  };
};

const buildCanineGeometry = (): ToothGeometry => {
  const crownOutline = closed(
    "M 24 23",
    "Q 31 12 38 23",
    "Q 44 31 42 41",
    "Q 40 52 31 58",
    "Q 22 52 20 41",
    "Q 18 31 24 23"
  );

  const surfaces: GeometrySurface[] = [
    {
      key: "V",
      label: "V",
      path: closed(
        "M 24 23",
        "Q 31 13 38 23",
        "Q 36 29 35 31",
        "Q 31 34 27 31",
        "Q 26 29 24 23"
      ),
      text: { x: 31, y: 26 }
    },
    {
      key: "M",
      label: "M",
      path: closed(
        "M 20 41",
        "Q 20 31 24 23",
        "Q 26 29 27 31",
        "Q 26 40 27 49",
        "Q 22 47 20 41"
      ),
      text: { x: 23, y: 40 }
    },
    {
      key: "I",
      label: "I",
      path: closed(
        "M 27 31",
        "Q 31 28 35 31",
        "Q 37 40 35 48",
        "Q 31 53 27 48",
        "Q 25 40 27 31"
      ),
      text: { x: 31, y: 40 }
    },
    {
      key: "D",
      label: "D",
      path: closed(
        "M 42 41",
        "Q 42 31 38 23",
        "Q 36 29 35 31",
        "Q 36 40 35 49",
        "Q 40 47 42 41"
      ),
      text: { x: 39, y: 40 }
    },
    {
      key: "L",
      label: "L",
      path: closed(
        "M 25 47",
        "Q 31 56 37 47",
        "Q 40 49 42 41",
        "Q 40 54 31 60",
        "Q 22 54 20 41",
        "Q 22 49 25 47"
      ),
      text: { x: 31, y: 55 }
    }
  ];

  return {
    crownOutline,
    crownCap: crownOutline,
    rootPaths: [
      closed(
        "M 27 58",
        "Q 31 62 35 58",
        "Q 39 73 37 92",
        "Q 35 112 31 122",
        "Q 27 112 25 92",
        "Q 23 73 27 58"
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
        "Q 24 40 26 49",
        "Q 20 48 16 39"
      ),
      text: { x: 22, y: 40 }
    },
    {
      key: "O",
      label: "O",
      path: closed(
        "M 26 31",
        "Q 31 27 36 31",
        "Q 39 39 36 48",
        "Q 31 52 26 48",
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
        "Q 38 40 36 49",
        "Q 42 48 46 39"
      ),
      text: { x: 40, y: 40 }
    },
    {
      key: "L",
      label: "L",
      path: closed(
        "M 24 47",
        "Q 31 56 38 47",
        "Q 43 49 46 39",
        "Q 44 54 31 59",
        "Q 18 54 16 39",
        "Q 19 49 24 47"
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
        "Q 28 71 25 90",
        "Q 23 101 20 109",
        "Q 17 99 17 86",
        "Q 17 71 22 57"
      ),
      closed(
        "M 34 57",
        "Q 37 60 40 57",
        "Q 45 71 45 86",
        "Q 45 99 42 109",
        "Q 39 101 37 90",
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
        "Q 22 44 24 53",
        "Q 17 52 13 43"
      ),
      text: { x: 21, y: 43 }
    },
    {
      key: "O",
      label: "O",
      path: closed(
        "M 24 34",
        "Q 31 29 38 34",
        "Q 41 43 38 52",
        "Q 31 56 24 52",
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
        "Q 40 44 38 53",
        "Q 45 52 49 43"
      ),
      text: { x: 41, y: 43 }
    },
    {
      key: "L",
      label: "L",
      path: closed(
        "M 22 51",
        "Q 31 62 40 51",
        "Q 46 52 49 43",
        "Q 46 58 31 64",
        "Q 16 58 13 43",
        "Q 16 52 22 51"
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
            "Q 24 73 22 91",
            "Q 20 103 17 111",
            "Q 14 101 14 88",
            "Q 14 73 17 61"
          ),
          closed(
            "M 28 61",
            "Q 31 65 34 61",
            "Q 36 76 35 96",
            "Q 34 111 31 122",
            "Q 28 111 27 96",
            "Q 26 76 28 61"
          ),
          closed(
            "M 39 61",
            "Q 42 64 45 61",
            "Q 48 73 48 88",
            "Q 48 101 45 111",
            "Q 42 103 40 91",
            "Q 38 73 39 61"
          )
        ]
      : [
          closed(
            "M 22 61",
            "Q 26 64 29 61",
            "Q 29 76 26 96",
            "Q 24 109 20 118",
            "Q 17 107 17 92",
            "Q 17 75 22 61"
          ),
          closed(
            "M 33 61",
            "Q 36 64 40 61",
            "Q 45 75 45 92",
            "Q 45 107 42 118",
            "Q 38 109 36 96",
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
