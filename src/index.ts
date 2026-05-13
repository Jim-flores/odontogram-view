import styles from "./lib/styles.css?inline";
import { injectLibraryStyles } from "./lib/utils/injectStyles";

injectLibraryStyles(styles);

export { Odontogram } from "./lib/components/Odontogram/Odontogram";
export type {
  OdontogramChange,
  OdontogramProps,
  ToothCondition,
  ToothRecord,
  ToothSurface,
  ToothType
} from "./lib/types";
export {
  CLINICAL_CONDITIONS,
  MIXED_DENTITION_LAYOUT,
  PERMANENT_DENTITION_LAYOUT,
  PRIMARY_DENTITION_LAYOUT
} from "./lib/constants";
