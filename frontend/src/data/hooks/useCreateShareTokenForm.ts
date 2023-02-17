import { atom, useAtom } from "jotai";
import { useState } from "react";

const usernameAtom = atom(localStorage.getItem("userName") ?? "");

const persistentUsernameAtom = atom(
  (get) => get(usernameAtom),
  (_, set, update: string) => {
    set(usernameAtom, update);
    localStorage.setItem("userName", update);
  }
);

export const useCreateShareTokenForm = () => {
  const [email, setEmail] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  return { email, setEmail, expiresAt, setExpiresAt };
};
