import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import { Code, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useShareMenu } from "../../data/hooks/useShareMenu";
import { ShareToken } from "../../data/models/ShareToken";

export const ShareTokenCard = ({ id, email, expiresAt }: ShareToken) => {
  const { shareMenuShown } = useShareMenu();
  const [copied, setCopied] = useState(false);

  const getShareLink = (token: string) =>
    `${window.location.host}/share/chart/${token}`;

  const copyLink = (id: string) => {
    const link = getShareLink(id);

    try {
      navigator.clipboard.writeText(link);
      setCopied(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setCopied(false);
  }, [shareMenuShown]);

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
        {email}
      </Heading>
      <Text
        wordBreak="break-word"
        pb={2}
        color={new Date(expiresAt) < new Date() ? "red" : ""}
      >
        Expires: {new Date(expiresAt).toDateString()}
      </Text>
      <Code
        p="8px"
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        cursor="pointer"
        onClick={() => copyLink(id)}
      >
        <Link maxWidth="100%">{getShareLink(id)}</Link>
        {copied ? <CheckIcon color="green" /> : <CopyIcon />}
      </Code>
    </Flex>
  );
};
