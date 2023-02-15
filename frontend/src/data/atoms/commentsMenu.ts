import { atom } from "jotai";
import { DataPoint } from "../models/ChartData";
import { selectedDataPointAtom } from "./selectedDataPoint";

export const commentsToggleAtom = atom(
  (get) => !!get(selectedDataPointAtom),
  (get, set, arg: DataPoint) => {
    const dataPoint = get(selectedDataPointAtom);

    if (
      dataPoint?.country === arg.country &&
      dataPoint.feature === arg.feature
    ) {
      set(selectedDataPointAtom, null);
      return;
    }

    set(selectedDataPointAtom, arg);
  }
);

export const hideCommentsAtom = atom(null, (_, set) => {
  set(selectedDataPointAtom, null);
});
