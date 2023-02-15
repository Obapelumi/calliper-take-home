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

export const usePublishCommentForm = () => {
  const [userName, setUsername] = useAtom(persistentUsernameAtom);
  const [text, setText] = useState("");

  return { userName, setUsername, text, setText };
};
