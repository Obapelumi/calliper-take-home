import { Button, ButtonProps } from "@chakra-ui/react";

interface ShareButtonProps extends ButtonProps {
  onClick: () => void;
}

export const ShareButton = ({ onClick, ...rest }: ShareButtonProps) => {
  return (
    <Button colorScheme="blue" onClick={onClick} {...rest}>
      Share
    </Button>
  );
};
