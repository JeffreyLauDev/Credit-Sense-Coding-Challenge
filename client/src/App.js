import React from "react";
import routes from "src/routes";
import { useRoutes } from "react-router-dom";
import MessageBox from "src/components/MessageBox";
import { MessageProvider } from "./context/MessageBoxContext";
import { UpdateProvider } from "./context/UpdateContext";

import Home from "./views/home/Home";
const App = () => {
  const routing = useRoutes(routes);
  return (
    <UpdateProvider>
      <MessageProvider>
        <Home />
        <MessageBox />
      </MessageProvider>
    </UpdateProvider>
  );
};

export default App;
