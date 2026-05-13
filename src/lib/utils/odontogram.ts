import { CLINICAL_CONDITIONS } from "../constants";
import type {
  ConditionDefinition,
  OdontogramChange,
  ToothCondition,
  ToothRecord,
  ToothStateMap,
  ToothSurface
} from "../types";

const conditionMap = new Map<ToothCondition, ConditionDefinition>(
  CLINICAL_CONDITIONS.map((condition) => [condition.id, condition])
);

const dedupe = (conditions: ToothCondition[] = []) => Array.from(new Set(conditions));

const sortConditions = (conditions: ToothCondition[]) =>
  [...conditions].sort((left, right) => left.localeCompare(right));

export const normalizeChanges = (value: OdontogramChange = []): ToothStateMap => {
  const normalized: ToothStateMap = {};

  value.forEach((record) => {
    normalized[record.tooth] = {
      tooth: record.tooth,
      conditions: record.conditions ? sortConditions(dedupe(record.conditions)) : undefined,
      surfaces: record.surfaces
        ? Object.fromEntries(
            Object.entries(record.surfaces)
              .map(([surface, conditions]) => [
                surface,
                conditions?.length ? sortConditions(dedupe(conditions)) : undefined
              ])
              .filter(([, conditions]) => Boolean(conditions?.length))
          ) as ToothRecord["surfaces"]
        : undefined
    };
  });

  return normalized;
};

export const serializeChanges = (state: ToothStateMap): OdontogramChange =>
  Object.values(state)
    .filter(Boolean)
    .map((record) => {
      const nextRecord: ToothRecord = { tooth: record!.tooth };

      if (record?.conditions?.length) {
        nextRecord.conditions = record.conditions;
      }

      if (record?.surfaces && Object.keys(record.surfaces).length > 0) {
        nextRecord.surfaces = record.surfaces;
      }

      return nextRecord;
    })
    .filter((record) => record.conditions?.length || Object.keys(record.surfaces ?? {}).length)
    .sort((left, right) => left.tooth.localeCompare(right.tooth));

const cleanupRecord = (record: ToothRecord): ToothRecord | undefined => {
  const surfaces = record.surfaces
    ? Object.fromEntries(
        Object.entries(record.surfaces).filter(([, conditions]) => Boolean(conditions?.length))
      )
    : undefined;

  const hasToothConditions = Boolean(record.conditions?.length);
  const hasSurfaceConditions = Boolean(surfaces && Object.keys(surfaces).length > 0);

  if (!hasToothConditions && !hasSurfaceConditions) {
    return undefined;
  }

  return {
    tooth: record.tooth,
    conditions: hasToothConditions ? record.conditions : undefined,
    surfaces: hasSurfaceConditions ? (surfaces as ToothRecord["surfaces"]) : undefined
  };
};

export const applySurfaceCondition = (
  state: ToothStateMap,
  tooth: string,
  surface: ToothSurface,
  condition: ToothCondition
): ToothStateMap => {
  const definition = conditionMap.get(condition);
  if (!definition) {
    return state;
  }

  const current = state[tooth] ?? { tooth };
  const currentSurfaceValues = current.surfaces?.[surface] ?? [];
  const nextRecord: ToothRecord = {
    tooth,
    conditions: current.conditions,
    surfaces: {
      ...(current.surfaces ?? {}),
      [surface]: sortConditions(dedupe([...currentSurfaceValues, condition]))
    }
  };

  return {
    ...state,
    [tooth]: cleanupRecord(nextRecord)
  };
};

export const applyToothCondition = (
  state: ToothStateMap,
  tooth: string,
  condition: ToothCondition
): ToothStateMap => {
  const current = state[tooth] ?? { tooth };
  const nextRecord: ToothRecord = {
    tooth,
    surfaces: current.surfaces,
    conditions: sortConditions(dedupe([...(current.conditions ?? []), condition]))
  };

  return {
    ...state,
    [tooth]: cleanupRecord(nextRecord)
  };
};

export const clearSurfaceCondition = (
  state: ToothStateMap,
  tooth: string,
  surface: ToothSurface
): ToothStateMap => {
  const current = state[tooth];
  if (!current?.surfaces?.[surface]?.length) {
    return state;
  }

  const nextSurfaces = { ...(current.surfaces ?? {}) };
  delete nextSurfaces[surface];

  return {
    ...state,
    [tooth]: cleanupRecord({
      tooth,
      conditions: current.conditions,
      surfaces: nextSurfaces
    })
  };
};

export const clearToothCondition = (state: ToothStateMap, tooth: string): ToothStateMap => {
  const current = state[tooth];
  if (!current) {
    return state;
  }

  const nextRecord = cleanupRecord({
    tooth,
    conditions: undefined,
    surfaces: undefined
  });

  if (!nextRecord) {
    const nextState = { ...state };
    delete nextState[tooth];
    return nextState;
  }

  return {
    ...state,
    [tooth]: nextRecord
  };
};

export const getConditionColor = (condition?: ToothCondition) =>
  CLINICAL_CONDITIONS.find((item) => item.id === condition)?.color ?? "#dbe4ea";
