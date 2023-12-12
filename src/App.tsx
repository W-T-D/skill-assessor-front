import React from 'react';
import {Provider} from "react-redux";
import {Store} from "./redux/store";
import {AuthProvider} from "./services/providers/auth/AuthProvider";
import AppRoutes from "./router/AppRoutes";

function App() {
  return (
    <Provider store={Store}>
      <AuthProvider>
          <AppRoutes />
      </AuthProvider>
    </Provider>
  );
}

export default App;
