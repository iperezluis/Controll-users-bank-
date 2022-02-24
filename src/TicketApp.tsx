import React from "react";
import RouterPage from "./pages/RouterPage";
import { UIProvider } from "./context/UIContext";
import { SocketProvider } from "./context/SocketContext";

function TicketApp() {
  return (
    <>
      <SocketProvider>
        <UIProvider>
          <RouterPage />
        </UIProvider>
      </SocketProvider>
    </>
  );
}

export default TicketApp;
