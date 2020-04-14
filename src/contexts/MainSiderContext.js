import React, { useCallback, useState } from 'react';

export const MainSiderContext = React.createContext({
  collapsed: false,
  toggle: () => {},
});

export const MainSiderProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = useCallback(() => {
    setCollapsed(collapsed => !collapsed);
  }, []);

  return (
    <MainSiderContext.Provider
      value={{
        collapsed,
        toggle,
      }}
    >
      {children}
    </MainSiderContext.Provider>
  );
};
