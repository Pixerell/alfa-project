import type { Dispatch, SetStateAction } from "react";
import type { SortOption } from "../api/types";

export function createExclusiveCycleSort(
  set: Dispatch<SetStateAction<SortOption>>,
  resetOthers: Dispatch<SetStateAction<SortOption>>[]
) {
  return () => {
    set((prev) => {
      const next = prev === "off" ? "asc" : prev === "asc" ? "desc" : "off";
      if (next !== "off") {
        resetOthers.forEach((reset) => reset("off"));
      }
      return next;
    });
  };
}
