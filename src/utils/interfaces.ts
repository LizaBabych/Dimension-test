export interface Option {
  id: number;
  name: string;
}

export type TaskStatus =
  | "BACKLOG"
  | "TODO"
  | "IN_PROGRESS"
  | "IN_REVIEW"
  | "DONE"
  | "CANCELED";

export type Priority = "LOW" | "MEDIUM" | "HIGH";
