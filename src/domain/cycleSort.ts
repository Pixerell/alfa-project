import type { Dispatch, SetStateAction } from "react";
import type { SortOption } from "../api/types";

export function createExclusiveCycleSort(
  set: Dispatch<SetStateAction<SortOption>>,
  resetOther: Dispatch<SetStateAction<SortOption>>
) {
  return () => {
    set((prev) => {
      const next = prev === "off" ? "asc" : prev === "asc" ? "desc" : "off";
      // Reset the other sort if turning this one on
      if (next !== "off") resetOther("off");
      return next;
    });
  };
}
