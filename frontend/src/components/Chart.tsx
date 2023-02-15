import { ResponsiveBar } from "@nivo/bar";
import { CommentThread } from "../data/models/ChartCommentThread";
import {
  ChartData,
  ChartDataFeature,
  Country,
  DataPoint,
} from "../data/models/ChartData";

interface ChartProps {
  data: ChartData;
  commentThreads?: CommentThread[];
  onClick?: (dataPoint: DataPoint) => void;
}

export const Chart = ({ data, commentThreads = [], onClick }: ChartProps) => {
  return (
    <ResponsiveBar
      data={data}
      onClick={
        onClick
          ? (e) => {
              onClick({
                feature: e.id as ChartDataFeature,
                country: e.indexValue as Country,
              });
            }
          : undefined
      }
      annotations={commentThreads.map(({ chartDataPoint, commentsCount }) => ({
        type: "circle",
        match: { key: `${chartDataPoint.feature}.${chartDataPoint.country}` },
        noteX: 25,
        noteY: 25,
        offset: 3,
        noteTextOffset: -3,
        noteWidth: 5,
        note: `${commentsCount} comments`,
        size: 40,
      }))}
      keys={Object.values(ChartDataFeature)}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      isFocusable
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "food",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};
