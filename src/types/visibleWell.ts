import type { Well } from "./well.ts";

export interface VisibleWell extends Well {
  visible: boolean;
  color: string;
}