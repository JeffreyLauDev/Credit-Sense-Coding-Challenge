import React, { useState, useContext } from "react";
const MessageContext = React.createContext();

function MessageProvider({ children }) {
  const [message, setMessage] = useState(null);

  const value = [message, setMessage];
  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
}

function useMessage() {
  const message = useContext(MessageContext);
  if (message === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return message;
}


function useErrorNotification() {
  const [message, setMessage] = useContext(MessageContext);

  if (message === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }

  return (err) => {
    if (err.response !== undefined && err.response.status == 400) {
      //IF ERROR CODE IS 400, RETURN THE CUSTOMISED ERROR MESSAGE
      return setMessage(err.response.data.message);
    } else {
      return setMessage(err.message);
    }
  };
}

export { MessageProvider, useMessage, useErrorNotification };
