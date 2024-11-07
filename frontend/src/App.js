import React, { Component } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Homepage from './component/Homepage';
import Signup from './component/Signup';
import Login from './component/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/register",
    element: <Signup />
  },
  {
    path: "/login",  // Added leading slash here for consistency
    element: <Login />
  }
]);
class App extends Component {
  render() {
    return (
      <div className="App">
        <RouterProvider router={router} />
      </div>
    );
  }
}

export default App;
