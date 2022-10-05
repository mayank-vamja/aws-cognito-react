import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import AppRoutes from './AppRoutes'
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => (
  <Provider store={store}>
    <Router>
      <AppRoutes />
    </Router>
  </Provider>
)

export default App;
