import { useAtom, useSetAtom } from "jotai";
import {
  sendingShareTokenAtom,
  sendShareTokenAtom,
  sendShareTokenErrorAtom
} from "../atoms/sendShareToken";

export const useCreateShareToken = () => {
  const sendShareToken = useSetAtom(sendShareTokenAtom);
  const [sendingShareToken] = useAtom(sendingShareTokenAtom);
  const [sendShareTokenError] = useAtom(sendShareTokenErrorAtom);

  return { sendShareToken, sendingShareToken, sendShareTokenError };
};
