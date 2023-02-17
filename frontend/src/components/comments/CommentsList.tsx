import { Spinner, VStack } from "@chakra-ui/react";
import { useFetchSelectedThread } from "../../data/hooks/useFetchSelectedThread";
import { useSelectedThread } from "../../data/hooks/useSelectedThread";
import { CommentCard } from "./CommentCard";

export const CommentsList = () => {
  const { selectedThread, loading } = useSelectedThread();
  useFetchSelectedThread();

  if (loading) return <Spinner />;

  return (
    <VStack height="calc(100% - 236px)" pb={"2"} overflow="scroll">
      {selectedThread?.comments.map(({ userName, text }, index) => (
        <CommentCard userName={userName} text={text} key={index} />
      ))}
    </VStack>
  );
};
