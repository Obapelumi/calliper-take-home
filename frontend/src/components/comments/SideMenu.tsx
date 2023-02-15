import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface SideMenuProps extends PropsWithChildren {
  show: boolean;
}

export const SideMenu = ({ show, children }: SideMenuProps) => {
  return (
    <Flex
      width={show ? "300px" : "0"}
      p={show ? 3 : 0}
      position="absolute"
      top="0"
      right="0"
      height="100%"
      flexDirection="column"
      backgroundColor="gray.50"
      border="1px solid"
      borderColor="gray.200"
      transition="all .3s"
    >
      {show ? children : null}
    </Flex>
  );
};
