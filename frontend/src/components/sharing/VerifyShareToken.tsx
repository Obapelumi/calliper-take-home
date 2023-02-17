import {
  Button,
  Input,
  VStack,
  Text,
  Flex,
  Heading,
  Spinner
} from "@chakra-ui/react";
import { SyntheticEvent, useCallback, useState } from "react";
import { useSharedChartData } from "../../data/hooks/useSharedChartData";

export const VerifyShareToken = () => {
  const [email, setEmail] = useState("");
  const {
    shareTokenError,
    shareTokenLoading,
    fetchChartData,
    sharedChartDataLoading,
    sharedChartDataError
  } = useSharedChartData();

  const submit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      await fetchChartData(email);
      setEmail("");
    },
    [email, setEmail, fetchChartData]
  );

  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      h="100vh"
    >
      {shareTokenLoading ? (
        <Spinner />
      ) : shareTokenError ? (
        <Text color="red" fontStyle="italic" maxWidth="100%">
          {shareTokenError}
        </Text>
      ) : (
        <VStack
          backgroundColor="white"
          p="10"
          as="form"
          borderRadius="md"
          shadow="rgba(57, 39, 39, 0.1) 0px 0px 15px, rgba(0, 0, 0, 0.1) 0px 0px 3px 1px"
          width="400px"
          onSubmit={submit}
        >
          <Heading size="md" pb={3}>
            Verify Email
          </Heading>
          <Input
            placeholder="Email"
            backgroundColor="white"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            colorScheme="green"
            width="full"
            type="submit"
            disabled={sharedChartDataLoading}
          >
            Verify
          </Button>
          {sharedChartDataError ? (
            <Text color="red" fontStyle="italic" maxWidth="100%">
              {sharedChartDataError}
            </Text>
          ) : null}
        </VStack>
      )}
    </Flex>
  );
};
