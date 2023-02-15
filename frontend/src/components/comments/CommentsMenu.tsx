import { Heading } from "@chakra-ui/react";
import { useSelectedDataPoint } from "../../data/hooks/useSelectedDataPoint";
import { PublishComment } from "./PublishComment";
import { CommentsList } from "./CommentsList";
import { SideMenu } from "./SideMenu";

interface CommentsMenuProps {
  show: boolean;
}

export const CommentsMenu = ({ show }: CommentsMenuProps) => {
  const dataPoint = useSelectedDataPoint();

  return (
    <SideMenu show={show}>
      <>
        {dataPoint ? (
          <Heading size="md" pb={3}>
            Comments for {dataPoint.country} · {dataPoint.feature}
          </Heading>
        ) : null}
        <CommentsList />
        <PublishComment />
      </>
    </SideMenu>
  );
};
