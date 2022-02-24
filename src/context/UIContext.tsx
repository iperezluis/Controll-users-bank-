import React, { createContext, useState } from "react";

export type UIContextProps = {
  hiddenMenu: boolean;
  showMenu: () => void;
  hiddeMenu: () => void;
};

export const UIContext = createContext({} as UIContextProps);

export const UIProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [hiddenMenu, setHiddenMenu] = useState<boolean>(false);

  const showMenu = () => {
    setHiddenMenu(false);
  };
  const hiddeMenu = () => {
    setHiddenMenu(true);
  };

  return (
    <UIContext.Provider value={{ hiddeMenu, showMenu, hiddenMenu }}>
      {children}
    </UIContext.Provider>
  );
};

export default UIContext;
