import { atom } from "jotai";
import { DataPoint } from "../models/ChartData";

export const selectedDataPointAtom = atom<DataPoint | null>(null);
