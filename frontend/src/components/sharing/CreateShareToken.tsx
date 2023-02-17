import { Button, Input, Text, VStack } from "@chakra-ui/react";
import { SyntheticEvent, useCallback } from "react";
import { useCreateShareToken } from "../../data/hooks/useCreateShareToken";
import { useCreateShareTokenForm } from "../../data/hooks/useCreateShareTokenForm";

export const CreateShareToken = () => {
  const { sendingShareToken, sendShareToken, sendShareTokenError } =
    useCreateShareToken();
  const { email, setEmail, expiresAt, setExpiresAt } =
    useCreateShareTokenForm();

  const submit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      await sendShareToken({ email, expiresAt });
      setEmail("");
      setExpiresAt("");
    },
    [email, expiresAt, setEmail, setExpiresAt, sendShareToken]
  );

  return (
    <VStack
      minHeight="100px"
      backgroundColor="white"
      pt="2"
      as="form"
      onSubmit={submit}
    >
      <Input
        placeholder="Email"
        backgroundColor="white"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        placeholder="Expiry date"
        backgroundColor="white"
        flexGrow={1}
        value={expiresAt}
        type="date"
        min={new Date().toLocaleDateString("fr-ca")}
        onChange={(e) => setExpiresAt(e.target.value)}
        required
      />
      <Button
        colorScheme="green"
        width="full"
        type="submit"
        disabled={sendingShareToken}
      >
        Create Share Token
      </Button>
      {sendShareTokenError ? (
        <Text color="red" fontStyle="italic" maxWidth="100%">
          {sendShareTokenError}
        </Text>
      ) : null}
    </VStack>
  );
};
