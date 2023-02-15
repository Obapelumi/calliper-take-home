import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ChartPageLayoutProps {
  main: ReactNode;
  sidebar?: ReactNode;
  sidebarShown?: boolean;
}

export const ChartPageLayout = ({
  main,
  sidebar = null,
  sidebarShown = false,
}: ChartPageLayoutProps) => {
  return (
    <Flex flexDirection="row" h="100vh">
      <Box
        p={8}
        height="100%"
        width={sidebarShown ? "100%" : "calc(100% - 300px)"}
        transition="transform .3s"
        transform="translate3d(0,0,0)"
      >
        {main}
      </Box>
      {sidebar}
    </Flex>
  );
};
