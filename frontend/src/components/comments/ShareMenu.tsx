import { SideMenu } from "./SideMenu";
import { ShareTokensList } from "../sharing/ShareTokensList";
import { CreateShareToken } from "../sharing/CreateShareToken";

interface ShareMenuProps {
  show: boolean;
}

export const ShareMenu = ({ show }: ShareMenuProps) => {
  return (
    <SideMenu show={show}>
      <ShareTokensList />
      <CreateShareToken />
    </SideMenu>
  );
};
