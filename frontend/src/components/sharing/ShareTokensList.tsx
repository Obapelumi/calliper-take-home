import { Heading, VStack } from "@chakra-ui/react";
import { useShareTokens } from "../../data/hooks/useShareTokens";
import { ShareTokenCard } from "./ShareTokenCard";

export const ShareTokensList = () => {
  const shareTokens = useShareTokens();

  return (
    <VStack height="calc(100% - 136px)" pb={"2"} overflow="scroll">
      <Heading size="md" pb={3}>
        Your share links
      </Heading>
      {shareTokens.map((shareToken) => (
        <ShareTokenCard key={shareToken.id} {...shareToken} />
      ))}
    </VStack>
  );
};
