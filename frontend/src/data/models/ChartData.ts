export enum ChartDataFeature {
  HOTDOG = "hotdog",
  BURGER = "burger",
  SANDWICH = "sandwich",
  KEBAB = "kebab",
  FRIES = "fries",
  DONUT = "donut",
}

export enum Country {
  FR = "FR",
  GB = "GB",
  BE = "BE",
  DE = "DE",
  ES = "ES",
  IT = "IT",
}

export interface BarData {
  [ChartDataFeature.HOTDOG]: number;
  [ChartDataFeature.BURGER]: number;
  [ChartDataFeature.SANDWICH]: number;
  [ChartDataFeature.KEBAB]: number;
  [ChartDataFeature.FRIES]: number;
  [ChartDataFeature.DONUT]: number;
  country: Country;
  [key: string]: string | number;
}

export type ChartData = BarData[];

export interface DataPoint {
  country: Country;
  feature: ChartDataFeature;
}
