import React, { createContext } from "react";

import { Socket } from "socket.io-client";
import { useSocket } from "../hooks/useSocket";

type socketProvider = {
  onLine: boolean;
  socket: Socket;
};

export const SocketContext = createContext({} as socketProvider);
export const SocketProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { onLine, socket } = useSocket("http://localhost:8080"); //--> este es el localhost del servidor(backEnd)
  return (
    <SocketContext.Provider value={{ onLine, socket }}>
      {children}
    </SocketContext.Provider>
  );
};
