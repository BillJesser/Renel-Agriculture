// IpContext.js
import React, { createContext, useState } from 'react';

export const IpContext = createContext();

export const IpProvider = ({ children, initialIp }) => {
  const [ip] = useState(initialIp); // Use the initialIp value correctly

  return (
    <IpContext.Provider value={ip}>
      {children}
    </IpContext.Provider>
  );
};
