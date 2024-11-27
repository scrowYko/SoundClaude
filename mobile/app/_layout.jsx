// _layout.jsx
import React from 'react';
import { AppProvider } from './AppContext'; // Ajuste o caminho conforme necessário

const Layout = ({ children }) => {
  return (
    <AppProvider>
          {children}
    </AppProvider>
  );
};

export default Layout;