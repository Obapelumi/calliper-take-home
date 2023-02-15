import { Chart } from "../components/Chart";
import { ChartPageLayout } from "../components/ChartPageLayout";
import { CommentsMenu } from "../components/comments/CommentsMenu";
import { ShareButton } from "../components/comments/ShareButton";
import { ShareMenu } from "../components/comments/ShareMenu";
import { useChartData } from "../data/hooks/useChartData";
import { useCommentThreads } from "../data/hooks/useCommentThreads";
import { useShareMenu } from "../data/hooks/useShareMenu";
import { useToggleCommentsMenu } from "../data/hooks/useToggleCommentsMenu";
import { DataPoint } from "../data/models/ChartData";

export const ChartPage = () => {
  const data = useChartData();
  const commentThreads = useCommentThreads();
  const { commentsMenuShown, toggleCommentsMenu, hideCommentsMenu } =
    useToggleCommentsMenu();

  const { shareMenuShown, setShareMenuVisibility } = useShareMenu();

  const onChartClick = (dataPoint: DataPoint) => {
    toggleCommentsMenu(dataPoint);
    setShareMenuVisibility(false);
  };

  const onShareClick = () => {
    hideCommentsMenu();
    setShareMenuVisibility(!shareMenuShown);
  };

  return (
    <ChartPageLayout
      main={
        <>
          <Chart
            data={data}
            commentThreads={commentThreads}
            onClick={onChartClick}
          />
          <ShareButton
            position="absolute"
            top="30px"
            left="30px"
            w="200px"
            onClick={onShareClick}
          />
        </>
      }
      sidebar={
        <>
          <CommentsMenu show={commentsMenuShown} />
          <ShareMenu show={shareMenuShown} />
        </>
      }
      sidebarShown={commentsMenuShown || shareMenuShown}
    />
  );
};
