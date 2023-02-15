import { Text, Heading, Flex } from "@chakra-ui/react";
import { Comment } from "../../data/models/Comment";

interface CommentsMenuProps extends Comment {}

export const CommentCard = ({ userName, text }: CommentsMenuProps) => {
  return (
    <Flex
      p={2}
      direction="column"
      backgroundColor="white"
      border="1px solid"
      borderRadius="md"
      borderColor="gray.200"
      width="full"
    >
      <Heading size="sm" pb={2}>
        {userName}
      </Heading>
      <Text wordBreak="break-word">{text}</Text>
    </Flex>
  );
};
