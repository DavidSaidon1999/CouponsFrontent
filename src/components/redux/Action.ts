// Action.ts
import { ActionType } from './ActionType';

export interface Action<T = any> {
  type: ActionType;
  payload?: T;  // ה-payload יכול להיות כל סוג, תלוי במה שמועבר
}
