import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { sharingLinkAtom } from "../atoms/sharingLink";
import { fetchSharingTokenAtom } from "../atoms/sharingToken";

export const useSharingLink = () => {
  const [link] = useAtom(sharingLinkAtom);
  const fetchToken = useSetAtom(fetchSharingTokenAtom);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  return link;
};
