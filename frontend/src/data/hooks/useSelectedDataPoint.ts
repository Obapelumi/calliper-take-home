import { useAtom } from "jotai";
import { selectedDataPointAtom } from "../atoms/selectedDataPoint";

export const useSelectedDataPoint = () => {
  const [dataPoint] = useAtom(selectedDataPointAtom);

  return dataPoint;
};
